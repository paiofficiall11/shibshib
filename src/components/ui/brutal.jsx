'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ShibShib "Brutalist Editorial" primitives.
 *
 * Strict tokens:
 *   - border 2px solid #0A0A0A
 *   - hard offset shadow 6px 6px 0 #0A0A0A (hover -> 8px 8px 0)
 *   - sharp corners (radius 2-4px)
 * Palette: orange #FF5C00, ink #0A0A0A, white #FFFFFF, paper #F6F6F4.
 */

export const BRUTAL_BORDER = '2px solid #0A0A0A';
export const BRUTAL_SHADOW = '6px 6px 0 #0A0A0A';
export const BRUTAL_SHADOW_HOVER = '8px 8px 0 #0A0A0A';
export const BRUTAL_SHADOW_SM = '4px 4px 0 #0A0A0A';
export const EASE = [0.22, 1, 0.36, 1];

const toneClass = {
  white: 'bg-white text-[#0A0A0A]',
  paper: 'bg-[#F6F6F4] text-[#0A0A0A]',
  orange: 'bg-[#FF5C00] text-white',
  black: 'bg-[#0A0A0A] text-white',
};

export function BrutalCard({ children, className, hover = false, tone = 'white', ...rest }) {
  const reduce = useReducedMotion();
  const hoverProps =
    hover && !reduce ? { whileHover: { y: -4, x: -2, boxShadow: BRUTAL_SHADOW_HOVER } } : {};
  return (
    <motion.div
      className={cn('rounded-[4px]', toneClass[tone], className)}
      style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
      transition={{ duration: 0.25, ease: EASE }}
      {...hoverProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const variantClass = {
  orange: 'bg-[#FF5C00] text-white',
  black: 'bg-[#0A0A0A] text-white',
  outline: 'bg-white text-[#0A0A0A]',
};

export function BrutalButton({ children, className, variant = 'orange', as = 'a', ...rest }) {
  const reduce = useReducedMotion();
  const Comp = as === 'button' ? motion.button : motion.a;
  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -3, x: -2, boxShadow: BRUTAL_SHADOW_HOVER },
        whileTap: { y: 0, x: 0, boxShadow: BRUTAL_SHADOW },
      };
  return (
    <Comp
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px] px-6 py-3 font-display text-sm font-bold uppercase tracking-wide',
        variantClass[variant],
        className,
      )}
      style={{ border: BRUTAL_BORDER, boxShadow: BRUTAL_SHADOW }}
      transition={{ duration: 0.18, ease: EASE }}
      {...motionProps}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, className, light = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-[2px] px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.2em]',
        light ? 'bg-white text-[#0A0A0A]' : 'bg-[#FF5C00] text-white',
        className,
      )}
      style={{ border: BRUTAL_BORDER }}
    >
      {children}
    </span>
  );
}

export function SectionMarker({ num, label, className, light = false }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em]',
        light ? 'text-white' : 'text-[#0A0A0A]',
        className,
      )}
    >
      <span className="text-[#FF5C00]">{num}</span>
      <span className={light ? 'h-px w-10 bg-white/40' : 'h-px w-10 bg-[#0A0A0A]/30'} />
      {label && <span>{label}</span>}
    </div>
  );
}
