import { cn } from '@/lib/utils';

export default function StatCard({ label, value, suffix, highlight = false }) {
  return (
    <div className="rounded-[4px] bg-[var(--paper)] p-4" style={{ border: '2px solid #0A0A0A' }}>
      <span className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
        {label}
      </span>
      <div className="mt-1 flex flex-col">
        <span
          className={cn(
            'font-display text-[18px] font-extrabold leading-tight',
            highlight ? 'text-[var(--orange)]' : 'text-[#0A0A0A]',
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="font-mono text-[11px] text-[#0A0A0A]/45">{suffix}</span>
        )}
      </div>
    </div>
  );
}
