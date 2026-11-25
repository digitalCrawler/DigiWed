import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/templates";
import { MOTIONS, VIDEOS_PER_CATEGORY, VIDEO_TEMPLATES, videosByCategory } from "@/lib/videoTemplates";
import VideoPoster from "@/components/VideoPoster";
import JsonLd from "@/components/JsonLd";
import Faq, { QA } from "@/components/Faq";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Wedding Invitation Video Maker — Free Animated Templates",
  description:
    `Make an animated wedding invitation video free — ${VIDEO_TEMPLATES.length} templates across ${CATEGORIES.length} categories, ${VIDEOS_PER_CATEGORY} per faith and ceremony. Edit names and venue, add your own music, download a 1080×1920 clip for WhatsApp status.`,
  alternates: { canonical: "/videos" },
  keywords: [
    "wedding invitation video maker",
    "shaadi invitation video free",
    "animated wedding card video",
    "whatsapp wedding invitation video",
    "nikah invitation video",
    "save the date video maker india",
  ],
};

const FAQS: QA[] = [
  {
    q: "Video invitation banane ke paise lagte hain?",
    a: "Bilkul nahi. Saare video templates free hain, watermark nahi lagta, aur signup bhi nahi chahiye. Download ke baad hum sirf ek baar chhota sa donation poochte hain — dena optional hai.",
  },
  {
    q: "Video kis size mein milta hai?",
    a: "1080×1920 pixel, yaani 9:16 portrait — WhatsApp status, Instagram story aur reel teeno ke liye sahi. Browser ke hisaab se MP4 ya WebM file banti hai; Chrome par aam taur par MP4 milta hai.",
  },
  {
    q: "Apna gaana laga sakte hain?",
    a: "Haan. Motion tab mein 'Apna music jodiye' se apni mp3 chuniye — woh video ke saath record ho jayegi. File aapke browser se bahar nahi jaati. Sirf wahi music use kijiye jiske rights aapke paas hain.",
  },
  {
    q: "Video banne mein kitna time lagta hai?",
    a: "Clip jitni lambi hai utna hi — 10 se 12 second. Recording real time mein hoti hai, isliye download button dabane ke baad tab band mat kijiye; progress bar upar dikhta rahega.",
  },
  {
    q: "Couple photo laga sakte hain?",
    a: "Haan — Design ya Text tab se photo upload kijiye, woh animation ke saath circle, rounded ya arch shape mein aa jayegi. Photo sirf aapke device par rehti hai.",
  },
  {
    q: "Same design ka printable card bhi mil sakta hai?",
    a: "Haan. Har video template kisi na kisi card template par bana hai — editor mein 'Card version' button se usi design ka HD PNG ya print-ready PDF bana sakte hain.",
  },
];

export default function VideosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Video invitations", path: "/videos" },
      ])} />
      <JsonLd data={itemListJsonLd(
        "Wedding invitation video templates",
        VIDEO_TEMPLATES.map((v) => ({ name: v.name, path: `/videos/${v.slug}` }))
      )} />

      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <span className="text-ink/60">Video invitations</span>
        </nav>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-moss/15 bg-parchment/70 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink/55">
          🎬 {VIDEO_TEMPLATES.length} video templates · {VIDEOS_PER_CATEGORY} per category
        </p>
        <h1 className="font-display text-[1.9rem] font-semibold leading-tight text-ink sm:text-4xl">
          Wedding invitation video banaiye
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/65">
          Wahi card, lekin chalta-phirta. Template chuniye, naam-date-venue badliye, chahein to
          apna gaana jodiye — aur 1080×1920 ka clip download kar lijiye, seedha WhatsApp status
          ya Instagram story par lagane ke liye. Free, watermark ke bina.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="#hindu" className="btn-rose">Templates dekhiye ↓</Link>
          <Link href="/templates" className="btn-ghost">Printable cards chahiye</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-3 font-display text-xl font-semibold text-ink">
          {MOTIONS.length} animation styles
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {MOTIONS.map((m) => (
            <li key={m.key} className="card-surface p-3.5">
              <span className="flex items-center justify-between">
                <span className="font-display text-[15px] font-semibold text-ink">{m.label}</span>
                <span className="text-[11px] text-ink/40">{m.duration}s</span>
              </span>
              <span className="mt-1 block text-[12.5px] leading-5 text-ink/55">{m.blurb}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12.5px] text-ink/45">
          Har style har category mein milti hai — aur editor mein kabhi bhi badal sakte hain.
        </p>
      </section>

      {CATEGORIES.map((c) => {
        const list = videosByCategory(c.slug);
        if (!list.length) return null;
        return (
          <section key={c.slug} id={c.slug} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-7">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">
                <span aria-hidden className="mr-1.5">{c.emoji}</span>
                {c.name} video invites
                <span className="ml-2 font-body text-[12px] font-normal text-ink/40">{list.length} clips</span>
              </h2>
              <Link href={`/category/${c.slug}`} className="btn-chip shrink-0">Cards bhi dekhein →</Link>
            </div>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-5">
              {list.map((v) => (
                <VideoPoster key={v.slug} v={v} width={210} showCategory={false} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="seo-prose">
          <h2>Wedding invitation video kyun bhejein?</h2>
          <p>
            Aaj kal card sabse pehle WhatsApp par hi jaata hai. Ek chalta hua invite status aur
            group dono mein alag dikhta hai, log use rok kar dekhte hain, aur date-venue yaad reh
            jaata hai. Printed card apni jagah rahega — lekin digital par video ka asar zyada hai.
          </p>

          <h2>Kaise banta hai</h2>
          <ul>
            <li>Apni category se koi clip kholiye aur <strong>Edit</strong> dabaiye.</li>
            <li>Text tab mein naam, date, time, venue aur blessing line badliye.</li>
            <li>Motion tab mein animation style chuniye — {MOTIONS.length} options hain — aur chahein to apna music jodiye.</li>
            <li>Design tab se rang, border aur top symbol badal dijiye.</li>
            <li><strong>Download video</strong> dabaiye aur 10–12 second intezaar kijiye.</li>
          </ul>

          <h2>File format aur quality</h2>
          <p>
            Clip 1080×1920 par render hota hai — 9:16, yaani phone screen ke poore size mein.
            Chrome aur Edge par aam taur par MP4 milta hai, kuch browsers par WebM. Dono WhatsApp
            par bhej sakte hain; agar aapka purana phone WebM na khole to Chrome se dobara bana
            lijiye.
          </p>

          <h2>Printable card bhi chahiye?</h2>
          <p>
            Har video kisi card design par bana hai, to dono ek jaise dikhenge.{" "}
            <Link href="/templates">Card templates yahan hain</Link> — wahan se HD PNG aur
            print-ready PDF mil jaata hai.
          </p>
        </div>
      </section>

      <Faq items={FAQS} title="Video invites — aapke sawaal" />
    </>
  );
}
