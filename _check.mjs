import { JsonRpcProvider, Contract } from 'ethers';
const ABI = [
  "function getBlock() view returns (bool swAirdorp, bool swSale, uint256 sPrice, uint256 sMaxBlock, uint256 nowBlock, uint256 balance, uint256 airdropEth)",
  "function totalSupply() view returns (uint256)",
  "function cap() view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];
const ADDR = "0xAbd008E6560Ecc55CC69856957fb710Fe1A78161";
const rpcs = ["https://bsc-dataseed.binance.org","https://bsc-dataseed1.defibit.io","https://rpc.ankr.com/bsc"];
for (const url of rpcs) {
  try {
    const p = new JsonRpcProvider(url);
    const c = new Contract(ADDR, ABI, p);
    const b = await c.getBlock();
    console.log("RPC:", url);
    console.log("swAirdorp:", b[0]);
    console.log("swSale:", b[1]);
    console.log("sPrice:", b[2].toString());
    console.log("airdropEth:", b[6].toString());
    try { console.log("symbol:", await c.symbol(), "decimals:", (await c.decimals()).toString()); } catch(e){ console.log("symbol/decimals err", e.shortMessage); }
    break;
  } catch (e) { console.log("fail", url, e.shortMessage || e.message); }
}
