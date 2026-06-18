export default function StateClaiming() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-[var(--orange)] border-t-transparent" />
      <p className="mt-3 font-display text-[15px] font-extrabold uppercase text-[#0A0A0A]">
        Confirm in your wallet
      </p>
      <p className="mt-1 text-[13px] text-[#0A0A0A]/60">Waiting for transaction…</p>
      <p className="mt-4 font-mono text-[12px] text-[#0A0A0A]/45">Do not close this page.</p>
    </div>
  );
}
