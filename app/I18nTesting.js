import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fs from 'fs/promises'

async function getRes() {
  const data = await fs.readFile('./app/i18n/locales/en/translation.json')
  return JSON.parse(data)
}

const res = await getRes()

await i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      wait: true
    },
    ns: ['translationsNS'],
    defaultNS: 'translationsNS',
    resources: { en: { translationsNS: res }}
  });

export default i18n