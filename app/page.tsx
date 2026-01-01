import Hero from "./components/Hero";
import MarketOverview from "./components/MarketOverview";
import OpportunityGrid from "./components/OpportunityGrid";
import GlobalExpansion from "./components/GlobalExpansion";
import SignalPlaybook from "./components/SignalPlaybook";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarketOverview />
      <OpportunityGrid />
      <GlobalExpansion />
      <SignalPlaybook />
      <ContactSection />
      <Footer />
    </main>
  );
}
