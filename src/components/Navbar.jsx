'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-scroll';
import { BRUTAL_BORDER, BRUTAL_SHADOW, BRUTAL_SHADOW_HOVER } from '@/components/ui/brutal';

const LINKS = ['About', 'Tokenomics', 'Roadmap', 'FAQ'];

function targetFor(link) {
  return link === 'Tokenomics' ? 'tokenomics' : link.toLowerCase();
}

function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openAccountModal, openChainModal, mounted }) => {
        if (!mounted) return <div aria-hidden className="invisible h-10 w-28" />;

        if (!account || !chain) {
          return (
            <motion.button
              onClick={openConnectModal}
              whileHover={{ y: -2, x: -2, boxShadow: BRUTAL_SHADOW_HOVER }}
              whileTap={{ y: 0, x: 0, boxShadow: BRUTAL_SHADOW }}
              transition={{ duration: 0.16 }}
              className="rounded-[4px] bg-[var(--orange)] px-5 py-2.5 font-display text-[13px] font-bold uppercase tracking-wide text-white"
              style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
            >
              Connect Wallet
            </motion.button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="rounded-[4px] bg-[var(--danger)] px-4 py-2.5 font-display text-[13px] font-bold uppercase tracking-wide text-white"
              style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
            >
              Wrong Network
            </button>
          );
        }

        return (
          <button
            onClick={openAccountModal}
            className="flex items-center gap-2 rounded-[4px] bg-white px-3 py-2"
            style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
          >
            <span
              className="h-3 w-3 rounded-full border-2 border-[#0A0A0A]"
              style={{ background: `hsl(${parseInt(account.address.slice(2, 10), 16) % 360}, 80%, 55%)` }}
            />
            <span className="font-mono text-[13px] font-medium text-[#0A0A0A]">
              {account.displayName}
            </span>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200 ${
          scrolled ? 'bg-[var(--paper)]' : 'bg-transparent'
        }`}
        style={scrolled ? { borderBottom: BRUTAL_BORDER } : undefined}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link to="hero" smooth spy className="flex cursor-pointer items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--orange)] font-display text-[18px] font-extrabold text-white"
              style={{ border: BRUTAL_BORDER }}
            >
              S
            </span>
            <span className="font-display text-[17px] font-extrabold uppercase tracking-tight text-[#0A0A0A]">
              Shib<span className="text-[var(--orange)]">shib</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link}
                to={targetFor(link)}
                smooth
                spy
                offset={-80}
                className="cursor-pointer rounded-[2px] px-3 py-2 font-display text-sm font-bold uppercase tracking-wide text-[#0A0A0A] transition-colors hover:text-[var(--orange)]"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-3 md:flex">
            <WalletButton />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-white md:hidden"
            style={{ border: BRUTAL_BORDER }}
            aria-label="Toggle menu"
          >
            <div className="flex w-5 flex-col gap-1">
              <span className={`block h-0.5 bg-[#0A0A0A] transition-all ${mobileOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block h-0.5 bg-[#0A0A0A] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-[#0A0A0A] transition-all ${mobileOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col gap-3 bg-[var(--paper)] px-5 pb-8 pt-20 md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={targetFor(link)}
                  smooth
                  spy
                  offset={-80}
                  onClick={() => setMobileOpen(false)}
                  className="block cursor-pointer rounded-[4px] bg-white p-4 font-display font-bold uppercase tracking-wide text-[#0A0A0A]"
                  style={{ border: BRUTAL_BORDER }}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
            <div className="mt-auto">
              <WalletButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
