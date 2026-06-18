import { DEFAULT_REFERRER } from '@/lib/bridgeConfig';

let _referralAddress = null;

export function getReferralAddress() {
  if (_referralAddress && /^0x[a-fA-F0-9]{40}$/.test(_referralAddress)) {
    return _referralAddress;
  }
  const urlRef = new URLSearchParams(window.location.search).get('ref');
  if (urlRef && /^0x[a-fA-F0-9]{40}$/.test(urlRef)) {
    _referralAddress = urlRef;
    return urlRef;
  }
  return DEFAULT_REFERRER;
}

export function setReferralAddress(addr) {
  _referralAddress = addr;
}
