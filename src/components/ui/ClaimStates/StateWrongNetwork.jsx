'use client';
import { useSwitchChain } from 'wagmi';
import { bsc } from 'viem/chains';
import { AlertTriangle } from 'lucide-react';
import { BRUTAL_BORDER, BRUTAL_SHADOW } from '@/components/ui/brutal';

export default function StateWrongNetwork() {
  const { switchChain } = useSwitchChain();

  return (
    <div>
      <div
        className="mb-4 flex items-start gap-3 rounded-[4px] bg-[var(--warning-sub)] p-4"
        style={{ border: BRUTAL_BORDER }}
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--warning)]" />
        <div>
          <p className="font-display text-[13px] font-extrabold uppercase text-[var(--warning)]">
            Wrong network
          </p>
          <p className="mt-0.5 text-[13px] text-[#0A0A0A]/65">
            Switch to BNB Smart Chain to continue.
          </p>
        </div>
      </div>
      <button
        onClick={() => switchChain({ chainId: bsc.id })}
        className="h-[52px] w-full rounded-[4px] bg-[var(--orange)] font-display text-[14px] font-extrabold uppercase tracking-wide text-white"
        style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
      >
        Switch to BSC
      </button>
    </div>
  );
}
