import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LiveTicker from '@/components/LiveTicker';
import ClaimSection from '@/components/ClaimSection';
import TokenInfo from '@/components/TokenInfo';
import Distribution from '@/components/Distribution';
import BuySection from '@/components/BuySection';
import ClaimCTA from '@/components/ClaimCTA';
import HowItWorks from '@/components/HowItWorks';
import Roadmap from '@/components/Roadmap';
import FAQ from '@/components/FAQ';
import ReferralSection from '@/components/ReferralSection';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <Hero />
        <LiveTicker />
        <ClaimSection />
        <TokenInfo />
        <Distribution />
        <ClaimCTA />
        <BuySection />
        <HowItWorks />
        <Roadmap />
        <FAQ />
        <ReferralSection />
      </main>
      <Footer />
    </div>
  );
}
