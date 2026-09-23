import React from 'react';
import { MenuItem } from '@/types/menu';

interface MenuItemRowProps {
  item: MenuItem;
}

export function MenuItemRow({ item }: MenuItemRowProps) {
  const isSignature = item.isPopular || item.tags?.includes('signature');

  return (
    <article
      className="group relative py-3 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--surface-raised)]/40 px-2 -mx-2 rounded-md transition-colors"
      aria-labelledby={`item-title-${item.id}`}
    >
      {/* Top line: French Name ... [Dotted Leaders] ... Price in MAD */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2 flex-shrink-0 max-w-[70%]">
          <h4
            id={`item-title-${item.id}`}
            className="text-sm md:text-[15px] font-semibold text-[var(--ink)] tracking-tight leading-snug"
          >
            {item.nameFr}
          </h4>

          {isSignature && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-brass)]/40 px-1.5 py-0.5 rounded border border-[var(--line-strong)]"
              title="Spécialité maison ZenZoo"
            >
              Populaire
            </span>
          )}
        </div>

        {/* Dotted Leader Line */}
        <div
          className="flex-1 border-b border-dotted border-[var(--line-strong)] mx-2 self-center opacity-70 mb-1"
          aria-hidden="true"
        />

        {/* Price Plaque in MAD */}
        <div
          className="flex-shrink-0 flex items-baseline gap-1 bg-[var(--surface-raised)] border border-[var(--line-strong)] px-2 py-0.5 rounded text-right shadow-2xs group-hover:border-[var(--primary)] transition-colors"
          aria-label={`Prix: ${item.priceMAD} Dirhams Marocains`}
        >
          <span className="tabular-nums font-bold text-sm md:text-[15px] text-[var(--ink)]">
            {item.priceMAD}
          </span>
          <span className="text-[10px] uppercase font-bold text-[var(--primary)] tracking-wide">
            MAD
          </span>
        </div>
      </div>

      {/* Middle line: Arabic name with high-legibility baseline */}
      <div className="mt-0.5 flex items-center justify-between">
        <p
          className="font-arabic text-xs md:text-sm font-semibold text-[var(--ink-muted)] text-right"
          dir="rtl"
          lang="ar"
        >
          {item.nameAr}
        </p>
      </div>

      {/* Bottom line: Optional French description */}
      {item.descriptionFr && (
        <p className="mt-1 text-[11px] md:text-xs text-[var(--ink-soft)] leading-relaxed max-w-[90%] font-normal">
          {item.descriptionFr}
        </p>
      )}
    </article>
  );
}
