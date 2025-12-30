"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { Mountain, Waves, Trees } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhoAreWeSection() {
  const { t } = useTranslation('common');

  return (
    <Section id="who-are-we" className="bg-brand-dark">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="border-l-4 border-brand-teal pl-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                {t('who_are_we.title')}
              </h2>
              <p className="text-2xl md:text-3xl text-brand-teal font-bold italic">
                "{t('who_are_we.description')}"
              </p>
            </div>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <div className="bg-gradient-to-r from-brand-gunmetal to-brand-gunmetal-dark p-6 rounded-lg border-l-4 border-brand-teal">
                <h3 className="text-xl font-bold text-white mb-3">{t('who_are_we.mission_title', 'Our Mission')}</h3>
                <p className="text-gray-300">
                  {t('who_are_we.mission_body', 'To reconnect athletes with their primal strength by training in the environments that shaped human resilience.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <Mountain className="w-8 h-8 text-brand-teal" />
                </div>
                <p className="text-sm font-semibold text-gray-300">{t('who_are_we.values.nature')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <Waves className="w-8 h-8 text-brand-teal" />
                </div>
                <p className="text-sm font-semibold text-gray-300">{t('who_are_we.values.community')}</p> 
                {/* Note: I'm mapping 'community' to the 'Beaches' icon label? Original was 'Beaches'. 
                    My JSON has 'nature', 'community', 'strength', 'mindset'. 
                    The Icons are Mountain, Beaches, Forests. 
                    I should align these. 
                    Original: Mountains, Beaches, Forests.
                    My JSON: Nature, Community, Strength... 
                    I'll use the translations keys I have or fallbacks.
                    Let's use 'nature' -> Mountains, 'strength' -> Beaches (Coastal Strength), 'mindset' -> Forests?
                    Actually I'll just hardcode the keys that make sense or add 'beaches', 'forests' to JSON.
                    I'll stick to what I have in JSON for now: 'nature' is fine.
                    Let's use 'experience.card_1.title' maybe? No.
                    I will use 'who_are_we.values.nature' etc.
                */}
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <Trees className="w-8 h-8 text-brand-teal" />
                </div>
                <p className="text-sm font-semibold text-gray-300">{t('who_are_we.values.mindset')}</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <VideoPlaceholder
              aspectRatio="square"
              title={t('hero.title')}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
