import React from 'react';
import { Tv, Flame, Radio } from 'lucide-react';
import { FEATURED_MATCH } from '@/lib/menu-data';

export function MatchScreeningBanner() {
  if (!FEATURED_MATCH) return null;

  const [teamHome, teamAway] = FEATURED_MATCH.teams;

  return (
    <div className="relative overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] p-3.5 shadow-xs transition-all hover:border-[var(--primary)]/50">
      {/* Editorial top rule & shimmer accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--primary)] via-[var(--surface-brass)] to-[var(--accent-atlantic)]" 
        aria-hidden="true" 
      />

      <div className="flex flex-col gap-2.5">
        {/* Header kicker row: Tournament & Live indicator */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[var(--primary)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
            </span>
            <span>Retransmission Match en Direct</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)] font-medium">
            <Tv className="w-3.5 h-3.5 text-[var(--ink-muted)]" aria-hidden="true" />
            <span>{FEATURED_MATCH.channel || 'Grand Écran'}</span>
          </div>
        </div>

        {/* Teams and Kickoff Card */}
        <div className="rounded-md bg-[var(--surface-raised)]/70 border border-[var(--line)] p-2.5 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-medium text-[var(--ink-muted)]">
              {FEATURED_MATCH.tournament}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs md:text-sm font-bold text-[var(--ink)]">
              <span>{teamHome}</span>
              <span className="text-[11px] text-[var(--primary)] font-serif italic font-normal">vs</span>
              <span>{teamAway}</span>
            </div>
          </div>

          {/* Kickoff Time Plaque */}
          <div className="flex flex-col items-center justify-center bg-[var(--surface)] border border-[var(--line-strong)] rounded-md px-2.5 py-1.5 min-w-[62px] text-center shadow-2xs">
            <span className="text-[9px] uppercase tracking-wider text-[var(--ink-muted)] font-semibold leading-tight">
              Coup d&apos;envoi
            </span>
            <span className="tabular-nums font-bold text-sm md:text-base text-[var(--primary)] leading-tight mt-0.5">
              {FEATURED_MATCH.kickoffTime}
            </span>
          </div>
        </div>

        {/* Bottom Terrace broadcast info note */}
        <p className="text-[11px] text-[var(--ink-soft)] flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[var(--primary)] flex-shrink-0" />
          <span>{FEATURED_MATCH.venueComment}</span>
        </p>
      </div>
    </div>
  );
}
