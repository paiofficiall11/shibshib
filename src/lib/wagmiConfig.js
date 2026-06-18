import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc, bscTestnet } from 'viem/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'ShibShib Airdrop',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'placeholder-project-id',
  chains: [bsc, bscTestnet],
  ssr: false,
});

export const TARGET_CHAIN = bsc;
export const TARGET_CHAIN_ID = 56;
