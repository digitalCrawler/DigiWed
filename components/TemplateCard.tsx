import Link from "next/link";
import { CATEGORIES, Template } from "@/lib/templates";
import CardCanvas from "./CardCanvas";

export default function TemplateCard({
  t, width = 250, showCategory = true,
}: { t: Template; width?: number; showCategory?: boolean }) {
  const cat = CATEGORIES.find((c) => c.slug === t.category);
  return (
    <Link
      href={`/templates/${t.slug}`}
      className="group block rounded-lg p-2 transition hover:bg-parchment/70"
    >
      <div
        className="overflow-hidden rounded-2xl border border-moss/15 shadow-soft transition group-hover:shadow-lift group-hover:-translate-y-0.5"
        style={{
          // skip painting cards that are far off-screen — 35 inline SVGs per page otherwise
          contentVisibility: "auto",
          containIntrinsicSize: `${width}px ${Math.round((width * 1400) / 1000)}px`,
        }}
      >
        <CardCanvas design={t.design} width={width} uid={t.id} />
      </div>
      <div className="px-1 pt-2.5">
        <h3 className="truncate font-display text-[15px] font-semibold text-ink">{t.name}</h3>
        <p className="mt-0.5 truncate text-[11.5px] text-ink/50">
          {showCategory && cat ? `${cat.emoji} ${cat.name} · ` : ""}
          {t.design.palette.label}
        </p>
      </div>
    </Link>
  );
}
