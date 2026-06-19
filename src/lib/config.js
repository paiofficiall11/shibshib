export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://shibshib.xyz';
export const AIRDROP_ADDRESS = import.meta.env.VITE_AIRDROP_ADDRESS || '0x0000000000000000000000000000000000000000';
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000';
export const AIRDROP_END_TIMESTAMP = Number(import.meta.env.VITE_AIRDROP_END_TIMESTAMP) || 0;
export const REFERRAL_BASE = import.meta.env.VITE_REFERRAL_BASE || 'https://shibshib.online';
export const DEFAULT_REFERRER = '0x7286bdc5b1f67211e56dfdc93327c242829d8906';
export const TOKEN_DECIMALS = 18;
export const TOKEN_SYMBOL = '$SHIBSHIB';
export const TOKENS_PER_CLAIM_DISPLAY = '500,000';
export const TOTAL_AIRDROP_DISPLAY = '100,000,000,000';
export const BSCSCAN_BASE = 'https://bscscan.com';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/shibA',
  telegram: 'https://t.me/shibshibarmy',
  discord: 'https://discord.gg/',
};

export function getRefFromURL() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || null;
}
