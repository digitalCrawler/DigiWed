"use client";

import { FONTS, FontKey } from "./fonts";
import { buildFontEmbedCss } from "./fontEmbed";
import { CARD_H, CARD_W, CardDesign, CardField, Palette, resolveColor } from "./templates";
import { Motion, VIDEO_H, VIDEO_W } from "./videoTemplates";

/* ------------------------------------------------------------------ *
 * The clip is drawn entirely on a 1080x1920 canvas, so the on-screen
 * preview and the recorded file come from the same code path.
 * The ornamental frame is rasterised once (it is SVG) and then used as a
 * still layer; only the text is animated per frame.
 * ------------------------------------------------------------------ */

export const CARD_MARGIN = 76;
export const CARD_SCALE = (VIDEO_W - CARD_MARGIN * 2) / CARD_W;
export const CARD_X = CARD_MARGIN;
export const CARD_Y = Math.round((VIDEO_H - CARD_H * CARD_SCALE) / 2);

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** tiny deterministic PRNG so overlays look identical on every replay */
const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export interface Assets {
  art: CanvasImageSource | null;
  photo: CanvasImageSource | null;
}

/**
 * The slow move across the whole clip. Exported because the editor's hit-test
 * overlay has to sit exactly where the renderer paints, so both read it from here.
 * Equivalent to: scale about the canvas centre, then shift down by `y`.
 */
export function cameraAt(motion: Motion, t: number): { scale: number; y: number } {
  if (motion.camera === "zoom-in") return { scale: 1 + 0.055 * easeInOut(t), y: 0 };
  if (motion.camera === "drift") return { scale: 1.02, y: (t - 0.5) * 30 };
  return { scale: 1, y: 0 };
}

/** Where a field's box lands on the 1080x1920 canvas, before the camera. */
export function fieldRect(f: CardField) {
  const text = f.caps ? (f.text ?? "").toUpperCase() : f.text ?? "";
  const lines = text.split("\n").length;
  const size = (f.size ?? 28) * CARD_SCALE;
  const h =
    f.type === "image"
      ? (f.h ?? f.w) * CARD_SCALE
      : lines * (f.lineHeight ?? 1.4) * size;
  return {
    x: CARD_X + f.x * CARD_SCALE,
    y: CARD_Y + f.y * CARD_SCALE,
    w: f.w * CARD_SCALE,
    h,
  };
}

/* ---------------------------- text ---------------------------- */

function drawField(
  ctx: CanvasRenderingContext2D,
  f: CardField,
  pal: Palette,
  progress: number,
  reveal: Motion["reveal"]
) {
  const raw = f.text ?? "";
  const text = f.caps ? raw.toUpperCase() : raw;
  if (!text.trim()) return;

  const lines = text.split("\n");
  const size = (f.size ?? 28) * CARD_SCALE;
  const lh = (f.lineHeight ?? 1.4) * size;
  const fam = FONTS[(f.font ?? "inter") as FontKey]?.css ?? FONTS.inter.css;

  ctx.save();
  ctx.font = `${f.italic ? "italic " : ""}${f.weight ?? 400} ${size}px ${fam}`;
  ctx.fillStyle = resolveColor(pal, f.color);
  ctx.textBaseline = "top";
  ctx.textAlign = f.align === "left" ? "left" : f.align === "right" ? "right" : "center";
  try {
    (ctx as any).letterSpacing = `${((f.tracking ?? 0) / 10) * CARD_SCALE}px`;
  } catch {}
  if (f.rtl) ctx.direction = "rtl";

  const boxX = CARD_X + f.x * CARD_SCALE;
  const boxY = CARD_Y + f.y * CARD_SCALE;
  const boxW = f.w * CARD_SCALE;
  const anchor =
    f.align === "left" ? boxX : f.align === "right" ? boxX + boxW : boxX + boxW / 2;

  const e = easeOut(progress);
  let alpha = e;
  let dx = 0;
  let dy = 0;
  let sc = 1;

  if (reveal === "fade-up") dy = (1 - e) * 34 * CARD_SCALE;
  else if (reveal === "slide-in") dx = (1 - e) * -72 * CARD_SCALE;
  else if (reveal === "scale") sc = 0.86 + 0.14 * e;
  else if (reveal === "wipe-down" || reveal === "type") alpha = progress > 0 ? 1 : 0;

  ctx.globalAlpha = clamp01(alpha);
  ctx.translate(anchor + dx, boxY + dy);
  if (sc !== 1) ctx.scale(sc, sc);

  const totalH = lines.length * lh;
  if (reveal === "wipe-down") {
    ctx.beginPath();
    ctx.rect(-boxW, 0, boxW * 2, totalH * e);
    ctx.clip();
  }

  if (reveal === "type") {
    const budget = Math.ceil(text.length * e);
    let consumed = 0;
    lines.forEach((ln, i) => {
      const take = Math.max(0, Math.min(ln.length, budget - consumed));
      consumed += ln.length + 1;
      if (take > 0) ctx.fillText(ln.slice(0, take), 0, i * lh);
    });
  } else {
    lines.forEach((ln, i) => ctx.fillText(ln, 0, i * lh));
  }

  ctx.restore();
}

function drawPhoto(
  ctx: CanvasRenderingContext2D,
  f: CardField,
  photo: CanvasImageSource,
  progress: number
) {
  const e = easeOut(progress);
  const x = CARD_X + f.x * CARD_SCALE;
  const y = CARD_Y + f.y * CARD_SCALE;
  const w = f.w * CARD_SCALE;
  const h = (f.h ?? f.w) * CARD_SCALE;

  ctx.save();
  ctx.globalAlpha = clamp01(e);
  ctx.translate(x + w / 2, y + h / 2);
  const sc = 0.9 + 0.1 * e;
  ctx.scale(sc, sc);
  ctx.beginPath();
  if (f.shape === "circle") {
    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
  } else {
    const r = f.shape === "arch" ? w / 2 : 18 * CARD_SCALE;
    const rx = -w / 2, ry = -h / 2;
    ctx.moveTo(rx + r, ry);
    ctx.arcTo(rx + w, ry, rx + w, ry + h, r);
    ctx.arcTo(rx + w, ry + h, rx, ry + h, r);
    ctx.arcTo(rx, ry + h, rx, ry, r);
    ctx.arcTo(rx, ry, rx + w, ry, r);
  }
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(photo, -w / 2, -h / 2, w, h);
  ctx.restore();
}

/* --------------------------- overlays --------------------------- */

function drawOverlay(ctx: CanvasRenderingContext2D, kind: Motion["overlay"], pal: Palette, t: number) {
  if (kind === "none") return;
  ctx.save();

  if (kind === "petals") {
    for (let i = 0; i < 20; i++) {
      const speed = 0.5 + rnd(i) * 0.7;
      const phase = rnd(i + 50);
      const y = (((t * speed + phase) % 1) * (VIDEO_H + 300)) - 150;
      const x = rnd(i + 90) * VIDEO_W + Math.sin(t * 6 + i) * 42;
      const s = 9 + rnd(i + 7) * 13;
      ctx.save();
      ctx.globalAlpha = 0.22 + rnd(i + 3) * 0.3;
      ctx.translate(x, y);
      ctx.rotate(t * 6 + i);
      ctx.fillStyle = i % 3 === 0 ? pal.gold : pal.accent;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.55, s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  if (kind === "sparkle") {
    for (let i = 0; i < 46; i++) {
      const x = rnd(i) * VIDEO_W;
      const y = rnd(i + 31) * VIDEO_H;
      const tw = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * (1.5 + rnd(i + 11) * 3) + rnd(i + 5) * 10);
      const s = (1.6 + rnd(i + 17) * 3.4) * tw;
      ctx.globalAlpha = 0.25 + tw * 0.6;
      ctx.fillStyle = pal.gold;
      ctx.beginPath();
      ctx.moveTo(x, y - s * 3);
      ctx.lineTo(x + s, y);
      ctx.lineTo(x, y + s * 3);
      ctx.lineTo(x - s, y);
      ctx.closePath();
      ctx.fill();
    }
  }

  if (kind === "sweep") {
    const sp = clamp01((t - 0.4) / 0.28);
    if (sp > 0 && sp < 1) {
      const cx = -VIDEO_W * 0.6 + sp * VIDEO_W * 2.1;
      const g = ctx.createLinearGradient(cx - 260, 0, cx + 260, VIDEO_H);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,0.3)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalAlpha = Math.sin(sp * Math.PI);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, VIDEO_W, VIDEO_H);
    }
  }

  ctx.restore();
}

/* ---------------------------- frame ---------------------------- */

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  design: CardDesign,
  motion: Motion,
  assets: Assets,
  t: number
) {
  const pal = design.palette;
  ctx.save();
  ctx.clearRect(0, 0, VIDEO_W, VIDEO_H);

  // backdrop
  const bg = ctx.createLinearGradient(0, 0, VIDEO_W * 0.4, VIDEO_H);
  bg.addColorStop(0, pal.bg2);
  bg.addColorStop(0.5, pal.bg);
  bg.addColorStop(1, pal.bg2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, VIDEO_W, VIDEO_H);

  const glow = ctx.createRadialGradient(VIDEO_W / 2, VIDEO_H * 0.3, 60, VIDEO_W / 2, VIDEO_H * 0.3, VIDEO_W);
  glow.addColorStop(0, `${pal.gold}26`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, VIDEO_W, VIDEO_H);

  // camera
  ctx.save();
  const cam = cameraAt(motion, t);
  ctx.translate(VIDEO_W / 2, VIDEO_H / 2 + cam.y);
  ctx.scale(cam.scale, cam.scale);
  ctx.translate(-VIDEO_W / 2, -VIDEO_H / 2);

  // card artwork
  const ap = clamp01(t / 0.17);
  const ae = easeOut(ap);
  const cw = CARD_W * CARD_SCALE;
  const ch = CARD_H * CARD_SCALE;

  ctx.save();
  ctx.globalAlpha = motion.art === "wipe" ? 1 : clamp01(ae);
  ctx.translate(CARD_X + cw / 2, CARD_Y + ch / 2);
  if (motion.art === "scale") ctx.scale(0.9 + 0.1 * ae, 0.9 + 0.1 * ae);
  if (motion.art === "spin") {
    ctx.rotate((1 - ae) * -0.18);
    ctx.scale(0.88 + 0.12 * ae, 0.88 + 0.12 * ae);
  }
  if (motion.art === "wipe") {
    ctx.beginPath();
    ctx.rect(-cw / 2, -ch / 2, cw, ch * ae);
    ctx.clip();
  }
  ctx.shadowColor = "rgba(30,20,16,0.28)";
  ctx.shadowBlur = 48;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = pal.bg;
  ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
  ctx.shadowColor = "transparent";
  if (assets.art) ctx.drawImage(assets.art, -cw / 2, -ch / 2, cw, ch);
  ctx.restore();

  // text + photo, staggered
  const fields = design.fields.filter(
    (f) => f.type === "image" || (f.text ?? "").trim().length > 0
  );
  const T0 = 0.15;
  const T1 = 0.82;
  const n = Math.max(1, fields.length);

  fields.forEach((f, i) => {
    const start = T0 + (T1 - T0) * (i / n) * 0.94;
    const dur = motion.reveal === "type" ? 0.22 : 0.16;
    const p = clamp01((t - start) / dur);
    if (p <= 0) return;
    if (f.type === "image") {
      if (assets.photo) drawPhoto(ctx, f, assets.photo, p);
    } else {
      drawField(ctx, f, pal, p, motion.reveal);
    }
  });

  ctx.restore(); // camera

  drawOverlay(ctx, motion.overlay, pal, t);
  ctx.restore();
}

/* ------------------------- art rasteriser ------------------------- */

/** Turns the SVG ornament layer into a bitmap we can blit each frame. */
export async function rasteriseArt(node: HTMLElement, design: CardDesign): Promise<HTMLImageElement> {
  const { toPng } = await import("html-to-image");
  if ((document as any).fonts?.ready) {
    try {
      await (document as any).fonts.ready;
    } catch {}
  }
  // the Om crest is SVG <text>, so that one family has to travel with the image
  const fontEmbedCSS = design.motif === "om" ? await buildFontEmbedCss(["tiro"]) : "";
  const url = await toPng(node, {
    pixelRatio: 1.4,
    width: CARD_W,
    height: CARD_H,
    backgroundColor: design.palette.bg,
    cacheBust: true,
    fontEmbedCSS,
    style: { transform: "none", transformOrigin: "top left", margin: "0" },
  });
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

/* --------------------------- recording --------------------------- */

const MIME_CANDIDATES = [
  "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
  "video/mp4;codecs=avc1.42E01E",
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

export function pickMime(): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  for (const m of MIME_CANDIDATES) {
    try {
      if (MediaRecorder.isTypeSupported(m)) return m;
    } catch {}
  }
  return null;
}

export function canRecord() {
  return (
    typeof MediaRecorder !== "undefined" &&
    typeof HTMLCanvasElement !== "undefined" &&
    typeof HTMLCanvasElement.prototype.captureStream === "function" &&
    pickMime() !== null
  );
}

export interface RecordResult {
  blob: Blob;
  ext: "mp4" | "webm";
}

export async function recordCanvas(
  canvas: HTMLCanvasElement,
  durationSec: number,
  draw: (t: number) => void,
  opts: { fps?: number; onProgress?: (p: number) => void; musicUrl?: string | null } = {}
): Promise<RecordResult> {
  const mime = pickMime();
  if (!mime) throw new Error("recording-unsupported");
  const fps = opts.fps ?? 30;
  const stream = canvas.captureStream(fps);

  let audioEl: HTMLAudioElement | null = null;
  let audioCtx: AudioContext | null = null;
  if (opts.musicUrl) {
    try {
      audioEl = new Audio(opts.musicUrl);
      audioEl.crossOrigin = "anonymous";
      audioEl.loop = true;
      const AC: typeof AudioContext =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AC();
      const src = audioCtx.createMediaElementSource(audioEl);
      const dest = audioCtx.createMediaStreamDestination();
      src.connect(dest);
      await audioCtx.resume();
      dest.stream.getAudioTracks().forEach((tr) => stream.addTrack(tr));
      audioEl.currentTime = 0;
      await audioEl.play();
    } catch {
      audioEl = null;
    }
  }

  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 5_000_000 });
  const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => {
    if (e.data && e.data.size) chunks.push(e.data);
  };
  const stopped = new Promise<void>((res) => {
    rec.onstop = () => res();
  });

  rec.start(120);
  const t0 = performance.now();
  await new Promise<void>((res) => {
    const loop = () => {
      const elapsed = (performance.now() - t0) / 1000;
      const t = Math.min(1, elapsed / durationSec);
      draw(t);
      opts.onProgress?.(t);
      if (t >= 1) res();
      else requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  await new Promise((r) => setTimeout(r, 220)); // flush the tail frames
  rec.stop();
  await stopped;
  try {
    audioEl?.pause();
    await audioCtx?.close();
  } catch {}

  const type = mime.split(";")[0];
  return { blob: new Blob(chunks, { type }), ext: type.includes("mp4") ? "mp4" : "webm" };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
