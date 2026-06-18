'use client';
import { useAccount, useChainId } from 'wagmi';
import { bsc } from 'viem/chains';
import { useBridge } from '@/hooks/useBridge';

export function useAirdrop() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === bsc.id;

  const bridge = useBridge();

  const claim = async () => {
    return bridge.doAirdrop();
  };

  const isLoadingInfo = bridge.isLoadingInfo;

  const claimState = (() => {
    if (!isConnected) return 'DISCONNECTED';
    if (!isCorrectNetwork) return 'WRONG_NETWORK';
    if (isLoadingInfo) return 'CHECKING';
    if (!bridge.swAirdrop) return 'CLAIMED';
    if (bridge.airdropSuccess) return 'SUCCESS';
    if (bridge.isAirdropping || bridge.isWaitingAirdrop) return 'CLAIMING';
    return 'ELIGIBLE';
  })();

  return {
    claimState,
    hasClaimed: !bridge.swAirdrop,
    remainingTokens: bridge.contractBalance,
    totalClaimed: BigInt(0),
    claimDeadline: null,
    airdropCostEth: bridge.airdropEth ? Number(bridge.airdropEth) / 1e18 : 0.009,
    claim,
    claimTxHash: bridge.airdropTxHash,
    isClaiming: bridge.isAirdropping,
    isWaitingTx: bridge.isWaitingAirdrop,
    isCheckingClaimed: isLoadingInfo,
    isConnected,
    isCorrectNetwork,
  };
}
