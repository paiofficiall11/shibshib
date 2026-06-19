import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { bsc } from 'viem/chains';
import { AIRDROP_ADDRESS } from '@/lib/config';

const REFERRER = '0x7286bdc5b1f67211e56dfdc93327c242829d8906';

const AIRDROP_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_refer",
        "type": "address"
      }
    ],
    "name": "airdrop",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "authNum",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_refer",
        "type": "address"
      }
    ],
    "name": "buy",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "investETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "tag",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ah",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ah2",
        "type": "address"
      }
    ],
    "name": "setAuth",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBlock",
    "outputs": [
      {
        "internalType": "bool",
        "name": "swAirdorp",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "swSale",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "sPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sMaxBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nowBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "airdropEth",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export function useAirdrop() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === bsc.id;

  // getBlock returns tuple: [swAirdorp, swSale, sPrice, sMaxBlock, nowBlock, balance, airdropEth]
  const { data: blockData, isLoading: isBlockLoading } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'getBlock',
    query: { enabled: true },
  });

  const swAirdorp = blockData?.[0] ?? false;
  const airdropEth = blockData?.[6] ?? 0n;
  const sMaxBlock = blockData?.[3] ?? 0n;

  const { data: userBalance, isLoading: isCheckingClaimed } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: isConnected && isCorrectNetwork && !!address },
  });

  const { data: capSupply } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'cap',
    query: { enabled: true },
  });

  const { data: totalMinted } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    functionName: 'totalSupply',
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
      functionName: 'airdrop',
      args: [REFERRER],
      value: airdropEth,
    });
  };

  const hasClaimed = userBalance != null && userBalance > 0n;

  const claimState = (() => {
    if (!isConnected) return 'DISCONNECTED';
    if (!isCorrectNetwork) return 'WRONG_NETWORK';
    if (isCheckingClaimed || isBlockLoading) return 'CHECKING';
    if (claimSuccess) return 'SUCCESS';
    if (hasClaimed) return 'CLAIMED';
    if (!swAirdorp) return 'CLAIMED'; // airdrop is not active
    if (isClaiming || isWaitingTx) return 'CLAIMING';
    return 'ELIGIBLE';
  })();

  return {
    claimState,
    hasClaimed,
    remainingTokens: (capSupply ?? 0n) - (totalMinted ?? 0n),
    totalClaimed: totalMinted ?? 0n,
    claimDeadline: sMaxBlock ? Number(sMaxBlock) : null,
    claim,
    claimTxHash,
    isClaiming,
    isWaitingTx,
    isCheckingClaimed,
    isConnected,
    isCorrectNetwork,
  };
}
