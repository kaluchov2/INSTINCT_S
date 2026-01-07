"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";

interface FlipCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  features?: string[];
  experienceId: string;
}

export function FlipCard({
  imageSrc,
  imageAlt,
  title,
  description,
  features,
  experienceId,
}: FlipCardProps) {
  const { t } = useTranslation('common');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-full h-[450px] cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl group">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <h3 className="text-2xl md:text-3xl font-black text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="relative w-full h-full bg-gradient-to-br from-brand-gunmetal to-brand-gunmetal-dark rounded-lg shadow-xl p-6 flex flex-col border border-brand-teal/20">
            <h3 className="text-2xl font-black text-white mb-4">{title}</h3>

            <p className="text-gray-300 text-sm mb-4 flex-grow overflow-auto">
              {description}
            </p>

            {features && features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-brand-teal mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-3 mt-auto" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  // Navigate to experience detail page
                  window.location.href = `/experiences/${experienceId}`;
                }}
              >
                {t('experiences.show_all_info', 'Show All Info')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                onClick={() => {
                  // Navigate to booking page
                  window.location.href = `#calendar?experience=${experienceId}`;
                }}
              >
                {t('experiences.book_now', 'Book Now')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
