/**
 * One canonical origin for the whole site: canonical tags, og:url, JSON-LD,
 * sitemap.xml and robots.txt all read it. A stray `http://` here splits every
 * one of those across two protocols, which Google treats as two sites — so a
 * non-local host is pinned to https whatever the env var says.
 */
function canonicalOrigin(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, "");
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withScheme.replace(/^http:\/\/(?!localhost|127\.0\.0\.1|\[::1\])/i, "https://");
}

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "DigiWeds",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "DigiWeds",
  tagline: "Free wedding invitation card maker",
  url: canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL || "https://digiweds.syfiz.in"),
  locale: "en_IN",
  twitter: process.env.NEXT_PUBLIC_TWITTER || "",
  description:
    "Free wedding invitation card maker for every faith — Hindu, Muslim Nikah, Christian, Sikh, Jain, Buddhist and interfaith. Pick a template, edit names, date and venue, and download an HD card in seconds. No watermark, no signup.",
  keywords: [
    "wedding invitation card maker",
    "shaadi card design online free",
    "digiweds",
    "hindu wedding invitation template",
    "nikah invitation card",
    "christian wedding invitation",
    "anand karaj invitation card",
    "jain wedding card",
    "digital wedding card maker india",
    "haldi mehndi invitation card",
    "engagement card maker",
    "wedding card editor online",
    "free shaadi card without watermark",
  ],
  adsense: {
    // A publisher id is public — it ships in every page's HTML — so it lives
    // here as the default rather than relying on the deploy having the env var.
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1369117380461310",
    // Set once you create a display unit in AdSense; until then the script
    // loads (enough for verification and Auto ads) but the footer strip
    // renders no <ins>.
    footerSlot: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || "",
  },
  upi: {
    id: process.env.NEXT_PUBLIC_UPI_ID || "",
    name: process.env.NEXT_PUBLIC_UPI_NAME || "DigiWeds",
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@digiweds.syfiz.in",
};

export const DONATION_PRESETS = [50, 100, 201, 501];
export const DONATION_DEFAULT = 50;
export const DONATION_MIN = 1;
