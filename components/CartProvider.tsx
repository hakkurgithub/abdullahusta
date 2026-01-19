'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Sepet öğesi tipi
export type CartItem = {
  id: string; // ID string olmalı (Prisma uyumu için)
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

// Context tipi (Dışarıya sunduğumuz fonksiyonlar)
type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void; // <-- Bu eksikti, ekledik
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;         // Toplam tutar (değişken olarak)
  getTotalPrice: () => number; // Toplam tutar (fonksiyon olarak - uyumluluk için)
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Sayfa yüklendiğinde LocalStorage'dan çek
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Sepet yükleme hatası:", error);
      }
    }
  }, []);

  // Sepet değişince kaydet
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Ürün Ekleme
  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, newItem];
    });
  };

  // Miktar Güncelleme (Artır/Azalt)
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // En az 1 olabilir
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Ürün Silme
  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  // Sepeti Temizle
  const clearCart = () => {
    setItems([]);
  };

  // Toplam Tutar Hesabı
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Bazı sayfalar fonksiyon olarak çağırdığı için bunu da ekliyoruz
  const getTotalPrice = () => total;

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        updateQuantity, // Artık kullanılabilir
        removeItem, 
        clearCart, 
        total,
        getTotalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}