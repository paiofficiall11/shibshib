const ITEMS = [
  '$SHIBSHIB',
  'AIRDROP LIVE',
  '50B TOKENS REMAINING',
  '1T SUPPLY',
  '50% BURNED',
  'BSC',
  'PANCAKESWAP SOON',
  'FREE TO CLAIM',
];

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {ITEMS.map((item, i) => {
        const accent = item === 'AIRDROP LIVE' || item === 'FREE TO CLAIM';
        return (
          <span key={i} className="flex items-center">
            <span
              className={`px-6 font-display text-sm font-bold uppercase tracking-[0.18em] ${
                accent ? 'text-[var(--orange)]' : 'text-white'
              }`}
            >
              {item}
            </span>
            <span className="text-[var(--orange)]">/</span>
          </span>
        );
      })}
    </div>
  );
}

export default function LiveTicker() {
  return (
    <div
      className="overflow-hidden bg-[#0A0A0A] py-3"
      style={{ borderTop: '2px solid #0A0A0A', borderBottom: '2px solid #0A0A0A' }}
    >
      <div className="flex w-max" style={{ animation: 'marquee 30s linear infinite' }}>
        <Row />
        <Row />
      </div>
    </div>
  );
}
