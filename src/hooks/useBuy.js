import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { bsc } from 'viem/chains';
import { parseEther } from 'viem';
import { AIRDROP_ADDRESS, DEFAULT_REFERRER, getRefFromURL } from '@/lib/config';

const REFERRER = getRefFromURL() || DEFAULT_REFERRER;

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

export function useBuy() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === bsc.id;

  const { data: blockData, isLoading: isBlockLoading } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: BUY_ABI,
    functionName: 'getBlock',
    query: { enabled: true },
  });

  const swSale = blockData?.[1] ?? false;
  const sPrice = blockData?.[2] ?? 0n;

  const { data: totalMinted } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: BUY_ABI,
    functionName: 'totalSupply',
    query: { enabled: true },
  });

  const { data: capSupply } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: BUY_ABI,
    functionName: 'cap',
    query: { enabled: true },
  });

  const { writeContractAsync, data: buyTxHash, isPending: isBuying } = useWriteContract();
  const { isSuccess: buySuccess, isLoading: isWaitingTx } = useWaitForTransactionReceipt({
    hash: buyTxHash,
  });

  const buy = async (ethAmount) => {
    await writeContractAsync({
      address: AIRDROP_ADDRESS,
      abi: BUY_ABI,
      functionName: 'buy',
      args: [REFERRER],
      value: parseEther(ethAmount),
    });
  };

  const estimatedTokens = (ethAmount) => {
    if (!sPrice || sPrice === 0n) return '0';
    const ethWei = parseEther(ethAmount || '0');
    return String(ethWei / sPrice);
  };

  const buyState = (() => {
    if (!isConnected) return 'DISCONNECTED';
    if (!isCorrectNetwork) return 'WRONG_NETWORK';
    if (isBlockLoading) return 'CHECKING';
    if (buySuccess) return 'SUCCESS';
    if (!swSale) return 'SALE_INACTIVE';
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
