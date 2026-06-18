'use client';
import { useCountdown } from '@/hooks/useCountdown';
import CountdownUnit from './CountdownUnit';

export default function CountdownTimer({ targetTimestamp }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetTimestamp);

  if (isExpired) {
    return (
      <span className="font-display text-lg font-extrabold uppercase text-[var(--orange)]">
        Airdrop ended
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <CountdownUnit value={days} label="Days" />
      <CountdownUnit value={hours} label="Hrs" />
      <CountdownUnit value={minutes} label="Min" />
      <CountdownUnit value={seconds} label="Sec" />
    </div>
  );
}
