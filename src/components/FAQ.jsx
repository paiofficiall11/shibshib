'use client';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Eyebrow, BRUTAL_BORDER } from '@/components/ui/brutal';

const faqs = [
  {
    q: 'What is $SHIBSHIB?',
    a: '$SHIBSHIB is a community-driven BEP-20 meme token on BNB Smart Chain, inspired by the legendary Shiba Inu lineage. No venture capital. No team allocation that unlocks in 30 days. Just a fair airdrop to early believers and a 50% burn at launch that makes every claim more meaningful.',
  },
  {
    q: 'Is the airdrop free?',
    a: 'Yes — completely free. The only cost is a small BNB gas fee (approximately $0.01 at current rates) to process your claim transaction on BSC. We never charge a claim fee, and there are no hidden costs.',
  },
  {
    q: 'How many tokens can I claim?',
    a: '50 million $SHIBSHIB per unique wallet address. One claim per address — we enforce this on-chain to keep the distribution fair. No multi-wallet farming.',
  },
  {
    q: 'When will $SHIBSHIB be listed on PancakeSwap?',
    a: 'After the airdrop period closes and the community reaches 5,000 holders. 30% of supply is reserved for PancakeSwap liquidity and will be locked. Follow our social channels for the official announcement.',
  },
  {
    q: 'Is the smart contract audited?',
    a: 'The contract is open-source and will be verified on BSCScan before launch. A third-party audit is in progress and the report will be published before the PancakeSwap listing.',
  },
  {
    q: 'What wallet do I need?',
    a: "Any EVM-compatible wallet that supports BNB Smart Chain: MetaMask, Trust Wallet, Coinbase Wallet, or any WalletConnect-compatible wallet. Just make sure you're on the BSC network.",
  },
  {
    q: 'I claimed — where are my tokens?',
    a: 'They\'re in your wallet. Since $SHIBSHIB is a custom token, it may not appear automatically. Use the "Add to MetaMask" button in the success state, or manually add the token using the contract address listed on BSCScan.',
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function FAQ() {
  return (
    <section id="faq" className="bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>FAQ</Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Frequently asked
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-[4px] bg-white px-5"
                style={{ border: BRUTAL_BORDER, boxShadow: '4px 4px 0 #0A0A0A' }}
              >
                <AccordionTrigger className="py-4 text-left font-display text-[15px] font-bold uppercase tracking-wide text-[#0A0A0A] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[14px] leading-relaxed text-[#0A0A0A]/65">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
