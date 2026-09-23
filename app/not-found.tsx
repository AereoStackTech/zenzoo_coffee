import React from 'react';
import Link from 'next/link';
import { Coffee, ArrowLeft } from 'lucide-react';
import { CAFE_METADATA } from '@/lib/menu-data';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--surface)] border border-[var(--line-strong)] rounded-xl p-8 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-lg bg-[var(--surface-raised)] border border-[var(--line)] flex items-center justify-center">
          <Coffee className="w-7 h-7 text-[var(--primary)]" />
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-bold text-[var(--ink)]">
            Page Introuvable
          </h1>
          <p
            className="font-arabic text-xl font-bold text-[var(--primary)]"
            dir="rtl"
          >
            الصفحة غير موجودة
          </p>
        </div>

        <p className="text-xs md:text-sm text-[var(--ink-muted)]">
          La page demandée n&apos;existe pas ou a été déplacée. Revenez au menu principal de ZenZoo Café Safi.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] text-xs font-semibold transition-all active:scale-[0.98] shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
