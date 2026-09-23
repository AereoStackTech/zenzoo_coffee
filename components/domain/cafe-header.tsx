import React from 'react';
import { MapPin, Sparkles, Navigation, Phone } from 'lucide-react';
import { CAFE_METADATA } from '@/lib/menu-data';

export function CafeHeader() {
  return (
    <header className="relative w-full border-b border-[var(--line)] bg-[var(--surface)] pt-6 pb-5 px-4 md:px-6 shadow-[0_2px_12px_rgba(27,36,33,0.03)]">
      {/* Decorative architectural brass hairline top bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--primary)] via-[var(--surface-brass)] to-[var(--primary)]" 
        aria-hidden="true" 
      />

      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Architectural Seal / Brass Café Medallion */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--surface-raised)] to-[var(--surface-brass)]/60 border border-[var(--line-strong)] flex flex-col items-center justify-center p-2 shadow-xs">
            <span className="font-serif text-lg font-bold text-[var(--primary)] tracking-tighter leading-none">
              ZZ
            </span>
            <span className="text-[8px] tracking-[0.2em] font-semibold text-[var(--ink-soft)] uppercase mt-0.5">
              Safi
            </span>
          </div>
          {/* Subtle brass edge accents */}
          <div className="absolute -inset-1 border border-[var(--line)] rounded-xl pointer-events-none opacity-60" />
        </div>

        {/* Dual-script title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            {CAFE_METADATA.name}
          </h1>
          <p
            className="font-arabic text-xl md:text-2xl font-bold text-[var(--primary)] tracking-normal"
            dir="rtl"
            lang="ar"
          >
            {CAFE_METADATA.nameAr}
          </p>
        </div>

        {/* Subtitle / Sense of Place */}
        <p className="mt-2 text-xs md:text-sm text-[var(--ink-soft)] font-medium max-w-md">
          {CAFE_METADATA.taglineFr}
        </p>

        {/* Location & Navigation Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-[var(--ink-muted)]">
          <a
            href={CAFE_METADATA.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors group focus-visible:ring-1 focus-visible:ring-[var(--focus)] rounded-sm"
            title="Ouvrir l’adresse sur Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-[var(--ink-soft)]">{CAFE_METADATA.addressShort}</span>
            <span className="text-[10px] text-[var(--primary)] font-semibold underline underline-offset-2">
              (7QRF+2C4)
            </span>
          </a>

          <span className="hidden sm:inline text-[var(--line-strong)]" aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--ink-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            Service 05:00 — 01:00
          </span>
        </div>
      </div>
    </header>
  );
}
