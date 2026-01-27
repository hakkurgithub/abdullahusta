import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // @ alias'ı genelde daha güvenlidir
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah Usta",
  description: "Lezzetli Kebap ve Döner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* İkonlar için RemixIcon */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <CartProvider>
          {/* Üst Menü (Giriş kontrolü içinde) */}
          <Navbar />

          {/* Sayfa İçeriği */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Alt Bilgi */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}