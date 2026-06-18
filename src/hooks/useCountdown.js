import { useState, useEffect, useCallback } from 'react';

export function useCountdown(targetTimestamp) {
  const calcRemaining = useCallback(() => {
    if (!targetTimestamp) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, total: 0 };
    const now = Math.floor(Date.now() / 1000);
    const total = Math.max(0, targetTimestamp - now);
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
      isExpired: total <= 0,
      total,
    };
  }, [targetTimestamp]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    setRemaining(calcRemaining());
    if (!targetTimestamp) return;
    const timer = setInterval(() => {
      setRemaining(calcRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTimestamp, calcRemaining]);

  return remaining;
}
