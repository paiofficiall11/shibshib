import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { bsc } from 'viem/chains';
import { parseEther, isAddress, getAddress, zeroAddress } from 'viem';
import { AIRDROP_ADDRESS, DEFAULT_REFERRER, getRefFromURL, BUY_PRICE_BNB } from '@/lib/config';

// Prefer a valid ?ref= address, else the project default. Validated so a malformed
// referral param can never make the on-chain buy() revert.
const RAW_REFERRER = getRefFromURL() || DEFAULT_REFERRER;
const REFERRER = isAddress(RAW_REFERRER) ? getAddress(RAW_REFERRER) : DEFAULT_REFERRER;

const RQ_RETRY = {
  retry: 4,
  retryDelay: (attemptIndex) => Math.min(800 * 2 ** attemptIndex, 10_000),
  staleTime: 15_000,
  refetchOnWindowFocus: false,
};

const BUY_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "_refer", "type": "address" }],
    "name": "buy",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBlock",
    "outputs": [
      { "internalType": "bool", "name": "swAirdorp", "type": "bool" },
      { "internalType": "bool", "name": "swSale", "type": "bool" },
      { "internalType": "uint256", "name": "sPrice", "type": "uint256" },
      { "internalType": "uint256", "name": "sMaxBlock", "type": "uint256" },
      { "internalType": "uint256", "name": "nowBlock", "type": "uint256" },
      { "internalType": "uint256", "name": "balance", "type": "uint256" },
      { "internalType": "uint256", "name": "airdropEth", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cap",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

async function retry(fn, label) {
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = e.shortMessage || e.message || '';
      const isRpcError = /network|fetch|timeout|disconnect|refused|twnodes/i.test(msg);
      if (!isRpcError || attempt === 2) throw e;
      console.warn(`[${label}] attempt ${attempt + 1} failed, retrying...`, msg);
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw lastErr;
}

export function useBuy() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === bsc.id;

  const { data: blockData } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: BUY_ABI,
    functionName: 'getBlock',
    query: { enabled: true, ...RQ_RETRY },
  });

  const sPrice = blockData?.[2] ?? 0n;

  const { data: totalMinted } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: BUY_ABI,
    functionName: 'totalSupply',
    query: { enabled: true, ...RQ_RETRY },
  });

  const { data: capSupply } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: BUY_ABI,
    functionName: 'cap',
    query: { enabled: true, ...RQ_RETRY },
  });

  const { writeContractAsync, data: buyTxHash, isPending: isBuying } = useWriteContract();
  const { isSuccess: buySuccess, isLoading: isWaitingTx } = useWaitForTransactionReceipt({
    hash: buyTxHash,
  });

  const buy = (ethAmount) => {
    const amount = parseFloat(ethAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      const err = new Error('Enter a valid BNB amount');
      err.shortMessage = 'Enter a valid BNB amount';
      throw err;
    }
    // Many of these sale contracts revert on self-referral; fall back to the
    // zero address (no referrer) when the buyer would refer themselves.
    const refer =
      address && getAddress(address) === REFERRER ? zeroAddress : REFERRER;

    return retry(
      () =>
        writeContractAsync({
          address: AIRDROP_ADDRESS,
          abi: BUY_ABI,
          functionName: 'buy',
          args: [refer],
          value: parseEther(String(ethAmount).trim()),
          chainId: bsc.id,
        }),
      'buy',
    );
  };

  // Live conversion is driven by the fixed presale price so the figure is always
  // real, regardless of whether the on-chain sPrice read has resolved.
  const estimatedTokens = (ethAmount) => {
    const amount = parseFloat(ethAmount);
    if (!amount || amount <= 0 || !BUY_PRICE_BNB) return '0';
    return String(Math.floor(amount / BUY_PRICE_BNB));
  };

  const buyState = (() => {
    if (!isConnected) return 'DISCONNECTED';
    if (!isCorrectNetwork) return 'WRONG_NETWORK';
    if (buySuccess) return 'SUCCESS';
    if (isBuying || isWaitingTx) return 'BUYING';
    return 'AVAILABLE';
  })();

  return {
    buyState,
    sPrice,
    estimatedTokens,
    buy,
    buyTxHash,
    isBuying,
    isWaitingTx,
    isConnected,
    isCorrectNetwork,
    remainingTokens: (capSupply ?? 0n) - (totalMinted ?? 0n),
  };
}
