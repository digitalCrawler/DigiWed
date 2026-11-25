import { FontKey } from "./fonts";

export const CARD_W = 1000;
export const CARD_H = 1400;

export type ColorToken = "ink" | "accent" | "gold" | "soft" | "bg";
export type FrameKey = "mandala" | "arch" | "wreath" | "minimal" | "corners" | "temple" | "ring" | "paisley";
export type MotifKey =
  | "om" | "kalash" | "lotus" | "bismillah" | "cross" | "khanda"
  | "chakra" | "rings" | "jain" | "dove" | "heart" | "none";

export interface Palette {
  id: string; label: string;
  bg: string; bg2: string; ink: string; accent: string; gold: string; soft: string;
  dark?: boolean;
}

export interface CardField {
  id: string;
  type: "text" | "image";
  label: string;
  text?: string;
  src?: string;
  x: number; y: number; w: number; h?: number;
  align: "left" | "center" | "right";
  font?: FontKey;
  size?: number;
  weight?: number;
  color?: ColorToken | string;
  tracking?: number;
  lineHeight?: number;
  italic?: boolean;
  caps?: boolean;
  opacity?: number;
  rotate?: number;
  rtl?: boolean;
  shape?: "circle" | "rounded" | "arch";
}

export interface CardDesign {
  palette: Palette;
  frame: FrameKey;
  motif: MotifKey;
  texture: "none" | "dots" | "paper" | "rays";
  fields: CardField[];
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  category: string;
  blurb: string;
  tags: string[];
  design: CardDesign;
}

export interface Category {
  slug: string; name: string; subtitle: string; emoji: string;
  blurb: string; seoTitle: string; seoDesc: string;
}

export const CATEGORIES: Category[] = [
  { slug: "hindu", name: "Hindu Wedding", subtitle: "Hindu Vivah", emoji: "🪔",
    blurb: "Ganesh vandana, mandala art aur marigold shades — traditional Hindu shaadi cards.",
    seoTitle: "Hindu Wedding Invitation Card Maker — Free Editable Templates",
    seoDesc: "Create Hindu wedding invitation cards online free. Ganesh ji, mandala and marigold templates in Hindi & English. Edit names, date, venue and download HD PNG or PDF." },
  { slug: "muslim", name: "Muslim Nikah", subtitle: "Nikah", emoji: "🕌",
    blurb: "Bismillah calligraphy, Islamic arches aur geometric patterns ke saath Nikah invites.",
    seoTitle: "Muslim Nikah Invitation Card Maker — Free Islamic Templates",
    seoDesc: "Design Nikah and Walima invitation cards online free. Bismillah calligraphy, Islamic arch and geometric templates. Editable in Urdu, Hindi and English." },
  { slug: "christian", name: "Christian Wedding", subtitle: "Christian Vivah", emoji: "⛪",
    blurb: "Floral wreaths, doves aur scripture lines — classic church wedding invites.",
    seoTitle: "Christian Wedding Invitation Card Maker — Free Church Templates",
    seoDesc: "Make Christian wedding invitation cards online free. Floral wreath, dove and cross templates with Bible verse lines. Edit and download instantly." },
  { slug: "sikh", name: "Anand Karaj", subtitle: "Anand Karaj", emoji: "🪯",
    blurb: "Ik Onkar, Khanda aur Punjabi phulkari rang — Anand Karaj invitations.",
    seoTitle: "Sikh Anand Karaj Invitation Card Maker — Free Templates",
    seoDesc: "Create Sikh wedding (Anand Karaj) invitation cards free online. Ik Onkar and Khanda templates in Punjabi, Hindi and English. Download HD PNG or PDF." },
  { slug: "jain", name: "Jain Vivah", subtitle: "Jain Vivah", emoji: "🤍",
    blurb: "Shant, sattvik design — Namokar mantra ke saath Jain wedding cards.",
    seoTitle: "Jain Wedding Invitation Card Maker — Free Editable Templates",
    seoDesc: "Design Jain wedding invitation cards online free. Namokar mantra, lotus and ivory-gold templates. Fully editable names, date, venue — instant download." },
  { slug: "buddhist", name: "Buddhist Wedding", subtitle: "Bauddh Vivah", emoji: "☸️",
    blurb: "Dharmachakra, lotus aur peaceful palettes — Buddhist wedding invites.",
    seoTitle: "Buddhist Wedding Invitation Card Maker — Free Templates",
    seoDesc: "Create Buddhist wedding invitation cards free. Dharmachakra and lotus templates with Pali blessing lines. Edit online and download HD." },
  { slug: "interfaith", name: "Interfaith & Court", subtitle: "Antardharmik / Court Marriage", emoji: "🤝",
    blurb: "Do dharm, ek pyaar — neutral yet beautiful interfaith aur court marriage cards.",
    seoTitle: "Interfaith & Court Marriage Invitation Card Maker — Free",
    seoDesc: "Interfaith and court marriage invitation card templates, free and editable. Neutral elegant designs for registry weddings. Download PNG or PDF." },
  { slug: "modern", name: "Modern & Minimal", subtitle: "Modern Minimal", emoji: "✨",
    blurb: "Clean type, lots of space — Instagram-ready minimal save the dates.",
    seoTitle: "Modern Minimal Wedding Invitation Card Maker — Free Templates",
    seoDesc: "Modern minimal wedding invitation and save-the-date templates. Clean typography, editable online, free HD download for WhatsApp and Instagram." },
  { slug: "engagement", name: "Engagement & Roka", subtitle: "Sagai / Roka", emoji: "💍",
    blurb: "Ring ceremony, roka aur sagai ke liye pyare invitation cards.",
    seoTitle: "Engagement & Roka Invitation Card Maker — Free Templates",
    seoDesc: "Free engagement, roka and sagai invitation card maker. Editable ring-ceremony templates in Hindi and English. Download instantly in HD." },
  { slug: "haldi-mehndi", name: "Haldi, Mehndi & Sangeet", subtitle: "Haldi, Mehndi, Sangeet", emoji: "💛",
    blurb: "Bright, playful cards for haldi, mehndi aur sangeet nights.",
    seoTitle: "Haldi, Mehndi & Sangeet Invitation Card Maker — Free",
    seoDesc: "Create haldi, mehndi and sangeet invitation cards online free. Bright playful editable templates. Perfect for WhatsApp status and Instagram stories." },
  { slug: "reception", name: "Reception & Walima", subtitle: "Reception / Walima", emoji: "🥂",
    blurb: "Evening reception aur walima ke liye elegant, formal invites.",
    seoTitle: "Reception & Walima Invitation Card Maker — Free Templates",
    seoDesc: "Reception and Walima invitation card templates, free and fully editable. Elegant evening designs. Edit names and venue, download HD PNG or PDF." },
];

export const PALETTES: Palette[] = [
  { id: "marigold",  label: "Marigold",     bg: "#FFF8EC", bg2: "#FBE7C4", ink: "#4A2E12", accent: "#C8761F", gold: "#B98A2B", soft: "#9A7A52" },
  { id: "rosegold",  label: "Rose Gold",    bg: "#FFF6F3", bg2: "#F8DCD4", ink: "#4B2C28", accent: "#C4756B", gold: "#BE8C68", soft: "#98756F" },
  { id: "emerald",   label: "Emerald",      bg: "#F4FAF6", bg2: "#D3E8DB", ink: "#16342A", accent: "#1F6B4F", gold: "#A9872F", soft: "#4E6F61" },
  { id: "royal",     label: "Royal Blue",   bg: "#F5F8FF", bg2: "#D8E2F6", ink: "#1B2545", accent: "#2B4A8C", gold: "#B99A3F", soft: "#566585" },
  { id: "maroon",    label: "Maroon",       bg: "#FFF6F6", bg2: "#F4D6D3", ink: "#44161A", accent: "#8E2230", gold: "#B68A43", soft: "#80555A" },
  { id: "ivory",     label: "Ivory Gold",   bg: "#FFFCF5", bg2: "#F0E4C9", ink: "#3A3328", accent: "#9A7C30", gold: "#C0A049", soft: "#7A6F58" },
  { id: "blush",     label: "Blush Pink",   bg: "#FFF9FA", bg2: "#F9E0E6", ink: "#43282F", accent: "#C06E85", gold: "#C0966F", soft: "#8E6B74" },
  { id: "teal",      label: "Peacock Teal", bg: "#F3FAFA", bg2: "#CFE8E7", ink: "#11322F", accent: "#17706B", gold: "#AE8A39", soft: "#4C726F" },
  { id: "lavender",  label: "Lavender",     bg: "#FAF7FF", bg2: "#E3DAF5", ink: "#2E2544", accent: "#6B52A3", gold: "#AE9450", soft: "#6A5F85" },
  { id: "sage",      label: "Sage Green",   bg: "#F7FAF4", bg2: "#DDE9D2", ink: "#263122", accent: "#5E7A4A", gold: "#A78D45", soft: "#627056" },
  { id: "noir",      label: "Midnight",     bg: "#171310", bg2: "#271F17", ink: "#F3E8D6", accent: "#D9B35C", gold: "#E6C878", soft: "#BCAE94", dark: true },
  { id: "peach",     label: "Peach",        bg: "#FFF8F2", bg2: "#F9DFC9", ink: "#4A2F1F", accent: "#D0834A", gold: "#BE9558", soft: "#92705B" },
  { id: "sky",       label: "Sky Blue",     bg: "#F6FAFE", bg2: "#D9E7F6", ink: "#1C2C3A", accent: "#37699A", gold: "#B2944D", soft: "#566C80" },
  { id: "plum",      label: "Plum",         bg: "#FDF6FA", bg2: "#EED7E6", ink: "#3B2033", accent: "#8E3D6E", gold: "#B78D55", soft: "#7C5C70" },
  // the site's own VERDURE palette, offered as a card theme too
  { id: "verdure",   label: "Verdure",      bg: "#F3ECD9", bg2: "#DCE3CE", ink: "#26301F", accent: "#55673F", gold: "#B08D3E", soft: "#7D9273" },
];

export const pal = (id: string) => PALETTES.find((p) => p.id === id) || PALETTES[0];

/* ---------------- copy presets ---------------- */
interface Copy {
  eyebrow: string; invite: string; n1: string; join: string; n2: string;
  date: string; time: string; venueLabel: string; venue: string; footer: string; hosts: string;
  eyebrowFont?: FontKey; eyebrowRtl?: boolean;
  script?: "en" | "hi" | "pa";
}

const HI: Copy = {
  eyebrow: "॥ शुभ विवाह ॥",
  invite: "आपकी गरिमामयी उपस्थिति हमारे लिए\nसौभाग्य की बात होगी",
  n1: "आँचल", join: "विवाह सूत्र", n2: "रोहित",
  date: "रविवार, १५ फरवरी २०२६", time: "सायं ७:०० बजे से",
  venueLabel: "स्थान", venue: "श्री कृष्णा गार्डन, सिविल लाइंस\nजयपुर, राजस्थान",
  footer: "आपके आशीर्वाद की अभिलाषा के साथ", hosts: "— शर्मा एवं वर्मा परिवार",
};

const EN: Copy = {
  eyebrow: "THE WEDDING OF",
  invite: "Together with their families, request the\nhonour of your presence",
  n1: "Aanchal", join: "WEDS", n2: "Rohit",
  date: "Sunday, 15 February 2026", time: "7:00 PM onwards",
  venueLabel: "VENUE", venue: "Shri Krishna Garden, Civil Lines\nJaipur, Rajasthan",
  footer: "With love, and your blessings", hosts: "— The Sharma & Verma Families",
};

const copy = (base: Copy, over: Partial<Copy> = {}): Copy => ({ ...base, ...over });

/* ---------------- layouts ---------------- */
type LayoutKey = "classic" | "grand" | "photo" | "banner";

interface Look {
  display: FontKey; names: FontKey; body: FontKey;
  nameSize?: number; joinCaps?: boolean;
}

function buildFields(layout: LayoutKey, c: Copy, look: Look): CardField[] {
  const { display, names, body } = look;
  const ns = look.nameSize ?? (layout === "grand" ? 108 : layout === "photo" ? 78 : 92);
  const T = (
    id: string, label: string, text: string, y: number, size: number,
    extra: Partial<CardField> = {}
  ): CardField => ({
    id, type: "text", label, text, x: 140, y, w: CARD_W - 280,
    align: "center", font: body, size, weight: 400, color: "ink", lineHeight: 1.4, ...extra,
  });

  if (layout === "grand") {
    return [
      T("n1", "Name 1", c.n1, 250, ns, { font: names, lineHeight: 1.05 }),
      T("join", "Joining word", c.join, 250 + ns + 34, 28, { color: "accent", tracking: 8, caps: look.joinCaps !== false }),
      T("n2", "Name 2", c.n2, 250 + ns + 100, ns, { font: names, lineHeight: 1.05 }),
      T("eyebrow", "Top line", c.eyebrow, 690, 26, { font: c.eyebrowFont ?? display, color: "accent", tracking: 6, rtl: c.eyebrowRtl }),
      T("invite", "Invite line", c.invite, 745, 27, { color: "soft", lineHeight: 1.55 }),
      T("date", "Date", c.date, 878, 46, { font: display }),
      T("time", "Time", c.time, 954, 26, { color: "soft" }),
      T("venueLabel", "Venue label", c.venueLabel, 1024, 21, { color: "accent", tracking: 8, caps: true }),
      T("venue", "Venue", c.venue, 1060, 28, { font: display, lineHeight: 1.45 }),
      T("footer", "Blessing line", c.footer, 1196, 26, { color: "soft", italic: true }),
      T("hosts", "Hosts", c.hosts, 1256, 24, { color: "accent" }),
    ];
  }
  if (layout === "photo") {
    return [
      { id: "photo", type: "image", label: "Couple photo", x: 350, y: 196, w: 300, h: 300, align: "center", shape: "circle" },
      T("eyebrow", "Top line", c.eyebrow, 542, 25, { font: c.eyebrowFont ?? display, color: "accent", tracking: 7, rtl: c.eyebrowRtl }),
      T("n1", "Name 1", c.n1, 586, ns, { font: names, lineHeight: 1.05 }),
      T("join", "Joining word", c.join, 586 + ns + 22, 26, { color: "accent", tracking: 8, caps: look.joinCaps !== false }),
      T("n2", "Name 2", c.n2, 586 + ns + 82, ns, { font: names, lineHeight: 1.05 }),
      T("invite", "Invite line", c.invite, 860, 25, { color: "soft", lineHeight: 1.55 }),
      T("date", "Date", c.date, 960, 42, { font: display }),
      T("time", "Time", c.time, 1022, 25, { color: "soft" }),
      T("venue", "Venue", c.venue, 1080, 27, { font: display, lineHeight: 1.45 }),
      T("footer", "Blessing line", c.footer, 1205, 25, { color: "soft", italic: true }),
      T("hosts", "Hosts", c.hosts, 1262, 23, { color: "accent" }),
    ];
  }
  if (layout === "banner") {
    return [
      T("eyebrow", "Top line", c.eyebrow, 232, 30, { font: c.eyebrowFont ?? display, color: "accent", tracking: 10, rtl: c.eyebrowRtl }),
      T("invite", "Invite line", c.invite, 300, 26, { color: "soft", lineHeight: 1.6 }),
      T("n1", "Name 1", c.n1, 420, ns, { font: names, lineHeight: 1.05 }),
      T("join", "Joining word", c.join, 420 + ns + 18, 27, { color: "accent", tracking: 10, caps: look.joinCaps !== false }),
      T("n2", "Name 2", c.n2, 420 + ns + 76, ns, { font: names, lineHeight: 1.05 }),
      T("date", "Date", c.date, 790, 52, { font: display, color: "accent", tracking: 2 }),
      T("time", "Time", c.time, 866, 26, { color: "soft" }),
      T("venueLabel", "Venue label", c.venueLabel, 946, 21, { color: "accent", tracking: 8, caps: true }),
      T("venue", "Venue", c.venue, 982, 29, { font: display, lineHeight: 1.45 }),
      T("footer", "Blessing line", c.footer, 1180, 26, { color: "soft", italic: true }),
      T("hosts", "Hosts", c.hosts, 1248, 24, { color: "accent" }),
    ];
  }
  return [
    T("eyebrow", "Top line", c.eyebrow, 246, 26, { font: c.eyebrowFont ?? display, color: "accent", tracking: 8, rtl: c.eyebrowRtl }),
    T("invite", "Invite line", c.invite, 300, 26, { color: "soft", lineHeight: 1.55 }),
    T("n1", "Name 1", c.n1, 404, ns, { font: names, lineHeight: 1.05 }),
    T("join", "Joining word", c.join, 404 + ns + 20, 27, { color: "accent", tracking: 8, caps: look.joinCaps !== false }),
    T("n2", "Name 2", c.n2, 404 + ns + 78, ns, { font: names, lineHeight: 1.05 }),
    T("date", "Date", c.date, 740, 46, { font: display }),
    T("time", "Time", c.time, 816, 26, { color: "soft" }),
    T("venueLabel", "Venue label", c.venueLabel, 890, 21, { color: "accent", tracking: 8, caps: true }),
    T("venue", "Venue", c.venue, 926, 29, { font: display, lineHeight: 1.45 }),
    T("footer", "Blessing line", c.footer, 1168, 26, { color: "soft", italic: true }),
    T("hosts", "Hosts", c.hosts, 1238, 24, { color: "accent" }),
  ];
}

interface Spec {
  name: string; blurb: string; tags: string[];
  paletteId: string; frame: FrameKey; motif: MotifKey;
  texture?: CardDesign["texture"];
  layout: LayoutKey; look: Look; copy: Copy;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function mk(category: string, s: Spec): Template {
  return {
    id: `${category}-${slugify(s.name)}`,
    slug: slugify(`${s.name}-${category}`),
    name: s.name,
    category,
    blurb: s.blurb,
    tags: s.tags,
    design: {
      palette: pal(s.paletteId),
      frame: s.frame,
      motif: s.motif,
      texture: s.texture ?? "none",
      fields: buildFields(s.layout, s.copy, s.look),
    },
  };
}

const SPECS: Array<[string, Spec]> = [
  /* ---------- HINDU ---------- */
  ["hindu", { name: "Ganesh Vandana", blurb: "Mandala arcs, marigold gold aur Shri Ganeshay Namah.",
    tags: ["mandala", "marigold", "hindi", "traditional"], paletteId: "marigold", frame: "mandala", motif: "om", texture: "rays",
    layout: "classic", look: { display: "tiro", names: "rozha", body: "tiro", nameSize: 86 },
    copy: copy(HI, { eyebrow: "॥ श्री गणेशाय नमः ॥" }) }],
  ["hindu", { name: "Kalash Maroon", blurb: "Deep maroon, temple arch aur kalash motif — royal feel.",
    tags: ["maroon", "temple", "kalash", "royal"], paletteId: "maroon", frame: "temple", motif: "kalash",
    layout: "grand", look: { display: "tiro", names: "rozha", body: "tiro", nameSize: 96 },
    copy: copy(HI, { eyebrow: "॥ शुभ लग्न ॥" }) }],
  ["hindu", { name: "Peacock Paisley", blurb: "Peacock teal aur ambi paisley border — modern desi.",
    tags: ["paisley", "teal", "peacock"], paletteId: "teal", frame: "paisley", motif: "lotus",
    layout: "banner", look: { display: "cormorant", names: "playfair", body: "inter", nameSize: 90 },
    copy: copy(EN, { eyebrow: "SHUBH VIVAH" }) }],
  ["hindu", { name: "Haldi Gold Photo", blurb: "Couple photo ke saath warm ivory-gold card.",
    tags: ["photo", "gold", "ivory"], paletteId: "ivory", frame: "corners", motif: "om", texture: "paper",
    layout: "photo", look: { display: "cinzel", names: "greatvibes", body: "lora", nameSize: 80 },
    copy: copy(EN, { eyebrow: "SHREE GANESHAY NAMAH" }) }],

  /* ---------- MUSLIM ---------- */
  ["muslim", { name: "Bismillah Arch", blurb: "Islamic pointed arch, bismillah calligraphy aur emerald gold.",
    tags: ["nikah", "arch", "emerald", "calligraphy"], paletteId: "emerald", frame: "arch", motif: "bismillah",
    layout: "classic", look: { display: "amiri", names: "amiri", body: "lora", nameSize: 84 },
    copy: copy(EN, { eyebrow: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", eyebrowFont: "amiri", eyebrowRtl: true,
      invite: "We request the honour of your presence\nat the Nikah ceremony of",
      n1: "Ayesha", n2: "Imran", join: "WITH", venueLabel: "NIKAH VENUE",
      venue: "Hotel Mehfil Banquet, Hazratganj\nLucknow, Uttar Pradesh",
      footer: "Barakallahu lakuma wa baraka alaikuma", hosts: "— The Siddiqui & Khan Families" }) }],
  ["muslim", { name: "Nastaliq Noir", blurb: "Midnight black + gold, Urdu nastaliq heading.",
    tags: ["urdu", "black", "gold", "nikah"], paletteId: "noir", frame: "arch", motif: "bismillah",
    layout: "grand", look: { display: "nastaliq", names: "playfair", body: "inter", nameSize: 96 },
    copy: copy(EN, { eyebrow: "نکاح مبارک", eyebrowFont: "nastaliq", eyebrowRtl: true,
      invite: "Request the pleasure of your company\nat the Nikah of", n1: "Zoya", n2: "Faizan", join: "AND",
      venue: "Jashn Palace, Charminar Road\nHyderabad, Telangana",
      footer: "Alhamdulillah — all praise to Allah", hosts: "— The Ahmed & Qureshi Families" }) }],
  ["muslim", { name: "Geometric Sky", blurb: "Soft sky blue with crisp geometric border.",
    tags: ["geometric", "blue", "minimal", "nikah"], paletteId: "sky", frame: "minimal", motif: "none",
    layout: "banner", look: { display: "marcellus", names: "cormorant", body: "inter", nameSize: 94 },
    copy: copy(EN, { eyebrow: "NIKAH CEREMONY", invite: "In the name of Allah, the most Gracious,\nwe invite you to the Nikah of",
      n1: "Sana", n2: "Arham", join: "AND", footer: "Your duas mean the world to us", hosts: "— The Shaikh & Mirza Families" }) }],

  /* ---------- CHRISTIAN ---------- */
  ["christian", { name: "Floral Wreath", blurb: "Hand-drawn wreath, sage green aur scripture line.",
    tags: ["wreath", "sage", "church", "floral"], paletteId: "sage", frame: "wreath", motif: "cross",
    layout: "classic", look: { display: "cormorant", names: "parisienne", body: "lora", nameSize: 94 },
    copy: copy(EN, { eyebrow: "THE MARRIAGE OF", invite: "You are warmly invited to witness\nthe holy matrimony of",
      n1: "Elisa", n2: "Daniel", join: "AND", venueLabel: "CHURCH",
      venue: "St. Thomas Cathedral, Fort\nMumbai, Maharashtra",
      footer: "“Love is patient, love is kind.” — 1 Cor 13:4", hosts: "— The D'Souza & Fernandes Families" }) }],
  ["christian", { name: "Dove And Lace", blurb: "Blush lace corners with a gentle dove motif.",
    tags: ["dove", "blush", "lace"], paletteId: "blush", frame: "corners", motif: "dove",
    layout: "grand", look: { display: "italiana", names: "greatvibes", body: "lora", nameSize: 104 },
    copy: copy(EN, { eyebrow: "TOGETHER FOREVER", invite: "With joyful hearts we invite you\nto our wedding ceremony",
      n1: "Maria", n2: "Joseph", join: "AND", venueLabel: "CHURCH",
      venue: "Holy Family Church, Panjim\nGoa", footer: "What God has joined together", hosts: "— The Pereira & Rodrigues Families" }) }],
  ["christian", { name: "Chapel Photo", blurb: "Round couple photo, ivory + gold, classic chapel style.",
    tags: ["photo", "ivory", "classic"], paletteId: "ivory", frame: "minimal", motif: "cross", texture: "paper",
    layout: "photo", look: { display: "cinzel", names: "playfair", body: "inter", nameSize: 76 },
    copy: copy(EN, { eyebrow: "SAVE OUR DATE", n1: "Rachel", n2: "Thomas", join: "AND",
      footer: "A new beginning, blessed by God", hosts: "— The Mathew & Varghese Families" }) }],

  /* ---------- SIKH ---------- */
  ["sikh", { name: "Ik Onkar Khanda", blurb: "Khanda motif, royal blue aur gurmukhi heading.",
    tags: ["khanda", "royal", "anand karaj"], paletteId: "royal", frame: "mandala", motif: "khanda", texture: "rays",
    layout: "classic", look: { display: "marcellus", names: "playfair", body: "inter", nameSize: 88 },
    copy: copy(EN, { eyebrow: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ", invite: "With the blessings of Waheguru, we invite you\nto the Anand Karaj of",
      n1: "Simran", n2: "Jaskaran", join: "WEDS", venueLabel: "GURUDWARA",
      venue: "Gurudwara Singh Sabha, Model Town\nLudhiana, Punjab",
      footer: "Dhan Guru Nanak — your presence is our blessing", hosts: "— The Gill & Dhillon Families" }) }],
  ["sikh", { name: "Phulkari Marigold", blurb: "Punjabi phulkari rang, paisley border, dhol-ready.",
    tags: ["phulkari", "marigold", "punjabi"], paletteId: "marigold", frame: "paisley", motif: "khanda",
    layout: "banner", look: { display: "rozha", names: "rozha", body: "mukta", nameSize: 92 },
    copy: copy(HI, { eyebrow: "ੴ ਆਨੰਦ ਕਾਰਜ", n1: "ਹਰਪ੍ਰੀਤ", n2: "ਮਨਦੀਪ", join: "ਵਿਆਹ",
      invite: "ਵਾਹਿਗੁਰੂ ਜੀ ਦੀ ਕਿਰਪਾ ਨਾਲ\nਆਪ ਜੀ ਨੂੰ ਸਨਿਮਰ ਬੇਨਤੀ ਹੈ",
      venue: "ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ, ਜੀ.ਟੀ. ਰੋਡ\nਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ",
      footer: "ਤੁਹਾਡੀਆਂ ਅਸੀਸਾਂ ਦੀ ਉਮੀਦ ਨਾਲ", hosts: "— ਗਿੱਲ ਤੇ ਸੰਧੂ ਪਰਿਵਾਰ" }) }],
  ["sikh", { name: "Kesri Minimal", blurb: "Clean peach-kesri card for modern Punjabi couples.",
    tags: ["minimal", "peach", "modern"], paletteId: "peach", frame: "minimal", motif: "khanda",
    layout: "grand", look: { display: "cinzel", names: "cormorant", body: "inter", nameSize: 100 },
    copy: copy(EN, { eyebrow: "ANAND KARAJ", n1: "Noor", n2: "Arjan", join: "AND",
      invite: "Please join us for the sacred ceremony\nand the Gurudwara langar after",
      venueLabel: "GURUDWARA", footer: "Sarbat da bhala", hosts: "— The Sidhu & Bajwa Families" }) }],

  /* ---------- JAIN ---------- */
  ["jain", { name: "Namokar Ivory", blurb: "Sattvik ivory-gold, Namokar mantra ke saath.",
    tags: ["ivory", "namokar", "sattvik"], paletteId: "ivory", frame: "mandala", motif: "jain", texture: "paper",
    layout: "classic", look: { display: "tiro", names: "rozha", body: "tiro", nameSize: 84 },
    copy: copy(HI, { eyebrow: "॥ णमोकार महामंत्र ॥", invite: "जिनशासन की साक्षी में आपकी\nउपस्थिति प्रार्थनीय है",
      n1: "श्रद्धा", n2: "निखिल", join: "विवाह", footer: "जय जिनेन्द्र", hosts: "— जैन एवं सेठी परिवार" }) }],
  ["jain", { name: "Lotus Lavender", blurb: "Soft lavender with a serene lotus crown.",
    tags: ["lotus", "lavender", "serene"], paletteId: "lavender", frame: "wreath", motif: "lotus",
    layout: "grand", look: { display: "cormorant", names: "playfair", body: "inter", nameSize: 98 },
    copy: copy(EN, { eyebrow: "JAI JINENDRA", invite: "With the blessings of the Tirthankaras,\nwe invite you to the wedding of",
      n1: "Mitali", n2: "Aryan", join: "AND", footer: "Ahimsa, in love and in life", hosts: "— The Jain & Kothari Families" }) }],
  ["jain", { name: "Shwet Minimal", blurb: "Pure white-sage, bilkul shaant minimal design.",
    tags: ["white", "minimal", "sage"], paletteId: "sage", frame: "minimal", motif: "jain",
    layout: "banner", look: { display: "marcellus", names: "cormorant", body: "inter", nameSize: 92 },
    copy: copy(EN, { eyebrow: "A JAIN WEDDING", n1: "Khushi", n2: "Parth", join: "AND",
      footer: "Michhami Dukkadam — with a clean heart", hosts: "— The Shah & Mehta Families" }) }],

  /* ---------- BUDDHIST ---------- */
  ["buddhist", { name: "Dharmachakra Teal", blurb: "Eight-spoke wheel, calm teal aur Pali blessing.",
    tags: ["chakra", "teal", "pali"], paletteId: "teal", frame: "mandala", motif: "chakra", texture: "rays",
    layout: "classic", look: { display: "cormorant", names: "playfair", body: "lora", nameSize: 88 },
    copy: copy(EN, { eyebrow: "BUDDHAM SARANAM GACCHAMI", invite: "In mindfulness and metta, we invite you\nto the wedding of",
      n1: "Tashi", n2: "Rinzin", join: "AND", venue: "Shanti Vihar, Mall Road\nDarjeeling, West Bengal",
      footer: "May all beings be happy and free", hosts: "— The Lama & Bhutia Families" }) }],
  ["buddhist", { name: "Lotus Saffron", blurb: "Saffron-peach lotus card with soft temple arch.",
    tags: ["lotus", "saffron", "temple"], paletteId: "peach", frame: "temple", motif: "lotus",
    layout: "grand", look: { display: "marcellus", names: "cormorant", body: "inter", nameSize: 96 },
    copy: copy(EN, { eyebrow: "WITH LOVING KINDNESS", n1: "Dolma", n2: "Nima", join: "AND",
      footer: "Sabbe satta sukhi hontu", hosts: "— The Tamang & Sherpa Families" }) }],
  ["buddhist", { name: "Bodhi Hindi", blurb: "Hindi text ke saath bodhi-leaf wreath.",
    tags: ["hindi", "bodhi", "wreath"], paletteId: "sage", frame: "wreath", motif: "chakra",
    layout: "banner", look: { display: "tiro", names: "rozha", body: "mukta", nameSize: 90 },
    copy: copy(HI, { eyebrow: "॥ बुद्धं शरणं गच्छामि ॥", footer: "सर्वे भवन्तु सुखिनः", n1: "करुणा", n2: "सिद्धार्थ" }) }],

  /* ---------- INTERFAITH ---------- */
  ["interfaith", { name: "Two Faiths One Love", blurb: "Neutral elegant card jo dono parivaar ko suit kare.",
    tags: ["interfaith", "neutral", "elegant"], paletteId: "rosegold", frame: "wreath", motif: "heart",
    layout: "classic", look: { display: "cormorant", names: "greatvibes", body: "inter", nameSize: 96 },
    copy: copy(EN, { eyebrow: "TWO FAITHS · ONE LOVE", invite: "Our families, our traditions, one promise.\nPlease join us as we marry.",
      n1: "Aisha", n2: "Aditya", join: "AND", footer: "Love, in every language", hosts: "— The Khan & Kapoor Families" }) }],
  ["interfaith", { name: "Court Marriage Card", blurb: "Registry wedding ke liye simple, respectful invite.",
    tags: ["court", "registry", "simple"], paletteId: "sky", frame: "minimal", motif: "rings",
    layout: "banner", look: { display: "marcellus", names: "playfair", body: "inter", nameSize: 88 },
    copy: copy(EN, { eyebrow: "COURT MARRIAGE · REGISTRY", invite: "We signed on the dotted line.\nNow come celebrate with us.",
      n1: "Riya", n2: "Sameer", join: "AND", venueLabel: "REGISTRAR OFFICE",
      venue: "Sub-Registrar Office, Sector 17\nChandigarh", footer: "Officially, happily, legally us", hosts: "— With our families' love" }) }],
  ["interfaith", { name: "Mixed Heritage Noir", blurb: "Bold midnight-gold card for a big-city wedding.",
    tags: ["noir", "bold", "modern"], paletteId: "noir", frame: "corners", motif: "rings",
    layout: "grand", look: { display: "cinzel", names: "italiana", body: "inter", nameSize: 104 },
    copy: copy(EN, { eyebrow: "SAVE THE DATE", n1: "Meera", n2: "Zain", join: "AND",
      footer: "Different roots, same sky", hosts: "— The Iyer & Hussain Families" }) }],

  /* ---------- MODERN ---------- */
  ["modern", { name: "Editorial Minimal", blurb: "Magazine-style type, zero clutter.",
    tags: ["minimal", "editorial", "type"], paletteId: "ivory", frame: "minimal", motif: "none",
    layout: "banner", look: { display: "cinzel", names: "italiana", body: "inter", nameSize: 100 },
    copy: copy(EN, { eyebrow: "SAVE THE DATE", invite: "No long speeches. Just good food,\nloud music and the two of us.",
      n1: "Tara", n2: "Dev", join: "AND", footer: "Dress code: anything you can dance in", hosts: "— Tara & Dev" }) }],
  ["modern", { name: "Blush Script", blurb: "Big calligraphy name, soft blush background.",
    tags: ["script", "blush", "soft"], paletteId: "blush", frame: "minimal", motif: "heart",
    layout: "grand", look: { display: "cormorant", names: "parisienne", body: "inter", nameSize: 112 },
    copy: copy(EN, { n1: "Isha", n2: "Kabir", join: "AND", eyebrow: "WE'RE GETTING MARRIED",
      footer: "Swipe up for directions, see you there", hosts: "— Isha & Kabir" }) }],
  ["modern", { name: "Midnight Gold", blurb: "Dark luxe card — WhatsApp par alag hi dikhta hai.",
    tags: ["dark", "luxe", "gold"], paletteId: "noir", frame: "minimal", motif: "none",
    layout: "banner", look: { display: "cinzel", names: "playfair", body: "inter", nameSize: 94 },
    copy: copy(EN, { eyebrow: "THE WEDDING", n1: "Naina", n2: "Veer", join: "AND",
      footer: "Black tie, open bar, no phones at dinner", hosts: "— Naina & Veer" }) }],
  ["modern", { name: "Photo Story", blurb: "Ek bada photo + minimal type. Instagram-ready.",
    tags: ["photo", "instagram", "minimal"], paletteId: "rosegold", frame: "minimal", motif: "none",
    layout: "photo", look: { display: "marcellus", names: "greatvibes", body: "inter", nameSize: 82 },
    copy: copy(EN, { eyebrow: "SAVE OUR DATE", n1: "Anya", n2: "Rehan", join: "AND",
      footer: "Can't wait to see you there", hosts: "— Anya & Rehan" }) }],

  /* ---------- ENGAGEMENT ---------- */
  ["engagement", { name: "Ring Ceremony Rose", blurb: "Interlocking rings, rose gold shine.",
    tags: ["rings", "rosegold", "sagai"], paletteId: "rosegold", frame: "ring", motif: "rings",
    layout: "classic", look: { display: "cormorant", names: "greatvibes", body: "inter", nameSize: 94 },
    copy: copy(EN, { eyebrow: "ENGAGEMENT CEREMONY", invite: "She said yes! Join us as we celebrate\nour engagement",
      n1: "Priya", n2: "Karan", join: "AND", footer: "Cocktails, cake and lots of photos",
      hosts: "— The Agarwal & Malhotra Families" }) }],
  ["engagement", { name: "Roka Marigold", blurb: "Hindi roka card, marigold aur mandala.",
    tags: ["roka", "hindi", "marigold"], paletteId: "marigold", frame: "mandala", motif: "om",
    layout: "banner", look: { display: "tiro", names: "rozha", body: "mukta", nameSize: 92 },
    copy: copy(HI, { eyebrow: "॥ रोका एवं सगाई समारोह ॥", invite: "हमारे घर की खुशियों में शामिल होने\nके लिए सादर आमंत्रित हैं",
      join: "सगाई", footer: "आपके स्नेह एवं आशीर्वाद सहित" }) }],
  ["engagement", { name: "Sagai Lavender", blurb: "Soft lavender wreath — intimate sagai vibes.",
    tags: ["lavender", "wreath", "intimate"], paletteId: "lavender", frame: "wreath", motif: "rings",
    layout: "photo", look: { display: "marcellus", names: "parisienne", body: "inter", nameSize: 80 },
    copy: copy(EN, { eyebrow: "WE'RE ENGAGED", n1: "Shreya", n2: "Aman", join: "AND",
      footer: "Round one of forever", hosts: "— With our families" }) }],

  /* ---------- HALDI / MEHNDI / SANGEET ---------- */
  ["haldi-mehndi", { name: "Haldi Sunshine", blurb: "Bright haldi yellow, dhol aur dance ready.",
    tags: ["haldi", "yellow", "fun"], paletteId: "marigold", frame: "paisley", motif: "lotus",
    layout: "banner", look: { display: "rozha", names: "rozha", body: "mukta", nameSize: 96 },
    copy: copy(HI, { eyebrow: "॥ हल्दी समारोह ॥", invite: "पीले रंग, ढोल की थाप और हँसी —\nसब आपका इंतज़ार कर रहे हैं",
      join: "की हल्दी", time: "सुबह ११:०० बजे से", venue: "शर्मा निवास, आँगन\nजयपुर, राजस्थान",
      footer: "पीले कपड़े पहन कर आइए!", hosts: "— शर्मा परिवार" }) }],
  ["haldi-mehndi", { name: "Mehndi Green Paisley", blurb: "Mehndi green with ambi paisley everywhere.",
    tags: ["mehndi", "green", "paisley"], paletteId: "emerald", frame: "paisley", motif: "lotus",
    layout: "classic", look: { display: "cormorant", names: "playfair", body: "inter", nameSize: 90 },
    copy: copy(EN, { eyebrow: "MEHNDI NIGHT", invite: "Henna, dholki and chai till late.\nCome colour our hands.",
      n1: "Aanchal", n2: "Rohit", join: "MEHNDI", time: "5:00 PM onwards",
      footer: "Green & gold dress code, please", hosts: "— The Verma Family" }) }],
  ["haldi-mehndi", { name: "Sangeet Plum Night", blurb: "Plum + gold sangeet card — full filmy.",
    tags: ["sangeet", "plum", "night"], paletteId: "plum", frame: "corners", motif: "none",
    layout: "grand", look: { display: "cinzel", names: "dancing", body: "inter", nameSize: 104 },
    copy: copy(EN, { eyebrow: "SANGEET NIGHT", invite: "Practice your moves — the dance floor\nopens at eight",
      n1: "Aanchal", n2: "Rohit", join: "SANGEET", time: "8:00 PM till late",
      footer: "Performances, antakshari and a very long playlist", hosts: "— Both families, one stage" }) }],

  /* ---------- RECEPTION ---------- */
  ["reception", { name: "Reception Noir", blurb: "Black-tie evening reception card.",
    tags: ["reception", "black", "formal"], paletteId: "noir", frame: "minimal", motif: "none",
    layout: "banner", look: { display: "cinzel", names: "italiana", body: "inter", nameSize: 96 },
    copy: copy(EN, { eyebrow: "WEDDING RECEPTION", invite: "Mr. & Mrs. request the pleasure of your\ncompany for dinner and dancing",
      n1: "Aanchal", n2: "Rohit", join: "AND", time: "7:30 PM onwards", venueLabel: "VENUE",
      venue: "The Grand Ballroom, Rambagh Road\nJaipur, Rajasthan", footer: "Black tie preferred", hosts: "— The Sharma & Verma Families" }) }],
  ["reception", { name: "Walima Emerald", blurb: "Walima invite with emerald arch aur gold rule.",
    tags: ["walima", "emerald", "arch"], paletteId: "emerald", frame: "arch", motif: "bismillah",
    layout: "classic", look: { display: "amiri", names: "playfair", body: "lora", nameSize: 88 },
    copy: copy(EN, { eyebrow: "وَلِيمَة", eyebrowFont: "amiri", eyebrowRtl: true,
      invite: "You are cordially invited to the Walima\nreception of", n1: "Ayesha", n2: "Imran", join: "AND",
      venue: "Nawab Banquet Hall, Aminabad\nLucknow, Uttar Pradesh",
      footer: "Jazakallahu khairan for your duas", hosts: "— The Khan Family" }) }],
  ["reception", { name: "Reception Photo Rose", blurb: "Couple photo + rose gold, warm and personal.",
    tags: ["photo", "rosegold", "warm"], paletteId: "rosegold", frame: "ring", motif: "heart",
    layout: "photo", look: { display: "marcellus", names: "greatvibes", body: "inter", nameSize: 80 },
    copy: copy(EN, { eyebrow: "JUST MARRIED", invite: "We tied the knot. Now let's celebrate\nwith everyone we love.",
      n1: "Isha", n2: "Kabir", join: "AND", footer: "Dinner, dessert and a dance floor", hosts: "— Isha & Kabir" }) }],
];


/* =====================================================================
   Generated templates
   ---------------------------------------------------------------------
   Each category ships at least TARGET_PER_CATEGORY cards. The hand-authored
   SPECS above come first (they keep their nicer names and slugs); the rest
   are composed from that category's own pools of palettes, borders, crests,
   layouts and font pairings, so every one is visually distinct.
   ===================================================================== */

export const TARGET_PER_CATEGORY = 30;

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const stride = (n: number, seed: number) => {
  let s = (seed % n) || 1;
  while (gcd(s, n) !== 1) s = (s % n) + 1;
  return s;
};
const pick = <T,>(arr: T[], i: number, seed: number): T =>
  arr[(i * stride(arr.length, seed)) % arr.length];

const FRAME_WORD: Record<FrameKey, string> = {
  mandala: "Mandala", arch: "Arch", wreath: "Wreath", minimal: "Minimal",
  corners: "Filigree", temple: "Temple", ring: "Halo", paisley: "Paisley",
};

const MOTIF_PHRASE: Record<MotifKey, string> = {
  om: " and an Om crest", kalash: " and a kalash crest", lotus: " and a lotus crest",
  bismillah: " and a crescent crest", cross: " and a cross crest", khanda: " and a Khanda crest",
  chakra: " and a Dharmachakra", jain: " and the Ahimsa hand", rings: " and interlocking rings",
  dove: " and a dove", heart: " and a heart crest", none: "",
};

const LAYOUT_WORD: Record<LayoutKey, string> = {
  classic: "classic centred layout", grand: "names-first layout",
  photo: "round photo frame", banner: "banner layout",
};

const MOTIF_WORD: Record<MotifKey, string> = {
  om: "Om", kalash: "Kalash", lotus: "Lotus", bismillah: "Crescent", cross: "Cross",
  khanda: "Khanda", chakra: "Chakra", jain: "Ahimsa", rings: "Rings", dove: "Dove",
  heart: "Heart", none: "Classic",
};

/* ---- couple-name pools, by script ---- */
const COUPLES: Record<string, Array<[string, string]>> = {
  en: [["Aanchal", "Rohit"], ["Priya", "Karan"], ["Isha", "Kabir"], ["Naina", "Veer"],
       ["Tara", "Dev"], ["Meera", "Arjun"], ["Riya", "Sameer"], ["Anya", "Rehan"],
       ["Sneha", "Varun"], ["Diya", "Nikhil"], ["Kavya", "Ishaan"], ["Aditi", "Rishabh"]],
  hi: [["आँचल", "रोहित"], ["श्रद्धा", "निखिल"], ["करुणा", "सिद्धार्थ"], ["दीक्षा", "आदित्य"],
       ["मेघा", "प्रतीक"], ["सृष्टि", "वैभव"], ["नेहा", "अंकित"], ["पूजा", "हर्ष"],
       ["रिद्धि", "कार्तिक"], ["तनिषा", "यश"]],
  pa: [["ਹਰਪ੍ਰੀਤ", "ਮਨਦੀਪ"], ["ਸਿਮਰਨ", "ਜਸਕਰਨ"], ["ਕਿਰਨ", "ਗੁਰਪ੍ਰੀਤ"], ["ਨਵਜੋਤ", "ਸੁਖਦੀਪ"],
       ["ਅੰਮ੍ਰਿਤ", "ਰਵਨੀਤ"], ["ਜਸਮੀਨ", "ਮਨਵੀਰ"]],
  muslim: [["Ayesha", "Imran"], ["Zoya", "Faizan"], ["Sana", "Arham"], ["Hiba", "Zaid"],
           ["Mariam", "Yusuf"], ["Noor", "Rayyan"], ["Amna", "Bilal"], ["Fatima", "Hamza"]],
  christian: [["Elisa", "Daniel"], ["Maria", "Joseph"], ["Rachel", "Thomas"], ["Anna", "Mathew"],
              ["Sarah", "Jonathan"], ["Grace", "Samuel"], ["Lydia", "Peter"], ["Hannah", "Andrew"]],
  sikh: [["Simran", "Jaskaran"], ["Noor", "Arjan"], ["Harleen", "Gurpreet"],
         ["Jasmine", "Ravneet"], ["Amrit", "Sukhdeep"], ["Kiran", "Manveer"]],
  buddhist: [["Tashi", "Rinzin"], ["Dolma", "Nima"], ["Pema", "Tenzin"],
             ["Yangchen", "Karma"], ["Sonam", "Thupten"]],
};

/* ---- reusable font pairings ---- */
const L_EN: Look[] = [
  { display: "cormorant", names: "playfair", body: "inter", nameSize: 92 },
  { display: "cinzel", names: "italiana", body: "inter", nameSize: 98 },
  { display: "marcellus", names: "greatvibes", body: "lora", nameSize: 96 },
  { display: "playfair", names: "parisienne", body: "inter", nameSize: 100 },
  { display: "italiana", names: "cormorant", body: "lora", nameSize: 94 },
  { display: "lora", names: "dancing", body: "inter", nameSize: 96 },
  { display: "cinzel", names: "cormorant", body: "lora", nameSize: 94 },
];
const L_HI: Look[] = [
  { display: "tiro", names: "rozha", body: "tiro", nameSize: 86 },
  { display: "tiro", names: "rozha", body: "mukta", nameSize: 88 },
  { display: "mukta", names: "rozha", body: "mukta", nameSize: 90 },
  { display: "rozha", names: "rozha", body: "tiro", nameSize: 84 },
];
const L_AR: Look[] = [
  { display: "amiri", names: "playfair", body: "lora", nameSize: 90 },
  { display: "nastaliq", names: "cormorant", body: "inter", nameSize: 94 },
  { display: "amiri", names: "cormorant", body: "inter", nameSize: 92 },
  { display: "nastaliq", names: "playfair", body: "lora", nameSize: 90 },
];

interface GenCfg {
  palettes: string[];
  frames: FrameKey[];
  motifs: MotifKey[];
  looks: Look[];
  layouts: LayoutKey[];
  copies: Copy[];
  pool: string;
  subject: string;
}

const ALL_PAL = PALETTES.map((p) => p.id);
const LIGHT_PAL = ALL_PAL.filter((p) => p !== "noir");
const L4: LayoutKey[] = ["classic", "grand", "banner", "photo"];

const GEN: Record<string, GenCfg> = {
  hindu: {
    palettes: ["marigold", "maroon", "ivory", "teal", "peach", "royal", "plum", "emerald", "blush", "rosegold", "noir", "sage"],
    frames: ["mandala", "temple", "paisley", "corners", "minimal", "wreath"],
    motifs: ["om", "kalash", "lotus", "none"],
    looks: [...L_HI, ...L_EN.slice(0, 4)], layouts: L4,
    copies: [copy(HI, { eyebrow: "॥ श्री गणेशाय नमः ॥", script: "hi" }),
             copy(HI, { eyebrow: "॥ शुभ विवाह ॥", script: "hi" }),
             copy(EN, { eyebrow: "SHUBH VIVAH", script: "en" }),
             copy(EN, { eyebrow: "THE WEDDING OF", join: "WEDS", script: "en" })],
    pool: "en", subject: "traditional Hindu shaadi card",
  },
  muslim: {
    palettes: ["emerald", "noir", "sky", "ivory", "teal", "royal", "sage", "plum", "maroon", "lavender"],
    frames: ["arch", "minimal", "corners", "paisley", "mandala"],
    motifs: ["bismillah", "none", "lotus"],
    looks: [...L_AR, ...L_EN.slice(0, 3)], layouts: L4,
    copies: [copy(EN, { eyebrow: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", eyebrowFont: "amiri", eyebrowRtl: true, script: "en",
               invite: "We request the honour of your presence\nat the Nikah ceremony of", join: "WITH",
               venueLabel: "NIKAH VENUE", venue: "Hotel Mehfil Banquet, Hazratganj\nLucknow, Uttar Pradesh",
               footer: "Barakallahu lakuma wa baraka alaikuma", hosts: "— With both families' blessings" }),
             copy(EN, { eyebrow: "نکاح مبارک", eyebrowFont: "nastaliq", eyebrowRtl: true, script: "en",
               invite: "Request the pleasure of your company\nat the Nikah of", join: "AND",
               venue: "Jashn Palace, Charminar Road\nHyderabad, Telangana",
               footer: "Alhamdulillah — all praise to Allah", hosts: "— The Ahmed & Qureshi Families" }),
             copy(EN, { eyebrow: "NIKAH CEREMONY", join: "AND", script: "en",
               invite: "In the name of Allah, the most Gracious,\nwe invite you to the Nikah of",
               footer: "Your duas mean the world to us", hosts: "— The Shaikh & Mirza Families" })],
    pool: "muslim", subject: "Nikah invitation",
  },
  christian: {
    palettes: ["sage", "blush", "ivory", "lavender", "sky", "rosegold", "emerald", "peach", "plum", "noir"],
    frames: ["wreath", "corners", "minimal", "ring", "mandala"],
    motifs: ["cross", "dove", "heart", "none"],
    looks: L_EN, layouts: L4,
    copies: [copy(EN, { eyebrow: "THE MARRIAGE OF", join: "AND", script: "en",
               invite: "You are warmly invited to witness\nthe holy matrimony of",
               venueLabel: "CHURCH", venue: "St. Thomas Cathedral, Fort\nMumbai, Maharashtra",
               footer: "“Love is patient, love is kind.” — 1 Cor 13:4", hosts: "— With both families' blessings" }),
             copy(EN, { eyebrow: "TOGETHER FOREVER", join: "AND", script: "en",
               invite: "With joyful hearts we invite you\nto our wedding ceremony",
               venueLabel: "CHURCH", venue: "Holy Family Church, Panjim\nGoa",
               footer: "What God has joined together", hosts: "— The Pereira & Rodrigues Families" }),
             copy(EN, { eyebrow: "SAVE OUR DATE", join: "AND", script: "en",
               footer: "A new beginning, blessed by God", hosts: "— The Mathew & Varghese Families" })],
    pool: "christian", subject: "Christian wedding invitation",
  },
  sikh: {
    palettes: ["royal", "marigold", "peach", "ivory", "emerald", "maroon", "sky", "blush", "plum", "teal"],
    frames: ["mandala", "paisley", "minimal", "corners", "temple"],
    motifs: ["khanda", "lotus", "none"],
    looks: [...L_EN.slice(0, 4), ...L_HI], layouts: L4,
    copies: [copy(EN, { eyebrow: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ", join: "WEDS", script: "en",
               invite: "With the blessings of Waheguru, we invite you\nto the Anand Karaj of",
               venueLabel: "GURUDWARA", venue: "Gurudwara Singh Sabha, Model Town\nLudhiana, Punjab",
               footer: "Dhan Guru Nanak — your presence is our blessing", hosts: "— The Gill & Dhillon Families" }),
             copy(HI, { eyebrow: "ੴ ਆਨੰਦ ਕਾਰਜ", join: "ਵਿਆਹ", script: "pa",
               invite: "ਵਾਹਿਗੁਰੂ ਜੀ ਦੀ ਕਿਰਪਾ ਨਾਲ\nਆਪ ਜੀ ਨੂੰ ਸਨਿਮਰ ਬੇਨਤੀ ਹੈ",
               venue: "ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ, ਜੀ.ਟੀ. ਰੋਡ\nਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ",
               footer: "ਤੁਹਾਡੀਆਂ ਅਸੀਸਾਂ ਦੀ ਉਮੀਦ ਨਾਲ", hosts: "— ਗਿੱਲ ਤੇ ਸੰਧੂ ਪਰਿਵਾਰ" }),
             copy(EN, { eyebrow: "ANAND KARAJ", join: "AND", script: "en",
               invite: "Please join us for the sacred ceremony\nand the Gurudwara langar after",
               venueLabel: "GURUDWARA", footer: "Sarbat da bhala", hosts: "— The Sidhu & Bajwa Families" })],
    pool: "sikh", subject: "Anand Karaj invitation",
  },
  jain: {
    palettes: ["ivory", "lavender", "sage", "blush", "sky", "peach", "rosegold", "teal", "emerald", "plum"],
    frames: ["mandala", "wreath", "minimal", "corners", "temple"],
    motifs: ["jain", "lotus", "none"],
    looks: [...L_HI, ...L_EN.slice(0, 4)], layouts: L4,
    copies: [copy(HI, { eyebrow: "॥ णमोकार महामंत्र ॥", join: "विवाह", script: "hi",
               invite: "जिनशासन की साक्षी में आपकी\nउपस्थिति प्रार्थनीय है",
               footer: "जय जिनेन्द्र", hosts: "— जैन एवं सेठी परिवार" }),
             copy(EN, { eyebrow: "JAI JINENDRA", join: "AND", script: "en",
               invite: "With the blessings of the Tirthankaras,\nwe invite you to the wedding of",
               footer: "Ahimsa, in love and in life", hosts: "— The Jain & Kothari Families" }),
             copy(EN, { eyebrow: "A JAIN WEDDING", join: "AND", script: "en",
               footer: "Michhami Dukkadam — with a clean heart", hosts: "— The Shah & Mehta Families" })],
    pool: "en", subject: "Jain vivah card",
  },
  buddhist: {
    palettes: ["teal", "sage", "peach", "ivory", "marigold", "lavender", "sky", "emerald", "blush", "plum"],
    frames: ["mandala", "temple", "wreath", "minimal", "ring"],
    motifs: ["chakra", "lotus", "none"],
    looks: [...L_EN.slice(0, 5), ...L_HI.slice(0, 2)], layouts: L4,
    copies: [copy(EN, { eyebrow: "BUDDHAM SARANAM GACCHAMI", join: "AND", script: "en",
               invite: "In mindfulness and metta, we invite you\nto the wedding of",
               venue: "Shanti Vihar, Mall Road\nDarjeeling, West Bengal",
               footer: "May all beings be happy and free", hosts: "— The Lama & Bhutia Families" }),
             copy(EN, { eyebrow: "WITH LOVING KINDNESS", join: "AND", script: "en",
               footer: "Sabbe satta sukhi hontu", hosts: "— The Tamang & Sherpa Families" }),
             copy(HI, { eyebrow: "॥ बुद्धं शरणं गच्छामि ॥", script: "hi", footer: "सर्वे भवन्तु सुखिनः" })],
    pool: "buddhist", subject: "Buddhist wedding invitation",
  },
  interfaith: {
    palettes: LIGHT_PAL, frames: ["wreath", "minimal", "corners", "ring", "mandala"],
    motifs: ["heart", "rings", "none", "lotus"],
    looks: L_EN, layouts: L4,
    copies: [copy(EN, { eyebrow: "TWO FAITHS · ONE LOVE", join: "AND", script: "en",
               invite: "Our families, our traditions, one promise.\nPlease join us as we marry.",
               footer: "Love, in every language", hosts: "— The Khan & Kapoor Families" }),
             copy(EN, { eyebrow: "COURT MARRIAGE · REGISTRY", join: "AND", script: "en",
               invite: "We signed on the dotted line.\nNow come celebrate with us.",
               venueLabel: "REGISTRAR OFFICE", venue: "Sub-Registrar Office, Sector 17\nChandigarh",
               footer: "Officially, happily, legally us", hosts: "— With our families' love" }),
             copy(EN, { eyebrow: "SAVE THE DATE", join: "AND", script: "en",
               footer: "Different roots, same sky", hosts: "— The Iyer & Hussain Families" })],
    pool: "en", subject: "interfaith or court-marriage invite",
  },
  modern: {
    palettes: ALL_PAL, frames: ["minimal", "corners", "ring", "wreath"],
    motifs: ["none", "heart", "rings"],
    looks: L_EN, layouts: L4,
    copies: [copy(EN, { eyebrow: "SAVE THE DATE", join: "AND", script: "en",
               invite: "No long speeches. Just good food,\nloud music and the two of us.",
               footer: "Dress code: anything you can dance in", hosts: "— Just us two" }),
             copy(EN, { eyebrow: "WE'RE GETTING MARRIED", join: "AND", script: "en",
               footer: "Swipe up for directions, see you there", hosts: "— See you there" }),
             copy(EN, { eyebrow: "THE WEDDING", join: "AND", script: "en",
               footer: "Black tie, open bar, no phones at dinner", hosts: "— With love" })],
    pool: "en", subject: "modern minimal wedding card",
  },
  engagement: {
    palettes: ["rosegold", "blush", "lavender", "marigold", "peach", "ivory", "sky", "plum", "sage", "teal", "noir"],
    frames: ["ring", "wreath", "mandala", "minimal", "corners", "paisley"],
    motifs: ["rings", "heart", "om", "lotus", "none"],
    looks: [...L_EN, ...L_HI.slice(0, 2)], layouts: L4,
    copies: [copy(EN, { eyebrow: "ENGAGEMENT CEREMONY", join: "AND", script: "en",
               invite: "She said yes! Join us as we celebrate\nour engagement",
               footer: "Cocktails, cake and lots of photos", hosts: "— The Agarwal & Malhotra Families" }),
             copy(HI, { eyebrow: "॥ रोका एवं सगाई समारोह ॥", join: "सगाई", script: "hi",
               invite: "हमारे घर की खुशियों में शामिल होने\nके लिए सादर आमंत्रित हैं",
               footer: "आपके स्नेह एवं आशीर्वाद सहित" }),
             copy(EN, { eyebrow: "WE'RE ENGAGED", join: "AND", script: "en",
               footer: "Round one of forever", hosts: "— With our families" })],
    pool: "en", subject: "engagement, roka or sagai card",
  },
  "haldi-mehndi": {
    palettes: ["marigold", "emerald", "plum", "peach", "sage", "teal", "blush", "lavender", "maroon", "ivory", "rosegold"],
    frames: ["paisley", "corners", "mandala", "wreath", "minimal"],
    motifs: ["lotus", "none", "om", "heart"],
    looks: [...L_HI, ...L_EN.slice(0, 5)], layouts: L4,
    copies: [copy(HI, { eyebrow: "॥ हल्दी समारोह ॥", join: "की हल्दी", script: "hi",
               invite: "पीले रंग, ढोल की थाप और हँसी —\nसब आपका इंतज़ार कर रहे हैं",
               time: "सुबह ११:०० बजे से", venue: "शर्मा निवास, आँगन\nजयपुर, राजस्थान",
               footer: "पीले कपड़े पहन कर आइए!", hosts: "— शर्मा परिवार" }),
             copy(EN, { eyebrow: "MEHNDI NIGHT", join: "MEHNDI", script: "en",
               invite: "Henna, dholki and chai till late.\nCome colour our hands.",
               time: "5:00 PM onwards", footer: "Green & gold dress code, please", hosts: "— The Verma Family" }),
             copy(EN, { eyebrow: "SANGEET NIGHT", join: "SANGEET", script: "en",
               invite: "Practice your moves — the dance floor\nopens at eight",
               time: "8:00 PM till late", footer: "Performances, antakshari and a very long playlist",
               hosts: "— Both families, one stage" })],
    pool: "en", subject: "haldi, mehndi or sangeet invite",
  },
  reception: {
    palettes: ["noir", "emerald", "rosegold", "royal", "plum", "ivory", "maroon", "teal", "blush", "sky", "lavender"],
    frames: ["minimal", "arch", "ring", "corners", "wreath", "mandala"],
    motifs: ["none", "heart", "rings", "bismillah"],
    looks: L_EN, layouts: L4,
    copies: [copy(EN, { eyebrow: "WEDDING RECEPTION", join: "AND", script: "en",
               invite: "Mr. & Mrs. request the pleasure of your\ncompany for dinner and dancing",
               time: "7:30 PM onwards", venue: "The Grand Ballroom, Rambagh Road\nJaipur, Rajasthan",
               footer: "Black tie preferred", hosts: "— The Sharma & Verma Families" }),
             copy(EN, { eyebrow: "وَلِيمَة", eyebrowFont: "amiri", eyebrowRtl: true, join: "AND", script: "en",
               invite: "You are cordially invited to the Walima\nreception of",
               venue: "Nawab Banquet Hall, Aminabad\nLucknow, Uttar Pradesh",
               footer: "Jazakallahu khairan for your duas", hosts: "— The Khan Family" }),
             copy(EN, { eyebrow: "JUST MARRIED", join: "AND", script: "en",
               invite: "We tied the knot. Now let's celebrate\nwith everyone we love.",
               footer: "Dinner, dessert and a dance floor", hosts: "— With all our love" })],
    pool: "en", subject: "reception or Walima invite",
  },
};

function generateFor(category: string, taken: Set<string>): Template[] {
  const cfg = GEN[category];
  const out: Template[] = [];
  if (!cfg) return out;
  /** cfg.pool is the Latin-script name pool; Devanagari/Gurmukhi copies use their own */
  const latin = COUPLES[cfg.pool] ?? COUPLES.en;
  const need = TARGET_PER_CATEGORY - taken.size;

  for (let i = 0, made = 0; made < need && i < need * 4; i++) {
    const palette = pal(pick(cfg.palettes, i, 1));
    const frame = pick(cfg.frames, i, 3);
    const motif = pick(cfg.motifs, i, 5);
    const layout = pick(cfg.layouts, i, 3);
    const look = pick(cfg.looks, i, 5);
    const base = pick(cfg.copies, i, 2);
    const script = base.script ?? "en";
    const namePool = script === "hi" ? COUPLES.hi : script === "pa" ? COUPLES.pa : latin;
    const [n1, n2] = pick(namePool, i, 7);

    // names must stay unique inside a category, so widen them until they are
    const stem = `${palette.label} ${FRAME_WORD[frame]}`;
    let name = stem;
    if (taken.has(name)) name = `${stem} ${MOTIF_WORD[motif]}`;
    if (taken.has(name)) name = `${stem} ${LAYOUT_WORD[layout].split(" ")[0]}`;
    for (let k = 2; taken.has(name); k++) name = `${stem} ${k}`;
    taken.add(name);
    made++;

    const texture: CardDesign["texture"] =
      i % 5 === 0 ? "rays" : i % 5 === 2 ? "paper" : i % 5 === 4 ? "dots" : "none";

    out.push(
      mk(category, {
        name,
        blurb: `${palette.label} shades with ${FRAME_WORD[frame].toLowerCase()} borders${MOTIF_PHRASE[motif]} — a ${cfg.subject} with a ${LAYOUT_WORD[layout]}.`,
        tags: [palette.id, frame, motif === "none" ? layout : motif, layout],
        paletteId: palette.id,
        frame,
        motif,
        texture,
        layout,
        look,
        copy: copy(base, { n1, n2 }),
      })
    );
  }
  return out;
}

const HAND: Template[] = SPECS.map(([cat, s]) => mk(cat, s));

export const TEMPLATES: Template[] = CATEGORIES.flatMap((c) => {
  const hand = HAND.filter((t) => t.category === c.slug);
  const taken = new Set(hand.map((t) => t.name));
  return [...hand, ...generateFor(c.slug, taken)];
});

export const getTemplate = (slug: string) => TEMPLATES.find((t) => t.slug === slug);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const templatesByCategory = (slug: string) => TEMPLATES.filter((t) => t.category === slug);

export const resolveColor = (p: Palette, c?: string) => {
  if (!c) return p.ink;
  if (c === "ink") return p.ink;
  if (c === "accent") return p.accent;
  if (c === "gold") return p.gold;
  if (c === "soft") return p.soft;
  if (c === "bg") return p.bg;
  return c;
};
