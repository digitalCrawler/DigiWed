import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { CATEGORIES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Contact & Template Requests",
  description:
    "Write to DigiWeds — request a wedding card template, report a problem with the editor, or ask anything about making your invitation.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])} />

      <section className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <span className="text-ink/60">Contact</span>
        </nav>
        <h1 className="font-display text-[1.9rem] font-semibold text-ink">Baat kijiye</h1>
        <p className="mt-4 text-[15px] leading-7 text-ink/65">
          Koi template chahiye jo abhi nahi hai? Editor mein kuch atak gaya? Ya bas shukriya
          kehna hai? Email kar dijiye — hum padhte hain.
        </p>

        <a href={`mailto:${site.contactEmail}`} className="btn-rose mt-6 px-6 py-3 text-base">
          {site.contactEmail}
        </a>

        <div className="seo-prose mt-10">
          <h2>Template request bhejna chahte hain?</h2>
          <p>
            Email mein yeh teen cheezein likh dijiye, kaam aasaan ho jayega:
          </p>
          <ul>
            <li>Kaunsi category / dharm ya rasm ({CATEGORIES.map((c) => c.name).join(", ")} — ya koi nayi)</li>
            <li>Bhasha — Hindi, English, Urdu, Gurmukhi ya mix</li>
            <li>Rang aur mood — traditional, minimal, dark, bright</li>
          </ul>

          <h2>Problem report karni hai?</h2>
          <p>
            Device aur browser ka naam likh dijiye (jaise “Android, Chrome” ya “iPhone, Safari”),
            kaunsa template tha, aur kya hua. Download fail hua to screenshot bhej dijiye —
            usse sabse jaldi pata chalta hai.
          </p>

          <h2>Printing ke baare mein</h2>
          <p>
            Hum cards print nahi karte aur courier nahi karte — hum sirf design dete hain. PDF
            download karke apne local press ko de dijiye, ya online printing service par upload
            kar dijiye. 5×7 inch card size maangiye, 300 DPI par file bilkul saaf aati hai.
          </p>
        </div>
      </section>
    </>
  );
}
