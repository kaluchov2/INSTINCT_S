"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Calendar } from "@/components/ui/Calendar";
import { ReservationForm } from "@/components/ui/ReservationForm";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function CalendarSection() {
  const { t } = useTranslation('common');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string>("");

  return (
    <Section id="calendar" className="bg-brand-dark">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            {t('calendar.section_title', 'Book Your')} <span className="text-brand-teal">{t('calendar.adventure', 'Adventure')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('calendar.description', 'Select your preferred dates and reserve your spot in one of our transformative bootcamp experiences.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              experienceId={selectedExperience}
            />
          </div>

          <div>
            <ReservationForm
              selectedDate={selectedDate}
              selectedExperience={selectedExperience}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-brand-gunmetal rounded-lg shadow-md p-6 max-w-2xl border border-brand-teal/20">
            <h3 className="text-xl font-bold text-white mb-3">
              {t('calendar.questions_title', 'Questions about booking?')}
            </h3>
            <p className="text-gray-300 mb-4">
              {t('calendar.questions_desc', 'Our team is here to help you find the perfect bootcamp experience. Reach out to us for personalized recommendations and group booking options.')}
            </p>
            <p className="text-brand-teal font-semibold">
              Email: info@instincts.com | Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
