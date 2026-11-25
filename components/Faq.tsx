export interface QA { q: string; a: string }

export function faqJsonLd(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export default function Faq({ items, title = "Aapke sawaal" }: { items: QA[]; title?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14" aria-labelledby="faq-title">
      <h2 id="faq-title" className="mb-6 text-center font-display text-2xl font-semibold text-ink">
        {title}
      </h2>
      <div className="divide-y divide-moss/15 overflow-hidden rounded-lg border border-moss/15 bg-parchment/70">
        {items.map((i) => (
          <details key={i.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-[15px] font-semibold text-ink">
              {i.q}
              <span className="shrink-0 text-ink/30 transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-2.5 text-[14px] leading-7 text-ink/65">{i.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
    </section>
  );
}
