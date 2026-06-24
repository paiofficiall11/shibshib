'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useSwitchChain } from 'wagmi';
import { bsc } from 'viem/chains';
import toast from 'react-hot-toast';
import StatCard from '@/components/ui/StatCard';
import AddressDisplay from '@/components/ui/AddressDisplay';
import { Eyebrow, BRUTAL_BORDER, EASE } from '@/components/ui/brutal';
import { useBuy } from '@/hooks/useBuy';
import { TOKEN_SYMBOL, BSCSCAN_BASE, BUY_PRICE_DISPLAY } from '@/lib/config';

const PRESENCE = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

export default function BuySection() {
  const buy = useBuy();
  const { openConnectModal } = useConnectModal();
  const { switchChainAsync } = useSwitchChain();
  const [ethAmount, setEthAmount] = useState('0.01');
  const pendingBuy = useRef(false);

  const executeBuy = async () => {
    try {
      await buy.buy(ethAmount);
    } catch (e) {
      toast.error(e.shortMessage || 'Transaction failed');
    }
  };

  const handleBuy = async () => {
    // Not connected yet → open the wallet modal; the purchase resumes
    // automatically once a wallet is connected (see effect below).
    if (!buy.isConnected) {
      pendingBuy.current = true;
      openConnectModal?.();
      return;
    }
    // Connected but on the wrong chain → switch to BSC first.
    if (!buy.isCorrectNetwork) {
      try {
        await switchChainAsync({ chainId: bsc.id });
      } catch {
        toast.error('Switch to BSC to continue');
        return;
      }
    }
    await executeBuy();
  };

  // Resume a purchase the user kicked off before connecting their wallet.
  useEffect(() => {
    if (pendingBuy.current && buy.isConnected) {
      pendingBuy.current = false;
      handleBuy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buy.isConnected]);

  const estTokens = buy.estimatedTokens(ethAmount);
  const priceDisplay = BUY_PRICE_DISPLAY;

  const renderState = () => {
    switch (buy.buyState) {
      case 'BUYING':
        return (
          <div key="buying" className="flex flex-col items-center gap-3 py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--orange)] border-t-transparent" />
            <p className="font-display text-[13px] font-bold uppercase text-[#0A0A0A]/55">
              Processing purchase...
            </p>
          </div>
        );
      case 'SUCCESS':
        return (
          <div key="success" className="flex flex-col items-center py-4">
            <div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-[4px] bg-[var(--success-sub)]"
              style={{ border: BRUTAL_BORDER }}
            >
              <Check className="h-6 w-6 text-[var(--success)]" />
            </div>
            <h4 className="font-display text-[18px] font-extrabold uppercase text-[#0A0A0A]">
              Purchased!
            </h4>
            <p className="mt-1 font-display text-[16px] font-bold text-[var(--orange)]">
              ~{Number(estTokens).toLocaleString()} {TOKEN_SYMBOL}
            </p>
            {buy.buyTxHash && (
              <div className="mt-3">
                <AddressDisplay address={buy.buyTxHash} />
                <a
                  href={`${BSCSCAN_BASE}/tx/${buy.buyTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-[var(--orange)] hover:underline"
                >
                  View on BSCScan <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        );
      case 'AVAILABLE':
      default:
        return (
          <div key="available" className="space-y-4">
            <div className="rounded-[4px] bg-[var(--paper)] p-4" style={{ border: '2px solid #0A0A0A' }}>
              <label className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
                BNB Amount
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  className="w-full rounded-[4px] bg-white px-3 py-2 font-mono text-[16px] font-medium text-[#0A0A0A] outline-none"
                  style={{ border: '2px solid #0A0A0A' }}
                />
                <span className="font-display text-[13px] font-extrabold uppercase text-[#0A0A0A]/55">
                  BNB
                </span>
              </div>
            </div>

            <div className="rounded-[4px] bg-[var(--orange-tint)] p-3" style={{ border: '2px solid #0A0A0A' }}>
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] font-bold uppercase tracking-wide text-[#0A0A0A]/55">
                  You receive (~)
                </span>
                <span className="font-display text-[13px] font-bold uppercase text-[#0A0A0A]/55">
                  1 {TOKEN_SYMBOL} = {priceDisplay}
                </span>
              </div>
              <div className="mt-1 font-display text-[20px] font-extrabold text-[var(--orange)]">
                ~{Number(estTokens).toLocaleString()} <span className="text-[14px]">{TOKEN_SYMBOL}</span>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={!ethAmount || parseFloat(ethAmount) <= 0}
              className="h-[52px] w-full rounded-[4px] bg-[#0A0A0A] font-display text-[15px] font-extrabold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#0A0A0A] disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_#0A0A0A]"
              style={{ border: BRUTAL_BORDER, boxShadow: '6px 6px 0 #0A0A0A' }}
            >
              Buy {TOKEN_SYMBOL}
            </button>

            <p className="text-center font-mono text-[11px] text-[#0A0A0A]/45">
              Gas fees apply · Tokens sent to your wallet instantly
            </p>
          </div>
        );
    }
  };

  return (
    <section id="buy" className="grid-lines bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Eyebrow>Buy</Eyebrow>
            <Eyebrow light>Get {TOKEN_SYMBOL} now</Eyebrow>
          </div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            Buy <span className="text-[var(--orange)]">{TOKEN_SYMBOL}</span> before launch.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-[#0A0A0A]/65">
            Get your tokens at presale price. No limits. No vesting. Straight to your wallet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-center font-display text-[13px] font-bold uppercase tracking-wide text-[#0A0A0A]">
            1 {TOKEN_SYMBOL} = {priceDisplay} · 50B {TOKEN_SYMBOL} remaining
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="claim-card p-4 sm:p-5 md:p-8"
        >
          <div className="mb-6 grid grid-cols-1 gap-3 border-b-2 border-[#0A0A0A] pb-6 sm:grid-cols-3">
            <StatCard
              label="Price per Token"
              value={priceDisplay}
            />
            <StatCard
              label="Remaining"
              value="50B"
              suffix={`${TOKEN_SYMBOL}`}
            />
            <div className="rounded-[4px] bg-[var(--paper)] p-4" style={{ border: '2px solid #0A0A0A' }}>
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55">
                Sale Status
              </span>
              <div className="mt-1">
                <span
                  className="font-display text-[18px] font-extrabold leading-tight text-[var(--success)]"
                  style={{ animation: 'blink-live 1.2s ease-in-out infinite' }}
                >
                  Live
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={buy.buyState === 'BUYING' || buy.buyState === 'SUCCESS' ? buy.buyState : 'form'}
              {...PRESENCE}
            >
              {renderState()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <p className="mx-auto mt-5 max-w-[420px] text-center text-[11px] text-[#0A0A0A]/45">
          {TOKEN_SYMBOL} is a community meme token. Purchasing does not guarantee financial returns. Not
          financial advice.
        </p>
      </div>
    </section>
  );
}
