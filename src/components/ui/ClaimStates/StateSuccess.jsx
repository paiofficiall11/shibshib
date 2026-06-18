'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import AddressDisplay from '@/components/ui/AddressDisplay';
import { BRUTAL_BORDER } from '@/components/ui/brutal';
import { SITE_URL, TOKENS_PER_CLAIM_DISPLAY, BSCSCAN_BASE } from '@/lib/config';

function ConfettiBurst() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#FF5C00', '#0A0A0A', '#FFFFFF', '#1A8F3C'];
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.5) * 320 - 100,
        rotation: Math.random() * 720,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotation }}
          transition={{ duration: 1 + Math.random() * 0.5, delay: p.delay, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 h-[7px] w-[7px]"
          style={{ backgroundColor: p.color, border: '1px solid #0A0A0A' }}
        />
      ))}
    </div>
  );
}

export default function StateSuccess({ txHash }) {
  const shareText = encodeURIComponent(
    `Just claimed my free $SHIBSHIB on BSC! 🐕🐕\nJoin the Army before it ends: ${SITE_URL}\n#SHIBSHIB #BSC #Airdrop`,
  );
  const bscScanUrl = txHash ? `${BSCSCAN_BASE}/tx/${txHash}` : '#';

  const secondaryBtn =
    'rounded-[4px] bg-white px-4 py-2.5 font-display text-[12px] font-bold uppercase tracking-wide text-[#0A0A0A] transition-transform hover:-translate-y-0.5';

  return (
    <div className="relative">
      <ConfettiBurst />

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-[4px] bg-[var(--success-sub)]"
          style={{ border: BRUTAL_BORDER }}
        >
          <Check className="h-7 w-7 text-[var(--success)]" />
        </motion.div>

        <h3 className="text-center font-display text-[24px] font-extrabold uppercase text-[#0A0A0A]">
          Claimed! 🎉
        </h3>
        <p className="mt-1 font-display text-[20px] font-extrabold text-[var(--orange)]">
          {TOKENS_PER_CLAIM_DISPLAY} $SHIBSHIB
        </p>

        {txHash && (
          <div className="mt-4 w-full">
            <div className="mb-2 text-center font-display text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]/45">
              Transaction
            </div>
            <div className="flex justify-center">
              <AddressDisplay address={txHash} />
            </div>
            <a
              href={bscScanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1 text-[12px] font-semibold text-[var(--orange)] hover:underline"
            >
              View on BSCScan <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            onClick={async () => {
              try {
                await window.ethereum?.request({
                  method: 'wallet_watchAsset',
                  params: {
                    type: 'ERC20',
                    options: {
                      address:
                        import.meta.env.VITE_TOKEN_ADDRESS ||
                        '0x0000000000000000000000000000000000000000',
                      symbol: 'SHIBSHIB',
                      decimals: 18,
                    },
                  },
                });
              } catch {}
            }}
            className={secondaryBtn}
            style={{ border: BRUTAL_BORDER }}
          >
            Add to MetaMask
          </button>
          <a
            href={`https://x.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryBtn}
            style={{ border: BRUTAL_BORDER }}
          >
            Share on X
          </a>
        </div>
      </div>
    </div>
  );
}
