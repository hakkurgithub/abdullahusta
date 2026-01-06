export type MenuCategory = 
  | "Kebaplar & Izgaralar"
  | "Pide & Lahmacun"
  | "Döner"
  | "Dürüm"
  | "Çorbalar"
  | "Yan Ürünler"
  | "Tatlılar"
  | "İçecekler"
  | "Kiloluk Ürünler";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
  rating: number;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: "1", name: "Adana Kebap (Porsiyon)", price: 380, description: "Özel baharatlı Adana kebap, pilav ve közlenmiş sebzelerle.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-porsiyon.jpg", rating: 5 },
  { id: "2", name: "Urfa Kebap (Porsiyon)", price: 380, description: "Acısız ve aromatik Urfa kebap; pilav ve garnitürle.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-porsiyon.jpg", rating: 5 },
  { id: "3", name: "Beyti Sarma", price: 500, description: "Lavaş içinde beyti kebap; yoğurt ve tereyağı sosla.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/beyti-sarma.jpg", rating: 5 },
  { id: "4", name: "Domatesli Kebap", price: 500, description: "Domates sosuyla zenginleştirilmiş kebap, pilav ve salatayla.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/domatesli-kebap.jpg", rating: 5 },
  { id: "5", name: "Patlıcanlı Kebap (Porsiyon)", price: 500, description: "Köz patlıcanla servis edilen kebap.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/patlicanli-kebap-porsiyon.jpg", rating: 5 },
  { id: "6", name: "Kuzu Şiş (Porsiyon)", price: 500, description: "Lokum kıvamında marine edilmiş kuzu şiş.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kuzu-sis-porsiyon.jpg", rating: 5 },
  { id: "7", name: "Kuzu Ciğer (Porsiyon)", price: 470, description: "Taze kuzu ciğer; lavaş ve köz sebzelerle.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kuzu-ciger-porsiyon.jpg", rating: 5 },
  { id: "8", name: "Köpüoğlu (Ali Nazik)", price: 520, description: "Yoğurtlu patlıcan yatağında özel kebap.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kopuoglu-ali-nazik.jpg", rating: 5 },
  { id: "9", name: "Yoğurtlu Kebap", price: 520, description: "Yoğurt ve sosla zenginleştirilmiş geleneksel kebap.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yogurtlu-kebap.jpg", rating: 5 },
  { id: "10", name: "Tavuk Şiş (Porsiyon)", price: 330, description: "Marine edilmiş tavuk göğsü, pilav ile.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-porsiyon.jpg", rating: 5 },
  { id: "11", name: "Tavuk Kanat (Porsiyon)", price: 330, description: "Çıtır tavuk kanatları.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-kanat-porsiyon.jpg", rating: 5 },
  { id: "12", name: "Karışık Kebap", price: 650, description: "Adana, kuzu, tavuk ve kanat çeşitlerinin birleşimi.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-kebap.jpg", rating: 5 },
  { id: "13", name: "Adana Dürüm", price: 230, description: "Lavaş içinde Adana kebap ve yeşillik.", category: "Dürüm", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-durum.jpg", rating: 5 },
  { id: "14", name: "Urfa Dürüm", price: 230, description: "Lavaş içinde acısız Urfa kebap.", category: "Dürüm", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-durum.jpg", rating: 5 },
  { id: "15", name: "Kuzu Şiş Dürüm", price: 300, description: "Kuzu eti ve garnitür lavaşta.", category: "Dürüm", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kuzu-sis-durum.jpg", rating: 5 },
  { id: "16", name: "Kuzu Ciğer Dürüm", price: 300, description: "Taze ciğer dürüm.", category: "Dürüm", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kuzu-ciger-durum.jpg", rating: 5 },
  { id: "17", name: "Tavuk Şiş Dürüm", price: 200, description: "Izgara tavuk dürüm.", category: "Dürüm", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-durum.jpg", rating: 5 },
  { id: "18", name: "Et Döner (Porsiyon)", price: 400, description: "%100 yaprak et döner.", category: "Döner", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/et-doner-porsiyon.jpg", rating: 5 },
  { id: "19", name: "Pilav Üstü Et Döner", price: 420, description: "Tereyağlı pilav üzerinde et döner.", category: "Döner", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pilav-ustu-et-doner.jpg", rating: 5 },
  { id: "20", name: "İskender Kebap", price: 480, description: "Pide üzerine döner, yoğurt ve özel tereyağı sosu.", category: "Döner", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender-kebap.jpg", rating: 5 },
  { id: "21", name: "Ekmek Arası Et Döner", price: 250, description: "Çıtır ekmekte et döner.", category: "Döner", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/et-doner-durum.jpg", rating: 5 },
  { id: "22", name: "Et Döner Dürüm", price: 250, description: "Lavaş içinde et döner.", category: "Döner", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/et-doner-durum.jpg", rating: 5 },
  { id: "23", name: "Lahmacun", price: 90, description: "Taş fırında ince hamur Abdullah Usta lahmacunu.", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/lahmacun.jpg", rating: 5 },
  { id: "24", name: "Kıymalı Pide", price: 240, description: "Geleneksel kıymalı pide.", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiymali-pide.jpg", rating: 5 },
  { id: "25", name: "Kıymalı Kaşarlı Pide", price: 270, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiymali-kasarli-pide.jpg", rating: 5 },
  { id: "26", name: "Kuşbaşılı Pide", price: 300, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kusbasili-pide.jpg", rating: 5 },
  { id: "27", name: "Kuşbaşılı Kaşarlı Pide", price: 320, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kusbasili-kasarli-pide.jpg", rating: 5 },
  { id: "28", name: "Kaşarlı Pide", price: 230, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kasarli-pide.jpg", rating: 5 },
  { id: "29", name: "Karışık Pide", price: 350, description: "Kuşbaşı, kıyma, kaşar ve sucuk.", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-pide.jpg", rating: 5 },
  { id: "30", name: "Mevlana Pide", price: 270, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mevlana-pide.jpg", rating: 5 },
  { id: "31", name: "Sucuklu Kaşarlı Pide", price: 300, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sucuklu-kasarli-pide.jpg", rating: 5 },
  { id: "32", name: "Kavurmalı Pide", price: 350, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kavurmali-pide.jpg", rating: 5 },
  { id: "33", name: "Kavurmalı Kaşarlı Pide", price: 370, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kavurmali-kasarli-pide.jpg", rating: 5 },
  { id: "34", name: "Mercimek Çorbası", price: 110, description: "Süzme mercimek çorbası.", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek-corbasi.jpg", rating: 5 },
  { id: "35", name: "Ezogelin Çorbası", price: 110, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ezogelin-corbasi.jpg", rating: 5 },
  { id: "36", name: "Yayla Çorbası", price: 110, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yayla-corbasi.jpg", rating: 5 },
  { id: "37", name: "Paça Çorbası", price: 200, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/paca-corbasi.jpg", rating: 5 },
  { id: "38", name: "Ayak Paça Çorbası", price: 200, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ayak-paca-corbasi.jpg", rating: 5 },
  { id: "39", name: "Kelle Paça Çorbası", price: 200, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kelle-paca-corbasi.jpg", rating: 5 },
  { id: "40", name: "İşkembe Çorbası", price: 180, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskembe-corbasi.jpg", rating: 5 },
  { id: "41", name: "Tuzlama", price: 210, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tuzlama.jpg", rating: 5 },
  { id: "42", name: "Damar", price: 250, description: "", category: "Çorbalar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/damar.jpg", rating: 5 },
  { id: "43", name: "Çoban Salata", price: 110, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/coban-salata.jpg", rating: 5 },
  { id: "44", name: "Mevsim Salata", price: 110, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mevsim-salata.jpg", rating: 5 },
  { id: "45", name: "Gavurdağı Salata", price: 150, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gavurdagi-salata.jpg", rating: 5 },
  { id: "46", name: "Cacık", price: 80, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cacik.jpg", rating: 5 },
  { id: "47", name: "Yoğurt", price: 80, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yogurt.jpg", rating: 5 },
  { id: "48", name: "Patates Kızartması", price: 100, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/patates-kizartmasi.jpg", rating: 5 },
  { id: "49", name: "Pirinç Pilavı", price: 80, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pirinc-pilavi.jpg", rating: 5 },
  { id: "50", name: "İçli Köfte (Adet)", price: 80, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/icli-kofte-adet.jpg", rating: 5 },
  { id: "51", name: "Künefe", price: 180, description: "", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kunefe.jpg", rating: 5 },
  { id: "52", name: "Fırın Sütlaç", price: 130, description: "", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/firin-sutlac.jpg", rating: 5 },
  { id: "53", name: "Kadayıf", price: 150, description: "", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kadayif.jpg", rating: 5 },
  { id: "54", name: "Kemalpaşa", price: 120, description: "", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kemalpasa.jpg", rating: 5 },
  { id: "55", name: "Ayran (300ml)", price: 50, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ayran-300ml.jpg", rating: 5 },
  { id: "56", name: "Kutu İçecekler", price: 60, description: "Cola, Fanta, Sprite, Ice Tea", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kutu-icecekler.jpg", rating: 5 },
  { id: "57", name: "Şalgam Suyu", price: 45, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/salgam-suyu.jpg", rating: 5 },
  { id: "58", name: "Su (500ml)", price: 20, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/su-500ml.jpg", rating: 5 },
  { id: "59", name: "Soda", price: 35, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/soda.jpg", rating: 5 },
  { id: "60", name: "Meyve Suyu", price: 50, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/meyve-suyu.jpg", rating: 5 },
  { id: "61", name: "Adana (Kg)", price: 1600, description: "Pişmemiş kilogram fiyatıdır.", category: "Kiloluk Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-kg.jpg", rating: 5 },
  { id: "62", name: "Urfa (Kg)", price: 1600, description: "", category: "Kiloluk Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-kg.jpg", rating: 5 },
  { id: "63", name: "Kuzu Şiş (Kg)", price: 2200, description: "", category: "Kiloluk Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kuzu-sis-kg.jpg", rating: 5 },
  { id: "64", name: "Tavuk Şiş (Kg)", price: 1200, description: "", category: "Kiloluk Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-kg.jpg", rating: 5 },
  { id: "65", name: "Tavuk Kanat (Kg)", price: 1200, description: "", category: "Kiloluk Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-kanat-kg.jpg", rating: 5 },
  { id: "66", name: "Et Döner (Kg)", price: 1800, description: "", category: "Kiloluk Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/et-doner-kg.jpg", rating: 5 },
  { id: "67", name: "Fındık Lahmacun (Adet)", price: 45, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/findik-lahmacun.jpg", rating: 5 },
  { id: "68", name: "Vali Kebabı", price: 1800, description: "4-5 kişilik dev karışık servis.", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/vali-kebabi.jpg", rating: 5 },
  { id: "69", name: "Çöp Şiş (Porsiyon)", price: 450, description: "", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis-porsiyon.jpg", rating: 5 },
  { id: "70", name: "Kaburga (Porsiyon)", price: 550, description: "", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kaburga-porsiyon.jpg", rating: 5 },
  { id: "71", name: "Pirzola (Porsiyon)", price: 600, description: "", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pirzola-porsiyon.jpg", rating: 5 },
  { id: "72", name: "Sarma Beyti (Tavuk)", price: 350, description: "", category: "Kebaplar & Izgaralar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sarma-beyti-tavuk.jpg", rating: 5 },
  { id: "73", name: "Kuşbaşılı Kaşarlı Yumurtalı Pide", price: 340, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kusbasili-kasarli-pide.jpg", rating: 5 },
  { id: "74", name: "Kıymalı Yumurtalı Pide", price: 260, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiymali-pide.jpg", rating: 5 },
  { id: "75", name: "Pastırmalı Kaşarlı Pide", price: 380, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pastirmali-kasarli-pide.jpg", rating: 5 },
  { id: "76", name: "Susamlı Pide", price: 40, description: "", category: "Pide & Lahmacun", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/susamli-pide.jpg", rating: 5 },
  { id: "77", name: "Humus", price: 120, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/humus.jpg", rating: 5 },
  { id: "78", name: "Babagannuş", price: 120, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/babagannus.jpg", rating: 5 },
  { id: "79", name: "Abugannuş", price: 120, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/abugannus.jpg", rating: 5 },
  { id: "80", name: "Ezme", price: 90, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ezme.jpg", rating: 5 },
  { id: "81", name: "Haydari", price: 90, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/haydari.jpg", rating: 5 },
  { id: "82", name: "Atom", price: 130, description: "", category: "Yan Ürünler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/atom.jpg", rating: 5 },
  { id: "83", name: "Şöbiyet", price: 180, description: "", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sobiyet.jpg", rating: 5 },
  { id: "84", name: "Baklava (Porsiyon)", price: 180, description: "", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/baklava.jpg", rating: 5 },
  { id: "85", name: "Taze Sıkma Portakal Suyu", price: 90, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/portakal-suyu.jpg", rating: 5 },
  { id: "86", name: "Limonata (Ev Yapımı)", price: 70, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/limonata.jpg", rating: 5 },
  { id: "87", name: "Ayran (Açık/Yayık)", price: 60, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ayran-yayik.jpg", rating: 5 },
  { id: "88", name: "Türk Kahvesi", price: 70, description: "", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/turk-kahvesi.jpg", rating: 5 }
];