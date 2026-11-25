"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CardArt from "./CardArt";
import { CARD_H, CARD_W, CardDesign } from "@/lib/templates";
import { Motion, VIDEO_H, VIDEO_W } from "@/lib/videoTemplates";
import { Assets, drawFrame, rasteriseArt } from "@/lib/videoRender";

/** Read-only looping preview of a clip, drawn by the same renderer as the export. */
export default function VideoPreview({
  design, motion, className = "",
}: { design: CardDesign; motion: Motion; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artNodeRef = useRef<HTMLDivElement>(null);
  const assets = useRef<Assets>({ art: null, photo: null });
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  const paint = useCallback(
    (t: number) => {
      const c = canvasRef.current;
      const ctx = c?.getContext("2d");
      if (!ctx) return;
      drawFrame(ctx, design, motion, assets.current, t);
    },
    [design, motion]
  );

  useEffect(() => {
    let alive = true;
    const id = setTimeout(async () => {
      if (!artNodeRef.current) return;
      try {
        assets.current.art = await rasteriseArt(artNodeRef.current, design);
      } catch {
        assets.current.art = null;
      }
      if (alive) setReady(true);
    }, 120);
    return () => { alive = false; clearTimeout(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!playing) return;
    startRef.current = performance.now();
    const loop = () => {
      const el = (performance.now() - startRef.current) / 1000;
      let t = el / motion.duration;
      if (t >= 1) { t = 0; startRef.current = performance.now(); }
      paint(t);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, paint, motion.duration, ready]);

  return (
    <div className={className}>
      <div
        aria-hidden
        style={{ position: "fixed", left: -99999, top: 0, width: CARD_W, height: CARD_H, pointerEvents: "none" }}
      >
        <div
          ref={artNodeRef}
          style={{ position: "relative", width: CARD_W, height: CARD_H, background: design.palette.bg }}
        >
          <CardArt
            frame={design.frame} motif={design.motif} texture={design.texture}
            p={design.palette} uid="prev"
          />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={VIDEO_W}
        height={VIDEO_H}
        onClick={() => setPlaying((v) => !v)}
        className="w-full cursor-pointer rounded-lg shadow-lift"
        style={{ aspectRatio: "9 / 16", background: design.palette.bg }}
        aria-label={`${motion.label} animation preview — tap to ${playing ? "pause" : "play"}`}
        role="img"
      />
      <p className="mt-2 text-center text-[11.5px] text-ink/40">
        {playing ? "Chal raha hai — rokne ke liye tap kijiye" : "Ruka hua — chalane ke liye tap kijiye"}
        {" · "}1080×1920
      </p>
    </div>
  );
}
