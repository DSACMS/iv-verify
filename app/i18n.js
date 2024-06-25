import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend'

export const i18nConfig = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  cookieName: 'NEXT_LOCALE',
}

export async function initTranslations(
  locale,
  i18nInstance
) {
    i18nInstance = i18nInstance || createInstance()
    i18nInstance.use(initReactI18next)
    i18nInstance.use(resourcesToBackend((language, namespace) => import(`./i18n/locales/${language}/${namespace}.json`)))

  return i18nInstance.init({
      debug: process.env.NODE_ENV !== "production" ,
      lng: locale,
      // resources,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      // defaultNS: namespaces[0],
      // fallbackNS: namespaces[0],
      // ns: namespaces,
      // preload: resources ? [] : i18nConfig.locales
    })
}

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .use(resourcesToBackend((language, namespace) => import(`./i18n/locales/${language}/${namespace}.json`)))
//   .init({
//     debug: process.env.NODE_ENV !== "production" ,
//     fallbackLng: i18nConfig.defaultLocale
//   });

// export default i18n;
