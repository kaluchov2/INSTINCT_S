"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQ_ITEMS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function FooterSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { t } = useTranslation('common');

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-brand-dark-accent">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            {t('faq.title', 'Frequently Asked')} <span className="text-brand-teal">{t('faq.questions', 'Questions')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('faq.description', 'Everything you need to know about our outdoor bootcamp experiences.')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <div
              key={index}
              className="bg-brand-gunmetal border-2 border-brand-gunmetal-light rounded-lg overflow-hidden hover:border-brand-teal transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-white pr-4">
                   {t(`faq.item_${index + 1}.question`, faq.question)}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-brand-teal flex-shrink-0 transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">
                     {t(`faq.item_${index + 1}.answer`, faq.answer)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-teal-dark rounded-lg shadow-xl p-8 text-white border border-brand-teal-light">
            <h3 className="text-2xl md:text-3xl font-black mb-3">
              {t('faq.still_questions', 'Still have questions?')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t('faq.contact_desc', "We're here to help! Reach out to our team anytime.")}
            </p>
            <a
              href="mailto:info@kaan.com"
              className="inline-block bg-white text-brand-gunmetal font-bold px-8 py-3 rounded-lg hover:scale-105 transition-transform"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
