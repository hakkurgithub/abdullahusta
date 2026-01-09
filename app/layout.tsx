import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah Usta | Kebap & Pide Salonu",
  description: "Avcılar'da geleneksel lezzetin adresi. 40 yıllık tecrübeyle usta ellerden çıkan kebap, pide ve lahmacun çeşitleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}>
        <CartProvider>
          {/* Global Header */}
          <Navbar />
          
          {/* Sayfa İçeriği */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Global Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}