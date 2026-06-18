'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Check, X, Copy } from 'lucide-react';
import { Eyebrow, BRUTAL_BORDER, EASE } from '@/components/ui/brutal';

function isValidBscAddress(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

export default function ReferralSection() {
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [copied, setCopied] = useState(false);

  const valid = !address || isValidBscAddress(address);
  const showError = address.length > 0 && !isValidBscAddress(address);

  const handleSubmit = () => {
    if (address && isValidBscAddress(address)) {
      setSubmitted(true);
      // TODO: send referral address to backend / store in contract
    }
  };

  const handleSkip = () => setSkipped(true);

  const handleCopyLink = async () => {
    const refLink = `${window.location.origin}?ref=${address}`;
    await navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // After submit or skip, show confirmation
  if (submitted || skipped) {
    return (
      <section id="referral" className="bg-[var(--paper)] py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="claim-card flex flex-col items-center p-8 text-center"
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-[4px] bg-[var(--success-sub)]"
              style={{ border: BRUTAL_BORDER }}
            >
              <Check className="h-6 w-6 text-[var(--success)]" />
            </div>
            <h3 className="font-display text-[20px] font-extrabold uppercase text-[#0A0A0A]">
              {submitted ? 'Referral saved' : 'All set'}
            </h3>
            <p className="mt-2 text-[14px] text-[#0A0A0A]/65">
              {submitted
                ? 'Your referral has been recorded. Happy claiming!'
                : 'No worries. You can always add a referral later.'}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="referral" className="bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>
              <UserPlus className="h-3 w-3" />
              Referral
            </Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,44px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Got a referral?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-[#0A0A0A]/60">
            Enter the wallet address of the person who referred you. This is completely optional
            and won&apos;t affect your airdrop claim.
          </p>
        </motion.div>

        {/* Referral Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="claim-card p-5 sm:p-8"
        >
          <div className="mb-5">
            <label
              htmlFor="referral-address"
              className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55"
            >
              Referral wallet address
              <span className="ml-1 font-mono text-[10px] font-normal tracking-normal text-[#0A0A0A]/30">
                (optional)
              </span>
            </label>
            <div
              className={`overflow-hidden rounded-[4px] bg-[var(--paper)] transition-shadow ${
                isFocused ? 'shadow-[0_0_0_2px_#FF5C00]' : ''
              } ${showError ? 'shadow-[0_0_0_2px_#C81E1E]' : ''}`}
              style={{ border: BRUTAL_BORDER }}
            >
              <input
                id="referral-address"
                type="text"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent px-4 py-4 font-mono text-[16px] font-medium text-[#0A0A0A] placeholder:text-[#0A0A0A]/20 outline-none"
                aria-label="Referral wallet address"
                aria-describedby={showError ? 'ref-error' : undefined}
                aria-invalid={showError}
              />
            </div>
            {showError && (
              <p id="ref-error" className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-[var(--danger)]">
                <X className="h-3 w-3" />
                Invalid BSC address — must start with 0x and be 42 characters
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.button
              onClick={handleSubmit}
              disabled={!address || !isValidBscAddress(address)}
              whileHover={
                address && isValidBscAddress(address)
                  ? { y: -3, x: -2 }
                  : {}
              }
              whileTap={
                address && isValidBscAddress(address)
                  ? { y: 0, x: 0 }
                  : {}
              }
              transition={{ duration: 0.16 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-[var(--orange)] px-6 py-4 font-display text-[14px] font-bold uppercase tracking-wide text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                border: BRUTAL_BORDER,
                boxShadow:
                  address && isValidBscAddress(address)
                    ? '6px 6px 0 #0A0A0A'
                    : 'none',
              }}
            >
              <UserPlus className="h-4 w-4" />
              Save referral
            </motion.button>
            <button
              onClick={handleSkip}
              className="flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-white px-6 py-4 font-display text-[14px] font-bold uppercase tracking-wide text-[#0A0A0A]/55 transition-colors hover:text-[#0A0A0A]"
              style={{ border: BRUTAL_BORDER }}
            >
              Skip
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Share your own ref link */}
          <div className="mt-6 border-t-2 border-[#0A0A0A]/10 pt-6">
            <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#0A0A0A]/50">
              Want to refer others?
            </p>
            <p className="mb-3 text-[13px] text-[#0A0A0A]/55">
              Connect your wallet above first, then copy your unique referral link below
              to share with friends.
            </p>
            <button
              onClick={handleCopyLink}
              className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-[var(--paper)] px-4 py-3 font-mono text-[13px] font-medium text-[#0A0A0A]/45 transition-all hover:text-[#0A0A0A]"
              style={{ border: BRUTAL_BORDER }}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[var(--success)]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy your referral link
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
