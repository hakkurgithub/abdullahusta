export const adminConfig = {
  // Restoran Kimlik Bilgileri
  restaurantName: "Abdullah Usta",
  restaurantTitle: "Abdullah Usta Kebap & Pide Salonu",
  
  // İletişim ve Sipariş Hattı (Yeni Bilgiler)
  whatsappNumber: "905442024244", // 0544 202 42 44
  phoneNumber: "02128120244",    // 0212 812 02 44
  email: "burakkeskin4244@gmail.com",
  
  // Adres Bilgileri
  address: "Avcılar Üniversite Mah. Mareşal Cad. No:22 İstanbul, Turkey 34320",
  googleMapsUrl: "https://maps.app.goo.gl/yAKxQ5ZcjFJ5jPNYA”",

  // Sosyal Medya
  facebookUrl: "https://www.facebook.com/p/Abdullah-usta-parseller-61570080275040/",
  instagramUrl: "https://www.instagram.com/abdullah.usta_parseller/",

  // Yönetim Paneli Ayarları
  adminUsername: "admin",
  // Güvenlik için bu anahtarı yerel depolamada kontrol eder
  sessionKey: "abdullah_usta_admin_session",
  
  // Menü Kategorileri (products.xlsx ile uyumlu)
  categories: [
    "Kebaplar & Izgaralar",
    "Pide & Lahmacun",
    "Döner",
    "Dürüm",
    "Çorbalar",
    "Yan Ürünler",
    "Tatlılar",
    "İçecekler",
    "Kiloluk Ürünler"
  ],

  // Sipariş Kanalı Ayarları
  orderSettings: {
    deliveryFee: 0, // Ücretsiz teslimat
    minimumOrderAmount: 200,
    allowWhatsAppOrder: true,
    allowPhoneOrder: true
  }
};