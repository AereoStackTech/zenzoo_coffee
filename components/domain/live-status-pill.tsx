'use client';

import React, { useSyncExternalStore } from 'react';
import { Clock } from 'lucide-react';
import { getCafeOpenStatus, CafeOpenStatus } from '@/lib/time-utils';

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 30000);
  return () => clearInterval(interval);
}

function getSnapshot(): string {
  return JSON.stringify(getCafeOpenStatus());
}

function getServerSnapshot(): string {
  return JSON.stringify(getCafeOpenStatus());
}

export function LiveStatusPill() {
  const statusStr = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const status: CafeOpenStatus = JSON.parse(statusStr);

  const { isOpen, statusLabelFr, statusLabelAr, currentTimeCasablanca } = status;

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3 py-1.5 rounded-md border text-xs transition-all duration-300 ${
        isOpen
          ? 'bg-[var(--live-bg)] border-[var(--live-green)]/35 text-[var(--live-green)]'
          : 'bg-[#FFF6E5] border-[#D9822B]/35 text-[#8A4800]'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {isOpen ? (
            <>
              <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--live-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--live-green)]" />
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D9822B]" />
          )}
        </span>
        <span className="font-semibold tracking-tight text-[13px]">{statusLabelFr}</span>
        <span
          className="font-arabic text-[12px] opacity-80"
          dir="rtl"
          lang="ar"
        >
          · {statusLabelAr}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] opacity-90 border-l border-current/20 pl-2.5">
        <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
        <span className="tabular-nums font-medium">{currentTimeCasablanca}</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">Safi</span>
      </div>
    </div>
  );
}
