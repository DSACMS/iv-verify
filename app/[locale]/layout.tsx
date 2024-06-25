import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider  from '@/app/StoreProvider'
import "./globals.css";
import GovernmentBanner from "@/app/components/GovernmentBanner";
import InitialStateLoader from "@/app/InitialStateLoader";
import TranslationsProvider from "../TranslationsProvider";
import { CookiesProvider } from "react-cookie";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verify.gov",
};

function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: any
}>) {
  console.log('locale', params.locale)
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <StoreProvider>
          <InitialStateLoader>
            {/* <CookiesProvider> */}
              <TranslationsProvider locale={params.locale}>
                <GovernmentBanner />
                {children}
              </TranslationsProvider>
            {/* </CookiesProvider> */}
          </InitialStateLoader>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout