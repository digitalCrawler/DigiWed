import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Shaadi Card Studio handles your data: no accounts, no photo uploads, drafts stored only in your own browser, and what Google AdSense cookies do.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
        <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
        <span className="text-ink/60">Privacy policy</span>
      </nav>
      <h1 className="font-display text-[1.9rem] font-semibold text-ink">Privacy policy</h1>
      <p className="mt-2 text-[12.5px] text-ink/40">Last updated: 24 November 2026</p>

      <div className="seo-prose mt-6">
        <h2>Short version</h2>
        <p>
          We do not ask you to create an account, we do not collect your name or email to make a
          card, and your couple photo never leaves your device. The only third parties involved
          are Google AdSense (for the small ad strip at the bottom) and Google Fonts (for the
          typefaces).
        </p>

        <h2>What we store, and where</h2>
        <ul>
          <li>
            <strong>Your card draft</strong> — saved in your browser&apos;s <code>localStorage</code> so
            you can come back and keep editing. It never reaches our servers. Clearing your
            browser data deletes it.
          </li>
          <li>
            <strong>Uploaded photos</strong> — read directly in your browser with the FileReader
            API and embedded into the card preview. Nothing is uploaded anywhere.
          </li>
          <li>
            <strong>Ad dismissal</strong> — if you hide the bottom ad strip, we remember that for
            the session in <code>sessionStorage</code>.
          </li>
          <li>
            <strong>Download count</strong> — a plain number in <code>localStorage</code>, only so we
            know whether to show the donation note. It is not sent anywhere.
          </li>
        </ul>

        <h2>Cookies and advertising</h2>
        <p>
          This site shows a single small ad at the bottom of the page through Google AdSense.
          Third-party vendors, including Google, use cookies to serve ads based on your prior
          visits to this and other websites. Google&apos;s use of advertising cookies enables it and
          its partners to serve ads to you based on your visit to this site and/or other sites on
          the internet.
        </p>
        <p>
          You can opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">
            Google Ads Settings
          </a>
          , or opt out of third-party vendor cookies at{" "}
          <a href="https://www.aboutads.info/choices/" rel="nofollow noopener" target="_blank">
            aboutads.info
          </a>
          . For more detail, see{" "}
          <a href="https://policies.google.com/technologies/ads" rel="nofollow noopener" target="_blank">
            how Google uses information from sites that use its services
          </a>
          .
        </p>

        <h2>Google Fonts</h2>
        <p>
          Typefaces are loaded from Google Fonts (fonts.googleapis.com and fonts.gstatic.com).
          Google receives your IP address as part of that request, as it does for any file served
          from a CDN. No font request includes anything you typed into your card.
        </p>

        <h2>Donations</h2>
        <p>
          Donations are entirely voluntary and are made through your own UPI app. We never see or
          store your card number, UPI PIN or bank details — the payment happens inside your UPI
          app, not on this site.
        </p>

        <h2>Children</h2>
        <p>
          This site is not directed at children under 13 and we do not knowingly collect any
          personal information from them.
        </p>

        <h2>Your rights</h2>
        <p>
          Since we hold no personal data about you on our servers, there is nothing for us to
          export or delete. Everything about your card lives in your browser and you can clear it
          at any time from your browser settings.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes we will update the date at the top of this page. Significant
          changes will also be noted on the home page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy? Write to{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> or use the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </section>
  );
}
