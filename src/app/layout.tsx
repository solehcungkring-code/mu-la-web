import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MU-LA Collagen 5000mg - Premium Sugar Free",
  description: "Dapatkan kulit cerah dan sehat dengan MU-LA Collagen 5000mg. Bebas gula dengan rasa Orange Honey yang nikmat.",
};

import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPageContent } from "./actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalContent = await getPageContent("global");

  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" />
      </head>
      <body>
        <Header content={globalContent} />
        {children}
        <Footer content={globalContent} />
      </body>
    </html>
  );
}
