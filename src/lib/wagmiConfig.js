import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'viem/chains';
import { injected } from '@wagmi/connectors';

const connectors = [injected()];

export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet],
  connectors,
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  ssr: false,
});

export const TARGET_CHAIN = bsc;
export const TARGET_CHAIN_ID = 56;
