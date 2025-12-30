import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoAreWeSection } from "@/components/sections/WhoAreWeSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { CalendarSection } from "@/components/sections/CalendarSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <WhoAreWeSection />
      <ExperiencesSection />
      <CalendarSection />
      <FooterSection />
      <Footer />
    </main>
  );
}
