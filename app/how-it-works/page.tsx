import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Faq, { QA } from "@/components/Faq";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "How to Make a Wedding Invitation Card Online (Free, 2 Minutes)",
  description:
    "Step-by-step guide to making your own wedding invitation card free online — pick a template, edit names and venue, change colours and fonts, then download HD PNG or print-ready PDF.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    n: "1",
    t: "Apni category chuniye",
    d: "Home page par 11 categories hain — Hindu, Muslim Nikah, Christian, Sikh Anand Karaj, Jain, Buddhist, interfaith/court, modern minimal, engagement-roka, haldi-mehndi-sangeet aur reception-walima. Category page par us dharm ke liye bani wording aur symbols pehle se set milte hain, to aapko shuru se kuch likhna nahi padta.",
  },
  {
    n: "2",
    t: "Template kholiye aur ‘Edit karein’ dabaiye",
    d: "Template page par poora card bada dikhta hai, saath hi colour theme, border style, fonts aur kitni lines editable hain — sab likha hota hai. Pasand aaye to ‘Is card ko edit karein’ par tap kijiye.",
  },
  {
    n: "3",
    t: "Text badliye",
    d: "Right side ke ✍️ Text tab mein saari lines list hoti hain — Top line, Name 1, Name 2, Date, Time, Venue, Blessing line, Hosts. Kisi bhi line par tap kijiye aur apna text likh dijiye. Nayi line ke liye Enter dabaiye. Card par seedha tap karke bhi line select ho jaati hai.",
  },
  {
    n: "4",
    t: "Position, font aur rang set kijiye",
    d: "Selected line ko mouse/finger se drag karke kahin bhi rakh dijiye. Right edge ka handle width badalta hai, bottom-right handle font size. Font dropdown mein Hindi, Urdu, Gurmukhi aur English fonts hain. Colour ke liye 4 theme swatches ya custom colour picker. 🎨 Design tab mein poora theme, border aur top symbol badal sakte hain.",
  },
  {
    n: "5",
    t: "Photo (optional) aur apni lines",
    d: "➕ Add tab se couple photo upload kijiye — circle, rounded ya arch shape chuniye. Nayi text line bhi yahin se jodi jaati hai. Photo aapke browser se bahar nahi jaati.",
  },
  {
    n: "6",
    t: "Download ya share",
    d: "Upar ‘Download HD’ se 2000×2800 px PNG milta hai, ‘PDF’ se print-ready file, aur ‘Share’ se seedha WhatsApp. Download ke baad hum ek baar chhote donation ke liye poochte hain — dena bilkul optional hai.",
  },
];

const FAQS: QA[] = [
  {
    q: "Phone par bhi card bana sakte hain?",
    a: "Haan. Editor touch ke liye bana hai — line par tap karke drag kar sakte hain, aur panel neeche sheet ki tarah khulta hai. Chrome, Safari aur Edge sab par chalta hai.",
  },
  {
    q: "Kya kuch install karna padega?",
    a: "Nahi. Sab kuch browser mein chalta hai. Koi app, koi extension, koi account nahi.",
  },
  {
    q: "Mera draft kahan save hota hai?",
    a: "Aapke browser ke localStorage mein, us template ke naam se. Usi editor link par wapas aaiye to draft mil jayega. Browser data clear karne par draft chala jayega, isliye final card download kar lijiye.",
  },
  {
    q: "Download par watermark aata hai?",
    a: "Nahi. Koi logo, koi watermark, koi 'made with' line nahi. Card bilkul saaf milta hai.",
  },
  {
    q: "Print ke liye kaunsa format behtar hai?",
    a: "PDF. Woh 1000×1400 point ka page deta hai jo 5×7 inch card par seedha chhap jaata hai. Press ko dene se pehle ek test print zaroor dekh lijiye.",
  },
  {
    q: "Agar font theek na dikhe to?",
    a: "Page refresh kar lijiye — Google Fonts load hone mein ek-do second lagta hai, aur download se pehle editor fonts ke ready hone ka intezaar karta hai. Slow internet par download thoda der le sakta hai.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to make a wedding invitation card online for free",
  description:
    "Pick a wedding card template for your religion or ceremony, edit the names, date and venue, adjust colours and fonts, then download an HD image or print-ready PDF.",
  totalTime: "PT2M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "0" },
  tool: [{ "@type": "HowToTool", name: "Any web browser" }],
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.t,
    text: s.d,
    url: `${site.url}/how-it-works#step-${i + 1}`,
  })),
};

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "How it works", path: "/how-it-works" },
      ])} />
      <JsonLd data={howToJsonLd} />

      <section className="mx-auto max-w-3xl px-4 pb-6 pt-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <span className="text-ink/60">How it works</span>
        </nav>
        <h1 className="font-display text-[1.9rem] font-semibold leading-tight text-ink sm:text-4xl">
          Wedding card kaise banaya jaata hai
        </h1>
        <p className="mt-4 text-[15.5px] leading-7 text-ink/65">
          Poora process do minute ka hai aur browser mein hi hota hai. Neeche har step detail mein
          hai — ek baar padh lijiye, phir aapko kabhi zaroorat nahi padegi.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <ol className="space-y-3">
          {STEPS.map((s, i) => (
            <li key={s.n} id={`step-${i + 1}`} className="card-surface flex gap-4 p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage/20 font-display text-base font-semibold text-moss">
                {s.n}
              </span>
              <div>
                <h2 className="font-display text-[17px] font-semibold text-ink">{s.t}</h2>
                <p className="mt-1.5 text-[14px] leading-7 text-ink/65">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 text-center">
          <Link href="/templates" className="btn-rose px-7 py-3 text-base">
            Chaliye, card banaiye →
          </Link>
          <p className="mt-2 text-[12.5px] text-ink/40">{TEMPLATES.length} templates taiyaar hain</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <div className="seo-prose">
          <h2>Keyboard shortcuts</h2>
          <ul>
            <li><strong>Drag</strong> — kisi bhi line ko card par ghumaiye</li>
            <li><strong>Arrow keys</strong> — 4px khiskaiye (Shift ke saath 20px)</li>
            <li><strong>Ctrl + Z</strong> — undo, <strong>Ctrl + Shift + Z</strong> — redo</li>
            <li><strong>Delete</strong> — selected line hata dijiye</li>
            <li><strong>Double-click</strong> — seedha text box mein cursor</li>
          </ul>

          <h2>Chhoti chhoti tips jo kaam aati hain</h2>
          <p>
            Naam ki spelling do baar check kijiye — card chhapne ke baad kuch nahi ho sakta. Date
            ke saath din ka naam zaroor likhiye. Venue mein ek landmark add kar dijiye, Google Maps
            par dhoondhna aasaan ho jaata hai. Aur agar haldi, mehndi aur reception alag din hain to
            alag card banaiye — ek card mein sab likhne se padhna mushkil ho jaata hai.
          </p>
        </div>
      </section>

      <Faq items={FAQS} title="Editor ke baare mein sawaal" />
    </>
  );
}
