'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowDown, Zap } from 'lucide-react';
import { Eyebrow, BrutalButton, BRUTAL_BORDER, BRUTAL_SHADOW, BRUTAL_SHADOW_SM, EASE } from '@/components/ui/brutal';
import { TOKENS_PER_CLAIM_DISPLAY } from '@/lib/config';

const HEADLINE = ['Claim your', 'free', '$SHIBSHIB.'];
const STAGGER = 0.08;

const STATS = [
  ['1T', 'Total supply'],
  ['50%', 'Burned at launch'],
  ['$0', 'Claim fee'],
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="grid-lines relative overflow-hidden bg-[var(--paper)] pb-20 pt-28 sm:pt-32 lg:pb-28"
      aria-label="Hero"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---- Left: copy ---- */}
          <div>
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-wrap items-center gap-2"
            >
              <Eyebrow>
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Airdrop live
              </Eyebrow>
              <Eyebrow light>BSC · BEP-20</Eyebrow>
            </motion.div>

            <h1 className="mt-6 font-display font-extrabold uppercase tracking-tight text-[#0A0A0A]">
              {HEADLINE.map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    style={{ fontSize: 'clamp(2rem, 10vw, 5.5rem)', lineHeight: '0.95' }}
                    initial={reduce ? { y: '0%' } : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + li * STAGGER }}
                  >
                    {li === 2 ? <span className="text-[var(--orange)]">{line}</span> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
              className="mt-6 max-w-[65ch] text-base sm:text-lg leading-relaxed text-[#0A0A0A]/70"
            >
              {TOKENS_PER_CLAIM_DISPLAY} tokens per wallet, claimed straight to your address before
              the PancakeSwap launch. One wallet. One chance. Zero fees.
            </motion.p>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="claim" smooth spy offset={-80}>
                <BrutalButton as="button" variant="orange" className="w-full px-8 py-4 text-base sm:w-auto">
                  <Zap className="h-4 w-4" /> Claim $SHIBSHIB
                </BrutalButton>
              </Link>
              <Link to="tokenomics" smooth spy offset={-80}>
                <BrutalButton as="button" variant="outline" className="w-full px-8 py-4 text-base sm:w-auto">
                  View tokenomics
                </BrutalButton>
              </Link>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
              className="mt-10 grid max-w-md grid-cols-3 rounded-[4px] bg-white"
              style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
            >
              {STATS.map(([value, label], i) => (
                <div
                  key={label}
                  className={`px-4 py-4 ${i < 2 ? 'border-r-2 border-[#0A0A0A]' : ''}`}
                >
                  <div className="font-display text-2xl font-extrabold text-[var(--orange)]">{value}</div>
                  <div className="mt-0.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- Right: framed airdrop ticket ---- */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              className="relative overflow-hidden rounded-[4px] bg-[#0A0A0A] text-white"
              style={{ border: BRUTAL_BORDER, boxShadow: '10px 10px 0 #FF5C00' }}
            >
              <div className="grid-lines-dark p-7">
                {/* Ticket header */}
                <div className="flex items-center justify-between border-b-2 border-white/15 pb-4">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                    Airdrop ticket
                  </span>
                  <span
                    className="rounded-[2px] bg-[var(--orange)] px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ border: BRUTAL_BORDER }}
                  >
                    Live
                  </span>
                </div>

                {/* Logo mark */}
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src="/logo.png"
                    alt="ShibShib"
                    className="h-14 w-14 rounded-full object-contain"
                    style={{ border: BRUTAL_BORDER }}
                  />
                  <div>
                    <div className="font-display text-xl font-extrabold uppercase tracking-tight">ShibShib</div>
                    <div className="font-mono text-xs text-white/50">The dog that barks twice</div>
                  </div>
                </div>

                {/* Allocation */}
                <div className="mt-7">
                  <div className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Your allocation
                  </div>
                  <div className="mt-1 font-display text-4xl font-extrabold text-[var(--orange)]">
                    {TOKENS_PER_CLAIM_DISPLAY}
                  </div>
                  <div className="font-mono text-sm text-white/60">$SHIBSHIB</div>
                </div>

                {/* Perforation */}
                <div className="relative my-6">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="h-4 w-4 -ml-7 rounded-full bg-[var(--paper)] sm:-ml-9" />
                    <span className="flex-1 border-t-2 border-dashed border-white/25" />
                    <span className="h-4 w-4 -mr-7 rounded-full bg-[var(--paper)] sm:-mr-9" />
                  </div>
                </div>

                {/* Meta rows */}
                <div className="space-y-2.5 font-mono text-[13px]">
                  {[
                    ['Network', 'BNB Smart Chain'],
                    ['Standard', 'BEP-20'],
                    ['Per wallet', '1 claim'],
                    ['Gas fee', '~$0.01'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-white/45">{k}</span>
                      <span className="text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticker badge */}
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, rotate: -8, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -7, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
              className="absolute right-0 -top-4 rounded-[4px] bg-white px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-[#0A0A0A] sm:-right-3"
              style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW_SM }}
            >
              Free mint
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-14 flex flex-col items-center gap-1 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/45"
      >
        <span>Scroll to claim</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
