import Link from "next/link";
import { CATEGORIES } from "@/lib/templates";
import { site } from "@/lib/site";
import Leaf from "./Leaf";

export default function Footer() {
  return (
    <footer className="no-print relative mt-20 overflow-hidden border-t border-moss/15 bg-parchment/70">
      {/* a band of dusk along the edges */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sage/20 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-leaf bg-gradient-to-br from-sage to-moss text-cream shadow-soft">
              <Leaf size={19} />
            </span>
            <span className="font-display text-lg font-bold text-moss">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-[14.5px] leading-[1.8] text-ink/70">
            Har rasm ke liye wedding cards aur video invites — banaiye, edit kijiye, HD mein
            download kijiye. Bilkul free, no watermark, no signup. Pasand aaye to chhota sa
            donation kar dijiye. 🙏
          </p>
          <p className="mt-5 font-ui text-[11px] uppercase tracking-[0.14em] text-sage">
            © {new Date().getFullYear()} {site.name} · Made in India with lots of chai
          </p>
        </div>

        <nav aria-label="Categories">
          <h2 className="label">Categories</h2>
          <ul className="space-y-2 text-[14px]">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="text-ink/70 transition-colors hover:text-moss"
                >
                  {c.name} cards
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="About this site">
          <h2 className="label">Site</h2>
          <ul className="space-y-2 text-[14px]">
            {[
              ["/templates", "Card templates"],
              ["/videos", "Video invitations"],
              ["/how-it-works", "How it works"],
              ["/support", "Support us (donate)"],
              ["/privacy", "Privacy policy"],
              ["/terms", "Terms of use"],
              ["/contact", "Contact"],
              ["/sitemap.xml", "Sitemap"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-ink/70 transition-colors hover:text-moss">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
