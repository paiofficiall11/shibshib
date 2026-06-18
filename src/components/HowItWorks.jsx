'use client';
import { motion } from 'framer-motion';
import { Wallet, Globe, Zap } from 'lucide-react';
import { Eyebrow, BRUTAL_BORDER } from '@/components/ui/brutal';

const steps = [
  {
    num: '01',
    icon: Wallet,
    title: 'Connect your wallet',
    desc: 'Connect MetaMask, Trust Wallet, or any WalletConnect-compatible wallet. Your keys, your tokens — always non-custodial.',
  },
  {
    num: '02',
    icon: Globe,
    title: 'Switch to BSC',
    desc: "Make sure you're on the BNB Smart Chain network. On a different chain? We'll prompt you to switch in one click.",
  },
  {
    num: '03',
    icon: Zap,
    title: 'Claim your tokens',
    desc: 'Click Claim, confirm the small gas fee (~$0.01), and 50M $SHIBSHIB land directly in your address.',
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function HowItWorks() {
  return (
    <section id="about" className="bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>How it works</Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Claim in three steps
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -4, x: -2, boxShadow: '8px 8px 0 #0A0A0A' }}
              className="rounded-[4px] bg-white p-7"
              style={{ border: BRUTAL_BORDER, boxShadow: '6px 6px 0 #0A0A0A' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[var(--orange)]"
                  style={{ border: BRUTAL_BORDER }}
                >
                  <step.icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                </span>
                <span className="font-display text-[44px] font-extrabold leading-none text-[#0A0A0A]/10">
                  {step.num}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[18px] font-extrabold uppercase tracking-wide text-[#0A0A0A]">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/65">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
