import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, TEMPLATES, getCategory, getTemplate } from "@/lib/templates";
import { FONTS } from "@/lib/fonts";
import CardCanvas from "@/components/CardCanvas";
import TemplateCard from "@/components/TemplateCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  const c = getCategory(t.category);
  const title = `${t.name} — ${c?.name} Invitation Card Template (Free, Editable)`;
  const description = `${t.blurb} Edit names, date and venue online and download an HD ${c?.name.toLowerCase()} invitation card free — no watermark, no signup.`;
  return {
    title,
    description,
    alternates: { canonical: `/templates/${t.slug}` },
    openGraph: { url: `/templates/${t.slug}`, title, description },
    keywords: [
      `${t.name} wedding card`,
      `${c?.name.toLowerCase()} invitation template`,
      ...t.tags.map((g) => `${g} wedding card`),
      "free editable wedding invitation",
    ],
  };
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();
  const c = getCategory(t.category)!;
  const related = TEMPLATES.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);
  const alsoLike = TEMPLATES.filter((x) => x.category !== t.category)
    .filter((x) => x.tags.some((g) => t.tags.includes(g)))
    .slice(0, 4);

  const fontsUsed = Array.from(
    new Set(t.design.fields.filter((f) => f.font).map((f) => FONTS[f.font!]?.label).filter(Boolean))
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Templates", path: "/templates" },
        { name: c.name, path: `/category/${c.slug}` },
        { name: t.name, path: `/templates/${t.slug}` },
      ])} />
      <JsonLd data={creativeWorkJsonLd({
        name: `${t.name} — ${c.name} invitation card template`,
        description: t.blurb,
        path: `/templates/${t.slug}`,
        keywords: t.tags,
      })} />

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <Link href="/templates" className="hover:text-moss">Templates</Link> <span className="px-1">/</span>
          <Link href={`/category/${c.slug}`} className="hover:text-moss">{c.name}</Link>
          <span className="px-1">/</span>
          <span className="text-ink/60">{t.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* preview */}
          <div className="justify-self-center">
            <div className="overflow-hidden rounded-lg border border-moss/15 shadow-lift">
              <CardCanvas design={t.design} width={400} uid={`big-${t.id}`} />
            </div>
            <p className="mt-2.5 text-center text-[11.5px] text-ink/40">
              Live preview · 1000×1400 artboard (5×7 inch ratio)
            </p>
          </div>

          {/* details */}
          <div>
            <Link href={`/category/${c.slug}`} className="btn-chip">
              <span aria-hidden>{c.emoji}</span> {c.name}
            </Link>
            <h1 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.4rem]">
              {t.name}
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/65">{t.blurb}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href={`/editor/${t.slug}`} className="btn-rose px-7 py-3 text-base">
                Is card ko edit karein →
              </Link>
              <Link href={`/category/${c.slug}`} className="btn-ghost px-5 py-3 text-base">
                Milte-julte designs
              </Link>
            </div>
            <p className="mt-3 text-[12.5px] text-ink/45">
              Free · No signup · No watermark · HD PNG &amp; print-ready PDF
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-moss/15 pt-6 text-[13.5px] sm:grid-cols-3">
              <div>
                <dt className="label">Colour theme</dt>
                <dd className="flex items-center gap-2 text-ink/75">
                  <span className="flex overflow-hidden rounded-full border border-moss/15">
                    <span className="h-4 w-4" style={{ background: t.design.palette.bg2 }} />
                    <span className="h-4 w-4" style={{ background: t.design.palette.accent }} />
                    <span className="h-4 w-4" style={{ background: t.design.palette.gold }} />
                  </span>
                  {t.design.palette.label}
                </dd>
              </div>
              <div>
                <dt className="label">Border style</dt>
                <dd className="capitalize text-ink/75">{t.design.frame}</dd>
              </div>
              <div>
                <dt className="label">Top symbol</dt>
                <dd className="capitalize text-ink/75">{t.design.motif}</dd>
              </div>
              <div>
                <dt className="label">Editable lines</dt>
                <dd className="text-ink/75">{t.design.fields.filter((f) => f.type === "text").length}</dd>
              </div>
              <div>
                <dt className="label">Photo frame</dt>
                <dd className="text-ink/75">
                  {t.design.fields.some((f) => f.type === "image") ? "Haan" : "Add kar sakte hain"}
                </dd>
              </div>
              <div>
                <dt className="label">Fonts</dt>
                <dd className="text-ink/75">{fontsUsed.join(", ")}</dd>
              </div>
            </dl>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {t.tags.map((g) => (
                <li key={g} className="rounded-full bg-blush/70 px-2.5 py-1 text-[11.5px] text-ink/55">
                  #{g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* what you can change */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="mb-5 font-display text-xl font-semibold text-ink">
          Is template mein kya kya badal sakte hain
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Saara text", d: "Naam, date, time, venue, blessing line aur host parivaar ka naam — sab." },
            { t: "Rang aur border", d: "14 colour themes, 8 border styles aur 12 top symbols — ek click mein." },
            { t: "Font aur size", d: "Hindi, Urdu, Gurmukhi aur English fonts; size, spacing aur line gap sliders." },
            { t: "Photo aur nayi lines", d: "Couple photo upload kijiye, ya apni nayi text line jod dijiye." },
          ].map((f) => (
            <div key={f.t} className="card-surface p-4">
              <h3 className="font-display text-[15px] font-semibold text-ink">{f.t}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-ink/60">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">
            {c.name} ke doosre templates
          </h2>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <TemplateCard key={r.slug} t={r} width={250} showCategory={false} />
            ))}
          </div>
        </section>
      ) : null}

      {alsoLike.length ? (
        <section className="mx-auto max-w-6xl px-4 py-8 pb-16">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">
            Yeh bhi pasand aa sakte hain
          </h2>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
            {alsoLike.map((r) => (
              <TemplateCard key={r.slug} t={r} width={250} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/category/${o.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-moss/15 bg-parchment/80 px-3 py-1.5 text-[12.5px] font-medium text-ink/65 transition hover:border-sage hover:text-ink"
              >
                <span aria-hidden>{o.emoji}</span>
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
