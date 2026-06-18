export const BRIDGE_ABI = [
  {
    name: 'airdrop',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: '_refer', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'buy',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: '_refer', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getBlock',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'swAirdrop', type: 'bool' },
      { name: 'swSale', type: 'bool' },
      { name: 'sPrice', type: 'uint256' },
      { name: 'sMaxBlock', type: 'uint256' },
      { name: 'nowBlock', type: 'uint256' },
      { name: 'balance', type: 'uint256' },
      { name: 'airdropEth', type: 'uint256' },
    ],
  },
];
