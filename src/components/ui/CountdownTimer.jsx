'use client';
import { useCountdown } from '@/hooks/useCountdown';
import CountdownUnit from './CountdownUnit';

export default function CountdownTimer({ targetTimestamp }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetTimestamp);

  if (isExpired) {
    return (
      <span
        className="font-display font-extrabold uppercase text-[var(--orange)]"
        style={{ fontSize: 'clamp(1rem, 4vw, 1.125rem)' }}
      >
        Airdrop ended
      </span>
    );
  }

  return (
    <div className="flex items-center gap-[clamp(4px,1.5vw,6px)]">
      <CountdownUnit value={days} label="Days" />
      <CountdownUnit value={hours} label="Hrs" />
      <CountdownUnit value={minutes} label="Min" />
      <CountdownUnit value={seconds} label="Sec" />
    </div>
  );
}
