import Link from "next/link";
import { CATEGORIES } from "@/lib/templates";
import { VideoTemplate } from "@/lib/videoTemplates";
import CardCanvas from "./CardCanvas";

/**
 * Static 9:16 poster for listings — the card artwork on its backdrop with a
 * play badge. Nothing animates until you open the clip, so a grid of these
 * stays cheap.
 */
export default function VideoPoster({
  v, width = 232, showCategory = true,
}: { v: VideoTemplate; width?: number; showCategory?: boolean }) {
  const cat = CATEGORIES.find((c) => c.slug === v.category);
  const p = v.design.palette;
  const h = Math.round((width * 16) / 9);
  const cardW = Math.round(width * 0.86);

  return (
    <Link href={`/videos/${v.slug}`} className="group block rounded-lg p-2 transition hover:bg-parchment/70">
      <div
        className="relative overflow-hidden rounded-2xl border border-moss/15 shadow-soft transition group-hover:shadow-lift group-hover:-translate-y-0.5"
        style={{
          width, height: h,
          background: `linear-gradient(145deg, ${p.bg2}, ${p.bg} 55%, ${p.bg2})`,
          contentVisibility: "auto",
          containIntrinsicSize: `${width}px ${h}px`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-soft">
          <CardCanvas design={v.design} width={cardW} uid={`vp-${v.id}`} />
        </div>
        <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream">
          {v.motion.duration}s video
        </span>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink/55 text-cream backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-rose">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
            <path d="M1 1.8c0-.8.9-1.3 1.6-.9l9.6 5.4c.7.4.7 1.4 0 1.8l-9.6 5.4c-.7.4-1.6-.1-1.6-.9V1.8Z" />
          </svg>
        </span>
      </div>
      <div className="px-1 pt-2.5" style={{ width }}>
        <h3 className="truncate font-display text-[14.5px] font-semibold text-ink">{v.name}</h3>
        <p className="mt-0.5 truncate text-[11px] text-ink/50">
          {showCategory && cat ? `${cat.emoji} ${cat.name} · ` : ""}
          {v.motion.label}
        </p>
      </div>
    </Link>
  );
}
