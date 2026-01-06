"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Tipleri tanımlayalım
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  sendOrderToWhatsApp: (masa: string, adres: string, not: string) => void;
}

// Context'i oluşturalım
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook'u oluşturalım (diğer bileşenlerden sepete erişmek için)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider'ı oluşturalım (tüm sepet mantığının merkezi)
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const sendOrderToWhatsApp = (masa: string, adres: string, not: string) => {
    if (items.length === 0) {
      alert("Sepetiniz boş!");
      return;
    }
    const now = new Date();
    const tarihSaat = now.toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });
    const siparisNo = `Abdullah Usta-${Date.now().toString().slice(-6)}`;

    let message = `*Yeni Sipariş Talebi* 🔥\n`;
    message += `*Sipariş No:* ${siparisNo}\n`;
    message += `*Tarih:* ${tarihSaat}\n\n--------------------------\n`;
    items.forEach(item => {
      message += `${item.quantity} x ${item.name} - ${item.price * item.quantity} ₺\n`;
    });
    message += `--------------------------\n*Toplam Tutar:* ${getTotalPrice()} ₺\n\n`;
    if (masa) message += `*Masa Numarası:* ${masa}\n`;
    if (adres) message += `*Adres:* ${adres}\n`;
    if (not) message += `*Müşteri Notu:* ${not}\n`;

    const phoneNumber = "905333715577"; // Kendi numaranızı yazın
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, "_blank");
    }
    clearCart();
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems, sendOrderToWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
};