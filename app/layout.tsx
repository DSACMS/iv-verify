import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider  from './StoreProvider'
import "./globals.css";
import GovernmentBanner from "./components/GovernmentBanner";
import I18nComponent from "./components/I18nComponent";
import InitialStateLoader from "./InitialStateLoader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verify.gov",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><StoreProvider><InitialStateLoader><I18nComponent /><GovernmentBanner />{children}</InitialStateLoader></StoreProvider></body>
    </html>
  );
}

export default RootLayout