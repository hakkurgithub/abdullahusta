import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar"; // Navbar'ı import etmeyi unutmayın

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Abdullah Usta - Geleneksel Türk Mutfağı",
  description: "1985'ten beri İstanbul'da hizmet veren Abdullah Usta'ta geleneksel Türk mutfağının eşsiz lezzetlerini keşfedin. Adana kebap, pide, lahmacun ve daha fazlası.",
  // ... (diğer metadata ayarlarınız)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.className} ${pacifico.variable}`}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}