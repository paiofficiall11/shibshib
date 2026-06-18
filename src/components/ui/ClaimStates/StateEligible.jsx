'use client';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRUTAL_BORDER, BRUTAL_SHADOW, BRUTAL_SHADOW_HOVER } from '@/components/ui/brutal';
import { TOKENS_PER_CLAIM_DISPLAY } from '@/lib/config';

export default function StateEligible({ onClaim, costDisplay }) {
  return (
    <div>
      <div
        className="mb-4 flex items-start gap-3 rounded-[4px] bg-[var(--orange-tint)] p-4"
        style={{ border: BRUTAL_BORDER }}
      >
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" />
        <div>
          <p className="font-display text-[13px] font-extrabold uppercase text-[#0A0A0A]">
            You&apos;re eligible
          </p>
          <p className="mt-0.5 text-[13px] text-[#0A0A0A]/65">
            {TOKENS_PER_CLAIM_DISPLAY} $SHIBSHIB ready to claim.
          </p>
        </div>
      </div>
      <motion.button
        onClick={onClaim}
        whileHover={{ y: -3, x: -2, boxShadow: BRUTAL_SHADOW_HOVER }}
        whileTap={{ y: 0, x: 0, boxShadow: BRUTAL_SHADOW }}
        transition={{ duration: 0.16 }}
        className="h-[52px] w-full rounded-[4px] bg-[var(--orange)] font-display text-[15px] font-extrabold uppercase tracking-wide text-white"
        style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
      >
        Claim {TOKENS_PER_CLAIM_DISPLAY} $SHIBSHIB
      </motion.button>
      <p className="mt-3 text-center font-mono text-[12px] text-[#0A0A0A]/45">
        Network cost: {costDisplay || '0.009 BNB'} · No other fees
      </p>
    </div>
  );
}
