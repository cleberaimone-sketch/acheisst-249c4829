import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SessionsSection from "@/components/SessionsSection";
import EventRecapSection from "@/components/EventRecapSection";
import SponsorsSection from "@/components/SponsorsSection";
import TicketsSection from "@/components/TicketsSection";
import AccentBar from "@/components/AccentBar";
import { FadeInSection } from "@/components/FadeInSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <AccentBar />
      <FadeInSection>
        <TicketsSection />
      </FadeInSection>
      <AccentBar />
      <FadeInSection>
        <SessionsSection />
      </FadeInSection>
      <AccentBar />
      <FadeInSection>
        <EventRecapSection />
      </FadeInSection>
      <AccentBar />
      <FadeInSection>
        <SponsorsSection />
      </FadeInSection>
    </main>
    <Footer />
  </div>
);

export default Index;
