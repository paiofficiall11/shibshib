import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createConfig, http, fallback } from 'wagmi';
import { defineChain } from 'viem';
import { injected } from '@wagmi/connectors';

const BSC_RPC_URLS = [
  'https://bsc-dataseed.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed2.ninicoin.io',
  'https://bsc-dataseed3.ninicoin.io',
  'https://bsc-dataseed4.ninicoin.io',
  'https://bsc.publicnode.com',
  'https://rpc.ankr.com/bsc',
  'https://1rpc.io/bsc',
  'https://bsc.blockrazor.xyz',
  'https://bsc.meowrpc.com',
  'https://binance.chain.nodereal.io',
];

const bscCustom = defineChain({
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: { http: BSC_RPC_URLS },
    public: { http: BSC_RPC_URLS },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 15921452,
    },
  },
});

const bscTestCustom = defineChain({
  id: 97,
  name: 'BNB Smart Chain Testnet',
  nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545', 'https://data-seed-prebsc-2-s1.binance.org:8545', 'https://bsc-testnet.publicnode.com'] },
    public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545', 'https://bsc-testnet.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 17422483,
    },
  },
  testnet: true,
});

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';
const hasValidProjectId = projectId && projectId.length > 16 && !projectId.includes('get_from');

const transports = {
  [bscCustom.id]: fallback(BSC_RPC_URLS.map((url) => http(url))),
  [bscTestCustom.id]: fallback([
    http('https://data-seed-prebsc-1-s1.binance.org:8545'),
    http('https://data-seed-prebsc-2-s1.binance.org:8545'),
    http('https://bsc-testnet.publicnode.com'),
  ]),
};

export const wagmiConfig = hasValidProjectId
  ? getDefaultConfig({
      appName: 'ShibShib',
      projectId,
      chains: [bscCustom, bscTestCustom],
      transports,
      ssr: false,
    })
  : createConfig({
      chains: [bscCustom, bscTestCustom],
      connectors: [injected()],
      transports,
      ssr: false,
    });

export const TARGET_CHAIN = bscCustom;
export const TARGET_CHAIN_ID = 56;
