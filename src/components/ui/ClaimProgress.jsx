'use client';
import { formatNumber } from '@/lib/utils';

export default function ClaimProgress({ claimed, total, claimedDisplay, totalDisplay }) {
  const pct = total > 0 ? Math.min(100, (Number(claimed) / Number(total)) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/70">
          Claimed
        </span>
        <span className="font-mono text-[12px] text-[#0A0A0A]/55">
          {claimedDisplay || formatNumber(Number(claimed) / 1e18)} /{' '}
          {totalDisplay || formatNumber(Number(total) / 1e18)}
        </span>
      </div>
      <div
        className="h-5 w-full overflow-hidden rounded-[3px] bg-[var(--paper)]"
        style={{ border: '2px solid #0A0A0A' }}
      >
        <div
          className="h-full bg-[var(--orange)] transition-all duration-700"
          style={{
            width: `${Math.max(pct, 4)}%`,
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0 6px, transparent 6px 12px)',
          }}
        />
      </div>
    </div>
  );
}
