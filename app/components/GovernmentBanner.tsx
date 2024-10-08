'use client'
import { GovBanner } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

export default function GovernmentBanner() {
  const { i18n } = useTranslation()
  const language = i18n.language == "es" ? "spanish" : "english"
  return <GovBanner language={language} />
}