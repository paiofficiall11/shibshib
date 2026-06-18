'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '@/components/ui/StatCard';
import ClaimProgress from '@/components/ui/ClaimProgress';
import StateDisconnected from '@/components/ui/ClaimStates/StateDisconnected';
import StateWrongNetwork from '@/components/ui/ClaimStates/StateWrongNetwork';
import StateChecking from '@/components/ui/ClaimStates/StateChecking';
import StateEligible from '@/components/ui/ClaimStates/StateEligible';
import StateClaiming from '@/components/ui/ClaimStates/StateClaiming';
import StateSuccess from '@/components/ui/ClaimStates/StateSuccess';
import StateError from '@/components/ui/ClaimStates/StateError';
import { Eyebrow, BRUTAL_BORDER, EASE } from '@/components/ui/brutal';
import { useAirdrop } from '@/hooks/useAirdrop';
import { useCountdown } from '@/hooks/useCountdown';
import { TOKENS_PER_CLAIM_DISPLAY } from '@/lib/config';

const PRESENCE = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

export default function ClaimSection() {
  const airdrop = useAirdrop();
  const [error, setError] = useState(null);
  const [claimTx, setClaimTx] = useState(null);
  const remaining = useCountdown(airdrop.claimDeadline);

  useEffect(() => {
    if (airdrop.claimState === 'SUCCESS' && airdrop.claimTxHash) {
      setClaimTx(airdrop.claimTxHash);
    }
  }, [airdrop.claimState, airdrop.claimTxHash]);

  const handleClaim = async () => {
    try {
      setError(null);
      await airdrop.claim();
    } catch (e) {
      setError(e);
    }
  };

  const handleRetry = () => setError(null);

  const timeDisplay = remaining.isExpired
    ? 'Ended'
    : `${remaining.days}D ${String(remaining.hours).padStart(2, '0')}H ${String(remaining.minutes).padStart(2, '0')}M`;

  const renderState = () => {
    switch (airdrop.claimState) {
      case 'DISCONNECTED':
        return <StateDisconnected key="disconnected" />;
      case 'WRONG_NETWORK':
        return <StateWrongNetwork key="wrong-network" />;
      case 'CHECKING':
        return <StateChecking key="checking" />;
      case 'ELIGIBLE':
        return <StateEligible key="eligible" onClaim={handleClaim} />;
      case 'CLAIMING':
        return <StateClaiming key="claiming" />;
      case 'SUCCESS':
        return <StateSuccess key="success" txHash={claimTx} />;
      case 'ERROR':
        return <StateError key="error" error={error} onRetry={handleRetry} />;
      default:
        return <StateDisconnected key="unknown" />;
    }
  };

  if (airdrop.claimState === 'CLAIMED') {
    return (
      <section id="claim" className="bg-[var(--paper)] py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="claim-card flex flex-col items-center px-8 py-14 text-center">
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-[4px] bg-[var(--success-sub)]"
              style={{ border: BRUTAL_BORDER }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-[24px] font-extrabold uppercase text-[#0A0A0A]">Already claimed</h3>
            <p className="mt-2 text-[14px] text-[#0A0A0A]/65">
              This wallet has already claimed its airdrop allocation.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="claim" className="grid-lines bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Eyebrow>Airdrop</Eyebrow>
            <Eyebrow light>Claim your tokens</Eyebrow>
          </div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Your free <span className="text-[var(--orange)]">$SHIBSHIB</span> is waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-[#0A0A0A]/65">
            {TOKENS_PER_CLAIM_DISPLAY} tokens per wallet. One claim per address. While supplies last.
          </p>
        </div>

        {/* Claim Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="claim-card p-5 md:p-8"
        >
          {/* Stats Row */}
          <div className="mb-6 grid grid-cols-3 gap-3 border-b-2 border-[#0A0A0A] pb-6">
            <StatCard label="Per Wallet" value={TOKENS_PER_CLAIM_DISPLAY} suffix="$SHIBSHIB" />
            <StatCard
              label="Remaining"
              value={airdrop.remainingTokens ? (Number(airdrop.remainingTokens) / 1e18).toLocaleString() : '50B'}
              suffix="of 100B"
            />
            <StatCard label="Time Left" value={timeDisplay} highlight={!remaining.isExpired} />
          </div>

          {/* Progress */}
          <div className="mb-6">
            <ClaimProgress
              claimed={airdrop.totalClaimed ?? 0}
              total={BigInt('100000000000') * BigInt(10 ** 18)}
              claimedDisplay="17.55B"
              totalDisplay="100B"
            />
          </div>

          {/* State Machine */}
          <AnimatePresence mode="wait">
            <motion.div key={airdrop.claimState} {...PRESENCE}>
              {renderState()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <p className="mx-auto mt-5 max-w-[420px] text-center text-[11px] text-[#0A0A0A]/45">
          $SHIBSHIB is a community meme token. Claiming does not guarantee financial returns. Not
          financial advice.
        </p>
      </div>
    </section>
  );
}
