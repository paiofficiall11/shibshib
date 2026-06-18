'use client';
import { motion } from 'framer-motion';
import AddressDisplay from '@/components/ui/AddressDisplay';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { Eyebrow, BrutalCard, BRUTAL_BORDER, EASE } from '@/components/ui/brutal';
import {
  TOKEN_ADDRESS,
  TOKENS_PER_CLAIM_DISPLAY,
  TOTAL_AIRDROP_DISPLAY,
} from '@/lib/config';

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: EASE },
};

const CLAIM_DEADLINE = Math.floor(Date.now() / 1000) + 30 * 86400;

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-[#0A0A0A]/10 py-3 last:border-b-0">
      <span className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-[#0A0A0A]/55">
        {label}
      </span>
      <span className="flex items-center gap-2 text-[14px] font-medium text-[#0A0A0A]">{children}</span>
    </div>
  );
}

export default function TokenInfo() {
  return (
    <section id="token" className="bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...REVEAL} className="mb-12">
          <Eyebrow>Reference</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Token information
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BrutalCard {...REVEAL} transition={{ ...REVEAL.transition, delay: 0.1 }} className="p-7">
            <h3 className="mb-5 font-display text-[15px] font-extrabold uppercase tracking-wide text-[#0A0A0A]">
              Token details
            </h3>
            <div>
              {[
                ['Token Name', 'ShibShib'],
                ['Symbol', '$SHIBSHIB'],
                ['Blockchain', 'BNB Smart Chain'],
                ['Standard', 'BEP-20'],
                ['Decimals', '18'],
                ['Total Supply', '1,000,000,000,000'],
              ].map(([label, value]) => (
                <Row key={label} label={label}>
                  {label === 'Blockchain' && <span className="badge-base badge-bsc text-[10px]">BSC</span>}
                  {value}
                </Row>
              ))}
              <Row label="Contract">
                <AddressDisplay address={TOKEN_ADDRESS} />
              </Row>
            </div>
          </BrutalCard>

          <BrutalCard
            {...REVEAL}
            transition={{ ...REVEAL.transition, delay: 0.2 }}
            tone="black"
            className="p-7"
          >
            <h3 className="mb-5 font-display text-[15px] font-extrabold uppercase tracking-wide text-white">
              Airdrop details
            </h3>
            <div>
              {[
                ['Status', 'LIVE'],
                ['Airdrop Pool', `${TOTAL_AIRDROP_DISPLAY} $SHIBSHIB`],
                ['Per Wallet', `${TOKENS_PER_CLAIM_DISPLAY} $SHIBSHIB`],
                ['Eligible', '1 per address'],
                ['Network Fee', '~$0.01 BNB'],
                ['DEX Listing', 'PancakeSwap (soon)'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b-2 border-white/10 py-3"
                >
                  <span className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-white/45">
                    {label}
                  </span>
                  <span className="flex items-center gap-2 text-[14px] font-medium text-white">
                    {label === 'Status' && (
                      <span
                        className="rounded-[2px] bg-[var(--orange)] px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide text-white"
                        style={{ border: BRUTAL_BORDER }}
                      >
                        Live
                      </span>
                    )}
                    {label !== 'Status' && value}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-white/45">
                  Claim Deadline
                </span>
                <CountdownTimer targetTimestamp={CLAIM_DEADLINE} />
              </div>
            </div>
          </BrutalCard>
        </div>
      </div>
    </section>
  );
}
