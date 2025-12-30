'use client';

import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-full border-2 border-brand-orange hover:bg-brand-orange hover:text-white text-sm font-semibold transition-colors text-brand-navy"
    >
      {i18n.language === 'es' ? 'EN' : 'ES'}
    </button>
  );
};
