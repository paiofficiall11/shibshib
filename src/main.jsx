import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import { wagmiConfig } from '@/lib/wagmiConfig';
import { ToastProvider } from '@/components/ui/Toast';

import '@rainbow-me/rainbowkit/styles.css';
import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@/styles/globals.css';

import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#FF5C00',
            accentColorForeground: '#FFFFFF',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <TooltipProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#FFFFFF',
                  color: '#0A0A0A',
                  border: '2px solid #0A0A0A',
                  borderRadius: '4px',
                  boxShadow: '6px 6px 0 #0A0A0A',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 500,
                },
              }}
            />
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
