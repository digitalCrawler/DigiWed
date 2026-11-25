export const site = {
  name: "Shaadi Card Studio",
  shortName: "ShaadiCard",
  tagline: "Free wedding invitation card maker",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.shaadicardstudio.in").replace(/\/$/, ""),
  locale: "en_IN",
  twitter: "@shaadicardstudio",
  description:
    "Free wedding invitation card maker for every faith — Hindu, Muslim Nikah, Christian, Sikh, Jain, Buddhist and interfaith. Pick a template, edit names, date and venue, and download an HD card in seconds. No watermark, no signup.",
  keywords: [
    "wedding invitation card maker",
    "shaadi card design online free",
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
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
    footerSlot: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || "",
  },
  upi: {
    id: process.env.NEXT_PUBLIC_UPI_ID || "",
    name: process.env.NEXT_PUBLIC_UPI_NAME || "Shaadi Card Studio",
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@shaadicardstudio.in",
};

export const DONATION_PRESETS = [50, 100, 201, 501];
export const DONATION_DEFAULT = 50;
export const DONATION_MIN = 1;
