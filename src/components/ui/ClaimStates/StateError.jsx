'use client';
import { AlertOctagon } from 'lucide-react';
import { BRUTAL_BORDER, BRUTAL_SHADOW } from '@/components/ui/brutal';

export default function StateError({ error, onRetry }) {
  return (
    <div>
      <div
        className="mb-4 flex items-start gap-3 rounded-[4px] bg-[var(--danger-sub)] p-4"
        style={{ border: BRUTAL_BORDER }}
      >
        <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--danger)]" />
        <div>
          <p className="font-display text-[13px] font-extrabold uppercase text-[var(--danger)]">
            Transaction failed
          </p>
          <p className="mt-1 break-words text-[13px] text-[#0A0A0A]/65">
            {error?.shortMessage || error?.message || error || 'An unknown error occurred. Please try again.'}
          </p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="h-[52px] w-full rounded-[4px] bg-white font-display text-[14px] font-extrabold uppercase tracking-wide text-[#0A0A0A]"
        style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
      >
        Try Again
      </button>
    </div>
  );
}
