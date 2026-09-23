import React from 'react';
import { CafeHeader } from '@/components/domain/cafe-header';
import { LiveStatusPill } from '@/components/domain/live-status-pill';
import { MatchScreeningBanner } from '@/components/domain/match-screening-banner';
import { QrMenuBoard } from '@/components/domain/qr-menu-board';
import { TerraceMetaCard } from '@/components/domain/terrace-meta-card';
import { QuickActionDock } from '@/components/domain/quick-action-dock';
import { MENU_CATEGORIES, MENU_ITEMS, CAFE_METADATA } from '@/lib/menu-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] flex flex-col items-center">
      {/* Editorial Main Canvas Container */}
      <main className="w-full max-w-xl mx-auto flex flex-col min-h-screen bg-[var(--canvas)] border-x border-[var(--line)] shadow-[0_0_30px_rgba(27,36,33,0.04)] pb-24">
        {/* 1. Masthead & Sense of Place */}
        <CafeHeader />

        {/* 2. Real-Time Status & Live Broadcast Announcement */}
        <section className="px-4 py-3 space-y-3 bg-[var(--surface-raised)]/40 border-b border-[var(--line)]">
          {/* Real-time Open Status Pill */}
          <div className="flex items-center justify-between">
            <LiveStatusPill />
            <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider hidden xs:inline">
              Safi Centre-Ville
            </span>
          </div>

          {/* Botola / Match Screening Banner */}
          <MatchScreeningBanner />
        </section>

        {/* 3. The Dual-Script Tabletop Bill of Fare (QR Menu) */}
        <section className="flex-1 w-full" aria-label="Menu des consommations">
          <QrMenuBoard categories={MENU_CATEGORIES} items={MENU_ITEMS} />
        </section>

        {/* 4. Practical Terrace & Operational Ledger */}
        <section className="p-4 md:p-6 bg-[var(--canvas)] border-t border-[var(--line)]" aria-label="Informations pratiques">
          <TerraceMetaCard />
        </section>

        {/* 5. Quiet Editorial Footer */}
        <footer className="mt-auto px-4 py-6 text-center border-t border-[var(--line)] text-xs text-[var(--ink-muted)] space-y-1.5 bg-[var(--surface)]">
          <p className="font-serif font-semibold text-[var(--ink)]">
            {CAFE_METADATA.name} · {CAFE_METADATA.nameAr}
          </p>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Boulevard Hassan II · Safi 46000, Maroc
          </p>
          <p className="text-[10px] opacity-75">
            Paiement en Dirhams (MAD) au comptoir ou en terrasse · Service 7j/7 de 05h00 à 01h00
          </p>
        </footer>
      </main>

      {/* 6. Fixed Mobile-First Thumb Utility Dock */}
      <QuickActionDock />
    </div>
  );
}
