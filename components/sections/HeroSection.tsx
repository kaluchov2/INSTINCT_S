"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation('common');
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/drg5lhdiw/video/upload/v1766977470/3820942925-preview_edvqxi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight">
             {t('hero.title').toUpperCase()} <span className="text-brand-teal">INSTINCTS</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-medium max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="primary" size="lg" className="text-lg px-10">
              {t('hero.cta')}
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white">
              {t('nav.about')}
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#who-are-we" className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors">
            <span className="text-sm font-semibold">Scroll to discover</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </Container>
    </section>
  );
}
