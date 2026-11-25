"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CardArt from "./CardArt";
import DonateModal from "./DonateModal";
import { FONTS, FontKey } from "@/lib/fonts";
import { fieldBoxStyle, imageStyle, textStyle } from "@/lib/cardStyle";
import { downloadPdf, downloadPng, shareCard } from "@/lib/download";
import {
  CARD_H, CARD_W, CardDesign, CardField, FrameKey, MotifKey,
  PALETTES, Template, resolveColor,
} from "@/lib/templates";

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const FRAME_LIST: { key: FrameKey; label: string }[] = [
  { key: "mandala", label: "Mandala" },
  { key: "arch", label: "Arch" },
  { key: "wreath", label: "Wreath" },
  { key: "minimal", label: "Minimal" },
  { key: "corners", label: "Corners" },
  { key: "temple", label: "Temple" },
  { key: "ring", label: "Rings" },
  { key: "paisley", label: "Paisley" },
];

const MOTIF_LIST: { key: MotifKey; label: string }[] = [
  { key: "om", label: "Om" },
  { key: "kalash", label: "Kalash" },
  { key: "lotus", label: "Lotus" },
  { key: "bismillah", label: "Crescent" },
  { key: "cross", label: "Cross" },
  { key: "khanda", label: "Khanda" },
  { key: "chakra", label: "Chakra" },
  { key: "jain", label: "Ahimsa" },
  { key: "dove", label: "Dove" },
  { key: "rings", label: "Rings" },
  { key: "heart", label: "Heart" },
  { key: "none", label: "None" },
];

const TEXTURES: { key: CardDesign["texture"]; label: string }[] = [
  { key: "none", label: "Plain" },
  { key: "rays", label: "Rays" },
  { key: "dots", label: "Dots" },
  { key: "paper", label: "Paper" },
];

const FONT_GROUPS: { label: string; keys: FontKey[] }[] = [
  { label: "Serif & display", keys: ["playfair", "cormorant", "marcellus", "cinzel", "italiana", "lora"] },
  { label: "Calligraphy", keys: ["greatvibes", "dancing", "parisienne"] },
  { label: "Hindi / Punjabi", keys: ["tiro", "mukta", "rozha"] },
  { label: "Urdu / Arabic", keys: ["nastaliq", "amiri"] },
  { label: "Sans", keys: ["inter"] },
];

type Tab = "text" | "design" | "add";

export default function Editor({ template }: { template: Template }) {
  const storeKey = `scs-draft-${template.slug}`;
  const [design, setDesign] = useState<CardDesign>(() => clone(template.design));
  const [selId, setSelId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("text");
  const [zoom, setZoom] = useState(0.42);
  const [autoFit, setAutoFit] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [donate, setDonate] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const past = useRef<CardDesign[]>([]);
  const future = useRef<CardDesign[]>([]);
  const lastSnap = useRef(0);
  const [hist, setHist] = useState({ undo: 0, redo: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const p = design.palette;
  const sel = design.fields.find((f) => f.id === selId) || null;

  /* ---------- restore / autosave draft ---------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.fields?.length) {
          setDesign(saved);
          setRestored(true);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storeKey, JSON.stringify(design));
      } catch {}
    }, 500);
    return () => clearTimeout(t);
  }, [design, storeKey]);

  /* ---------- fit to stage ---------- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const fit = () => {
      if (!autoFit) return;
      const w = el.clientWidth - 28;
      const h = el.clientHeight - 28;
      const k = Math.min(w / CARD_W, h / CARD_H, 0.78);
      setZoom(Math.max(0.16, k));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit]);

  /* ---------- history ---------- */
  const syncHist = () => setHist({ undo: past.current.length, redo: future.current.length });

  const mutate = useCallback(
    (fn: (d: CardDesign) => void, force = false) => {
      setDesign((prev) => {
        const now = Date.now();
        if (force || now - lastSnap.current > 420) {
          past.current = [...past.current.slice(-59), prev];
          future.current = [];
          lastSnap.current = now;
        }
        const next = clone(prev);
        fn(next);
        return next;
      });
      queueMicrotask(syncHist);
    },
    []
  );

  const patchField = useCallback(
    (id: string, patch: Partial<CardField>, force = false) =>
      mutate((d) => {
        const i = d.fields.findIndex((f) => f.id === id);
        if (i >= 0) d.fields[i] = { ...d.fields[i], ...patch };
      }, force),
    [mutate]
  );

  const undo = useCallback(() => {
    if (!past.current.length) return;
    const prev = past.current.pop()!;
    setDesign((cur) => {
      future.current = [...future.current, cur];
      return prev;
    });
    lastSnap.current = 0;
    queueMicrotask(syncHist);
  }, []);

  const redo = useCallback(() => {
    if (!future.current.length) return;
    const next = future.current.pop()!;
    setDesign((cur) => {
      past.current = [...past.current, cur];
      return next;
    });
    lastSnap.current = 0;
    queueMicrotask(syncHist);
  }, []);

  /* ---------- dragging ---------- */
  const startDrag = (
    e: React.PointerEvent,
    f: CardField,
    mode: "move" | "width" | "size"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelId(f.id);
    lastSnap.current = 0; // force a snapshot for this gesture
    const k = zoom;
    const sx = e.clientX, sy = e.clientY;
    const ox = f.x, oy = f.y, ow = f.w, os = f.size ?? 28, oh = f.h ?? f.w;
    let snapped = false;

    const move = (ev: PointerEvent) => {
      const dx = (ev.clientX - sx) / k;
      const dy = (ev.clientY - sy) / k;
      if (!snapped) {
        snapped = true;
        past.current = [...past.current.slice(-59), design];
        future.current = [];
        lastSnap.current = Date.now();
        queueMicrotask(syncHist);
      }
      setDesign((prev) => ({
        ...prev,
        fields: prev.fields.map((fl) => {
          if (fl.id !== f.id) return fl;
          if (mode === "move") {
            return {
              ...fl,
              x: Math.round(clamp(ox + dx, -80, CARD_W - 40)),
              y: Math.round(clamp(oy + dy, -40, CARD_H - 30)),
            };
          }
          if (mode === "width") {
            return { ...fl, w: Math.round(clamp(ow + dx, 60, CARD_W + 80)) };
          }
          if (fl.type === "image") {
            const d = Math.max(dx, dy);
            return {
              ...fl,
              w: Math.round(clamp(ow + d, 60, 920)),
              h: Math.round(clamp(oh + d, 60, 1200)),
            };
          }
          return { ...fl, size: Math.round(clamp(os + dy * 0.7, 8, 220)) };
        }),
      }));
    };
    const up = () => window.removeEventListener("pointermove", move);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  };

  /* ---------- keyboard ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(tgt?.tagName || "");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
        return;
      }
      if (typing || !selId) return;
      const step = e.shiftKey ? 20 : 4;
      const f = design.fields.find((x) => x.id === selId);
      if (!f) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); patchField(selId, { x: f.x - step }); }
      if (e.key === "ArrowRight") { e.preventDefault(); patchField(selId, { x: f.x + step }); }
      if (e.key === "ArrowUp") { e.preventDefault(); patchField(selId, { y: f.y - step }); }
      if (e.key === "ArrowDown") { e.preventDefault(); patchField(selId, { y: f.y + step }); }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        mutate((d) => { d.fields = d.fields.filter((x) => x.id !== selId); }, true);
        setSelId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selId, design, patchField, mutate, undo, redo]);

  /* ---------- export ---------- */
  const fileName = useMemo(() => {
    const n1 = design.fields.find((f) => f.id === "n1")?.text || "wedding";
    const n2 = design.fields.find((f) => f.id === "n2")?.text || "card";
    return `${n1}-${n2}-invitation`.replace(/[^\p{L}\p{N}-]+/gu, "-").replace(/-+/g, "-").toLowerCase();
  }, [design.fields]);

  /** every family the artboard paints with — the only ones we inline on export */
  const fontsUsed = useMemo<FontKey[]>(() => {
    const keys = design.fields
      .filter((f) => f.type === "text")
      .map((f) => f.font ?? "inter");
    if (design.motif === "om") keys.push("tiro"); // the ॐ glyph is drawn as SVG text
    return Array.from(new Set(keys));
  }, [design.fields, design.motif]);

  const afterExport = () => {
    try {
      const n = Number(localStorage.getItem("scs-downloads") || "0") + 1;
      localStorage.setItem("scs-downloads", String(n));
    } catch {}
    setTimeout(() => setDonate(true), 700);
  };

  const run = async (kind: "png" | "pdf" | "share") => {
    if (!artRef.current || busy) return;
    setSelId(null);
    setBusy(kind);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const opts = { bg: p.bg, fonts: fontsUsed };
    try {
      if (kind === "png") await downloadPng(artRef.current, fileName, opts);
      else if (kind === "pdf") await downloadPdf(artRef.current, fileName, opts);
      else {
        const n1 = design.fields.find((f) => f.id === "n1")?.text || "";
        const n2 = design.fields.find((f) => f.id === "n2")?.text || "";
        await shareCard(artRef.current, fileName, `${n1} & ${n2} — aap sadar aamantrit hain! 💐`, opts);
      }
      setToast(kind === "pdf" ? "PDF saved ✓" : kind === "png" ? "HD image saved ✓" : "Shared ✓");
      afterExport();
    } catch (err) {
      console.error(err);
      setToast("Download fail ho gaya — dobara try kijiye");
    } finally {
      setBusy(null);
      setTimeout(() => setToast(null), 2600);
    }
  };

  /* ---------- add / upload ---------- */
  const addText = () => {
    const id = `t${Date.now().toString(36)}`;
    mutate((d) => {
      d.fields.push({
        id, type: "text", label: "New text", text: "Aapka text yahan",
        x: 180, y: 640, w: 640, align: "center", font: "inter", size: 34,
        weight: 400, color: "ink", lineHeight: 1.4,
      });
    }, true);
    setSelId(id);
    setTab("text");
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) { setToast("Sirf image file chuniye"); return; }
    if (file.size > 8 * 1024 * 1024) { setToast("Photo 8MB se chhoti honi chahiye"); return; }
    const fr = new FileReader();
    fr.onload = () => {
      const src = String(fr.result);
      const existing = design.fields.find((f) => f.type === "image" && (!selId || f.id === selId))
        || design.fields.find((f) => f.type === "image");
      if (existing) {
        patchField(existing.id, { src }, true);
        setSelId(existing.id);
      } else {
        const id = `img${Date.now().toString(36)}`;
        mutate((d) => {
          d.fields.unshift({
            id, type: "image", label: "Photo", src,
            x: 350, y: 180, w: 300, h: 300, align: "center", shape: "circle",
          });
        }, true);
        setSelId(id);
      }
      setToast("Photo lag gayi ✓");
      setTimeout(() => setToast(null), 2000);
    };
    fr.readAsDataURL(file);
  };

  const resetAll = () => {
    mutate((d) => {
      const t = clone(template.design);
      d.palette = t.palette; d.frame = t.frame; d.motif = t.motif;
      d.texture = t.texture; d.fields = t.fields;
    }, true);
    setSelId(null);
    setRestored(false);
    setToast("Template reset ho gaya");
    setTimeout(() => setToast(null), 1800);
  };

  const moveLayer = (dir: -1 | 1) => {
    if (!selId) return;
    mutate((d) => {
      const i = d.fields.findIndex((f) => f.id === selId);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= d.fields.length) return;
      [d.fields[i], d.fields[j]] = [d.fields[j], d.fields[i]];
    }, true);
  };

  const duplicate = () => {
    if (!sel) return;
    const id = `${sel.id}-c${Date.now().toString(36).slice(-3)}`;
    mutate((d) => {
      const i = d.fields.findIndex((f) => f.id === sel.id);
      d.fields.splice(i + 1, 0, { ...clone(sel), id, y: sel.y + 60, label: `${sel.label} copy` });
    }, true);
    setSelId(id);
  };

  /* ---------- render helpers ---------- */
  const artStyle: React.CSSProperties = {
    width: CARD_W, height: CARD_H, position: "absolute", top: 0, left: 0,
    transform: `scale(${zoom})`, transformOrigin: "top left",
    background: p.bg, color: p.ink,
  };

  const Swatch = ({ token, label }: { token: string; label: string }) => (
    <button
      type="button"
      title={label}
      onClick={() => sel && patchField(sel.id, { color: token }, true)}
      className={`h-7 w-7 rounded-full border-2 transition ${
        sel?.color === token ? "border-ink scale-110" : "border-white/80"
      }`}
      style={{ background: resolveColor(p, token) }}
    />
  );

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* ---------------- toolbar ---------------- */}
      <div className="no-print sticky top-[60px] z-20 border-b border-moss/15 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2 px-3 py-2">
          <Link href={`/templates/${template.slug}`} className="btn-chip" title="Back to template">
            ← Back
          </Link>
          <span className="hidden truncate text-sm font-semibold text-ink sm:block">
            {template.name}
          </span>

          <div className="ml-auto flex items-center gap-1">
            <button onClick={undo} disabled={!hist.undo} className="btn-chip disabled:opacity-35" title="Undo (Ctrl+Z)">↶</button>
            <button onClick={redo} disabled={!hist.redo} className="btn-chip disabled:opacity-35" title="Redo (Ctrl+Shift+Z)">↷</button>
            <span className="mx-1 hidden items-center gap-1 sm:flex">
              <button onClick={() => { setAutoFit(false); setZoom((z) => clamp(z - 0.06, 0.16, 1)); }} className="btn-chip">−</button>
              <button onClick={() => setAutoFit(true)} className="btn-chip w-14 justify-center" title="Fit to screen">
                {Math.round(zoom * 100)}%
              </button>
              <button onClick={() => { setAutoFit(false); setZoom((z) => clamp(z + 0.06, 0.16, 1)); }} className="btn-chip">+</button>
            </span>
            <button onClick={() => run("share")} disabled={!!busy} className="btn-ghost" title="Share on WhatsApp">
              {busy === "share" ? "…" : "Share"}
            </button>
            <button onClick={() => run("pdf")} disabled={!!busy} className="btn-ghost">
              {busy === "pdf" ? "…" : "PDF"}
            </button>
            <button onClick={() => run("png")} disabled={!!busy} className="btn-primary">
              {busy === "png" ? "Saving…" : "Download HD"}
            </button>
          </div>
        </div>
        {restored ? (
          <div className="border-t border-moss/10 bg-blush/50 px-3 py-1.5 text-center text-[12px] text-ink/60">
            Aapka pichla draft wapas load kar diya.{" "}
            <button onClick={resetAll} className="font-semibold text-moss underline">
              Fresh template se shuru karein
            </button>
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-3 p-3 lg:flex-row">
        {/* ---------------- stage ---------------- */}
        <div
          ref={stageRef}
          className="relative flex min-h-[52vh] flex-1 items-start justify-center overflow-auto rounded-lg border border-moss/15 bg-[linear-gradient(135deg,#e7e0c8_25%,transparent_25%,transparent_50%,#e7e0c8_50%,#e7e0c8_75%,transparent_75%,transparent)] bg-[length:18px_18px] p-3.5 lg:min-h-[70vh]"
        >
          <div className="relative shadow-lift" style={{ width: CARD_W * zoom, height: CARD_H * zoom }}>
            {/* the exported artboard — no UI chrome inside */}
            <div ref={artRef} style={artStyle}>
              <CardArt frame={design.frame} motif={design.motif} texture={design.texture} p={p} uid="ed" />
              {design.fields.map((f) => (
                <div key={f.id} style={fieldBoxStyle(f)}>
                  {f.type === "image" ? (
                    f.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={f.src} alt="" style={{ ...imageStyle(f), objectFit: "cover" }} />
                    ) : (
                      <div
                        style={{
                          ...imageStyle(f),
                          background: `${p.accent}12`,
                          border: `2px dashed ${p.accent}55`,
                        }}
                      />
                    )
                  ) : (
                    <p style={textStyle(f, p)}>{f.text}</p>
                  )}
                </div>
              ))}
            </div>

            {/* interactive overlay (never exported) */}
            <div
              className="absolute left-0 top-0"
              style={{ ...artStyle, background: "transparent" }}
              onPointerDown={() => setSelId(null)}
            >
              {design.fields.map((f) => {
                const on = f.id === selId;
                return (
                  <div
                    key={f.id}
                    style={{ ...fieldBoxStyle(f), cursor: "move" }}
                    onPointerDown={(e) => startDrag(e, f, "move")}
                    onDoubleClick={() => { setTab("text"); setTimeout(() => textRef.current?.focus(), 30); }}
                  >
                    {f.type === "image" ? (
                      <div style={{ ...imageStyle(f), background: "transparent" }} />
                    ) : (
                      <p style={{ ...textStyle(f, p), color: "transparent" }}>{f.text}</p>
                    )}
                    <div
                      className="pointer-events-none absolute -inset-[6px] rounded-[10px] transition"
                      style={{
                        border: on ? `3px solid #55673f` : "3px solid transparent",
                        background: on ? "rgba(227,154,150,0.07)" : "transparent",
                      }}
                    />
                    {on ? (
                      <>
                        <span
                          className="handle"
                          style={{ right: -13, top: "50%", marginTop: -7, cursor: "ew-resize" }}
                          onPointerDown={(e) => startDrag(e, f, "width")}
                          title="Width"
                        />
                        <span
                          className="handle"
                          style={{ right: -13, bottom: -13, cursor: "nwse-resize" }}
                          onPointerDown={(e) => startDrag(e, f, "size")}
                          title={f.type === "image" ? "Photo size" : "Font size"}
                        />
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------------- panel ---------------- */}
        <aside className="card-surface w-full shrink-0 overflow-hidden lg:w-[370px]">
          <div className="flex border-b border-moss/15 bg-parchment/50 p-1.5">
            {([
              ["text", "✍️ Text"],
              ["design", "🎨 Design"],
              ["add", "➕ Add"],
            ] as [Tab, string][]).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-1 rounded-xl px-3 py-2 text-[13px] font-semibold transition ${
                  tab === k ? "bg-ink text-cream shadow-soft" : "text-ink/55 hover:bg-parchment"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="max-h-[58vh] overflow-y-auto p-4 lg:max-h-[calc(100vh-190px)]">
            {tab === "text" ? (
              <>
                {!sel ? (
                  <p className="mb-3 rounded-xl bg-blush/50 p-3 text-[12.5px] leading-5 text-ink/60">
                    Card par kisi bhi line par tap kijiye — ya neeche list se chuniye. Phir use
                    drag karke kahin bhi rakh dijiye.
                  </p>
                ) : null}

                <div className="space-y-1">
                  {design.fields.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => { setSelId(f.id); setTimeout(() => textRef.current?.focus(), 30); }}
                      className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition ${
                        f.id === selId ? "bg-blush" : "hover:bg-parchment"
                      }`}
                    >
                      <span className="w-[86px] shrink-0 truncate text-[10px] font-semibold uppercase tracking-wider text-ink/40">
                        {f.label}
                      </span>
                      <span className="truncate text-[13px] text-ink/80">
                        {f.type === "image" ? (f.src ? "Photo ✓" : "Photo (khali)") : f.text?.replace(/\n/g, " ") || "—"}
                      </span>
                    </button>
                  ))}
                </div>

                {sel ? (
                  <div className="mt-4 space-y-4 border-t border-moss/15 pt-4">
                    {sel.type === "text" ? (
                      <div>
                        <label className="label" htmlFor="fld-text">{sel.label}</label>
                        <textarea
                          id="fld-text"
                          ref={textRef}
                          value={sel.text || ""}
                          onChange={(e) => patchField(sel.id, { text: e.target.value })}
                          rows={Math.min(5, (sel.text?.split("\n").length || 1) + 1)}
                          className="input resize-y leading-6"
                        />
                        <p className="mt-1 text-[11px] text-ink/35">Enter dabaiye nayi line ke liye</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button onClick={() => fileRef.current?.click()} className="btn-ghost w-full justify-center">
                          {sel.src ? "Photo badlein" : "Photo upload karein"}
                        </button>
                        {sel.src ? (
                          <button onClick={() => patchField(sel.id, { src: undefined }, true)} className="btn-chip w-full justify-center">
                            Photo hatayein
                          </button>
                        ) : null}
                        <div>
                          <span className="label">Shape</span>
                          <div className="flex gap-1.5">
                            {(["circle", "rounded", "arch"] as const).map((s) => (
                              <button
                                key={s}
                                onClick={() => patchField(sel.id, { shape: s }, true)}
                                className={`flex-1 rounded-xl border px-2 py-1.5 text-xs capitalize transition ${
                                  sel.shape === s ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {sel.type === "text" ? (
                      <>
                        <div>
                          <label className="label" htmlFor="fld-font">Font</label>
                          <select
                            id="fld-font"
                            value={sel.font || "inter"}
                            onChange={(e) => patchField(sel.id, { font: e.target.value as FontKey }, true)}
                            className="input"
                          >
                            {FONT_GROUPS.map((g) => (
                              <optgroup key={g.label} label={g.label}>
                                {g.keys.map((k) => (
                                  <option key={k} value={k}>{FONTS[k].label}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="label mb-0">Size</span>
                            <span className="text-[11px] text-ink/40">{sel.size}px</span>
                          </div>
                          <input
                            type="range" min={10} max={180} value={sel.size ?? 28}
                            onChange={(e) => patchField(sel.id, { size: Number(e.target.value) })}
                            className="mt-2 w-full"
                          />
                        </div>

                        <div>
                          <span className="label">Colour</span>
                          <div className="flex items-center gap-2">
                            <Swatch token="ink" label="Ink" />
                            <Swatch token="accent" label="Accent" />
                            <Swatch token="gold" label="Gold" />
                            <Swatch token="soft" label="Soft" />
                            <label className="ml-1 flex cursor-pointer items-center gap-1.5 text-[11px] text-ink/50">
                              <input
                                type="color"
                                value={resolveColor(p, sel.color)}
                                onChange={(e) => patchField(sel.id, { color: e.target.value }, true)}
                                className="h-7 w-9 cursor-pointer rounded border border-moss/25 bg-parchment p-0.5"
                                aria-label="Custom colour"
                              />
                              custom
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="label">Align</span>
                            <div className="flex gap-1">
                              {(["left", "center", "right"] as const).map((a) => (
                                <button
                                  key={a}
                                  onClick={() => patchField(sel.id, { align: a }, true)}
                                  className={`flex-1 rounded-lg border py-1.5 text-xs transition ${
                                    sel.align === a ? "border-sage bg-sage/15" : "border-moss/25 text-ink/55"
                                  }`}
                                  title={a}
                                >
                                  {a === "left" ? "⬅" : a === "center" ? "↔" : "➡"}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="label">Style</span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => patchField(sel.id, { weight: (sel.weight ?? 400) >= 600 ? 400 : 700 }, true)}
                                className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition ${
                                  (sel.weight ?? 400) >= 600 ? "border-sage bg-sage/15" : "border-moss/25 text-ink/55"
                                }`}
                              >B</button>
                              <button
                                onClick={() => patchField(sel.id, { italic: !sel.italic }, true)}
                                className={`flex-1 rounded-lg border py-1.5 text-xs italic transition ${
                                  sel.italic ? "border-sage bg-sage/15" : "border-moss/25 text-ink/55"
                                }`}
                              >I</button>
                              <button
                                onClick={() => patchField(sel.id, { caps: !sel.caps }, true)}
                                className={`flex-1 rounded-lg border py-1.5 text-[10px] font-semibold transition ${
                                  sel.caps ? "border-sage bg-sage/15" : "border-moss/25 text-ink/55"
                                }`}
                              >AA</button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="label mb-0">Spacing</span>
                              <span className="text-[11px] text-ink/40">{sel.tracking ?? 0}</span>
                            </div>
                            <input
                              type="range" min={-10} max={60} value={sel.tracking ?? 0}
                              onChange={(e) => patchField(sel.id, { tracking: Number(e.target.value) })}
                              className="mt-2 w-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="label mb-0">Line gap</span>
                              <span className="text-[11px] text-ink/40">{(sel.lineHeight ?? 1.4).toFixed(2)}</span>
                            </div>
                            <input
                              type="range" min={90} max={230} value={Math.round((sel.lineHeight ?? 1.4) * 100)}
                              onChange={(e) => patchField(sel.id, { lineHeight: Number(e.target.value) / 100 })}
                              className="mt-2 w-full"
                            />
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="flex flex-wrap gap-1.5 border-t border-moss/15 pt-3">
                      <button
                        onClick={() => patchField(sel.id, { x: Math.round((CARD_W - sel.w) / 2) }, true)}
                        className="btn-chip"
                      >Centre</button>
                      <button onClick={duplicate} className="btn-chip">Duplicate</button>
                      <button onClick={() => moveLayer(1)} className="btn-chip">Front</button>
                      <button onClick={() => moveLayer(-1)} className="btn-chip">Back</button>
                      <button
                        onClick={() => {
                          mutate((d) => { d.fields = d.fields.filter((x) => x.id !== sel.id); }, true);
                          setSelId(null);
                        }}
                        className="btn-chip !text-[#a05046] hover:!border-[#a05046]/40"
                      >Delete</button>
                    </div>
                  </div>
                ) : null}
              </>
            ) : null}

            {tab === "design" ? (
              <div className="space-y-5">
                <div>
                  <span className="label">Colour theme</span>
                  <div className="grid grid-cols-4 gap-2">
                    {PALETTES.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => mutate((d) => { d.palette = q; }, true)}
                        title={q.label}
                        className={`rounded-xl border-2 p-1.5 transition ${
                          p.id === q.id ? "border-sage" : "border-transparent hover:border-moss/25"
                        }`}
                      >
                        <span className="flex overflow-hidden rounded-lg">
                          <span className="h-7 flex-1" style={{ background: q.bg2 }} />
                          <span className="h-7 flex-1" style={{ background: q.accent }} />
                          <span className="h-7 flex-1" style={{ background: q.gold }} />
                        </span>
                        <span className="mt-1 block truncate text-[9.5px] text-ink/50">{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="label">Border style</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {FRAME_LIST.map((f) => (
                      <button
                        key={f.key}
                        onClick={() => mutate((d) => { d.frame = f.key; }, true)}
                        className={`rounded-xl border px-1 py-2 text-[11px] transition ${
                          design.frame === f.key ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60 hover:bg-parchment"
                        }`}
                      >{f.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="label">Top symbol</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {MOTIF_LIST.map((m) => (
                      <button
                        key={m.key}
                        onClick={() => mutate((d) => { d.motif = m.key; }, true)}
                        className={`rounded-xl border px-1 py-2 text-[11px] transition ${
                          design.motif === m.key ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60 hover:bg-parchment"
                        }`}
                      >{m.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="label">Background texture</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {TEXTURES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => mutate((d) => { d.texture = t.key; }, true)}
                        className={`rounded-xl border px-1 py-2 text-[11px] transition ${
                          design.texture === t.key ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60 hover:bg-parchment"
                        }`}
                      >{t.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {tab === "add" ? (
              <div className="space-y-3">
                <button onClick={addText} className="btn-ghost w-full justify-center py-3">
                  ✍️ Nayi text line jodein
                </button>
                <button onClick={() => fileRef.current?.click()} className="btn-ghost w-full justify-center py-3">
                  🖼️ Couple photo upload karein
                </button>
                <p className="rounded-xl bg-blush/50 p-3 text-[12px] leading-5 text-ink/60">
                  Photo sirf aapke browser mein rehti hai — hamare server par kuch upload nahi hota.
                </p>
                <div className="border-t border-moss/15 pt-3">
                  <button onClick={resetAll} className="btn-chip w-full justify-center">
                    ↺ Template original par reset karein
                  </button>
                </div>
                <div className="border-t border-moss/15 pt-3">
                  <p className="label">Shortcuts</p>
                  <ul className="space-y-1 text-[12px] text-ink/55">
                    <li>Drag — kisi bhi line ko hilayein</li>
                    <li>Arrow keys — thoda thoda khiskayein</li>
                    <li>Ctrl + Z / Ctrl + Shift + Z — undo / redo</li>
                    <li>Delete — selected line hataayein</li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-moss/15 bg-parchment/60 p-3">
            <button onClick={() => setDonate(true)} className="w-full text-center text-[12px] text-ink/45 hover:text-moss">
              Website pasand aayi? ₹50 ka chhota support 🙏
            </button>
          </div>
        </aside>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />

      {toast ? (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream shadow-lift">
          {toast}
        </div>
      ) : null}

      <DonateModal open={donate} onClose={() => setDonate(false)} />
    </div>
  );
}
