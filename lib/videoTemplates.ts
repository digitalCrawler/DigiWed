import { CATEGORIES, CardDesign, TEMPLATES, Template } from "./templates";

/** The exported clip is a 9:16 portrait video — WhatsApp status / Reels size. */
export const VIDEO_W = 1080;
export const VIDEO_H = 1920;
export const VIDEOS_PER_CATEGORY = 10;

export type MotionKey =
  | "fade" | "bloom" | "petals" | "sweep" | "unfurl"
  | "type" | "spin" | "curtain" | "zoom" | "sparkle";

export interface Motion {
  key: MotionKey;
  label: string;
  blurb: string;
  /** clip length in seconds */
  duration: number;
  /** how each line of text arrives */
  reveal: "fade-up" | "scale" | "type" | "wipe-down" | "slide-in";
  /** how the card artwork itself arrives */
  art: "fade" | "scale" | "spin" | "wipe";
  /** slow movement across the whole clip */
  camera: "still" | "zoom-in" | "drift";
  /** decoration drawn over everything */
  overlay: "none" | "petals" | "sparkle" | "sweep";
}

export const MOTIONS: Motion[] = [
  { key: "fade", label: "Soft Fade", duration: 10, reveal: "fade-up", art: "fade", camera: "still", overlay: "none",
    blurb: "Har line halke se upar uthti hai — shaant aur formal." },
  { key: "bloom", label: "Golden Bloom", duration: 11, reveal: "scale", art: "scale", camera: "zoom-in", overlay: "sweep",
    blurb: "Card khilta hua aata hai, upar se ek sunehri roshni guzarti hai." },
  { key: "petals", label: "Petal Fall", duration: 12, reveal: "fade-up", art: "fade", camera: "drift", overlay: "petals",
    blurb: "Poore clip mein phool ki pankhudiyan girti rehti hain." },
  { key: "sweep", label: "Light Sweep", duration: 10, reveal: "slide-in", art: "fade", camera: "still", overlay: "sweep",
    blurb: "Lines side se aati hain aur gold shimmer card par se nikalta hai." },
  { key: "unfurl", label: "Scroll Unfurl", duration: 11, reveal: "wipe-down", art: "wipe", camera: "still", overlay: "none",
    blurb: "Card ek scroll ki tarah upar se neeche khulta hai." },
  { key: "type", label: "Typewriter", duration: 12, reveal: "type", art: "fade", camera: "still", overlay: "none",
    blurb: "Naam ek-ek akshar karke likhe jaate hain." },
  { key: "spin", label: "Mandala Spin", duration: 11, reveal: "fade-up", art: "spin", camera: "zoom-in", overlay: "none",
    blurb: "Border ghoomta hua set hota hai — mandala designs par sabse achha." },
  { key: "curtain", label: "Curtain Rise", duration: 10, reveal: "wipe-down", art: "wipe", camera: "drift", overlay: "none",
    blurb: "Parde ki tarah card uthta hai, phir text aata hai." },
  { key: "zoom", label: "Zoom Pulse", duration: 10, reveal: "scale", art: "scale", camera: "zoom-in", overlay: "none",
    blurb: "Dheere dheere zoom — Instagram reel jaisa feel." },
  { key: "sparkle", label: "Sparkle Night", duration: 12, reveal: "fade-up", art: "fade", camera: "drift", overlay: "sparkle",
    blurb: "Sunehre taare timtimate hain — dark cards par kamaal lagta hai." },
];

export const getMotion = (key: MotionKey) => MOTIONS.find((m) => m.key === key) ?? MOTIONS[0];

export interface VideoTemplate {
  id: string;
  slug: string;
  name: string;
  category: string;
  blurb: string;
  tags: string[];
  motion: Motion;
  design: CardDesign;
  /** the card template this clip is built from */
  cardSlug: string;
  cardName: string;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildFor(category: string): VideoTemplate[] {
  const cards: Template[] = TEMPLATES.filter((t) => t.category === category);
  if (!cards.length) return [];
  const cat = CATEGORIES.find((c) => c.slug === category);
  const used = new Set<string>();

  return MOTIONS.map((motion, i) => {
    // walk the category's cards with a stride so each clip looks different
    const card = cards[(i * 3) % cards.length];
    let name = `${motion.label} ${card.design.palette.label}`;
    if (used.has(name)) name = `${name} ${i + 1}`;
    used.add(name);

    return {
      id: `${category}-vid-${motion.key}`,
      slug: slugify(`${name}-${category}`),
      name,
      category,
      blurb: `${motion.blurb} ${card.design.palette.label} rang, ${cat?.name ?? ""} ke liye.`.trim(),
      tags: [motion.key, card.design.palette.id, card.design.frame, "video"],
      motion,
      design: card.design,
      cardSlug: card.slug,
      cardName: card.name,
    };
  });
}

export const VIDEO_TEMPLATES: VideoTemplate[] = CATEGORIES.flatMap((c) => buildFor(c.slug));

export const getVideoTemplate = (slug: string) =>
  VIDEO_TEMPLATES.find((v) => v.slug === slug);

export const videosByCategory = (slug: string) =>
  VIDEO_TEMPLATES.filter((v) => v.category === slug);
