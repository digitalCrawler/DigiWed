import Link from "next/link";
import type { Metadata } from "next";
import DonateBox from "@/components/DonateBox";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Support Us — Donate ₹50 (or Any Amount)",
  description:
    "DigiWeds is free for everyone. If a card we made helped you, you can send a small thank-you gift over UPI — ₹50 suggested, any amount welcome, and nothing is required.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Support us", path: "/support" },
      ])} />

      <section className="mx-auto max-w-2xl px-4 pb-6 pt-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <span className="text-ink/60">Support us</span>
        </nav>

        <div className="card-surface px-6 py-9 sm:px-10">
          <DonateBox />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-8">
        <div className="seo-prose">
          <h2>Paisa kahan jaata hai</h2>
          <p>
            Is website ka kharcha chhota hai lekin hai — domain, hosting, aur naye templates
            banane ka waqt. Aapka gift seedha isi mein lagta hai. Hum koi template lock nahi
            karte, koi “premium plan” nahi bechte, aur download par watermark nahi lagate — to
            site ka kharcha ads aur aap jaise logon ke chhote support se nikalta hai.
          </p>

          <h2>Kitna dena chahiye?</h2>
          <p>
            Jitna dil kare. ₹50 ka button sirf isliye hai ki koi default chahiye hota hai — ₹5,
            ₹10 ya ₹20 bhi hum usi khushi se lete hain. Aur agar aap kuch nahi dena chahte, to
            bhi card bilkul free hai aur hamesha rahega. Sach mein, koi guilt nahi.
          </p>

          <h2>Doosre tareeke se madad</h2>
          <p>
            Paise ke bina bhi madad ho sakti hai — kisi dost ko site ke baare mein bata dijiye
            jiski shaadi aa rahi hai, ya hamein likh kar bataiye ki kaunsa template chahiye jo
            abhi nahi hai. Suggestions se hi {TEMPLATES.length} templates bane hain.{" "}
            <Link href="/contact">Contact page yahan hai</Link>.
          </p>

          <h2>Refund</h2>
          <p>
            Donation ek gift hai, kisi service ki payment nahi — isliye normally refund nahi hota.
            Lekin agar galti se amount zyada bhej diya ho, to hamein likhiye, hum sort kar denge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-16 text-center">
        <Link href="/templates" className="btn-ghost px-6 py-3">
          Templates par wapas jaaiye
        </Link>
      </section>
    </>
  );
}
