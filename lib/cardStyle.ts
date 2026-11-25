import type { CSSProperties } from "react";
import { FONTS } from "./fonts";
import { CardField, Palette, resolveColor } from "./templates";

export function fieldBoxStyle(f: CardField): CSSProperties {
  return {
    position: "absolute",
    left: f.x,
    top: f.y,
    width: f.w,
    transform: f.rotate ? `rotate(${f.rotate}deg)` : undefined,
    transformOrigin: "center",
  };
}

export function textStyle(f: CardField, p: Palette): CSSProperties {
  return {
    fontFamily: FONTS[f.font ?? "inter"]?.css ?? FONTS.inter.css,
    fontSize: f.size ?? 28,
    fontWeight: f.weight ?? 400,
    color: resolveColor(p, f.color),
    textAlign: f.align,
    letterSpacing: f.tracking ? `${f.tracking / 10}px` : undefined,
    lineHeight: f.lineHeight ?? 1.4,
    fontStyle: f.italic ? "italic" : undefined,
    textTransform: f.caps ? "uppercase" : undefined,
    opacity: f.opacity ?? 1,
    direction: f.rtl ? "rtl" : undefined,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
  };
}

export function imageStyle(f: CardField): CSSProperties {
  const radius =
    f.shape === "circle" ? "50%" : f.shape === "arch" ? "50% 50% 12px 12px" : "16px";
  return {
    width: f.w,
    height: f.h ?? f.w,
    borderRadius: radius,
    overflow: "hidden",
    display: "block",
  };
}
