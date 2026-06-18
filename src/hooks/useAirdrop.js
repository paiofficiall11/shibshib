import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { bsc } from 'viem/chains';
import { AIRDROP_ADDRESS, TOKENS_PER_CLAIM_DISPLAY } from '@/lib/config';

// TODO: Replace these with real values after contract deployment
const AIRDROP_ABI = [
  {
    name: 'hasClaimed',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'addr', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'remainingTokens',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'totalClaimed',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'claimDeadline',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
];

export function useAirdrop() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === bsc.id;

  const { data: hasClaimed, isLoading: isCheckingClaimed } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'hasClaimed',
    args: [address],
    query: { enabled: isConnected && isCorrectNetwork && !!address },
  });

  const { data: remainingTokens } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'remainingTokens',
    query: { enabled: true },
  });

  const { data: totalClaimed } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'totalClaimed',
    query: { enabled: true },
  });

  const { data: claimDeadline } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'claimDeadline',
    query: { enabled: true },
  });

  const { writeContractAsync, data: claimTxHash, isPending: isClaiming } = useWriteContract();
  const { isSuccess: claimSuccess, isLoading: isWaitingTx } = useWaitForTransactionReceipt({
    hash: claimTxHash,
  });

  const claim = async () => {
    await writeContractAsync({
      address: AIRDROP_ADDRESS,
      abi: AIRDROP_ABI,
      functionName: 'claim',
    });
  };

  const claimState = (() => {
    if (!isConnected) return 'DISCONNECTED';
    if (!isCorrectNetwork) return 'WRONG_NETWORK';
    if (isCheckingClaimed) return 'CHECKING';
    if (claimSuccess) return 'SUCCESS';
    if (hasClaimed) return 'CLAIMED';
    if (isClaiming || isWaitingTx) return 'CLAIMING';
    return 'ELIGIBLE';
  })();

  return {
    claimState,
    hasClaimed: !!hasClaimed,
    remainingTokens: remainingTokens ?? BigInt(0),
    totalClaimed: totalClaimed ?? BigInt(0),
    claimDeadline: claimDeadline ? Number(claimDeadline) : null,
    claim,
    claimTxHash,
    isClaiming,
    isWaitingTx,
    isCheckingClaimed,
    isConnected,
    isCorrectNetwork,
  };
}
