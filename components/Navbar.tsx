"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const navigation = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Menü", href: "/menu" },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className={`relative transition-all duration-300 ${scrolled ? 'w-12 h-12' : 'w-16 h-16'}`}>
              <Image
                src="https://raw.githubusercontent.com/hakkurgithub/images/main/abdullah-usta-logo.jpg"
                alt="Abdullah Usta Logo"
                fill
                className="rounded-full object-cover shadow-sm"
                priority
              />
            </div>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-bold transition-colors relative group ${isActive(item.href)
                  ? scrolled ? "text-red-600" : "text-white"
                  : scrolled ? "text-gray-700 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}>
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full ${isActive(item.href) ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </div>

          {/* SAĞ TARAF BUTONLAR */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="relative group">
              <div className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-gray-100 text-gray-700 group-hover:text-red-600' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                <span className="text-xl">🛒</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/reservation" className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${scrolled ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-red-600 hover:bg-gray-100'}`}>
              Rezervasyon
            </Link>
          </div>

          {/* MOBİL MENÜ BUTONU */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className={`relative p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              <span className="text-xl">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBİL MENÜ İÇERİK */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${isActive(item.href) ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"}`}>
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Link href="/reservation" className="block w-full text-center bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
                Rezervasyon Yap
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}