import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createConfig, http, fallback } from 'wagmi';
import { bsc, bscTestnet } from 'viem/chains';
import { injected } from '@wagmi/connectors';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';
const hasValidProjectId = projectId && projectId.length > 16 && !projectId.includes('get_from');

const transports = {
  [bsc.id]: fallback([
    http('https://bsc-dataseed.binance.org'),
    http('https://bsc-dataseed1.defibit.io'),
    http('https://bsc-dataseed2.ninicoin.io'),
    http('https://bsc-dataseed3.ninicoin.io'),
    http('https://bsc-dataseed4.ninicoin.io'),
  ]),
  [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
};

export const wagmiConfig = hasValidProjectId
  ? getDefaultConfig({
      appName: 'ShibShib',
      projectId,
      chains: [bsc, bscTestnet],
      transports,
      ssr: false,
    })
  : createConfig({
      chains: [bsc, bscTestnet],
      connectors: [injected()],
      transports,
      ssr: false,
    });

export const TARGET_CHAIN = bsc;
export const TARGET_CHAIN_ID = 56;
