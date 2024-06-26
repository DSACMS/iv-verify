import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider  from '@/app/StoreProvider'
import "./globals.css";
import GovernmentBanner from "@/app/components/GovernmentBanner";
import InitialStateLoader from "@/app/InitialStateLoader";
import TranslationsProvider from "../TranslationsProvider";
import { i18nConfig } from "@/app/constants";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verify.gov",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => { 
    return {locale}
  })
}

function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: any
}>) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <StoreProvider>
          <InitialStateLoader>
              <TranslationsProvider locale={params.locale}>
                <GovernmentBanner />
                {children}
              </TranslationsProvider>
          </InitialStateLoader>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout