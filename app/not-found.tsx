import Link from "next/link";
import { CATEGORIES } from "@/lib/templates";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-4xl" aria-hidden>💐</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
        Yeh page nahi mila
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-ink/60">
        Shayad link purana hai ya template ka naam badal gaya. Neeche se apni category chun
        lijiye — card wahin se ban jayega.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2.5">
        <Link href="/templates" className="btn-rose px-6 py-3">Saare templates</Link>
        <Link href="/" className="btn-ghost px-6 py-3">Home</Link>
      </div>
      <ul className="mt-9 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link href={`/category/${c.slug}`} className="btn-chip">
              <span aria-hidden>{c.emoji}</span> {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
