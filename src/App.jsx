import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LiveTicker from '@/components/LiveTicker';
import ClaimSection from '@/components/ClaimSection';
import BuySection from '@/components/BuySection';
import ReferralSection from '@/components/ReferralSection';
import TokenInfo from '@/components/TokenInfo';
import Distribution from '@/components/Distribution';
import HowItWorks from '@/components/HowItWorks';
import Roadmap from '@/components/Roadmap';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <Hero />
        <LiveTicker />
        <ClaimSection />
        <BuySection />
        <ReferralSection />
        <TokenInfo />
        <Distribution />
        <HowItWorks />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
