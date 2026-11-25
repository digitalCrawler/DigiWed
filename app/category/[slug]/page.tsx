import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory, templatesByCategory } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import VideoPoster from "@/components/VideoPoster";
import { videosByCategory } from "@/lib/videoTemplates";
import JsonLd from "@/components/JsonLd";
import Faq, { QA } from "@/components/Faq";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: c.seoTitle,
    description: c.seoDesc,
    alternates: { canonical: `/category/${c.slug}` },
    openGraph: { url: `/category/${c.slug}`, title: c.seoTitle, description: c.seoDesc },
    keywords: [
      `${c.name.toLowerCase()} invitation card`,
      `${c.name.toLowerCase()} wedding card template`,
      `${c.hindi} card`,
      "free wedding card maker",
      "editable wedding invitation",
    ],
  };
}

const EXTRA: Record<string, { intro: string; body: { h: string; p: string }[]; faq: QA[] }> = {
  hindu: {
    intro:
      "Hindu shaadi ke card ki shuruaat hamesha mangal-kaamna se hoti hai — isliye in templates mein Shri Ganeshay Namah, Om aur kalash pehle se sahi jagah par lage hain.",
    body: [
      { h: "Card mein kya likha jaaye", p: "Sabse upar invocation (॥ श्री गणेशाय नमः ॥ ya ॥ शुभ विवाह ॥), phir vadhu-var ke naam, uske baad lagn ka din aur muhurt ka samay, venue, aur ant mein 'aapke aashirvaad ki abhilasha ke saath' ke saath parivaar ka naam. Agar tilak, mehndi, haldi aur reception alag din hain to unke liye alag card banaiye." },
      { h: "Rang ka chunaav", p: "Marigold aur maroon traditional hain; ivory-gold thoda modern aur print mein sasta padta hai; peacock teal un couples ke liye hai jo kuch alag chahte hain. Hindi text ke liye Tiro Devanagari sabse saaf padhne mein aata hai, aur Rozha One naam ko bold look deta hai." },
    ],
    faq: [
      { q: "Hindi mein Hindu wedding card bana sakte hain?", a: "Haan. Hindu category ke kai templates pehle se Hindi mein hain (Ganesh Vandana, Kalash Maroon, Roka Marigold). Editor mein Tiro Devanagari, Mukta aur Rozha One fonts hain — aap seedha Devanagari type kar sakte hain." },
      { q: "Ganesh ji ki photo laga sakte hain?", a: "Editor mein 'Om' aur 'Kalash' jaise saaf-suthre symbols diye hain jo har jagah theek chhapte hain. Agar aap apni tasveer lagana chahte hain to Add tab se photo upload karke use card par rakh sakte hain." },
      { q: "Muhurt ka samay kaise likhein?", a: "Din ka naam, taarikh aur samay — teeno likhiye, jaise 'रविवार, १५ फरवरी २०२६ · सायं ७:०० बजे से'. Mehmaan ko din ka naam dekh kar hi yaad rehta hai." },
    ],
  },
  muslim: {
    intro:
      "Nikah ke invitation mein sabse pehle Bismillah aati hai. In templates mein Arabic calligraphy, Islamic arch aur geometric border pehle se set hain — aap sirf naam aur venue badliye.",
    body: [
      { h: "Nikah aur Walima — do alag card", p: "Nikah ceremony aur Walima reception ka invite alag hona behtar hai, kyunki guests dono mein alag ho sakte hain. Walima card ke liye Reception & Walima category dekhiye." },
      { h: "Urdu ya English", p: "Heading Arabic/Urdu mein rakh kar baaki details English mein likhna sabse common hai — aur padhne mein sabse aasaan. Editor mein Noto Nastaliq (Urdu) aur Amiri (Arabic) dono hain, aur RTL text theek render hota hai." },
    ],
    faq: [
      { q: "Bismillah calligraphy pehle se lagi hoti hai?", a: "Haan — Bismillah Arch aur Nastaliq Noir templates mein upar Bismillah ki line pehle se hai. Chahein to use edit kar sakte hain ya Design tab se crescent symbol badal sakte hain." },
      { q: "Urdu text theek se aata hai?", a: "Bilkul. Noto Nastaliq Urdu font load hota hai aur us line ki direction right-to-left set hai, to Urdu sahi tarah se render hota hai — download mein bhi." },
      { q: "Walima ka card kahan milega?", a: "Reception & Walima category mein Walima Emerald template hai, jisme emerald arch aur Arabic heading pehle se lagi hai." },
    ],
  },
  christian: {
    intro:
      "Church wedding ke invite mein simplicity hi khoobsurti hai — floral wreath, ek scripture line, aur saaf typography.",
    body: [
      { h: "Scripture line", p: "Neeche ek chhoti si verse bahut achhi lagti hai — 1 Corinthians 13:4, Ecclesiastes 4:9 ya Mark 10:9 common choices hain. Template mein yeh line pehle se hai, aap apni pasand ki verse daal dijiye." },
      { h: "Ceremony aur reception", p: "Church ka naam aur time, aur phir reception ka venue — dono likhiye, lekin alag-alag lines mein. Chaahein to reception ke liye alag card banaiye." },
    ],
    faq: [
      { q: "Bible verse add kar sakte hain?", a: "Haan — footer line editable hai, bas apni verse type kar dijiye. Aap Add tab se nayi text line bhi jod sakte hain." },
      { q: "Catholic aur Protestant ke liye alag templates hain?", a: "Design dono ke liye kaam karte hain. Wording aapke haath mein hai — 'Holy Matrimony', 'Nuptial Mass' ya 'Wedding Ceremony', jo aapke church mein kaha jaata hai." },
    ],
  },
  sikh: {
    intro:
      "Anand Karaj ke card ki shuruaat ੴ se hoti hai. In templates mein Ik Onkar, Khanda aur Gurmukhi text ke liye sahi fonts lage hain.",
    body: [
      { h: "Gurudwara aur langar", p: "Gurudwara ka naam, Anand Karaj ka samay, aur langar ka zikr — teeno likh dijiye. Zyadatar parivaar 'Sarbat da bhala' ya 'Dhan Guru Nanak' footer mein rakhte hain." },
      { h: "Gurmukhi fonts", p: "Phulkari Marigold template poora Gurmukhi mein hai. Mukta aur Rozha One Gurmukhi ke saath Devanagari dono support karte hain, to mixed card bhi ban jaata hai." },
    ],
    faq: [
      { q: "Punjabi (Gurmukhi) mein card bana sakte hain?", a: "Haan — Phulkari Marigold template pehle se Gurmukhi mein hai, aur aap kisi bhi template mein Gurmukhi type kar sakte hain." },
      { q: "Khanda symbol lag jaata hai?", a: "Haan, Design tab mein 'Khanda' symbol option hai — ek click mein card ke top par aa jaata hai." },
    ],
  },
  jain: {
    intro:
      "Jain vivah ke card sattvik aur shaant hote hain — halke rang, Namokar mantra aur lotus ya Ahimsa hand jaise symbols.",
    body: [
      { h: "Mantra aur wording", p: "Upar ॥ णमोकार महामंत्र ॥ ya 'Jai Jinendra', aur neeche parivaar ka naam — yahi classic format hai. Bhojan ke timing ka zikr bhi kai parivaar card par karte hain." },
      { h: "Rang", p: "Ivory-gold, shwet-sage aur lavender teeno hamare Jain templates mein hain. Yeh teeno print mein bahut saaf aate hain aur shaadi ke mandap ke decor se match karte hain." },
    ],
    faq: [
      { q: "Namokar mantra pehle se hota hai?", a: "Haan — Namokar Ivory template mein upar mantra line pehle se hai, aur editable hai." },
      { q: "Ahimsa hand symbol milta hai?", a: "Haan, Design tab mein 'Ahimsa' symbol option hai — hatheli ke saath dharma chakra bana hua hai." },
    ],
  },
  buddhist: {
    intro:
      "Buddhist wedding cards mein Dharmachakra, lotus aur metta ki ek line — bas itna hi kaafi hai.",
    body: [
      { h: "Blessing lines", p: "'Sabbe satta sukhi hontu', 'May all beings be happy' ya 'सर्वे भवन्तु सुखिनः' — koi bhi line footer mein daal sakte hain. Templates mein yeh pehle se hai." },
      { h: "Simple rakhein", p: "Buddhist invites mein kam decoration aur zyada khaali jagah achhi lagti hai. Teal aur sage palettes isi wajah se chuni gayi hain." },
    ],
    faq: [
      { q: "Dharmachakra symbol hai?", a: "Haan — Design tab mein 'Chakra' option aath spokes wala Dharmachakra lagata hai." },
      { q: "Hindi mein Buddhist card hai?", a: "Haan, 'Bodhi Hindi' template poora Hindi mein hai." },
    ],
  },
  interfaith: {
    intro:
      "Jab do parivaar do dharm se aate hain, card ko dono ka sammaan karna chahiye — na kisi ek ka symbol haavi ho, na koi chhoot jaaye.",
    body: [
      { h: "Neutral design, warm wording", p: "Hamare interfaith templates mein koi religious symbol zaroori nahi — heart, rings ya wreath jaisa neutral motif hai. Wording aisi hai jo dono taraf ko apni lage." },
      { h: "Court marriage", p: "Registry wedding ke liye 'Court Marriage Card' template hai — Registrar office ka naam, time aur chhoti celebration ka zikr, sab fit ho jaata hai." },
    ],
    faq: [
      { q: "Dono dharm ke symbols daal sakte hain?", a: "Haan — Design tab se ek symbol chuniye, aur Add tab se text line jod kar doosri tradition ka blessing likh dijiye." },
      { q: "Court marriage ka card kaisa hona chahiye?", a: "Chhota aur seedha: naam, Registrar office ka address, date-time, aur celebration ka plan. Zyada formality ki zaroorat nahi." },
    ],
  },
  modern: {
    intro:
      "Kam decoration, badi typography, bahut saari khaali jagah — Instagram aur WhatsApp par yeh cards sabse achhe lagte hain.",
    body: [
      { h: "Type hi design hai", p: "Minimal card mein font ka chunaav sab kuch hai. Cinzel + Italiana editorial look deta hai, Parisienne romantic, aur Playfair Display safe middle ground hai." },
      { h: "Save the date", p: "Agar poori detail abhi tay nahi hai, to pehle 'Save the Date' bhej dijiye — sirf naam aur date. Baad mein poora invite bhejiye." },
    ],
    faq: [
      { q: "Instagram story size mein milega?", a: "Card 5:7 ratio ka hai, jo story mein bhi theek dikhta hai. Download karke story par daal dijiye — ya Share button se seedha bhej dijiye." },
      { q: "Dark card print karwa sakte hain?", a: "Ha, lekin dark background mein ink zyada lagti hai aur cost badh jaati hai. Print ke liye ivory ya blush behtar hai; dark card digital bhejne ke liye best hai." },
    ],
  },
  engagement: {
    intro:
      "Roka, sagai ya ring ceremony — chhoti function hoti hai, isliye card bhi halka-phulka aur khushnuma hona chahiye.",
    body: [
      { h: "Kitni detail?", p: "Engagement card mein venue aur time ke saath ek line celebration ke baare mein likh dena achha lagta hai — 'cocktails, cake aur bahut saari photos'. Formality kam rakhiye." },
      { h: "Photo wala card", p: "Sagai Lavender template mein couple photo ka round frame hai — bahut personal lagta hai aur guests ko turant samajh aa jaata hai." },
    ],
    faq: [
      { q: "Roka aur sagai ka card alag hota hai?", a: "Wording alag hoti hai — roka mein dono parivaaron ka milna mukhya hai, sagai mein ring ceremony. Hamare 'Roka Marigold' template mein dono ka mention hai, aap edit kar sakte hain." },
      { q: "Photo laga sakte hain?", a: "Haan — Add tab mein 'Couple photo upload karein' se photo lag jaati hai, aur shape circle/rounded/arch choose kar sakte hain." },
    ],
  },
  "haldi-mehndi": {
    intro:
      "Haldi, mehndi aur sangeet ke card mein rang aur mazaa dono chahiye — formal tone ki zaroorat nahi.",
    body: [
      { h: "Dress code likhiye", p: "Yeh sabse kaam ki cheez hai — 'peele kapde pehan kar aaiye' ya 'green & gold dress code'. Guests ko isi se sabse zyada madad milti hai." },
      { h: "Timing saaf likhein", p: "Haldi subah hoti hai, mehndi shaam ko, sangeet raat ko. Time ke saath 'onwards' ya 'baje se' likhiye taaki log aaram se aayein." },
    ],
    faq: [
      { q: "Teeno functions ka ek card bana sakte hain?", a: "Ban sakta hai, par padhna mushkil ho jaata hai. Behtar hai teen alag card banaiye — editor mein ek card banane ke baad naam-date badal kar doosra bhi do minute mein ban jaata hai." },
      { q: "WhatsApp status ke liye theek rahega?", a: "Haan — bright templates status par sabse zyada dikhte hain. Download HD se image save kijiye aur seedha lagaa dijiye." },
    ],
  },
  reception: {
    intro:
      "Reception aur Walima ka card thoda formal hota hai — shaam ka time, dress code aur venue sabse zaroori.",
    body: [
      { h: "Formal wording", p: "'Request the pleasure of your company for dinner and dancing' jaisi line reception par achhi lagti hai. Walima ke liye 'cordially invited to the Walima reception of' standard hai." },
      { h: "Dress code", p: "Agar black tie ya ethnic formal chahte hain to card par likh dijiye — guests ko achha lagta hai aur photos bhi behtar aati hain." },
    ],
    faq: [
      { q: "Just-married card bhi hai?", a: "Haan — 'Reception Photo Rose' template 'Just Married' heading ke saath aata hai, couple photo ke frame ke saath." },
      { q: "Walima aur reception mein kya farq hai?", a: "Walima Nikah ke baad di jaane wali dawat hai; reception general wedding party. Wording ke alawa card ka format kaafi milta-julta hai." },
    ],
  },
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const list = templatesByCategory(slug);
  const videos = videosByCategory(slug);
  const extra = EXTRA[slug];
  const others = CATEGORIES.filter((x) => x.slug !== slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Templates", path: "/templates" },
        { name: c.name, path: `/category/${c.slug}` },
      ])} />
      <JsonLd data={itemListJsonLd(
        `${c.name} invitation card templates`,
        list.map((t) => ({ name: t.name, path: `/templates/${t.slug}` }))
      )} />

      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink/40">
          <Link href="/" className="hover:text-moss">Home</Link> <span className="px-1">/</span>
          <Link href="/templates" className="hover:text-moss">Templates</Link> <span className="px-1">/</span>
          <span className="text-ink/60">{c.name}</span>
        </nav>

        <h1 className="font-display text-[1.9rem] font-semibold leading-tight text-ink sm:text-4xl">
          <span aria-hidden className="mr-2">{c.emoji}</span>
          {c.name} invitation cards
        </h1>
        <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-ink/40">{c.hindi}</p>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/65">
          {extra?.intro || c.blurb} {list.length} card designs aur {videos.length} video invites —
          sab free, aur editor mein naam, date, venue, rang aur font sab badal sakte hain.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="#cards" className="btn-chip">🖼️ {list.length} printable cards</a>
          <a href="#videos" className="btn-chip">🎬 {videos.length} video invites</a>
        </div>
      </section>

      <section id="cards" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-8">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">
          {c.name} cards <span className="font-body text-[12px] font-normal text-ink/40">{list.length} designs</span>
        </h2>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((t) => (
            <TemplateCard key={t.slug} t={t} width={250} showCategory={false} />
          ))}
        </div>
      </section>

      {videos.length ? (
        <section id="videos" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                🎬 {c.name} video invitations
              </h2>
              <p className="mt-1 text-[13.5px] text-ink/55">
                Wahi designs, chalte hue — 1080×1920 clip, WhatsApp status ke liye bilkul sahi.
              </p>
            </div>
            <Link href="/videos" className="btn-chip shrink-0">Saare videos →</Link>
          </div>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-5">
            {videos.map((v) => (
              <VideoPoster key={v.slug} v={v} width={210} showCategory={false} />
            ))}
          </div>
        </section>
      ) : null}

      {extra ? (
        <section className="mx-auto max-w-3xl px-4 py-8">
          <div className="seo-prose">
            <h2>{c.name} card banate waqt kya dhyaan rakhein</h2>
            {extra.body.map((b) => (
              <div key={b.h}>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {extra ? <Faq items={extra.faq} title={`${c.name} cards — aapke sawaal`} /> : null}

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Doosri categories</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/category/${o.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-moss/15 bg-parchment/80 px-3.5 py-2 text-[13px] font-medium text-ink/70 transition hover:border-sage hover:text-ink"
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
