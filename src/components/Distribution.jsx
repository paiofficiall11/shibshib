'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Eyebrow, BRUTAL_BORDER, EASE } from '@/components/ui/brutal';

const segments = [
  { label: 'Burn (Dead)', pct: 50, color: '#FF5C00', amount: '500,000,000,000' },
  { label: 'Liquidity', pct: 30, color: '#0A0A0A', amount: '300,000,000,000' },
  { label: 'Airdrop', pct: 10, color: '#FF9259', amount: '100,000,000,000' },
  { label: 'Marketing', pct: 5, color: '#9A9A96', amount: '50,000,000,000' },
  { label: 'Team', pct: 5, color: '#CFCFC9', amount: '50,000,000,000' },
];

const circumference = 2 * Math.PI * 70;
const gapDeg = 2;
const totalGapPct = (segments.length * gapDeg) / 360;
const totalPct = 100 + totalGapPct * 100;

function DonutSegment({ pct, color, offset, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const segPct = (pct / 100) * (1 - totalGapPct);
  const dashLen = (segPct / totalPct) * circumference * 100;

  return (
    <motion.circle
      ref={ref}
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke={color}
      strokeWidth="36"
      strokeDasharray={`${dashLen} ${circumference * 100}`}
      strokeDashoffset={-offset}
      initial={{ strokeDasharray: `0 ${circumference * 100}` }}
      animate={inView ? { strokeDasharray: `${dashLen} ${circumference * 100}` } : {}}
      transition={{ duration: 1.1, delay, ease: 'easeOut' }}
      style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 100px' }}
    />
  );
}

export default function Distribution() {
  let cumulative = 0;
  const offsets = segments.map((s) => {
    const segPct = (s.pct / 100) * (1 - totalGapPct);
    const offset = (cumulative / totalPct) * circumference * 100;
    cumulative += segPct + gapDeg / 360;
    return offset;
  });

  return (
    <section id="tokenomics" className="grid-lines bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12"
        >
          <Eyebrow>Tokenomics</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Token distribution
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Donut */}
          <div className="flex justify-center">
            <div
              className="relative flex h-[260px] w-[260px] items-center justify-center rounded-[4px] bg-white p-4 sm:h-[320px] sm:w-[320px] sm:p-6"
              style={{ border: BRUTAL_BORDER, boxShadow: '8px 8px 0 #0A0A0A' }}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                {segments.map((s, i) => (
                  <DonutSegment key={s.label} pct={s.pct} color={s.color} offset={offsets[i]} delay={i * 0.1} />
                ))}
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[40px] font-extrabold leading-none text-[#0A0A0A]">1T</span>
                <span className="mt-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]/45">
                  Supply
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div>
            <div className="rounded-[4px] bg-white" style={{ border: BRUTAL_BORDER, boxShadow: '6px 6px 0 #0A0A0A' }}>
              {segments.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center px-5 py-4 ${i < segments.length - 1 ? 'border-b-2 border-[#0A0A0A]/10' : ''}`}
                >
                  <span
                    className="mr-3 h-4 w-4 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: s.color, border: '2px solid #0A0A0A' }}
                  />
                  <span className="font-display text-[14px] font-bold uppercase tracking-wide text-[#0A0A0A]">
                    {s.label}
                  </span>
                  <span className="ml-auto mr-6 font-display text-[16px] font-extrabold text-[var(--orange)]">
                    {s.pct}%
                  </span>
                  <span className="hidden font-mono text-[11px] text-[#0A0A0A]/50 sm:block">{s.amount}</span>
                </div>
              ))}
            </div>

            <div
              className="mt-6 flex items-start gap-3 rounded-[4px] bg-[#0A0A0A] p-5 text-white"
              style={{ border: BRUTAL_BORDER, boxShadow: '6px 6px 0 #FF5C00' }}
            >
              <Flame className="mt-0.5 h-5 w-5 shrink-0 text-[var(--orange)]" />
              <p className="text-[13px] leading-relaxed text-white/80">
                50% of supply is burned at deployment — sent to{' '}
                <span className="font-mono text-[var(--orange)]">0x000…dEaD</span> and permanently removed
                from circulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
