"use client";

import { buildFontEmbedCss } from "./fontEmbed";
import type { FontKey } from "./fonts";
import { CARD_H, CARD_W } from "./templates";

export interface ExportOpts {
  bg: string;
  fonts: FontKey[];
  pixelRatio?: number;
}

async function rasterise(node: HTMLElement, o: ExportOpts) {
  const { toPng } = await import("html-to-image");

  // make sure every web font has actually arrived before we paint
  if (typeof document !== "undefined" && (document as any).fonts?.ready) {
    try {
      await (document as any).fonts.ready;
    } catch {}
  }

  const fontEmbedCSS = await buildFontEmbedCss(o.fonts);

  return toPng(node, {
    pixelRatio: o.pixelRatio ?? 2,
    backgroundColor: o.bg,
    cacheBust: true,
    width: CARD_W,
    height: CARD_H,
    fontEmbedCSS,
    style: { transform: "none", transformOrigin: "top left", margin: "0" },
  });
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const withExt = (name: string, ext: string) =>
  name.endsWith(`.${ext}`) ? name : `${name}.${ext}`;

export async function downloadPng(node: HTMLElement, filename: string, o: ExportOpts) {
  const url = await rasterise(node, o);
  triggerDownload(url, withExt(filename, "png"));
}

export async function downloadPdf(node: HTMLElement, filename: string, o: ExportOpts) {
  const url = await rasterise(node, o);
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [CARD_W, CARD_H],
    compress: true,
  });
  pdf.addImage(url, "PNG", 0, 0, CARD_W, CARD_H, undefined, "FAST");
  pdf.save(withExt(filename, "pdf"));
}

export async function shareCard(
  node: HTMLElement, filename: string, text: string, o: ExportOpts
) {
  const url = await rasterise(node, o);
  const blob = await (await fetch(url)).blob();
  const file = new File([blob], withExt(filename, "png"), { type: "image/png" });
  const nav = navigator as any;
  if (nav.canShare?.({ files: [file] })) {
    await nav.share({ files: [file], title: "Our wedding invitation", text });
    return "shared";
  }
  triggerDownload(url, withExt(filename, "png"));
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  return "downloaded";
}
