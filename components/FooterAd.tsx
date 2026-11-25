"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Very small, non-intrusive sticky ad strip at the bottom of the page.
 * - fixed 56px tall, never overlaps content (body has .has-footer-ad padding)
 * - dismissible; the choice is remembered for the session
 * - renders nothing in production until an AdSense client id is configured
 */
export default function FooterAd() {
  const [hidden, setHidden] = useState(true);
  const pushed = useRef(false);
  const client = site.adsense.client;
  const slot = site.adsense.footerSlot;
  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    try {
      if (sessionStorage.getItem("scs-ad-dismissed") === "1") return;
    } catch {}
    setHidden(false);
  }, []);

  useEffect(() => {
    if (hidden || !client || !slot || pushed.current) return;
    pushed.current = true;
    try {
      // @ts-expect-error injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [hidden, client, slot]);

  if (hidden) return null;
  if (!client && !isDev) return null;

  return (
    <aside
      aria-label="Advertisement"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-moss/15 bg-cream/95 backdrop-blur"
      style={{ height: 56 }}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center gap-3 px-3">
        <span className="shrink-0 rounded-full border border-moss/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
          Ad
        </span>
        <div className="flex h-[50px] min-w-0 flex-1 items-center justify-center overflow-hidden">
          {client && slot ? (
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: 50 }}
              data-ad-client={client}
              data-ad-slot={slot}
              data-ad-format="horizontal"
              data-full-width-responsive="true"
            />
          ) : (
            <p className="text-[11px] text-ink/30">
              AdSense slot — set NEXT_PUBLIC_ADSENSE_CLIENT &amp; NEXT_PUBLIC_ADSENSE_FOOTER_SLOT
            </p>
          )}
        </div>
        <button
          type="button"
          aria-label="Hide ad"
          onClick={() => {
            setHidden(true);
            try {
              sessionStorage.setItem("scs-ad-dismissed", "1");
            } catch {}
          }}
          className="shrink-0 rounded-full p-1.5 text-ink/35 transition hover:bg-ink/5 hover:text-ink/70"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
