export default function StateChecking() {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#0A0A0A] border-t-transparent" />
      <p className="mt-3 font-display text-[13px] font-bold uppercase tracking-wide text-[#0A0A0A]/70">
        Checking eligibility…
      </p>
    </div>
  );
}
