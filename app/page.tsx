import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import VideoPoster from "@/components/VideoPoster";
import { MOTIONS, VIDEOS_PER_CATEGORY, VIDEO_TEMPLATES } from "@/lib/videoTemplates";
import Faq, { QA } from "@/components/Faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Wedding Invitation Card Maker — Hindu, Muslim, Christian, Sikh & More",
  description: site.description,
  alternates: { canonical: "/" },
};

const FEATURED = [
  "ganesh-vandana-hindu", "bismillah-arch-muslim", "floral-wreath-christian",
  "ik-onkar-khanda-sikh", "namokar-ivory-jain", "dharmachakra-teal-buddhist",
  "two-faiths-one-love-interfaith", "editorial-minimal-modern",
  "ring-ceremony-rose-engagement", "haldi-sunshine-haldi-mehndi",
  "reception-noir-reception", "kalash-maroon-hindu",
]
  .map((s) => TEMPLATES.find((t) => t.slug === s))
  .filter(Boolean)
  .slice(0, 12) as typeof TEMPLATES;

const VIDEO_PICKS = CATEGORIES.map((c) => VIDEO_TEMPLATES.find((v) => v.category === c.slug))
  .filter(Boolean)
  .slice(0, 5) as typeof VIDEO_TEMPLATES;

const FAQS: QA[] = [
  {
    q: "Kya yeh wedding card maker bilkul free hai?",
    a: "Haan. Saare card aur video templates, poora editor aur HD download — sab free hai. Koi signup nahi, koi watermark nahi, koi trial nahi. Card ban jaane ke baad hum sirf ek chhota sa donation (₹50 suggested, ya ₹5 bhi chalega) maangte hain — dena bilkul optional hai.",
  },
  {
    q: "Kaun kaun se dharm ke cards available hain?",
    a: "Hindu vivah, Muslim Nikah aur Walima, Christian church wedding, Sikh Anand Karaj, Jain vivah, Buddhist wedding, aur interfaith / court marriage — sabke liye alag categories hain. Iske alawa engagement-roka, haldi-mehndi-sangeet aur reception bhi. Har category mein 30 se zyada printable cards aur 10 video invites milenge.",
  },
  {
    q: "Hindi, Urdu ya Punjabi mein card bana sakte hain?",
    a: "Bilkul. Editor mein Tiro Devanagari, Mukta aur Rozha One (Hindi/Punjabi), Noto Nastaliq aur Amiri (Urdu/Arabic) fonts diye gaye hain. Aap seedha apni bhasha mein type kar sakte hain — Gurmukhi aur Devanagari dono theek render hote hain.",
  },
  {
    q: "Card print quality mein milega ya sirf WhatsApp ke liye?",
    a: "Dono. Download HD button 2000×2800 pixel ka PNG deta hai, aur PDF option print-ready file deta hai — 5×7 inch card par saaf chhapta hai. WhatsApp aur Instagram story ke liye yahi PNG kaafi hai.",
  },
  {
    q: "Meri couple photo kahan jaati hai?",
    a: "Kahin nahi — photo sirf aapke browser mein process hoti hai. Hum koi image server par upload nahi karte aur aapka draft sirf aapke device ke localStorage mein save hota hai.",
  },
  {
    q: "Card banane mein kitna time lagta hai?",
    a: "Do-teen minute. Template chuniye, naam-date-venue badliye, rang pasand karein, aur download. Kuch bhi install karne ki zaroorat nahi — phone par bhi chal jaata hai.",
  },
  {
    q: "Kya main apna draft baad mein edit kar sakta hoon?",
    a: "Haan. Aapka kaam apne aap us template ke liye save ho jaata hai. Wapas usi editor link par aaiye — draft waise hi mil jayega. 'Reset' dabaane par original template wapas aa jaata hai.",
  },
];

export default function Home() {
  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden px-4 pb-10 pt-12 sm:pt-16">
        <div className="stagger mx-auto max-w-5xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-leaf border border-moss/20 bg-parchment/80 px-4 py-1.5 font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            🪔 {TEMPLATES.length} cards · 🎬 {VIDEO_TEMPLATES.length} video invites · 100% free
          </p>
          <h1
            className="font-display text-[2.15rem] font-bold leading-[1.12] tracking-tight text-ink sm:text-[3.4rem]"
            style={{ textShadow: "0 1px 0 rgba(250,246,234,0.9), 0 14px 34px rgba(85,103,63,0.16)" }}
          >
            Shaadi ka card banaiye —{" "}
            <span className="relative whitespace-nowrap italic text-moss">
              har rasm
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-[3px] origin-left animate-grow rounded-full bg-gradient-to-r from-brass via-sage to-transparent"
              />
            </span>{" "}
            ke liye
          </h1>
          <span className="leaf-rule mt-5 block" />
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.85] text-ink/75">
            Hindu vivah, Nikah, Christian wedding, Anand Karaj, Jain, Buddhist ya court
            marriage — har category mein 30+ printable cards aur {VIDEOS_PER_CATEGORY} animated
            video invites. Template chuniye, naam-date-venue apne
            hisaab se likhiye, aur HD card ya 9:16 video download kar lijiye. Na signup, na
            watermark, na koi fees.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Link href="/templates" className="btn-rose px-7 py-3 text-base">
              Card templates →
            </Link>
            <Link href="/videos" className="btn-ghost px-6 py-3 text-base">
              🎬 Video invites
            </Link>
          </div>
          <p className="mt-4 text-[12.5px] text-ink/40">
            Card ban jaaye to chhota sa donation — ₹5 se ₹50, jitna dil kare 🙏
          </p>
        </div>

        {/* category pills */}
        <nav aria-label="Browse by category" className="mx-auto mt-10 max-w-5xl">
          <ul className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="flex items-center gap-1.5 rounded-leaf border border-moss/20 bg-parchment/80 px-4 py-2 font-ui text-[13px] font-medium text-ink/75 transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:bg-blush hover:text-moss hover:shadow-soft"
                >
                  <span aria-hidden>{c.emoji}</span>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ---------------- featured templates ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="featured">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="featured" className="font-display text-[1.75rem] font-bold text-moss">
              Popular templates
            </h2>
            <p className="mt-1 text-sm text-ink/55">
              Har category ka ek favourite — tap karke edit shuru kijiye
            </p>
          </div>
          <Link href="/templates" className="btn-chip shrink-0">Saare dekhein →</Link>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURED.map((t) => (
            <TemplateCard key={t.slug} t={t} width={250} />
          ))}
        </div>
      </section>

      {/* ---------------- video invites ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="videos">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="videos" className="font-display text-[1.75rem] font-bold text-moss">
              🎬 Video invitations
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-ink/55">
              Har category mein {VIDEOS_PER_CATEGORY} animated invites — {MOTIONS.length} motion
              styles, apna music jod sakte hain, aur 1080×1920 clip milta hai jo seedha WhatsApp
              status par lag jaata hai.
            </p>
          </div>
          <Link href="/videos" className="btn-chip shrink-0">Saare videos →</Link>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-5">
          {VIDEO_PICKS.map((v) => (
            <VideoPoster key={v.slug} v={v} width={210} />
          ))}
        </div>
      </section>

      {/* ---------------- how it works ---------------- */}
      <section className="mx-auto max-w-5xl px-4 py-12" aria-labelledby="steps">
        <h2 id="steps" className="mb-8 text-center font-display text-[1.75rem] font-bold text-moss">
          Teen step mein card taiyaar
        </h2>
        <ol className="stagger grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Template chuniye", d: "Apne dharm ya rasm ke hisaab se category kholiye aur jo design dil ko bhaaye, use kholiye." },
            { n: "2", t: "Apne hisaab se badliye", d: "Naam, date, venue, blessing line — sab editable. Rang, border, symbol aur font bhi badal sakte hain. Photo bhi laga sakte hain." },
            { n: "3", t: "Download aur bhejiye", d: "HD PNG ya print-ready PDF save kijiye, ya seedha WhatsApp par share kar dijiye." },
          ].map((s) => (
            <li key={s.n} className="card-surface grow-lift p-6">
              <span className="grid h-10 w-10 place-items-center rounded-leaf bg-gradient-to-br from-sage to-moss font-display text-base font-bold text-cream shadow-soft">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[14px] leading-6 text-ink/60">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- why ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="why">
        <h2 id="why" className="mb-6 text-center font-display text-[1.75rem] font-bold text-moss">
          Log yahan kyun aate hain
        </h2>
        <div className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: "🕊️", t: "Har dharm ka sammaan", d: "Ganesh vandana se Bismillah tak, Ik Onkar se Dharmachakra tak — har tradition ke liye sahi symbols aur sahi shabd." },
            { i: "🎨", t: "Canva jaisa editor", d: "Drag karke kahin rakhiye, font-size slider se badhaiye, 14 colour themes — bilkul browser mein." },
            { i: "🔒", t: "Aapka data aapka", d: "Koi account nahi, koi photo upload nahi. Sab kuch aapke device par." },
            { i: "🧾", t: "Watermark-free", d: "Download par koi logo nahi chipakta. Print ke liye bhi bilkul saaf." },
          ].map((f) => (
            <div key={f.t} className="card-surface grow-lift p-5">
              <span className="text-2xl" aria-hidden>{f.i}</span>
              <h3 className="mt-2.5 font-display text-base font-semibold text-ink">{f.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-6 text-ink/60">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- categories, with SEO text ---------------- */}
      <section className="mx-auto max-w-5xl px-4 py-12" aria-labelledby="cats">
        <h2 id="cats" className="mb-6 font-display text-[1.75rem] font-bold text-moss">
          Dharm aur rasm ke hisaab se cards
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="card-surface grow-lift flex gap-4 p-5 hover:shadow-lift"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blush text-xl" aria-hidden>
                {c.emoji}
              </span>
              <span>
                <span className="block font-display text-[15.5px] font-semibold text-ink">
                  {c.name} <span className="font-body text-[12px] font-normal text-ink/40">· {c.hindi}</span>
                </span>
                <span className="mt-0.5 block text-[13px] leading-6 text-ink/55">{c.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- long-form SEO copy ---------------- */}
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="seo-prose">
          <h2>Online wedding invitation card maker — bilkul free</h2>
          <p>
            Shaadi fix hone ke baad sabse pehla kaam hota hai card banwana. Printing press ke
            chakkar, proof ki galtiyan, aur phir last-minute mein kisi ka naam reh jaana — yeh
            sab jhanjhat hai. {site.name} isi kaam ko do minute mein kar deta hai: aap apna
            favourite design chuniye, text apne hisaab se likhiye, aur turant HD card download
            kar lijiye. Chahe aap <Link href="/category/hindu">Hindu vivah ka card</Link> bana rahe
            hon ya <Link href="/category/muslim">Nikah ka invitation</Link>, process ek hi hai.
          </p>

          <h2>Har dharm ke liye alag se bane templates</h2>
          <p>
            Generic templates mein naam badal dene se baat nahi banti — card mein aapke rivaaj
            dikhne chahiye. Isi wajah se hamare designs category ke hisaab se bane hain:
          </p>
          <ul>
            <li>
              <strong>Hindu</strong> — Shri Ganeshay Namah, mandala arcs, kalash aur marigold rang,
              Hindi (Devanagari) fonts ke saath.
            </li>
            <li>
              <strong>Muslim</strong> — Bismillah calligraphy, Islamic pointed arch, geometric
              star border, aur Urdu Nastaliq heading.
            </li>
            <li>
              <strong>Christian</strong> — floral wreath, dove, cross aur scripture line ke liye
              jagah.
            </li>
            <li>
              <strong>Sikh</strong> — Ik Onkar, Khanda, Gurmukhi text aur phulkari-inspired rang.
            </li>
            <li>
              <strong>Jain &amp; Buddhist</strong> — Namokar mantra, Ahimsa hand, lotus aur
              Dharmachakra ke shaant designs.
            </li>
            <li>
              <strong>Interfaith &amp; court marriage</strong> — neutral, elegant cards jo dono
              parivaaron ko apne lagein.
            </li>
          </ul>

          <h2>Shaadi ke card mein kya likhna chahiye?</h2>
          <p>
            Ek achhe invitation mein paanch cheezein zaroor honi chahiye: (1) upar ek blessing ya
            invocation line, (2) dulhan aur dulhe ka naam, (3) poori date aur time — din ka naam
            bhi, (4) venue ka naam aur sheher ke saath landmark, aur (5) neeche host parivaar ka
            naam. Agar haldi, mehndi ya reception alag din hai, to unke liye alag card banaiye —
            ek hi card mein sab thoos dene se padhna mushkil ho jaata hai.
          </p>

          <h2>Print ya WhatsApp — dono ke liye ek hi card</h2>
          <p>
            Hamara artboard 1000×1400 point ka hai, jo 5×7 inch card ka standard ratio hai.
            <strong> Download HD</strong> se 2000×2800 pixel PNG milta hai — WhatsApp aur Instagram
            story ke liye perfect. <strong>PDF</strong> option seedha press ko bhej sakte hain.
            Printing se pehle ek test print zaroor nikaal lijiye, aur naam ki spelling do baar
            check kar lijiye.
          </p>

          <h2>Paise ki baat — saaf saaf</h2>
          <p>
            Yeh site free hai aur free rahegi. Koi premium plan nahi, koi locked template nahi.
            Card download karne ke baad hum ek baar poochte hain ki agar aapko achha laga to
            thoda support kar dijiye — suggested amount ₹50 hai, lekin ₹5 ya ₹10 bhi dil se
            accept hai, aur na dena bhi bilkul theek hai. Website ka kharcha ads aur aap jaise
            logon ke chhote gifts se chalta hai.{" "}
            <Link href="/support">Support page yahan hai</Link>.
          </p>
        </div>
      </section>

      <Faq items={FAQS} />

      {/* ---------------- final CTA ---------------- */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="card-surface relative overflow-hidden px-6 py-12 text-center">
          <h2 className="font-display text-[1.75rem] font-bold text-moss">
            To phir, shuru karein?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-7 text-ink/60">
            {TEMPLATES.length} card designs aur {VIDEO_TEMPLATES.length} video invites taiyaar
            hain. Do minute mein aapka card ban jayega.
          </p>
          <Link href="/templates" className="btn-rose mt-6 px-7 py-3 text-base">
            Apna card banaiye →
          </Link>
        </div>
      </section>
    </>
  );
}
