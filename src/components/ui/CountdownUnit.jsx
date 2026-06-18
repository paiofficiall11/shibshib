'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownUnit({ value, label }) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div
      className="min-w-[64px] overflow-hidden rounded-[4px] bg-[var(--paper)] px-3 py-2.5 text-center"
      style={{ border: '2px solid #0A0A0A' }}
    >
      <div className="relative flex h-[34px] items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute font-display text-[32px] font-extrabold leading-none text-[#0A0A0A]"
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-1 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/45">
        {label}
      </div>
    </div>
  );
}
