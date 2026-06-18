'use client';
import { motion } from 'framer-motion';
import { Eyebrow, BRUTAL_BORDER } from '@/components/ui/brutal';

const phases = [
  {
    phase: 'Phase 01',
    title: 'Ignition',
    status: 'LIVE',
    items: [
      'Smart contract deployed and verified on BSCScan',
      'Airdrop claim page live for all eligible wallets',
      '50% of total supply burned at deployment',
      '5,000 holders milestone',
    ],
  },
  {
    phase: 'Phase 02',
    title: 'Liftoff',
    status: 'NEXT',
    items: [
      'PancakeSwap listing with 30% liquidity allocation',
      'Liquidity locked via team.finance for 12 months',
      '10,000 holders milestone reached',
      'First community burn event following governance vote',
    ],
  },
  {
    phase: 'Phase 03',
    title: 'Orbit',
    status: 'SOON',
    items: [
      'CoinMarketCap and CoinGecko listing applications',
      'CEX exchange listing applications submitted',
      'Community DAO launched for governance decisions',
      'Second strategic burn event',
    ],
  },
  {
    phase: 'Phase 04',
    title: 'Moon',
    status: 'SOON',
    items: [
      'Cross-chain bridge to Ethereum and Polygon',
      'ShibShib V2 ecosystem with staking module',
      'NFT collection for airdrop claimers',
      '100,000 holders milestone',
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1];

function StatusBadge({ status }) {
  const cls =
    status === 'LIVE' ? 'badge-base badge-live' : status === 'NEXT' ? 'badge-base badge-upcoming' : 'badge-base badge-ended';
  return <span className={cls}>{status}</span>;
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="grid-lines bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12"
        >
          <Eyebrow>Roadmap</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            The road to the moon
          </h2>
        </motion.div>

        <div className="relative">
          {phases.map((p, i) => {
            const active = p.status === 'LIVE';
            return (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {/* Timeline node */}
                <div className="flex w-6 shrink-0 flex-col items-center">
                  <span
                    className="z-10 mt-1 h-6 w-6 rounded-full"
                    style={{
                      border: BRUTAL_BORDER,
                      background: active ? '#FF5C00' : '#FFFFFF',
                    }}
                  />
                  {i < phases.length - 1 && <span className="mt-1 w-0.5 flex-1 bg-[#0A0A0A]" />}
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-[4px] bg-white p-6"
                  style={{ border: BRUTAL_BORDER, boxShadow: active ? '6px 6px 0 #FF5C00' : '6px 6px 0 #0A0A0A' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/50">
                      {p.phase}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="mt-1 font-display text-[22px] font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                    {p.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-2 w-2 shrink-0 bg-[var(--orange)]" />
                        <span className="text-[14px] text-[#0A0A0A]/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
