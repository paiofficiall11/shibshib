import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  binanceWallet,
  walletConnectWallet,
  coinbaseWallet,
  okxWallet,
  bybitWallet,
  bitgetWallet,
  tokenPocketWallet,
  safepalWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, fallback } from 'wagmi';
import { defineChain } from 'viem';

function rpc(url) {
  return http(url, {
    retryCount: 3,
    retryDelay: 800,
    timeout: 15_000,
    batch: { batchSize: 20, wait: 50 },
  });
}

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

const transports = {
  [bscCustom.id]: fallback(BSC_RPC_URLS.map(rpc), { rank: true }),
  [bscTestCustom.id]: fallback([
    rpc('https://data-seed-prebsc-1-s1.binance.org:8545'),
    rpc('https://data-seed-prebsc-2-s1.binance.org:8545'),
    rpc('https://bsc-testnet.publicnode.com'),
  ], { rank: true }),
};

const projectId = (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '').trim();
// A real WalletConnect / Reown project id is required for mobile *browser* deep-links
// (Safari/Chrome -> wallet app). In-app browsers (MetaMask/Trust/Binance) connect via
// the injected/EIP-6963 path below and do NOT need a project id.
export const hasValidProjectId = projectId.length > 16 && !projectId.includes('get_from');

// `injectedWallet` + EIP-6963 discovery makes the in-app browser of MetaMask, Trust,
// Binance, OKX, etc. work immediately — this is what fixes "open in a web3 browser but
// it still asks me to download a wallet". The WalletConnect-backed wallets add mobile
// deep-linking from regular browsers and are only included when a project id is present
// (otherwise tapping them would throw at connect time).
const baseWallets = [injectedWallet, metaMaskWallet, trustWallet, binanceWallet, coinbaseWallet];
const deepLinkWallets = [walletConnectWallet, okxWallet, bybitWallet, bitgetWallet, tokenPocketWallet, safepalWallet];

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: hasValidProjectId ? [...baseWallets, walletConnectWallet] : baseWallets,
    },
    ...(hasValidProjectId
      ? [{ groupName: 'More wallets', wallets: deepLinkWallets.filter((w) => w !== walletConnectWallet) }]
      : []),
  ],
  {
    appName: 'ShibShib',
    // connectorsForWallets requires a string; non-WC wallets ignore it. WC-backed
    // wallets are gated behind hasValidProjectId so this placeholder is never used by them.
    projectId: hasValidProjectId ? projectId : 'shibshib-injected-only',
  },
);

export const wagmiConfig = createConfig({
  chains: [bscCustom, bscTestCustom],
  connectors,
  transports,
  // EIP-6963: detect every injected wallet that announces itself (modern wallets do).
  multiInjectedProviderDiscovery: true,
  ssr: false,
});

export const TARGET_CHAIN = bscCustom;
export const TARGET_CHAIN_ID = 56;
