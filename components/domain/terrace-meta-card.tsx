import React from 'react';
import { Banknote, Clock, Sun, Tv, Wifi, MapPin, CheckCircle2 } from 'lucide-react';
import { OPERATIONAL_AMENITIES, CAFE_METADATA } from '@/lib/menu-data';

const iconLookup: Record<string, React.ElementType> = {
  Banknote,
  Clock,
  Sun,
  Tv,
  Wifi,
};

export function TerraceMetaCard() {
  const days = [
    { name: 'Lundi', hours: '05:00 — 01:00' },
    { name: 'Mardi', hours: '05:00 — 01:00' },
    { name: 'Mercredi', hours: '05:00 — 01:00' },
    { name: 'Jeudi', hours: '05:00 — 01:00' },
    { name: 'Vendredi', hours: '05:00 — 01:00' },
    { name: 'Samedi', hours: '05:00 — 01:00' },
    { name: 'Dimanche', hours: '05:00 — 01:00' },
  ];

  return (
    <div className="w-full rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] p-4 md:p-6 space-y-6 shadow-xs">
      {/* Section Title */}
      <div className="border-b border-[var(--line-strong)] pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-base md:text-lg font-bold text-[var(--ink)]">
            Informations Pratiques & Terrasse
          </h3>
          <p className="text-xs text-[var(--ink-muted)]">
            Conditions de service au comptoir et en terrasse
          </p>
        </div>
        <span
          className="font-arabic text-base font-bold text-[var(--primary)]"
          dir="rtl"
          lang="ar"
        >
          معلومات المقهى
        </span>
      </div>

      {/* Grid of Amenities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {OPERATIONAL_AMENITIES.map((amenity) => {
          const Icon = iconLookup[amenity.iconName] || CheckCircle2;
          const isCash = amenity.id === 'cash-only';

          return (
            <div
              key={amenity.id}
              className={`rounded-md p-3 border transition-colors ${
                isCash
                  ? 'bg-[#FFF9F2] border-[#E8D0B3]'
                  : 'bg-[var(--surface-raised)]/70 border-[var(--line)]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-2 rounded-md border flex-shrink-0 ${
                    isCash
                      ? 'bg-[var(--primary)] text-white border-[var(--primary-hover)]'
                      : 'bg-[var(--surface)] text-[var(--primary)] border-[var(--line)]'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[var(--ink)] leading-snug">
                    {amenity.titleFr}
                  </h4>
                  <p
                    className="font-arabic text-[11px] font-semibold text-[var(--primary)] leading-tight"
                    dir="rtl"
                    lang="ar"
                  >
                    {amenity.titleAr}
                  </p>
                  <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed pt-0.5">
                    {amenity.descriptionFr}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Opening Hours Schedule Matrix */}
      <div className="rounded-md border border-[var(--line)] bg-[var(--surface-raised)]/50 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink)]">
            <Clock className="w-3.5 h-3.5 text-[var(--primary)]" aria-hidden="true" />
            <span>Horaires d&apos;Ouverture (7j/7)</span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--live-green)]">
            Service Non-Stop
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {days.map((d) => (
            <div
              key={d.name}
              className="flex flex-col p-1.5 rounded bg-[var(--surface)] border border-[var(--line)]"
            >
              <span className="text-[11px] font-medium text-[var(--ink-muted)]">{d.name}</span>
              <span className="tabular-nums font-semibold text-[var(--ink)] text-xs mt-0.5">
                {d.hours}
              </span>
            </div>
          ))}
          <div className="flex flex-col p-1.5 rounded bg-[var(--surface-brass)]/40 border border-[var(--line-strong)] justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-[var(--primary)]">
              Matin & Soir
            </span>
            <span className="text-[11px] font-bold text-[var(--ink)]">20h / 24h</span>
          </div>
        </div>
      </div>

      {/* Google Business Profile & Navigation Target */}
      <div className="rounded-md border border-[var(--line-strong)] bg-gradient-to-r from-[var(--surface-raised)] to-[var(--surface)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{CAFE_METADATA.address}</span>
          </div>
          <p className="text-[11px] text-[var(--ink-muted)]">
            Face à l&apos;avenue principale · Stationnement facile à proximité
          </p>
        </div>

        <a
          href={CAFE_METADATA.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all flex-shrink-0 shadow-xs active:scale-[0.98]"
        >
          <span>Ouvrir sur Maps</span>
          <span className="font-mono text-[10px] opacity-80">(7QRF+2C4)</span>
        </a>
      </div>
    </div>
  );
}
