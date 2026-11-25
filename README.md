# DigiWeds

Free wedding invitation maker for every faith — Hindu, Muslim Nikah, Christian,
Sikh Anand Karaj, Jain, Buddhist, interfaith/court, plus engagement, haldi-mehndi-sangeet
and reception. Every category ships **30 printable card templates and 10 animated video
invites** (330 + 110 in all). Edit either like a Canva doc, then download an HD PNG /
print-ready PDF, or a 1080×1920 MP4 for WhatsApp status. No signup, no watermark. A small
UPI donation (₹50 suggested) is asked for *after* the download, and is always optional.

Built with Next.js 15 (App Router) + Tailwind. Everything is static — there is no
database, no backend and no user data on any server.

---

## Design system — VERDURE (a garden at dusk)

Nature/Organic, 2020s contemporary, light theme. Density 5/10 · Variance 6/10 · Motion 8/10.

| Token | Value | Used for |
| --- | --- | --- |
| `cream` | `#f3ecd9` | page background (primary) |
| `parchment` | `#faf6ea` | lifted surfaces, cards, inputs |
| `sage` | `#7d9273` | secondary green — borders, hovers |
| `moss` | `#55673f` | tertiary — headings, deep buttons |
| `brass` | `#b08d3e` | metallic accent, rules, underlines |
| `rose` | `#c98d8d` | dusty rose — the main call to action |
| `ink` | `#26301f` | body text |

Type is Georgia throughout (`font-display` / `font-body`), with `font-ui` (system-ui) kept
for small uppercase labels and chips. Radii follow the spec — 4 / 8 / 16px — plus a
`rounded-leaf` (`16px 4px 16px 4px`) used on buttons and chips for the organic silhouette.
Spacing tokens `sm` / `md` / `lg` are 1 / 2 / 4rem.

Motion lives in `app/globals.css`: a `.stagger` wrapper rises its children in sequence,
`.grow-lift` tilts cards on hover, the primary buttons run a one-shot `shimmer` sweep, and
the logo leaf keeps a slow `sway`. Everything collapses under
`@media (prefers-reduced-motion: reduce)`. Grain is an inline `feTurbulence` SVG on
`body::before` at 0.4 opacity, multiplied over a three-stop dusk wash.

**The invitation designs are deliberately untouched.** Each card carries its own palette
chosen for its faith and ceremony, so the site chrome is themed and the cards are not —
VERDURE is available to them as one more option, the `verdure` entry in `PALETTES`.

The older token names (`blush`, `marigold`, `gold`, `henna`) still exist in
`tailwind.config.ts` as aliases onto the new palette so components did not need rewriting;
each one is commented with what it actually is now.

## Run it

```bash
npm install
npm run dev     # http://localhost:3100
```

```bash
npm run build && npm start
```

## Configure

Copy `.env.example` to `.env.local` and fill in what you have. Everything is optional —
the site runs fine with none of it set.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD. Set this before going live. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Your `ca-pub-…` id. Until it is set, the bottom ad strip shows a placeholder in dev and nothing in production. |
| `NEXT_PUBLIC_ADSENSE_FOOTER_SLOT` | The ad unit id for the bottom strip. |
| `NEXT_PUBLIC_UPI_ID` | Your UPI VPA, e.g. `yourname@okhdfcbank`. The donation Pay button and QR appear once this is set. |
| `NEXT_PUBLIC_UPI_NAME` | Name shown inside the payer's UPI app. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on the contact, privacy and terms pages. |

### Donations

The donation flow is a plain UPI deep link (`upi://pay?pa=…&am=50&cu=INR`) plus a QR code
generated in the browser. There is no payment gateway, no fees and no backend: the money
goes straight to your UPI app. Nothing on the site is gated behind it.

### AdSense

One slim 56px strip is fixed to the bottom of the page and can be dismissed. That is the
only ad slot. For approval you will need the `/privacy`, `/terms` and `/contact` pages that
are already here, a real domain, and your own `ads.txt` at the site root once AdSense gives
you the line.

---

## How it is put together

```
app/
  page.tsx                 home (hero, featured, FAQ + JSON-LD, SEO copy)
  templates/page.tsx       every template, grouped by category
  templates/[slug]/        template detail (SSG, per-template metadata)
  category/[slug]/         category landing (SSG, per-category copy + FAQ)
  editor/[slug]/           the editor (noindex)
  how-it-works/ support/ privacy/ terms/ contact/
  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  Editor.tsx               the card editing surface
  VideoEditor.tsx          the video editing surface (canvas preview + recorder)
  VideoPreview.tsx         looping read-only clip preview
  VideoPoster.tsx          static 9:16 poster for listings
  CardCanvas.tsx           read-only card renderer (server-safe)
  CardArt.tsx              SVG frames, religious motifs, textures
  DonateBox / DonateModal  the ₹50-suggested ask
  FooterAd.tsx             the dismissible AdSense strip
lib/
  templates.ts             palettes, layouts, hand-authored specs + the 30-per-category generator
  videoTemplates.ts        10 motion presets, 10 clips per category
  videoRender.ts           canvas renderer + MediaRecorder export
  fonts.ts  fontEmbed.ts   font registry + base64 embedding for export
  download.ts              PNG / PDF / Web Share
  cardStyle.ts  site.ts  jsonld.ts
```

### Adding a template

Everything lives in `lib/templates.ts`. Append an entry to `SPECS`:

```ts
["hindu", {
  name: "My New Card",
  blurb: "One line for the card grid and meta description.",
  tags: ["mandala", "gold"],
  paletteId: "marigold",     // one of PALETTES
  frame: "mandala",          // mandala arch wreath minimal corners temple ring paisley
  motif: "om",               // om kalash lotus bismillah cross khanda chakra jain dove rings heart none
  texture: "rays",           // none rays dots paper
  layout: "classic",         // classic grand photo banner
  look: { display: "tiro", names: "rozha", body: "tiro", nameSize: 86 },
  copy: copy(HI, { eyebrow: "॥ श्री गणेशाय नमः ॥" }),
}],
```

Slug, detail page, category listing, sitemap entry and metadata are all derived — nothing
else to touch. Hand-authored entries come first in their category; the generator in the same
file then tops that category up to `TARGET_PER_CATEGORY` (30) by walking its own pools of
palettes, frames, crests, layouts, font pairings and copy variants with co-prime strides, so
no two cards in a category repeat. Adding a new **category** means one entry in `CATEGORIES`,
one in `GEN` (its pools) and optionally one in the `EXTRA` map in `app/category/[slug]/page.tsx`
for the long-form copy and FAQ.

### Video invitations

`lib/videoTemplates.ts` pairs each category's cards with the ten `MOTIONS` presets, giving
`VIDEOS_PER_CATEGORY` clips per category. The clip itself is drawn entirely in Canvas 2D by
`lib/videoRender.ts` at 1080×1920, so the on-screen preview and the recorded file come from
one code path. The ornamental SVG frame is rasterised once per look change and blitted as a
still layer; only text, photo and overlays animate. Export records the live canvas with
`MediaRecorder` (`captureStream(30)`), preferring MP4 and falling back to WebM, and optional
user-supplied music is mixed in through an `AudioContext` — so recording happens in real
time, which is why the button shows a progress bar.

To add a motion preset, append to `MOTIONS` and handle its `reveal` / `art` / `overlay`
values in `videoRender.ts`; every category picks it up automatically.

### The artboard

Cards are a 1000×1400 artboard (the 5×7 inch ratio), rendered as absolutely-positioned
DOM over an inline SVG frame, and scaled with a CSS transform. Export rasterises that node
at `pixelRatio: 2` → 2000×2800.

Two things are deliberate and worth keeping:

- **Fonts are embedded by hand** (`lib/fontEmbed.ts`). The rasteriser draws into an SVG
  data URL, which cannot load external files, and the browser blocks `cssRules` on the
  cross-origin Google Fonts sheet. We fetch and inline only the families a given card
  uses — letting the library walk the whole stylesheet would pull all 15 families on
  every download.
- **Trig results are rounded** (`r2` in `CardArt.tsx`). Node and the browser disagree on
  the last bits of `Math.sin`/`cos`, which React reports as a hydration mismatch.

### Editing surface

Drag to move, right handle resizes the text box, bottom-right handle changes font size
(or photo size). Arrow keys nudge, Ctrl+Z / Ctrl+Shift+Z undo and redo, Delete removes the
selected line. The selection chrome lives in a separate overlay layer so it never ends up
in the export. Drafts autosave to `localStorage` per template slug.

The **video** editor has the same gestures even though its stage is a `<canvas>` with no
elements to click. A transparent DOM layer sits over the canvas, with one box per field
positioned by `fieldRect()` and transformed by `cameraAt()` — both exported from
`videoRender.ts` and used by the renderer itself, so the handles cannot drift from the
pixels. Touching the canvas pauses the clip and jumps to `t = 1`, the finished frame, since
mid-clip a line may not have arrived yet.

---

## Deploying

Any static-friendly Next host works (Vercel, Netlify, Cloudflare). Set the env vars above
in the host's dashboard, point your domain at it, then submit
`https://yourdomain/sitemap.xml` in Google Search Console.
