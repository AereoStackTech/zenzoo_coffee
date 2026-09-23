'use client';

import React, { useRef, useEffect } from 'react';
import { CategoryInfo, MenuCategory } from '@/types/menu';
import { Coffee, Flame, Sparkles, Citrus, Sunrise, Croissant } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuCategoryNavProps {
  categories: CategoryInfo[];
  activeCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Coffee,
  Flame,
  Sparkles,
  Citrus,
  Sunrise,
  Croissant,
};

export function MenuCategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
}: MenuCategoryNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // Automatically center active button when changed
  useEffect(() => {
    if (activeBtnRef.current && containerRef.current) {
      const container = containerRef.current;
      const button = activeBtnRef.current;
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      container.scrollTo({
        left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: MenuCategory) => {
    onSelectCategory(categoryId);

    // Scroll smoothly to section if anchor exists
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      const yOffset = -140; // offset for sticky headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Catégories du menu"
      className="sticky top-0 z-20 w-full bg-[var(--surface)]/95 backdrop-blur-md border-y border-[var(--line)] py-2.5 px-3 md:px-4 shadow-xs"
    >
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        role="tablist"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = iconMap[cat.iconName] || Coffee;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeBtnRef : undefined}
              role="tab"
              aria-selected={isActive}
              aria-controls={`section-${cat.id}`}
              id={`tab-${cat.id}`}
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-150 snap-start flex-shrink-0 min-h-[42px] border active:scale-[0.98]',
                isActive
                  ? 'bg-[var(--primary)] text-white border-[var(--primary-hover)] shadow-xs font-semibold'
                  : 'bg-[var(--surface-raised)] text-[var(--ink-soft)] border-[var(--line)] hover:bg-[var(--surface-brass)]/40 hover:text-[var(--ink)]'
              )}
            >
              <Icon
                className={cn(
                  'w-3.5 h-3.5 flex-shrink-0',
                  isActive ? 'text-white' : 'text-[var(--primary)]'
                )}
                aria-hidden="true"
              />
              <div className="flex flex-col items-start leading-tight">
                <span>{cat.labelFr}</span>
                <span
                  className={cn(
                    'font-arabic text-[10px] leading-tight opacity-80',
                    isActive ? 'text-white/90' : 'text-[var(--ink-muted)]'
                  )}
                  dir="rtl"
                >
                  {cat.labelAr}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
