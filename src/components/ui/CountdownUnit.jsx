'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownUnit({ value, label }) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div
      className="overflow-hidden rounded-[4px] bg-[var(--paper)] text-center"
      style={{
        border: '2px solid #0A0A0A',
        minWidth: 'clamp(48px, 13vw, 64px)',
        paddingLeft: 'clamp(8px, 2.5vw, 12px)',
        paddingRight: 'clamp(8px, 2.5vw, 12px)',
        paddingTop: 'clamp(6px, 2vw, 10px)',
        paddingBottom: 'clamp(6px, 2vw, 10px)',
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: 'clamp(26px, 7vw, 34px)' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute font-display font-extrabold leading-none text-[#0A0A0A]"
            style={{ fontSize: 'clamp(22px, 6.5vw, 32px)' }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <div
        className="mt-1 font-display font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/45"
        style={{ fontSize: 'clamp(8px, 2vw, 9px)' }}
      >
        {label}
      </div>
    </div>
  );
}
