"use client";

import { useEffect, useMemo, useState } from "react";
import { DONATION_DEFAULT, DONATION_MIN, DONATION_PRESETS, site } from "@/lib/site";

export function upiLink(amount: number, note: string) {
  const p = new URLSearchParams({
    pa: site.upi.id,
    pn: site.upi.name,
    am: String(amount),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${p.toString()}`;
}

/** The donation picker. Nothing is mandatory — ₹50 is only a suggestion. */
export default function DonateBox({ compact = false }: { compact?: boolean }) {
  const [amount, setAmount] = useState<number>(DONATION_DEFAULT);
  const [custom, setCustom] = useState("");
  const [qr, setQr] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const configured = Boolean(site.upi.id);

  const value = useMemo(() => {
    const n = custom.trim() === "" ? amount : Number(custom);
    return Number.isFinite(n) && n >= DONATION_MIN ? Math.round(n) : DONATION_DEFAULT;
  }, [amount, custom]);

  const link = useMemo(() => upiLink(value, `Shaadi Card Studio — thank you gift`), [value]);

  useEffect(() => {
    if (!configured) return;
    let alive = true;
    (async () => {
      try {
        const QR = (await import("qrcode")).default;
        const url = await QR.toDataURL(link, {
          width: 320,
          margin: 1,
          color: { dark: "#26301f", light: "#faf6ea" },
        });
        if (alive) setQr(url);
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, [link, configured]);

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-sage/20 text-xl">
        🙏
      </div>
      <h2 className="font-display text-xl font-semibold text-ink">
        Card ban gaya — mubarak ho!
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/60">
        Yeh website hamesha free rahegi. Agar card pasand aaya to chhota sa gift bhej dijiye —
        ₹5, ₹10, ₹20, jitna dil kare. <span className="text-ink/80">Kuch na dein, to bhi bilkul theek hai.</span>
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {DONATION_PRESETS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setAmount(a);
              setCustom("");
            }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              custom.trim() === "" && amount === a
                ? "border-sage bg-sage/30 text-ink shadow-soft"
                : "border-moss/25 bg-parchment text-ink/70 hover:border-sage"
            }`}
          >
            ₹{a}
            {a === DONATION_DEFAULT ? (
              <span className="ml-1 text-[10px] font-medium opacity-70">suggested</span>
            ) : null}
          </button>
        ))}
        <label className="flex items-center gap-1.5 rounded-full border border-moss/25 bg-parchment px-3 py-1.5">
          <span className="text-sm text-ink/50">₹</span>
          <input
            type="number"
            min={DONATION_MIN}
            inputMode="numeric"
            placeholder="koi bhi"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-20 bg-transparent text-sm text-ink outline-none placeholder:text-ink/30"
            aria-label="Custom donation amount in rupees"
          />
        </label>
      </div>

      {configured ? (
        <>
          <a
            href={link}
            className="btn-rose mt-5 w-full justify-center py-3 text-base sm:w-auto sm:px-8"
          >
            Pay ₹{value} via UPI
          </a>
          <p className="mt-2 text-[11px] text-ink/40">
            GPay / PhonePe / Paytm — koi bhi UPI app chalega
          </p>

          {!compact && qr ? (
            <div className="mt-6">
              <p className="label">Ya QR scan kar lijiye</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qr}
                alt={`UPI QR code to send ₹${value}`}
                width={180}
                height={180}
                className="mx-auto rounded-2xl border border-moss/15 bg-parchment p-2"
              />
            </div>
          ) : null}

          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(site.upi.id);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              } catch {}
            }}
            className="btn-chip mt-4"
          >
            {copied ? "UPI ID copied ✓" : `Copy UPI ID — ${site.upi.id}`}
          </button>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-ink/20 bg-parchment/70 p-4 text-left">
          <p className="text-[13px] font-semibold text-ink/70">UPI ID abhi set nahi hai</p>
          <p className="mt-1 text-xs leading-5 text-ink/50">
            Apni UPI ID <code className="rounded bg-ink/5 px-1">.env.local</code> mein daal dijiye —
            uske baad yahan Pay button aur QR dono apne aap aa jayenge:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-ink/5 p-2 text-[11px] text-ink/70">
NEXT_PUBLIC_UPI_ID=yourname@upi{"\n"}NEXT_PUBLIC_UPI_NAME=Your Name
          </pre>
        </div>
      )}
    </div>
  );
}
