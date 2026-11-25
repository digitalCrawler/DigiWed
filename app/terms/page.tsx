import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using DigiWeds: what you may do with the cards you create, what we promise, and what we do not.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
        <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
        <span className="text-ink/60">Terms of use</span>
      </nav>
      <h1 className="font-display text-[1.9rem] font-semibold text-ink">Terms of use</h1>
      <p className="mt-2 text-[12.5px] text-ink/40">Last updated: 24 November 2026</p>

      <div className="seo-prose mt-6">
        <h2>Using the cards you make</h2>
        <p>
          The card you create here is yours. You may print it, share it, post it, and use it for
          your own wedding or event — including commercially, if you are a printer or planner
          making cards for a client. You do not need to credit us.
        </p>

        <h2>What you may not do</h2>
        <ul>
          <li>Resell or redistribute our template designs themselves as a template pack, stock asset, or competing template library.</li>
          <li>Scrape the site in bulk or republish the designs as your own.</li>
          <li>Upload photos you do not have the right to use.</li>
          <li>Use the site to create content that is unlawful, hateful, or impersonates someone.</li>
        </ul>

        <h2>No account, no guarantee of storage</h2>
        <p>
          Drafts live only in your browser. We cannot recover a draft you lose, so download your
          finished card. We may change, add or remove templates at any time.
        </p>

        <h2>Proofread before printing</h2>
        <p>
          You are responsible for the content of your card — names, spellings, dates, times and
          venue. Please check every line before sending it to a printer. We are not liable for
          printing costs arising from a mistake in your text.
        </p>

        <h2>Service is provided as is</h2>
        <p>
          The site is free and offered without warranty of any kind. We try to keep it working on
          every modern browser, but we cannot promise uninterrupted availability or that a download
          will succeed on every device. Our liability is limited to the amount you paid us, which
          for almost everyone is zero.
        </p>

        <h2>Donations</h2>
        <p>
          Donations are voluntary gifts, not payment for a product or service, and they unlock
          nothing — every template is free either way. Because they are gifts, they are generally
          non-refundable; if you sent the wrong amount by mistake, write to us and we will sort it
          out. See the <Link href="/support">support page</Link> for details.
        </p>

        <h2>Advertising</h2>
        <p>
          The site carries one small ad strip served by Google AdSense. We do not control which
          ads appear and do not endorse advertisers. See the{" "}
          <Link href="/privacy">privacy policy</Link> for how ad cookies work.
        </p>

        <h2>Fonts and third-party assets</h2>
        <p>
          Typefaces are served by Google Fonts under their own open-source licences (mostly the
          SIL Open Font License). The ornamental borders, motifs and layouts are our own work.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India, and any dispute falls under the
          jurisdiction of the courts there.
        </p>

        <h2>Contact</h2>
        <p>
          Anything unclear? Write to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </section>
  );
}
