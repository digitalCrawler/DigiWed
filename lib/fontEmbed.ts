"use client";

import { FONTS, FontKey, googleFontsHref } from "./fonts";

/**
 * html-to-image renders into an <img> built from an SVG data URL, and such an
 * image cannot load external resources. So every font the card uses has to be
 * inlined as base64 before we rasterise, or the download comes out in Times.
 *
 * We deliberately embed ONLY the families the card actually uses — letting
 * html-to-image walk the full stylesheet would pull all 15 families (several MB)
 * on every download. The browser also blocks `cssRules` on the cross-origin
 * Google Fonts sheet, so we fetch and parse the CSS ourselves.
 */

const familyCache = new Map<FontKey, string>();
const fileCache = new Map<string, string>();

async function toDataUrl(url: string): Promise<string> {
  const hit = fileCache.get(url);
  if (hit) return hit;
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
  const blob = await res.blob();
  const data: string = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
  fileCache.set(url, data);
  return data;
}

async function familyCss(key: FontKey): Promise<string> {
  const hit = familyCache.get(key);
  if (hit) return hit;

  const res = await fetch(googleFontsHref([key]), { mode: "cors" });
  if (!res.ok) throw new Error(`font css failed: ${res.status}`);
  let css = await res.text();

  const urls = Array.from(
    new Set(
      Array.from(css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)).map((m) => m[1])
    )
  );

  const pairs = await Promise.all(
    urls.map(async (u) => {
      try {
        return [u, await toDataUrl(u)] as const;
      } catch {
        return [u, ""] as const;
      }
    })
  );

  for (const [u, data] of pairs) if (data) css = css.split(u).join(data);
  familyCache.set(key, css);
  return css;
}

/** Returns an @font-face stylesheet with every requested family inlined. */
export async function buildFontEmbedCss(keys: FontKey[]): Promise<string> {
  const wanted = Array.from(new Set(keys)).filter((k): k is FontKey => Boolean(FONTS[k]));
  if (!wanted.length) return "";
  const sheets = await Promise.all(
    wanted.map(async (k) => {
      try {
        return await familyCss(k);
      } catch {
        return "";
      }
    })
  );
  return sheets.filter(Boolean).join("\n");
}
