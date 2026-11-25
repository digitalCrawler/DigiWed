import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory } from "@/lib/templates";
import { MOTIONS, VIDEO_TEMPLATES, getVideoTemplate, videosByCategory } from "@/lib/videoTemplates";
import VideoPreview from "@/components/VideoPreview";
import VideoPoster from "@/components/VideoPoster";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return VIDEO_TEMPLATES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideoTemplate(slug);
  if (!v) return {};
  const c = getCategory(v.category);
  const title = `${v.name} — ${c?.name} Invitation Video Template (Free)`;
  const description = `${v.blurb} Edit the names, date and venue, add your own music and download a free 1080×1920 ${c?.name.toLowerCase()} invitation video for WhatsApp status.`;
  return {
    title,
    description,
    alternates: { canonical: `/videos/${v.slug}` },
    openGraph: { url: `/videos/${v.slug}`, title, description, type: "video.other" },
    keywords: [
      `${c?.name.toLowerCase()} invitation video`,
      `${v.motion.label.toLowerCase()} wedding video template`,
      "wedding invitation video maker free",
      "whatsapp shaadi invite video",
    ],
  };
}

export default async function VideoTemplatePage({ params }: Props) {
  const { slug } = await params;
  const v = getVideoTemplate(slug);
  if (!v) notFound();
  const c = getCategory(v.category)!;
  const related = videosByCategory(v.category).filter((x) => x.slug !== v.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${v.name} — ${c.name} invitation video template`,
    description: v.blurb,
    url: `${site.url}/videos/${v.slug}`,
    duration: `PT${v.motion.duration}S`,
    uploadDate: "2026-11-25",
    isAccessibleForFree: true,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    potentialAction: {
      "@type": "CreateAction",
      target: `${site.url}/video-editor/${v.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Video invitations", path: "/videos" },
        { name: c.name, path: `/videos#${c.slug}` },
        { name: v.name, path: `/videos/${v.slug}` },
      ])} />
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <Link href="/videos" className="hover:text-moss">Videos</Link> <span className="px-1">/</span>
          <Link href={`/videos#${c.slug}`} className="hover:text-moss">{c.name}</Link>
          <span className="px-1">/</span>
          <span className="text-ink/60">{v.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,330px)_1fr]">
          <div className="justify-self-center" style={{ width: "min(330px, 80vw)" }}>
            <VideoPreview design={v.design} motion={v.motion} />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/videos#${c.slug}`} className="btn-chip">
                <span aria-hidden>{c.emoji}</span> {c.name}
              </Link>
              <span className="btn-chip !border-rose/30 !bg-rose/10">🎬 {v.motion.label}</span>
              <span className="btn-chip">{v.motion.duration}s · 9:16</span>
            </div>

            <h1 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.4rem]">
              {v.name}
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/65">{v.blurb}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href={`/video-editor/${v.slug}`} className="btn-rose px-7 py-3 text-base">
                Is video ko edit karein →
              </Link>
              <Link href={`/templates/${v.cardSlug}`} className="btn-ghost px-5 py-3 text-base">
                Printable card version
              </Link>
            </div>
            <p className="mt-3 text-[12.5px] text-ink/45">
              Free · No signup · No watermark · Apna music jod sakte hain
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-moss/15 pt-6 text-[13.5px] sm:grid-cols-3">
              <div>
                <dt className="label">Animation</dt>
                <dd className="text-ink/75">{v.motion.label}</dd>
              </div>
              <div>
                <dt className="label">Length</dt>
                <dd className="text-ink/75">{v.motion.duration} seconds</dd>
              </div>
              <div>
                <dt className="label">Resolution</dt>
                <dd className="text-ink/75">1080 × 1920</dd>
              </div>
              <div>
                <dt className="label">Colour theme</dt>
                <dd className="flex items-center gap-2 text-ink/75">
                  <span className="flex overflow-hidden rounded-full border border-moss/15">
                    <span className="h-4 w-4" style={{ background: v.design.palette.bg2 }} />
                    <span className="h-4 w-4" style={{ background: v.design.palette.accent }} />
                    <span className="h-4 w-4" style={{ background: v.design.palette.gold }} />
                  </span>
                  {v.design.palette.label}
                </dd>
              </div>
              <div>
                <dt className="label">Based on</dt>
                <dd className="text-ink/75">
                  <Link href={`/templates/${v.cardSlug}`} className="text-moss underline">{v.cardName}</Link>
                </dd>
              </div>
              <div>
                <dt className="label">Editable lines</dt>
                <dd className="text-ink/75">{v.design.fields.filter((f) => f.type === "text").length}</dd>
              </div>
            </dl>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {v.tags.map((g) => (
                <li key={g} className="rounded-full bg-blush/70 px-2.5 py-1 text-[11.5px] text-ink/55">#{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="mb-5 font-display text-xl font-semibold text-ink">
          Is video mein kya kya badal sakte hain
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Saara text", d: "Naam, date, time, venue, blessing line — har line editable hai." },
            { t: "Animation style", d: `${MOTIONS.length} motion presets — fade, bloom, petal fall, typewriter, sparkle aur bhi.` },
            { t: "Rang aur border", d: "14 colour themes, 8 border styles, 12 top symbols." },
            { t: "Music aur photo", d: "Apni mp3 aur couple photo jodiye — dono device par hi rehti hain." },
          ].map((f) => (
            <div key={f.t} className="card-surface p-4">
              <h3 className="font-display text-[15px] font-semibold text-ink">{f.t}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-ink/60">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mx-auto max-w-6xl px-4 py-8 pb-16">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">
            {c.name} ke doosre video templates
          </h2>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {related.map((r) => (
              <VideoPoster key={r.slug} v={r} width={210} showCategory={false} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/videos#${o.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-moss/15 bg-parchment/80 px-3 py-1.5 text-[12.5px] font-medium text-ink/65 transition hover:border-sage hover:text-ink"
              >
                <span aria-hidden>{o.emoji}</span>
                {o.name} videos
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
