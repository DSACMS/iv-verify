import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend'
import { i18nConfig } from './constants';

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
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
    })
}