'use client';
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
} from 'wagmi';
import { bsc } from 'viem/chains';
import { parseEther } from 'viem';
import { BRIDGE_ABI } from '@/lib/bridgeAbi';
import { BRIDGE_ADDRESS, SALE_PRICE_PER_WEI } from '@/lib/bridgeConfig';
import { getReferralAddress } from '@/lib/referralStore';

export function useBridge() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === bsc.id;

  // Contract state
  const { data: blockInfo, isLoading: isLoadingInfo } = useReadContract({
    address: BRIDGE_ADDRESS,
    abi: BRIDGE_ABI,
    functionName: 'getBlock',
    query: { enabled: true },
  });

  // User balance
  const { data: userBalance } = useReadContract({
    address: BRIDGE_ADDRESS,
    abi: BRIDGE_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: isConnected && !!address },
  });

  // User BNB balance
  const { data: bnbBalance } = useBalance({
    address,
    query: { enabled: isConnected && !!address },
  });

  // --- Airdrop ---
  const {
    writeContractAsync: writeAirdrop,
    data: airdropTxHash,
    isPending: isAirdropping,
  } = useWriteContract();

  const { isSuccess: airdropSuccess, isLoading: isWaitingAirdrop } =
    useWaitForTransactionReceipt({ hash: airdropTxHash });

  const doAirdrop = async () => {
    const referrer = getReferralAddress();
    const airdropEth = blockInfo?.[6] ?? parseEther('0.009');
    return writeAirdrop({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: 'airdrop',
      args: [referrer],
      value: airdropEth,
    });
  };

  // --- Buy ---
  const {
    writeContractAsync: writeBuy,
    data: buyTxHash,
    isPending: isBuying,
  } = useWriteContract();

  const { isSuccess: buySuccess, isLoading: isWaitingBuy } =
    useWaitForTransactionReceipt({ hash: buyTxHash });

  const doBuy = async (ethAmount) => {
    const referrer = getReferralAddress();
    const wei = parseEther(String(ethAmount));
    return writeBuy({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: 'buy',
      args: [referrer],
      value: wei,
    });
  };

  const calculateTokens = (ethAmount) => {
    if (!ethAmount || ethAmount <= 0) return BigInt(0);
    const wei = parseEther(String(ethAmount));
    return wei * BigInt(SALE_PRICE_PER_WEI);
  };

  const swAirdrop = blockInfo?.[0] ?? false;
  const swSale = blockInfo?.[1] ?? false;
  const salePrice = blockInfo?.[2] ?? BigInt(0);
  const saleMaxBlock = blockInfo?.[3] ?? BigInt(0);
  const nowBlock = blockInfo?.[4] ?? BigInt(0);
  const contractBalance = blockInfo?.[5] ?? BigInt(0);
  const airdropEth = blockInfo?.[6] ?? BigInt(0);

  return {
    // Network
    isConnected,
    isCorrectNetwork,
    // Contract state
    swAirdrop,
    swSale,
    salePrice,
    saleMaxBlock,
    nowBlock,
    contractBalance,
    airdropEth,
    isLoadingInfo,
    // Balances
    userBalance,
    bnbBalance,
    // Airdrop
    doAirdrop,
    airdropTxHash,
    airdropSuccess,
    isAirdropping,
    isWaitingAirdrop,
    // Buy
    doBuy,
    buyTxHash,
    buySuccess,
    isBuying,
    isWaitingBuy,
    calculateTokens,
  };
}
