import { useChainId } from 'wagmi';
import { bsc, bscTestnet } from 'viem/chains';

export default function NetworkBadge() {
  const chainId = useChainId();

  if (chainId === bsc.id) {
    return (
      <span className="badge-base badge-bsc text-[var(--gold)]">
        BSC Mainnet
      </span>
    );
  }

  if (chainId === bscTestnet.id) {
    return (
      <span className="badge-base badge-upcoming text-[var(--warning)]">
        BSC Testnet
      </span>
    );
  }

  return (
    <span className="badge-base badge-ended text-[var(--text-tertiary)]">
      Not Connected
    </span>
  );
}
