import { useState, useEffect } from 'react';
import { adminConfig } from '../lib/admin';
import { MENU_ITEMS } from '../lib/menuData';

export const useContent = () => {
  // Abdullah Usta Kurumsal Bilgileri
  const [content, setContent] = useState({
    restaurantName: "Abdullah Usta",
    heroTitle: "Lezzetin Ustası Abdullah Usta",
    heroSubtitle: "Geleneksel kebap lezzetini usta ellerden deneyimleyin. Avcılar'da gerçek lezzet durağı.",
    allMenuItems: MENU_ITEMS, // menuData.ts içerisindeki güncel liste
    address: adminConfig.address || "Avcılar Üniversite Mah. Mareşal Cad. No:22 İstanbul",
    phone: adminConfig.phoneNumber || "0212 812 02 44",
    whatsapp: adminConfig.whatsappNumber || "905442024244"
  });

  // Gelecekte bir veritabanı veya API bağlantısı eklemek isterseniz burayı kullanabilirsiniz
  useEffect(() => {
    // Bilgilerin güncelliğini kontrol etmek için adminConfig'i dinleyebiliriz
    setContent(prev => ({
      ...prev,
      restaurantName: adminConfig.restaurantName,
      address: adminConfig.address,
      phone: adminConfig.phoneNumber,
      whatsapp: adminConfig.whatsappNumber
    }));
  }, []);

  return { content };
};