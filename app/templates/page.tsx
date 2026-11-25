import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";
import { VIDEO_TEMPLATES } from "@/lib/videoTemplates";
import TemplateCard from "@/components/TemplateCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";

/** the overview shows a taste of each category; the category page has them all */
const PER_CATEGORY = 8;

export const metadata: Metadata = {
  title: "All Wedding Card Templates — Free & Editable",
  description:
    `Browse ${TEMPLATES.length} free wedding invitation card templates — Hindu, Muslim Nikah, Christian, Sikh, Jain, Buddhist, interfaith, engagement, haldi-mehndi and reception. Edit online and download HD.`,
  alternates: { canonical: "/templates" },
  openGraph: { url: "/templates", title: "All Wedding Card Templates — Free & Editable" },
};

export default function TemplatesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "All templates", path: "/templates" },
      ])} />
      <JsonLd data={itemListJsonLd(
        "Wedding invitation card templates",
        TEMPLATES.map((t) => ({ name: t.name, path: `/templates/${t.slug}` }))
      )} />

      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <span className="text-ink/60">All templates</span>
        </nav>
        <h1 className="font-display text-[1.9rem] font-semibold leading-tight text-ink sm:text-4xl">
          Saare wedding card templates
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink/65">
          {TEMPLATES.length} card designs aur {VIDEO_TEMPLATES.length} video invites, {CATEGORIES.length} categories
          mein. Koi bhi card kholiye — naam, date, venue, rang, border aur font sab badal sakte hain.
          Download free, watermark zero. Har category ke neeche kuch designs dikhaye hain; poori list
          category page par hai.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          <li>
            <span className="rounded-full border border-sage bg-sage/15 px-3.5 py-1.5 text-[13px] font-semibold text-ink">
              All ({TEMPLATES.length})
            </span>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-moss/15 bg-parchment/80 px-3.5 py-1.5 text-[13px] font-medium text-ink/70 transition hover:border-sage hover:text-ink"
              >
                <span aria-hidden>{c.emoji}</span>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {CATEGORIES.map((c) => {
        const all = TEMPLATES.filter((t) => t.category === c.slug);
        const list = all.slice(0, PER_CATEGORY);
        const rest = all.length - list.length;
        if (!list.length) return null;
        return (
          <section key={c.slug} className="mx-auto max-w-6xl px-4 py-7" aria-labelledby={`cat-${c.slug}`}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 id={`cat-${c.slug}`} className="font-display text-xl font-semibold text-ink">
                <span aria-hidden className="mr-1.5">{c.emoji}</span>
                {c.name}
                <span className="ml-2 font-body text-[12px] font-normal text-ink/40">{c.subtitle}</span>
              </h2>
              <Link href={`/category/${c.slug}`} className="btn-chip shrink-0">
                {rest > 0 ? `+${rest} more →` : "Category page →"}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((t) => (
                <TemplateCard key={t.slug} t={t} width={250} showCategory={false} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="seo-prose">
          <h2>Kaunsa template chunein?</h2>
          <p>
            Pehle dharm/rasm ke hisaab se category chuniye — usmein symbols aur wording pehle se
            sahi set hain. Uske baad do cheezein dekhiye: <strong>bhasha</strong> (Hindi/Gurmukhi
            text wale templates par Devanagari fonts lage hote hain) aur <strong>rang</strong>.
            Printing ke liye halke background wale designs sasta aur saaf chhapte hain; WhatsApp
            par bhejne ke liye dark templates jaise Midnight Gold zyada alag dikhte hain.
          </p>
          <p>
            Design pasand hai lekin rang nahi? Koi dikkat nahi — editor ke <em>Design</em> tab mein
            14 colour themes, 8 border styles aur 12 top symbols hain, to kisi bhi template ko
            apne hisaab se badal sakte hain.
          </p>
        </div>
      </section>
    </>
  );
}
