"use client";

import { useEffect } from "react";
import DonateBox from "./DonateBox";

export default function DonateModal({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Support Shaadi Card Studio"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-lg border border-moss/15 bg-cream p-6 shadow-lift sm:rounded-lg sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <DonateBox />
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full px-4 py-2.5 text-sm font-medium text-ink/45 transition hover:bg-parchment hover:text-ink/70"
        >
          Abhi nahi, shukriya
        </button>
      </div>
    </div>
  );
}
