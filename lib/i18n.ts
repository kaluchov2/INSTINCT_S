import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: 'es', // Default to Spanish
    lng: 'es', // Force start with Spanish if needed, though detection will run
    defaultNS: 'common', // Use 'common' namespace instead of default 'translation'
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18next;
