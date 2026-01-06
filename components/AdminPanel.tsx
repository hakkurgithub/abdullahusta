'use client';

import { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { MenuItem } from '../lib/menuData';

interface AdminPanelProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen = true, onClose }: AdminPanelProps) {
  // useContent'ten sadece mevcut olan 'content' verisini alıyoruz
  const { content } = useContent();
  const [localContent, setLocalContent] = useState(content);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Veriler değiştiğinde yerel state'i güncelle
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  if (!isOpen) return null;

  const handleSaveContent = () => {
    alert('İçerik güncellendi (Demo modunda değişiklikler sadece bu sayfada görünür).');
    // Not: Gerçek bir API bağladığınızda burada updateContent kullanılacaktır.
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-end">
      <div className="bg-white w-full max-w-2xl h-full overflow-y-auto p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Abdullah Usta Yönetim Paneli</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* Restoran Bilgileri Düzenleme */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-red-600">Genel Bilgiler</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Restoran Adı</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded-lg" 
                  value={localContent.restaurantName}
                  onChange={(e) => setLocalContent({...localContent, restaurantName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Adres</label>
                <textarea 
                  className="w-full border p-2 rounded-lg" 
                  value={localContent.address}
                  onChange={(e) => setLocalContent({...localContent, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Telefon</label>
                  <input 
                    type="text" 
                    className="w-full border p-2 rounded-lg" 
                    value={localContent.phone}
                    onChange={(e) => setLocalContent({...localContent, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">WhatsApp</label>
                  <input 
                    type="text" 
                    className="w-full border p-2 rounded-lg" 
                    value={localContent.whatsapp}
                    onChange={(e) => setLocalContent({...localContent, whatsapp: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleSaveContent}
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Değişiklikleri Kaydet
            </button>
          </section>

          {/* Menü Yönetimi Bilgilendirme */}
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold mb-2 text-blue-800">Menü Yönetimi</h3>
            <p className="text-sm text-blue-700">
              Menü öğeleri şu anda <strong>menuData.ts</strong> dosyasından okunmaktadır. 
              Ürün eklemek veya silmek için ilgili dosyayı güncelleyebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}