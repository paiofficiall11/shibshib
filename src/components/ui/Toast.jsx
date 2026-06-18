'use client';
import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle, Info, ExternalLink, Zap } from 'lucide-react';
import { BSCSCAN_BASE } from '@/lib/config';

const ToastContext = createContext(null);

const ICONS = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  tx: ExternalLink,
};

const COLORS = {
  success: { bg: '#E6F5EA', border: '#1A8F3C', text: '#0A0A0A', icon: '#1A8F3C' },
  error: { bg: '#FBE7E7', border: '#C81E1E', text: '#0A0A0A', icon: '#C81E1E' },
  warning: { bg: '#FFF1D9', border: '#B46A00', text: '#0A0A0A', icon: '#B46A00' },
  info: { bg: '#E6ECFB', border: '#1D4ED8', text: '#0A0A0A', icon: '#1D4ED8' },
  tx: { bg: '#FFF1E8', border: '#FF5C00', text: '#0A0A0A', icon: '#FF5C00' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const toast = useCallback((message, type = 'info', duration = 5000, txHash) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type, duration, txHash }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[9999] flex w-[340px] flex-col-reverse gap-2 sm:w-[400px]">
        <AnimatePresence>
          {toasts.map((t) => {
            const colors = COLORS[t.type] || COLORS.info;
            const Icon = ICONS[t.type] || ICONS.info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24, x: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, x: 12, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto rounded-[4px] p-4"
                style={{
                  background: colors.bg,
                  border: `2px solid ${colors.border}`,
                  boxShadow: '4px 4px 0 #0A0A0A',
                  color: colors.text,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px]"
                    style={{ background: colors.border, color: '#FFFFFF' }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[13px] font-bold uppercase tracking-wide leading-snug">
                      {t.message}
                    </p>
                    {t.txHash && (
                      <a
                        href={`${BSCSCAN_BASE}/tx/${t.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] text-[var(--orange)] hover:underline"
                      >
                        View on BSCScan
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="shrink-0 rounded-[2px] p-0.5 transition-colors hover:bg-black/10"
                    aria-label="Dismiss"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
