'use client';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Gift, ArrowRight } from 'lucide-react';
import { Eyebrow, BrutalButton, BRUTAL_BORDER, BRUTAL_SHADOW, EASE } from '@/components/ui/brutal';
import { TOKENS_PER_CLAIM_DISPLAY } from '@/lib/config';

export default function ClaimCTA() {
  return (
    <section id="claim-cta" className="grid-lines bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>
              <Gift className="h-3 w-3" />
              Free Airdrop
            </Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Don&apos;t miss your <span className="text-[var(--orange)]">$SHIBSHIB</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-[#0A0A0A]/65">
            {TOKENS_PER_CLAIM_DISPLAY} tokens per wallet. Free to claim. One wallet, one claim.
          </p>
        </motion.div>

        {/* Claim Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="claim-card flex flex-col items-center p-8 text-center"
        >
          {/* Amount highlight */}
          <div
            className="mb-6 rounded-[4px] bg-[var(--orange-tint)] px-8 py-5"
            style={{ border: BRUTAL_BORDER }}
          >
            <span className="block font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]/50">
              Your allocation
            </span>
            <span className="mt-1 block font-display text-[clamp(36px,6vw,56px)] font-extrabold leading-none text-[var(--orange)]">
              {TOKENS_PER_CLAIM_DISPLAY}
            </span>
            <span className="mt-0.5 block font-mono text-[13px] text-[#0A0A0A]/45">$SHIBSHIB</span>
          </div>

          <p className="mb-6 max-w-sm text-[14px] leading-relaxed text-[#0A0A0A]/60">
            Connect your wallet, switch to BSC, and claim your free tokens in under 30 seconds.
            Zero claim fees — only a small BNB gas fee.
          </p>

          <Link to="claim" smooth spy offset={-80}>
            <BrutalButton as="button" variant="orange" className="px-10 py-4 text-base">
              <Gift className="h-5 w-5" />
              Claim $SHIBSHIB Now
              <ArrowRight className="h-4 w-4" />
            </BrutalButton>
          </Link>
        </motion.div>

        <p className="mx-auto mt-5 max-w-[420px] text-center text-[11px] text-[#0A0A0A]/45">
          Already claimed? Spread the word. The more holders, the stronger the community.
        </p>
      </div>
    </section>
  );
}
