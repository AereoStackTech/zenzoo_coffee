'use client';

import React, { useState } from 'react';
import { Navigation, Phone, MessageCircle, QrCode, X, Copy, Check, Share2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { CAFE_METADATA } from '@/lib/menu-data';

export function QuickActionDock() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Intent URLs
  const mapsIntent = CAFE_METADATA.mapsUrl;
  const phoneIntent = `tel:${CAFE_METADATA.phone}`;
  const whatsappIntent = `https://wa.me/${CAFE_METADATA.whatsapp}?text=${encodeURIComponent(
    'Bonjour ZenZoo Café, je souhaite vous contacter concernant votre terrasse / retransmission de match à Safi.'
  )}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Fixed bottom utility dock for one-thumb mobile interaction */}
      <aside
        aria-label="Actions rapides"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--line-strong)] py-2 px-3 md:px-4 shadow-[0_-4px_16px_rgba(27,36,33,0.08)]"
      >
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {/* Action 1: Maps Directions */}
          <a
            href={mapsIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-h-[44px] px-2 py-1.5 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all font-medium text-xs shadow-xs active:scale-[0.97]"
            title="Itinéraire Google Maps vers ZenZoo Safi"
          >
            <Navigation className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">Itinéraire</span>
          </a>

          {/* Action 2: Direct Phone Call */}
          <a
            href={phoneIntent}
            className="flex-1 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-h-[44px] px-2 py-1.5 rounded-md bg-[var(--surface-raised)] border border-[var(--line-strong)] text-[var(--ink)] hover:bg-[var(--surface-brass)]/40 transition-all font-medium text-xs active:scale-[0.97]"
            title="Appeler le café"
          >
            <Phone className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
            <span>Appeler</span>
          </a>

          {/* Action 3: WhatsApp Chat */}
          <a
            href={whatsappIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-h-[44px] px-2 py-1.5 rounded-md bg-[var(--surface-raised)] border border-[var(--line-strong)] text-[var(--ink)] hover:bg-[var(--surface-brass)]/40 transition-all font-medium text-xs active:scale-[0.97]"
            title="WhatsApp ZenZoo Café"
          >
            <MessageCircle className="w-4 h-4 text-[#1E6B42] flex-shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Action 4: QR Code & Share Trigger */}
          <button
            onClick={() => setQrOpen(true)}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-md bg-[var(--surface-raised)] border border-[var(--line-strong)] text-[var(--ink)] hover:bg-[var(--surface-brass)]/40 transition-all active:scale-[0.97]"
            title="Afficher le QR Code de table"
            aria-label="Afficher le QR Code du menu"
          >
            <QrCode className="w-4 h-4 text-[var(--ink)]" />
          </button>
        </div>
      </aside>

      {/* Accessible QR Code Modal with Radix UI Dialog */}
      <Dialog.Root open={qrOpen} onOpenChange={setQrOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-sm rounded-xl bg-[var(--surface)] border-2 border-[var(--line-strong)] p-5 shadow-2xl animate-in zoom-in-95 duration-200 focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[var(--line)] pb-3">
              <div>
                <Dialog.Title className="font-serif text-lg font-bold text-[var(--ink)]">
                  Menu Table Sans Contact
                </Dialog.Title>
                <Dialog.Description className="text-xs text-[var(--ink-muted)] mt-0.5">
                  Faites scanner ce code pour consulter le menu en direct
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  className="p-1 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--focus)]"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>

            {/* Simulated Vector QR Card */}
            <div className="my-5 flex flex-col items-center">
              <div className="p-4 rounded-lg bg-[var(--canvas)] border-2 border-[var(--line-strong)] shadow-inner flex flex-col items-center">
                {/* Clean SVG QR Code Representation */}
                <svg
                  className="w-44 h-44 text-[var(--ink)]"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  shapeRendering="crispEdges"
                >
                  {/* Outer Frame & Finder Patterns */}
                  {/* Top-Left Finder */}
                  <rect x="5" y="5" width="28" height="28" rx="2" />
                  <rect x="9" y="9" width="20" height="20" fill="#F9F6F0" />
                  <rect x="13" y="13" width="12" height="12" fill="#9C4221" />

                  {/* Top-Right Finder */}
                  <rect x="67" y="5" width="28" height="28" rx="2" />
                  <rect x="71" y="9" width="20" height="20" fill="#F9F6F0" />
                  <rect x="75" y="13" width="12" height="12" fill="#9C4221" />

                  {/* Bottom-Left Finder */}
                  <rect x="5" y="67" width="28" height="28" rx="2" />
                  <rect x="9" y="71" width="20" height="20" fill="#F9F6F0" />
                  <rect x="13" y="75" width="12" height="12" fill="#9C4221" />

                  {/* Realistic QR Data Dots */}
                  <rect x="38" y="8" width="6" height="6" />
                  <rect x="48" y="8" width="12" height="6" />
                  <rect x="38" y="18" width="10" height="6" />
                  <rect x="52" y="18" width="8" height="6" />
                  <rect x="38" y="28" width="6" height="6" />
                  <rect x="48" y="28" width="14" height="6" />

                  {/* Center Brass Medallion */}
                  <rect x="38" y="38" width="24" height="24" rx="3" fill="#E8DCC4" stroke="#C4B59D" strokeWidth="1" />
                  <text
                    x="50"
                    y="53"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#9C4221"
                    fontFamily="serif"
                    textAnchor="middle"
                  >
                    ZZ
                  </text>

                  {/* Bottom Data Grid */}
                  <rect x="38" y="66" width="6" height="8" />
                  <rect x="48" y="66" width="8" height="6" />
                  <rect x="60" y="66" width="12" height="6" />
                  <rect x="76" y="66" width="8" height="8" />
                  <rect x="88" y="66" width="6" height="6" />

                  <rect x="38" y="78" width="12" height="6" />
                  <rect x="54" y="78" width="8" height="8" />
                  <rect x="66" y="78" width="14" height="6" />
                  <rect x="84" y="78" width="10" height="6" />

                  <rect x="38" y="88" width="6" height="6" />
                  <rect x="48" y="88" width="14" height="6" />
                  <rect x="66" y="88" width="8" height="6" />
                  <rect x="78" y="88" width="16" height="6" />
                </svg>

                <div className="mt-2 text-center">
                  <span className="font-serif text-xs font-bold text-[var(--ink)] block">
                    ZenZoo Café · Safi
                  </span>
                  <span className="text-[10px] text-[var(--ink-muted)]">
                    Menu sur table & Horaires
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[var(--surface-raised)] border border-[var(--line-strong)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--surface-brass)]/50 transition-colors active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--live-green)]" />
                    <span>Lien Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier le lien</span>
                  </>
                )}
              </button>

              <Dialog.Close asChild>
                <button className="py-2 px-4 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] text-xs font-semibold transition-colors active:scale-[0.98]">
                  Fermer
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
