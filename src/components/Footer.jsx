'use client';
import { X, Send, Code } from 'lucide-react';
import { Link } from 'react-scroll';
import { SOCIAL_LINKS, TOKEN_ADDRESS } from '@/lib/config';
import { BRUTAL_BORDER } from '@/components/ui/brutal';

const quickLinks = [
  ['Claim Airdrop', 'claim'],
  ['Buy $SHIBSHIB', 'buy'],
  ['Referral', 'referral'],
  ['Tokenomics', 'tokenomics'],
  ['Roadmap', 'roadmap'],
  ['FAQ', 'faq'],
];

const socials = [
  { name: 'Twitter / X', href: SOCIAL_LINKS.twitter, Icon: X },
  { name: 'Telegram', href: SOCIAL_LINKS.telegram, Icon: Send },
  { name: 'GitHub', href: '#', Icon: Code },
];

export default function Footer() {
  return (
    <footer
      className="grid-lines-dark bg-[#0A0A0A] pb-10 pt-16 text-white"
      style={{ borderTop: BRUTAL_BORDER }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top: brand + CTA */}
        <div className="flex flex-col gap-8 border-b-2 border-white/15 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="ShibShib"
                className="h-10 w-10 rounded-full object-contain"
                style={{ border: '2px solid #FFFFFF' }}
              />
              <span className="font-display text-[18px] font-extrabold uppercase tracking-tight">
                Shib<span className="text-[var(--orange)]">shib</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/45">
              A fair-launch community meme token on BNB Smart Chain. The dog that barks twice.
            </p>
          </div>
          <Link to="claim" smooth spy offset={-80}>
            <span
              className="inline-flex cursor-pointer items-center justify-center rounded-[4px] bg-[var(--orange)] px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white"
              style={{ border: '2px solid #FFFFFF', boxShadow: '6px 6px 0 #FF5C00' }}
            >
              Claim $SHIBSHIB
            </span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    smooth
                    spy
                    offset={-80}
                    className="cursor-pointer font-display text-sm font-semibold text-white/60 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">
              Token
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`https://bscscan.com/token/${TOKEN_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-semibold text-white/60 transition-colors hover:text-white"
                >
                  Contract (BSCScan)
                </a>
              </li>
              {['PancakeSwap (TBA)', 'CoinGecko (TBA)', 'CMC (TBA)'].map((t) => (
                <li key={t} className="font-display text-sm font-semibold text-white/30">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">
              Community
            </h3>
            <ul className="space-y-2.5">
              {socials.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-sm font-semibold text-white/60 transition-colors hover:text-white"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">
              Disclaimer
            </h3>
            <p className="text-sm text-white/45">
              $SHIBSHIB is a community meme token. Nothing here is financial advice. Always do your
              own research.
            </p>
          </div>
        </div>

        {/* Oversized wordmark */}
        <Link
          to="hero"
          smooth
          className="block cursor-pointer select-none font-display font-extrabold uppercase leading-[0.8] tracking-tighter text-white"
          style={{ fontSize: 'clamp(2.4rem, 12vw, 12rem)' }}
        >
          SHIB<span className="text-[var(--orange)]">SHIB</span>
        </Link>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-white/15 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">© 2026 ShibShib Community. Not financial advice.</p>
          <div className="flex items-center gap-3">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-[4px] text-white/60 transition-colors hover:bg-[var(--orange)] hover:text-white"
                style={{ border: '2px solid rgba(255,255,255,0.25)' }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
