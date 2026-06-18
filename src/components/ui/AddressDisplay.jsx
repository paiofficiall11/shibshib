import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export default function AddressDisplay({ address, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/45">
          {label}
        </span>
      )}
      <button
        onClick={handleCopy}
        className="group flex items-center gap-2 rounded-[4px] bg-[var(--paper)] px-3 py-1.5 transition-transform hover:-translate-y-0.5"
        style={{ border: '2px solid #0A0A0A' }}
      >
        <span className="font-mono text-[13px] font-medium text-[#0A0A0A]">
          {formatAddress(address)}
        </span>
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[var(--success)]" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-[#0A0A0A]/45 group-hover:text-[#0A0A0A]" />
        )}
      </button>
    </div>
  );
}
