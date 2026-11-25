"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CardArt from "./CardArt";
import DonateModal from "./DonateModal";
import { FONTS, FontKey } from "@/lib/fonts";
import {
  CARD_H, CARD_W, CardDesign, CardField, FrameKey, MotifKey,
  PALETTES, resolveColor,
} from "@/lib/templates";
import {
  MOTIONS, Motion, VIDEO_H, VIDEO_W, VideoTemplate,
} from "@/lib/videoTemplates";
import {
  Assets, CARD_SCALE, cameraAt, canRecord, downloadBlob, drawFrame, fieldRect,
  loadImage, rasteriseArt, recordCanvas,
} from "@/lib/videoRender";

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const FRAME_LIST: FrameKey[] = ["mandala", "arch", "wreath", "minimal", "corners", "temple", "ring", "paisley"];
const MOTIF_LIST: { key: MotifKey; label: string }[] = [
  { key: "om", label: "Om" }, { key: "kalash", label: "Kalash" }, { key: "lotus", label: "Lotus" },
  { key: "bismillah", label: "Crescent" }, { key: "cross", label: "Cross" }, { key: "khanda", label: "Khanda" },
  { key: "chakra", label: "Chakra" }, { key: "jain", label: "Ahimsa" }, { key: "dove", label: "Dove" },
  { key: "rings", label: "Rings" }, { key: "heart", label: "Heart" }, { key: "none", label: "None" },
];
const FONT_GROUPS: { label: string; keys: FontKey[] }[] = [
  { label: "Serif & display", keys: ["playfair", "cormorant", "marcellus", "cinzel", "italiana", "lora"] },
  { label: "Calligraphy", keys: ["greatvibes", "dancing", "parisienne"] },
  { label: "Hindi / Punjabi", keys: ["tiro", "mukta", "rozha"] },
  { label: "Urdu / Arabic", keys: ["nastaliq", "amiri"] },
  { label: "Sans", keys: ["inter"] },
];

type Tab = "text" | "motion" | "design";

export default function VideoEditor({ template }: { template: VideoTemplate }) {
  const storeKey = `scs-vdraft-${template.slug}`;
  const [design, setDesign] = useState<CardDesign>(() => clone(template.design));
  const [motion, setMotion] = useState<Motion>(template.motion);
  const [selId, setSelId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("text");
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [donate, setDonate] = useState(false);
  const [artReady, setArtReady] = useState(false);
  const [musicName, setMusicName] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const [disp, setDisp] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artNodeRef = useRef<HTMLDivElement>(null);
  const assets = useRef<Assets>({ art: null, photo: null });
  const musicUrl = useRef<string | null>(null);
  const photoFile = useRef<HTMLInputElement>(null);
  const musicFile = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const recordingRef = useRef(false);

  const pal = design.palette;
  const sel = design.fields.find((f) => f.id === selId) || null;
  const recordable = useMemo(() => canRecord(), []);

  /* ---------- draft ---------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const s = JSON.parse(raw);
        if (s?.design?.fields?.length) {
          setDesign(s.design);
          if (s.motionKey) {
            const m = MOTIONS.find((x) => x.key === s.motionKey);
            if (m) setMotion(m);
          }
          setRestored(true);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(storeKey, JSON.stringify({ design, motionKey: motion.key }));
      } catch {}
    }, 500);
    return () => clearTimeout(id);
  }, [design, motion, storeKey]);

  /* ---------- rasterise the ornament layer whenever the look changes ---------- */
  const artKey = `${pal.id}|${design.frame}|${design.motif}|${design.texture}`;
  useEffect(() => {
    let alive = true;
    setArtReady(false);
    const id = setTimeout(async () => {
      if (!artNodeRef.current) return;
      try {
        const img = await rasteriseArt(artNodeRef.current, design);
        if (!alive) return;
        assets.current.art = img;
      } catch {
        assets.current.art = null;
      }
      if (alive) setArtReady(true);
    }, 180);
    return () => {
      alive = false;
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artKey]);

  /* ---------- keep the hit-test overlay the same size as the painted canvas ---------- */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const measure = () => setDisp({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---------- the one draw call ---------- */
  const paint = useCallback(
    (at: number) => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      drawFrame(ctx, design, motion, assets.current, at);
    },
    [design, motion]
  );

  /* ---------- preview loop ---------- */
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!playing || recordingRef.current) {
      paint(t);
      return;
    }
    startRef.current = performance.now() - t * motion.duration * 1000;
    const loop = () => {
      const el = (performance.now() - startRef.current) / 1000;
      let nt = el / motion.duration;
      if (nt >= 1) {
        nt = nt % 1;
        startRef.current = performance.now();
      }
      setT(nt);
      paint(nt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, paint, motion.duration, artReady]);

  /* ---------- dragging on the canvas ---------- */
  /** display px per card unit, including the clip's camera move */
  const unitPx = (at: number) => (disp.w / VIDEO_W) * CARD_SCALE * cameraAt(motion, at).scale;

  const startDrag = (e: React.PointerEvent, f: CardField, mode: "move" | "width" | "size") => {
    e.preventDefault();
    e.stopPropagation();
    setSelId(f.id);
    // edit against the finished frame, where every line is in its final place
    setPlaying(false);
    setT(1);
    paint(1);

    const unit = unitPx(1);
    const sx = e.clientX, sy = e.clientY;
    const ox = f.x, oy = f.y, ow = f.w, os = f.size ?? 28, oh = f.h ?? f.w;

    const move = (ev: PointerEvent) => {
      const dx = (ev.clientX - sx) / unit;
      const dy = (ev.clientY - sy) / unit;
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
          if (mode === "width") return { ...fl, w: Math.round(clamp(ow + dx, 60, CARD_W + 80)) };
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

  /* ---------- keyboard nudge ---------- */
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const tag = (ev.target as HTMLElement)?.tagName || "";
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      if (!selId || busy) return;
      const f = design.fields.find((x) => x.id === selId);
      if (!f) return;
      const step = ev.shiftKey ? 20 : 4;
      const set = (p: Partial<CardField>) => {
        ev.preventDefault();
        setPlaying(false);
        setT(1);
        setDesign((d) => ({ ...d, fields: d.fields.map((x) => (x.id === selId ? { ...x, ...p } : x)) }));
      };
      if (ev.key === "ArrowLeft") set({ x: f.x - step });
      else if (ev.key === "ArrowRight") set({ x: f.x + step });
      else if (ev.key === "ArrowUp") set({ y: f.y - step });
      else if (ev.key === "ArrowDown") set({ y: f.y + step });
      else if (ev.key === "Delete" || ev.key === "Backspace") {
        ev.preventDefault();
        setDesign((d) => ({ ...d, fields: d.fields.filter((x) => x.id !== selId) }));
        setSelId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selId, design.fields, busy]);

  /* ---------- editing ---------- */
  const patch = (id: string, p: Partial<CardField>) =>
    setDesign((d) => ({
      ...d,
      fields: d.fields.map((f) => (f.id === id ? { ...f, ...p } : f)),
    }));

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { setToast("Photo 8MB se chhoti honi chahiye"); return; }
    const fr = new FileReader();
    fr.onload = async () => {
      const src = String(fr.result);
      try {
        assets.current.photo = await loadImage(src);
      } catch {}
      setDesign((d) => {
        const has = d.fields.some((f) => f.type === "image");
        if (has) {
          return { ...d, fields: d.fields.map((f) => (f.type === "image" ? { ...f, src } : f)) };
        }
        return {
          ...d,
          fields: [
            { id: `img${Date.now().toString(36)}`, type: "image", label: "Photo", src,
              x: 350, y: 180, w: 300, h: 300, align: "center", shape: "circle" },
            ...d.fields,
          ],
        };
      });
      setToast("Photo lag gayi ✓");
      setTimeout(() => setToast(null), 1800);
    };
    fr.readAsDataURL(file);
  };

  const onMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) { setToast("Music file 15MB se chhoti honi chahiye"); return; }
    if (musicUrl.current) URL.revokeObjectURL(musicUrl.current);
    musicUrl.current = URL.createObjectURL(file);
    setMusicName(file.name);
    setToast("Music jud gaya ✓");
    setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => () => {
    if (musicUrl.current) URL.revokeObjectURL(musicUrl.current);
  }, []);

  const reset = () => {
    setDesign(clone(template.design));
    setMotion(template.motion);
    setSelId(null);
    setRestored(false);
    setT(0);
    setToast("Template reset ho gaya");
    setTimeout(() => setToast(null), 1600);
  };

  /* ---------- export ---------- */
  const fileName = useMemo(() => {
    const n1 = design.fields.find((f) => f.id === "n1")?.text || "wedding";
    const n2 = design.fields.find((f) => f.id === "n2")?.text || "invite";
    return `${n1}-${n2}-invitation-video`
      .replace(/[^\p{L}\p{N}-]+/gu, "-").replace(/-+/g, "-").toLowerCase();
  }, [design.fields]);

  const makeVideo = async () => {
    const c = canvasRef.current;
    if (!c || busy) return;
    if (!recordable) {
      setToast("Is browser mein video record nahi ho sakta — Chrome try kijiye");
      setTimeout(() => setToast(null), 3500);
      return;
    }
    setBusy(true);
    setPlaying(false);
    recordingRef.current = true;
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    try {
      const { blob, ext } = await recordCanvas(c, motion.duration, (nt) => paint(nt), {
        fps: 30,
        onProgress: (p) => setProgress(p),
        musicUrl: musicUrl.current,
      });
      downloadBlob(blob, `${fileName}.${ext}`);
      setToast(`Video save ho gaya ✓ (${ext.toUpperCase()}, ${Math.round(blob.size / 1024 / 1024 * 10) / 10} MB)`);
      try {
        const n = Number(localStorage.getItem("scs-downloads") || "0") + 1;
        localStorage.setItem("scs-downloads", String(n));
      } catch {}
      setTimeout(() => setDonate(true), 800);
    } catch (err) {
      console.error(err);
      setToast("Video banane mein dikkat aayi — dobara try kijiye");
    } finally {
      recordingRef.current = false;
      setBusy(false);
      setProgress(0);
      setT(0);
      setPlaying(true);
      setTimeout(() => setToast(null), 3200);
    }
  };

  const seconds = (t * motion.duration).toFixed(1);
  const cam = cameraAt(motion, t);

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* hidden artboard — only the ornament layer, rasterised for the canvas */}
      <div
        aria-hidden
        style={{ position: "fixed", left: -99999, top: 0, width: CARD_W, height: CARD_H, pointerEvents: "none" }}
      >
        <div ref={artNodeRef} style={{ position: "relative", width: CARD_W, height: CARD_H, background: pal.bg }}>
          <CardArt frame={design.frame} motif={design.motif} texture={design.texture} p={pal} uid="vid" />
        </div>
      </div>

      {/* toolbar */}
      <div className="no-print sticky top-[60px] z-20 border-b border-moss/15 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2 px-3 py-2">
          <Link href={`/videos/${template.slug}`} className="btn-chip">← Back</Link>
          <span className="hidden truncate text-sm font-semibold text-ink sm:block">{template.name}</span>
          <span className="btn-chip !border-rose/30 !bg-rose/10">🎬 Video</span>

          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={() => { setT(0); setPlaying(true); }} className="btn-chip" title="Replay">↺</button>
            <button onClick={() => setPlaying((v) => !v)} className="btn-ghost" disabled={busy}>
              {playing ? "Pause" : "Play"}
            </button>
            <Link href={`/editor/${template.cardSlug}`} className="btn-ghost hidden sm:inline-flex">
              Card version
            </Link>
            <button onClick={makeVideo} disabled={busy} className="btn-primary">
              {busy ? `Recording ${Math.round(progress * 100)}%` : "Download video"}
            </button>
          </div>
        </div>
        {busy ? (
          <div className="h-1 w-full bg-ink/10">
            <div className="h-full bg-rose transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
        ) : null}
        {restored && !busy ? (
          <div className="border-t border-moss/10 bg-blush/50 px-3 py-1.5 text-center text-[12px] text-ink/60">
            Pichla draft load kar diya.{" "}
            <button onClick={reset} className="font-semibold text-moss underline">Fresh template</button>
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-3 p-3 lg:flex-row">
        {/* stage */}
        <div className="relative flex min-h-[52vh] flex-1 flex-col items-center justify-start gap-3 overflow-auto rounded-lg border border-moss/15 bg-[linear-gradient(135deg,#e7e0c8_25%,transparent_25%,transparent_50%,#e7e0c8_50%,#e7e0c8_75%,transparent_75%,transparent)] bg-[length:18px_18px] p-4">
          <div className="relative" style={{ lineHeight: 0 }}>
            <canvas
              ref={canvasRef}
              width={VIDEO_W}
              height={VIDEO_H}
              className="max-h-[66vh] w-auto rounded-2xl shadow-lift"
              style={{ aspectRatio: "9 / 16", background: pal.bg }}
            />

            {/* hit-test layer: the canvas paints pixels, so the handles live up here */}
            {!busy && disp.w > 0 ? (
              <div
                className="absolute left-0 top-0"
                style={{
                  width: disp.w,
                  height: disp.h,
                  transform: `translateY(${cam.y * (disp.w / VIDEO_W)}px) scale(${cam.scale})`,
                  transformOrigin: "center center",
                }}
                onPointerDown={() => setSelId(null)}
              >
                {design.fields.map((f) => {
                  const r = fieldRect(f);
                  const k = disp.w / VIDEO_W;
                  const on = f.id === selId;
                  return (
                    <div
                      key={f.id}
                      style={{
                        position: "absolute",
                        left: r.x * k,
                        top: r.y * k,
                        width: Math.max(r.w * k, 12),
                        height: Math.max(r.h * k, 12),
                        cursor: "move",
                      }}
                      onPointerDown={(e) => startDrag(e, f, "move")}
                      onDoubleClick={() => {
                        setTab("text");
                        setTimeout(() => textRef.current?.focus(), 30);
                      }}
                      title={f.label}
                    >
                      <div
                        className="pointer-events-none absolute -inset-[5px] rounded-sm transition-colors"
                        style={{
                          border: on ? "2px solid #55673f" : "2px solid transparent",
                          background: on ? "rgba(125,146,115,0.14)" : "transparent",
                        }}
                      />
                      {on ? (
                        <>
                          <span
                            className="handle"
                            style={{ right: -11, top: "50%", marginTop: -7, cursor: "ew-resize" }}
                            onPointerDown={(e) => startDrag(e, f, "width")}
                            title="Width"
                          />
                          <span
                            className="handle"
                            style={{ right: -11, bottom: -11, cursor: "nwse-resize" }}
                            onPointerDown={(e) => startDrag(e, f, "size")}
                            title={f.type === "image" ? "Photo size" : "Font size"}
                          />
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="flex w-full max-w-[320px] items-center gap-2">
            <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-ink/45">{seconds}s</span>
            <input
              type="range" min={0} max={1000} value={Math.round(t * 1000)}
              onChange={(e) => { setPlaying(false); const v = Number(e.target.value) / 1000; setT(v); paint(v); }}
              className="w-full" aria-label="Scrub the clip" disabled={busy}
            />
            <span className="w-10 shrink-0 text-[11px] tabular-nums text-ink/45">{motion.duration}s</span>
          </div>
          <p className="max-w-[340px] text-center text-[11px] leading-5 text-ink/45">
            Canvas par kisi bhi line ko tap karke drag kijiye — clip ruk kar aakhri frame par
            chala jayega. Right handle se width, neeche wale se font size. Arrow keys se thoda
            thoda khiskaiye.
          </p>
          <p className="text-[11px] text-ink/40">
            1080×1920 · 9:16 — WhatsApp status aur Instagram reel ke liye
          </p>
        </div>

        {/* panel */}
        <aside className="card-surface w-full shrink-0 overflow-hidden lg:w-[370px]">
          <div className="flex border-b border-moss/15 bg-parchment/50 p-1.5">
            {([["text", "✍️ Text"], ["motion", "🎬 Motion"], ["design", "🎨 Design"]] as [Tab, string][]).map(
              ([k, label]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`flex-1 rounded-xl px-2 py-2 text-[13px] font-semibold transition ${
                    tab === k ? "bg-ink text-cream shadow-soft" : "text-ink/55 hover:bg-parchment"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          <div className="max-h-[58vh] overflow-y-auto p-4 lg:max-h-[calc(100vh-190px)]">
            {tab === "text" ? (
              <>
                <div className="space-y-1">
                  {design.fields.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => { setSelId(f.id); setTimeout(() => textRef.current?.focus(), 30); }}
                      className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition ${
                        f.id === selId ? "bg-blush" : "hover:bg-parchment"
                      }`}
                    >
                      <span className="w-[82px] shrink-0 truncate text-[10px] font-semibold uppercase tracking-wider text-ink/40">
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
                      <>
                        <div>
                          <label className="label" htmlFor="v-text">{sel.label}</label>
                          <textarea
                            id="v-text" ref={textRef} value={sel.text || ""}
                            onChange={(e) => patch(sel.id, { text: e.target.value })}
                            rows={Math.min(5, (sel.text?.split("\n").length || 1) + 1)}
                            className="input resize-y leading-6"
                          />
                        </div>
                        <div>
                          <label className="label" htmlFor="v-font">Font</label>
                          <select
                            id="v-font" value={sel.font || "inter"}
                            onChange={(e) => patch(sel.id, { font: e.target.value as FontKey })}
                            className="input"
                          >
                            {FONT_GROUPS.map((g) => (
                              <optgroup key={g.label} label={g.label}>
                                {g.keys.map((k) => <option key={k} value={k}>{FONTS[k].label}</option>)}
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
                            onChange={(e) => patch(sel.id, { size: Number(e.target.value) })}
                            className="mt-2 w-full"
                          />
                        </div>
                        <div>
                          <span className="label">Colour</span>
                          <div className="flex items-center gap-2">
                            {(["ink", "accent", "gold", "soft"] as const).map((tok) => (
                              <button
                                key={tok} title={tok}
                                onClick={() => patch(sel.id, { color: tok })}
                                className={`h-7 w-7 rounded-full border-2 transition ${
                                  sel.color === tok ? "border-ink scale-110" : "border-white/80"
                                }`}
                                style={{ background: resolveColor(pal, tok) }}
                              />
                            ))}
                            <input
                              type="color" value={resolveColor(pal, sel.color)}
                              onChange={(e) => patch(sel.id, { color: e.target.value })}
                              className="ml-1 h-7 w-9 cursor-pointer rounded border border-moss/25 bg-parchment p-0.5"
                              aria-label="Custom colour"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <button onClick={() => photoFile.current?.click()} className="btn-ghost w-full justify-center">
                          {sel.src ? "Photo badlein" : "Photo upload karein"}
                        </button>
                        <div className="flex gap-1.5">
                          {(["circle", "rounded", "arch"] as const).map((s) => (
                            <button
                              key={s} onClick={() => patch(sel.id, { shape: s })}
                              className={`flex-1 rounded-xl border px-2 py-1.5 text-xs capitalize transition ${
                                sel.shape === s ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60"
                              }`}
                            >{s}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="label">Position</span>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => patch(sel.id, { x: sel.x - 16 })} className="btn-chip">◀</button>
                        <button onClick={() => patch(sel.id, { y: sel.y - 16 })} className="btn-chip">▲</button>
                        <button onClick={() => patch(sel.id, { y: sel.y + 16 })} className="btn-chip">▼</button>
                        <button onClick={() => patch(sel.id, { x: sel.x + 16 })} className="btn-chip">▶</button>
                        <button
                          onClick={() => patch(sel.id, { x: Math.round((CARD_W - sel.w) / 2) })}
                          className="btn-chip"
                        >Centre</button>
                      </div>
                      <p className="mt-1.5 text-[11px] text-ink/35">
                        Zyada barik layout ke liye{" "}
                        <Link href={`/editor/${template.cardSlug}`} className="text-moss underline">
                          card editor
                        </Link>{" "}
                        use kijiye.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setDesign((d) => ({ ...d, fields: d.fields.filter((f) => f.id !== sel.id) }));
                        setSelId(null);
                      }}
                      className="btn-chip !text-[#a05046] hover:!border-[#a05046]/40"
                    >Delete line</button>
                  </div>
                ) : (
                  <p className="mt-3 rounded-xl bg-blush/50 p-3 text-[12.5px] leading-5 text-ink/60">
                    Upar list se koi line chuniye aur apne hisaab se likhiye. Har change preview mein
                    turant dikh jata hai.
                  </p>
                )}
              </>
            ) : null}

            {tab === "motion" ? (
              <div className="space-y-4">
                <div>
                  <span className="label">Animation style</span>
                  <div className="space-y-1.5">
                    {MOTIONS.map((m) => (
                      <button
                        key={m.key}
                        onClick={() => { setMotion(m); setT(0); setPlaying(true); }}
                        className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
                          motion.key === m.key ? "border-sage bg-sage/15" : "border-moss/18 hover:bg-parchment"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-[13.5px] font-semibold text-ink">{m.label}</span>
                          <span className="text-[11px] text-ink/40">{m.duration}s</span>
                        </span>
                        <span className="mt-0.5 block text-[11.5px] leading-5 text-ink/55">{m.blurb}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-moss/15 pt-4">
                  <span className="label">Music (optional)</span>
                  <button onClick={() => musicFile.current?.click()} className="btn-ghost w-full justify-center">
                    {musicName ? "Music badlein" : "🎵 Apna music jodiye"}
                  </button>
                  {musicName ? (
                    <p className="mt-2 flex items-center justify-between gap-2 text-[11.5px] text-ink/55">
                      <span className="truncate">{musicName}</span>
                      <button
                        onClick={() => {
                          if (musicUrl.current) URL.revokeObjectURL(musicUrl.current);
                          musicUrl.current = null;
                          setMusicName(null);
                        }}
                        className="shrink-0 text-moss underline"
                      >hatao</button>
                    </p>
                  ) : (
                    <p className="mt-2 text-[11.5px] leading-5 text-ink/45">
                      Apni mp3 chuniye — woh video ke saath record ho jayegi. File aapke device se
                      bahar nahi jaati. Sirf wahi music use kijiye jiske aapke paas rights hain.
                    </p>
                  )}
                </div>

                <div className="border-t border-moss/15 pt-4">
                  <button onClick={reset} className="btn-chip w-full justify-center">
                    ↺ Template original par reset karein
                  </button>
                </div>
              </div>
            ) : null}

            {tab === "design" ? (
              <div className="space-y-5">
                <div>
                  <span className="label">Colour theme</span>
                  <div className="grid grid-cols-4 gap-2">
                    {PALETTES.map((q) => (
                      <button
                        key={q.id} title={q.label}
                        onClick={() => setDesign((d) => ({ ...d, palette: q }))}
                        className={`rounded-xl border-2 p-1.5 transition ${
                          pal.id === q.id ? "border-sage" : "border-transparent hover:border-moss/25"
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
                        key={f} onClick={() => setDesign((d) => ({ ...d, frame: f }))}
                        className={`rounded-xl border px-1 py-2 text-[11px] capitalize transition ${
                          design.frame === f ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60 hover:bg-parchment"
                        }`}
                      >{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="label">Top symbol</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {MOTIF_LIST.map((m) => (
                      <button
                        key={m.key} onClick={() => setDesign((d) => ({ ...d, motif: m.key }))}
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
                    {(["none", "rays", "dots", "paper"] as const).map((x) => (
                      <button
                        key={x} onClick={() => setDesign((d) => ({ ...d, texture: x }))}
                        className={`rounded-xl border px-1 py-2 text-[11px] capitalize transition ${
                          design.texture === x ? "border-sage bg-sage/15 text-ink" : "border-moss/25 text-ink/60 hover:bg-parchment"
                        }`}
                      >{x === "none" ? "Plain" : x}</button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-moss/15 pt-4">
                  <button onClick={() => photoFile.current?.click()} className="btn-ghost w-full justify-center">
                    🖼️ Couple photo upload karein
                  </button>
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

      <input ref={photoFile} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
      <input ref={musicFile} type="file" accept="audio/*" onChange={onMusic} className="hidden" />

      {toast ? (
        <div className="fixed bottom-20 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-center text-sm font-medium text-cream shadow-lift">
          {toast}
        </div>
      ) : null}

      <DonateModal open={donate} onClose={() => setDonate(false)} />
    </div>
  );
}
