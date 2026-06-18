'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowDown } from 'lucide-react';
import { Eyebrow, BRUTAL_BORDER, BRUTAL_SHADOW, BRUTAL_SHADOW_HOVER, EASE } from '@/components/ui/brutal';

const SHIBSHIB_PER_BNB = 1_000_000_000; // 1 BNB = 1B $SHIBSHIB

export default function BuySection() {
  const [bnbAmount, setBnbAmount] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const parsedAmount = parseFloat(bnbAmount) || 0;
  const tokenAmount = parsedAmount * SHIBSHIB_PER_BNB;

  const handleBuy = () => {
    if (!parsedAmount || parsedAmount <= 0) return;
    // TODO: connect to swap contract / PancakeSwap router
  };

  return (
    <section id="buy" className="grid-lines bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Eyebrow>Buy</Eyebrow>
            <Eyebrow light>BNB → $SHIBSHIB</Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Get <span className="text-[var(--orange)]">$SHIBSHIB</span> with BNB
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-[#0A0A0A]/65">
            Swap BNB for $SHIBSHIB at the current rate. Tokens are sent directly to your wallet.
          </p>
        </motion.div>

        {/* Buy Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="claim-card p-5 sm:p-8"
        >
          {/* BNB Input */}
          <div>
            <label className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
              You pay
            </label>
            <div
              className={`flex items-stretch overflow-hidden rounded-[4px] bg-[var(--paper)] transition-shadow ${
                isFocused ? 'shadow-[0_0_0_2px_#FF5C00]' : ''
              }`}
              style={{ border: BRUTAL_BORDER }}
            >
              <input
                type="number"
                placeholder="0.00"
                value={bnbAmount}
                onChange={(e) => setBnbAmount(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                step="any"
                min="0"
                className="flex-1 bg-transparent px-4 py-4 font-mono text-[22px] font-semibold text-[#0A0A0A] placeholder:text-[#0A0A0A]/20 outline-none sm:text-[26px]"
                aria-label="BNB amount to spend"
              />
              <div className="flex items-center gap-2.5 border-l-2 border-[#0A0A0A] px-4 py-4">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3BA2F] font-display text-[12px] font-extrabold text-[#0A0A0A]"
                  style={{ border: '2px solid #0A0A0A' }}
                >
                  B
                </span>
                <span className="font-display text-[15px] font-bold uppercase tracking-wide text-[#0A0A0A]">
                  BNB
                </span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-3">
            <motion.div
              animate={parsedAmount > 0 ? { y: [0, 3, 0] } : {}}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--paper)]"
              style={{ border: BRUTAL_BORDER }}
            >
              <ArrowDown className="h-5 w-5 text-[var(--orange)]" />
            </motion.div>
          </div>

          {/* Token Output */}
          <div>
            <label className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
              You receive
            </label>
            <div
              className="flex items-stretch overflow-hidden rounded-[4px] bg-[var(--orange-tint)]"
              style={{ border: BRUTAL_BORDER }}
            >
              <div className="flex-1 px-4 py-4 font-mono text-[22px] font-semibold tabular-nums text-[#0A0A0A] sm:text-[26px]">
                {parsedAmount > 0 ? tokenAmount.toLocaleString() : '0'}
              </div>
              <div className="flex items-center gap-2.5 border-l-2 border-[#0A0A0A] px-4 py-4">
                <img
                  src="/logo.png"
                  alt="$SHIBSHIB"
                  className="h-8 w-8 rounded-full object-contain"
                  style={{ border: '2px solid #0A0A0A' }}
                />
                <span className="font-display text-[15px] font-bold uppercase tracking-wide text-[#0A0A0A]">
                  SHIBSHIB
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="font-mono text-[#0A0A0A]/40">
                1 BNB ≈ {SHIBSHIB_PER_BNB.toLocaleString()} $SHIBSHIB
              </span>
              {parsedAmount > 0 && (
                <span className="font-mono text-[#0A0A0A]/40">
                  ≈ ${(parsedAmount * 310).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Buy Button */}
          <div className="mt-6">
            <motion.button
              onClick={handleBuy}
              disabled={!parsedAmount || parsedAmount <= 0}
              whileHover={parsedAmount > 0 ? { y: -3, x: -2, boxShadow: BRUTAL_SHADOW_HOVER } : {}}
              whileTap={parsedAmount > 0 ? { y: 0, x: 0, boxShadow: BRUTAL_SHADOW } : {}}
              transition={{ duration: 0.16 }}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[4px] bg-[var(--orange)] font-display text-[15px] font-extrabold uppercase tracking-wide text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                border: BRUTAL_BORDER,
                boxShadow: parsedAmount > 0 ? BRUTAL_SHADOW : 'none',
              }}
            >
              <Zap className="h-4 w-4" />
              Buy $SHIBSHIB
            </motion.button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="mx-auto mt-5 max-w-[420px] text-center text-[11px] leading-relaxed text-[#0A0A0A]/45">
          $SHIBSHIB is a community meme token. Trading involves risk. Always verify the
          contract address before swapping. Not financial advice.
        </p>
      </div>
    </section>
  );
}
