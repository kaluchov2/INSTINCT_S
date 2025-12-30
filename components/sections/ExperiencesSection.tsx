"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FlipCard } from "@/components/ui/FlipCard";
import { Button } from "@/components/ui/Button";
import { EXPERIENCES } from "@/lib/constants";
import { useTranslation } from "react-i18next";

export function ExperiencesSection() {
  const { t } = useTranslation('common');

  return (
    <Section id="experiences" className="bg-gradient-to-b from-brand-gunmetal to-brand-gunmetal-dark">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
             {t('experiences.title').split(' ')[0]} <span className="text-brand-teal">{t('experiences.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {t('experiences.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {EXPERIENCES.map((experience, index) => (
            <FlipCard
              key={experience.id}
              imageSrc={experience.imageSrc}
              imageAlt={experience.imageAlt}
              title={t(`experiences.card_${index + 1}.title`, experience.title)}
              description={t(`experiences.card_${index + 1}.desc`, experience.description)}
              features={experience.features}
              experienceId={experience.id}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/70 mb-6">
            {t('experiences.cant_decide', "Can't decide? We can help you choose the perfect experience for your goals.")}
          </p>
          <Button variant="outline" size="lg" className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white">
             {t('nav.contact')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
