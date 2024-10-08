'use client'

import { I18nextProvider } from 'react-i18next'
import { initTranslations} from '@/app/i18n'
import { createInstance } from 'i18next'

interface TranslationsProviderProps {
  children: React.ReactNode
  locale: string
}

export default async function TranslationsProvider({ children, locale }: TranslationsProviderProps) {
  const i18n = createInstance()
  await initTranslations(locale, i18n)

  return (<I18nextProvider i18n={i18n}>{children}</I18nextProvider>)
}
