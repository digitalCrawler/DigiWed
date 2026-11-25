export type FontKey =
  | "playfair" | "cormorant" | "marcellus" | "cinzel" | "italiana" | "lora"
  | "greatvibes" | "dancing" | "parisienne"
  | "tiro" | "mukta" | "rozha"
  | "nastaliq" | "amiri"
  | "inter";

/** `gf` is the Google Fonts css2 `family=` value for this face. */
export const FONTS: Record<FontKey, { label: string; css: string; gf: string }> = {
  playfair:   { label: "Playfair Display", css: '"Playfair Display", Georgia, serif', gf: "Playfair+Display:ital,wght@0,400..900;1,400..900" },
  cormorant:  { label: "Cormorant Garamond", css: '"Cormorant Garamond", Georgia, serif', gf: "Cormorant+Garamond:ital,wght@0,300..700;1,300..700" },
  marcellus:  { label: "Marcellus", css: '"Marcellus", Georgia, serif', gf: "Marcellus" },
  cinzel:     { label: "Cinzel", css: '"Cinzel", Georgia, serif', gf: "Cinzel:wght@400..900" },
  italiana:   { label: "Italiana", css: '"Italiana", Georgia, serif', gf: "Italiana" },
  lora:       { label: "Lora", css: '"Lora", Georgia, serif', gf: "Lora:ital,wght@0,400..700;1,400..700" },
  greatvibes: { label: "Great Vibes", css: '"Great Vibes", cursive', gf: "Great+Vibes" },
  dancing:    { label: "Dancing Script", css: '"Dancing Script", cursive', gf: "Dancing+Script:wght@400..700" },
  parisienne: { label: "Parisienne", css: '"Parisienne", cursive', gf: "Parisienne" },
  tiro:       { label: "Tiro Devanagari (हिंदी)", css: '"Tiro Devanagari Hindi", serif', gf: "Tiro+Devanagari+Hindi:ital@0;1" },
  mukta:      { label: "Mukta (हिंदी / ਪੰਜਾਬੀ)", css: '"Mukta", sans-serif', gf: "Mukta:wght@300;400;600;700" },
  rozha:      { label: "Rozha One (हिंदी)", css: '"Rozha One", serif', gf: "Rozha+One" },
  nastaliq:   { label: "Noto Nastaliq (اردو)", css: '"Noto Nastaliq Urdu", serif', gf: "Noto+Nastaliq+Urdu:wght@400..700" },
  amiri:      { label: "Amiri (عربي)", css: '"Amiri", serif', gf: "Amiri:ital,wght@0,400;0,700;1,400" },
  inter:      { label: "Inter", css: 'Inter, system-ui, sans-serif', gf: "Inter:wght@300..800" },
};

export const FONT_KEYS = Object.keys(FONTS) as FontKey[];

export const googleFontsHref = (keys: FontKey[] = FONT_KEYS) =>
  `https://fonts.googleapis.com/css2?${keys
    .map((k) => `family=${FONTS[k].gf}`)
    .join("&")}&display=swap`;

export const GOOGLE_FONTS_HREF = googleFontsHref();
