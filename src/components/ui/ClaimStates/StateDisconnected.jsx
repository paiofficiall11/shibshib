'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { BRUTAL_BORDER, BRUTAL_SHADOW, BRUTAL_SHADOW_HOVER } from '@/components/ui/brutal';

export default function StateDisconnected() {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => (
        <div className="flex flex-col items-center py-2">
          <motion.button
            onClick={openConnectModal}
            disabled={!mounted}
            whileHover={{ y: -3, x: -2, boxShadow: BRUTAL_SHADOW_HOVER }}
            whileTap={{ y: 0, x: 0, boxShadow: BRUTAL_SHADOW }}
            transition={{ duration: 0.16 }}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[4px] bg-[var(--orange)] font-display text-[15px] font-extrabold uppercase tracking-wide text-white"
            style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
          >
            <Wallet className="h-4 w-4" /> Connect Wallet
          </motion.button>
          <p className="mt-4 text-center text-[13px] text-[#0A0A0A]/55">
            Connect MetaMask, Trust Wallet, or any WalletConnect wallet to check eligibility.
          </p>
        </div>
      )}
    </ConnectButton.Custom>
  );
}
