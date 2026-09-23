'use client';

import React, { useState, useMemo } from 'react';
import { CategoryInfo, MenuItem, MenuCategory } from '@/types/menu';
import { MenuItemRow } from '@/components/domain/menu-item-row';
import { MenuCategoryNav } from '@/components/domain/menu-category-nav';
import { Search, Sparkles, X, Coffee } from 'lucide-react';

interface QrMenuBoardProps {
  categories: CategoryInfo[];
  items: MenuItem[];
}

export function QrMenuBoard({ categories, items }: QrMenuBoardProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('cafe-chaud');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items by search query if any, otherwise group by category
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.nameFr.toLowerCase().includes(q) ||
        item.nameAr.includes(q) ||
        (item.descriptionFr && item.descriptionFr.toLowerCase().includes(q))
    );
  }, [items, searchQuery]);

  return (
    <div className="w-full">
      {/* Sticky Category Navigation */}
      <MenuCategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Quick Search & Filter Utility */}
      <div className="px-4 py-2.5 bg-[var(--surface-raised)]/60 border-b border-[var(--line)]">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[var(--ink-muted)] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (ex: Noss-noss, thé, jus, ftour...)"
            className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-[var(--surface)] border border-[var(--line-strong)] rounded-md text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] transition-all shadow-2xs"
            aria-label="Rechercher une boisson ou un plat"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 text-[var(--ink-muted)] hover:text-[var(--ink)] rounded-full focus:outline-none"
              aria-label="Effacer la recherche"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bill of Fare Container */}
      <div className="p-4 md:p-6 space-y-8 bg-[var(--surface)]">
        {/* If searching and no results */}
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center space-y-2 rounded-lg border border-dashed border-[var(--line-strong)] bg-[var(--canvas)] p-6">
            <Coffee className="w-8 h-8 mx-auto text-[var(--primary)] opacity-50" />
            <p className="text-sm font-medium text-[var(--ink)]">
              Aucune boisson trouvée pour &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="text-xs text-[var(--ink-muted)]">
              Essayez une autre recherche ou réinitialisez le filtre pour voir l’ensemble du menu.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-semibold text-[var(--primary)] underline underline-offset-4 hover:text-[var(--primary-hover)]"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : searchQuery.trim() ? (
          /* Search Results View */
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line-strong)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                Résultats de recherche ({filteredItems.length})
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[var(--primary)] font-medium underline underline-offset-2"
              >
                Afficher tout le menu
              </button>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {filteredItems.map((item) => (
                <MenuItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          /* Standard Categorized Bill of Fare */
          categories.map((category) => {
            const categoryItems = items.filter((it) => it.category === category.id);
            if (categoryItems.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`section-${category.id}`}
                className="scroll-mt-28 space-y-3"
                aria-labelledby={`heading-${category.id}`}
              >
                {/* Category Plaque Header */}
                <div className="relative pb-2 border-b-2 border-[var(--line-strong)] flex items-end justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-sm bg-[var(--primary)]" aria-hidden="true" />
                      <h3
                        id={`heading-${category.id}`}
                        className="font-serif text-lg md:text-xl font-bold text-[var(--ink)] tracking-tight"
                      >
                        {category.labelFr}
                      </h3>
                    </div>
                    <p className="text-[11px] text-[var(--ink-muted)] mt-0.5 pl-4">
                      {category.subtitleFr}
                    </p>
                  </div>

                  <span
                    className="font-arabic text-base md:text-lg font-bold text-[var(--primary)] text-right"
                    dir="rtl"
                    lang="ar"
                  >
                    {category.labelAr}
                  </span>
                </div>

                {/* Items in this category */}
                <div className="space-y-0.5">
                  {categoryItems.map((item) => (
                    <MenuItemRow key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
