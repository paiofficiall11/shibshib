'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Eyebrow, BRUTAL_BORDER, EASE } from '@/components/ui/brutal';
import { REFERRAL_BASE } from '@/lib/config';

function isValidAddress(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

export default function ReferralSection() {
  const [wallet, setWallet] = useState('');
  const [copied, setCopied] = useState(false);

  const inviteLink = wallet && isValidAddress(wallet)
    ? `${REFERRAL_BASE}?ref=${wallet}`
    : '';

  const handleCopy = useCallback(async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success('Invite link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  }, [inviteLink]);

  return (
    <section id="referral" className="bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Eyebrow>Referral</Eyebrow>
            <Eyebrow light>Share & earn</Eyebrow>
          </div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Invite friends. <span className="text-[var(--orange)]">Earn together.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-[#0A0A0A]/65">
            Drop your wallet address to generate a referral link. Share it and earn when others claim or buy.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="claim-card p-5 sm:p-6 md:p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
                Your Wallet Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={wallet}
                onChange={(e) => {
                  setWallet(e.target.value);
                  setCopied(false);
                }}
                className="mt-2 w-full rounded-[4px] bg-white px-3 py-2.5 font-mono text-[14px] text-[#0A0A0A] outline-none placeholder:text-[#0A0A0A]/25"
                style={{ border: BRUTAL_BORDER }}
              />
            </div>

            {inviteLink && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 rounded-[4px] bg-[var(--paper)] p-4"
                style={{ border: BRUTAL_BORDER }}
              >
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-[var(--orange)]" />
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
                    Your invite link
                  </span>
                </div>
                <div
                  className="break-all rounded-[4px] bg-white px-3 py-2 font-mono text-[13px] text-[#0A0A0A]"
                  style={{ border: '2px solid #0A0A0A' }}
                >
                  {inviteLink}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[4px] bg-[var(--orange)] font-display text-[13px] font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
                  style={{ border: BRUTAL_BORDER, boxShadow: '4px 4px 0 #0A0A0A' }}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy Invite Link
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {wallet && !isValidAddress(wallet) && (
              <p className="text-center font-mono text-[12px] text-[var(--danger)]">
                Please enter a valid BSC wallet address (0x...)
              </p>
            )}
          </div>
        </motion.div>

        <p className="mx-auto mt-5 max-w-[420px] text-center text-[11px] text-[#0A0A0A]/45">
          Referral rewards are tracked on-chain. The more people use your link, the more you earn.
        </p>
      </div>
    </section>
  );
}
