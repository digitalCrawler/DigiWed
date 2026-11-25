import Link from "next/link";
import { CATEGORIES } from "@/lib/templates";
import Leaf from "./Leaf";

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-moss/12 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Shaadi Card Studio home">
          <span className="grid h-10 w-10 place-items-center rounded-leaf bg-gradient-to-br from-sage to-moss text-cream shadow-soft transition-transform duration-500 group-hover:rotate-[-8deg]">
            <Leaf size={19} className="animate-sway" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[17.5px] font-bold tracking-tight text-moss">
              Shaadi Card Studio
            </span>
            <span className="block font-ui text-[9.5px] uppercase tracking-[0.2em] text-sage">
              A garden at dusk
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {[
            ["/templates", "Cards"],
            ["/videos", "Video invites"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="group relative rounded-md px-3 py-2 font-ui text-[13.5px] font-medium text-ink/75 transition-colors hover:text-moss"
            >
              {label}
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}

          <div className="group relative">
            <button className="rounded-md px-3 py-2 font-ui text-[13.5px] font-medium text-ink/75 transition-colors hover:text-moss">
              Categories ▾
            </button>
            <div className="invisible absolute right-0 top-full w-[23rem] translate-y-2 rounded-lg border border-moss/15 bg-parchment p-2 opacity-0 shadow-lift transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-0.5">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] text-ink/80 transition-colors hover:bg-blush hover:text-moss"
                  >
                    <span aria-hidden>{c.emoji}</span>
                    <span className="truncate">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/how-it-works" className="rounded-md px-3 py-2 font-ui text-[13.5px] font-medium text-ink/75 transition-colors hover:text-moss">
            How it works
          </Link>
          <Link href="/templates" className="btn-rose ml-2">
            Make my card
          </Link>
        </nav>

        <Link href="/templates" className="btn-rose ml-auto md:hidden">
          Make card
        </Link>
      </div>
    </header>
  );
}
