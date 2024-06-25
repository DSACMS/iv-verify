import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language, namespace) => import(`./i18n/locales/${language}/${namespace}.json`)))
  .init({
    debug: process.env.NODE_ENV !== "production" ,
    fallbackLng: 'en'
  });

export default i18n;
