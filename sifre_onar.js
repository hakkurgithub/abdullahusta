const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = "kurt.hakki@gmail.com"; // Sorun yaşadığınız e-posta
  const yeniSifre = "123123"; // Geçici yeni şifreniz

  console.log(`🛠️  ${email} kullanıcısı için şifre onarılıyor...`);

  // 1. Kullanıcıyı bul
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("❌ Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı!");
    return;
  }

  // 2. Şifreyi güvenli hale getir (Hash'le)
  const hashedPassword = await bcrypt.hash(yeniSifre, 10);

  // 3. Veritabanını güncelle
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  console.log("✅ ŞİFRE BAŞARIYLA GÜNCELLENDİ!");
  console.log(`🔑 Yeni Şifreniz: ${yeniSifre}`);
  console.log("👉 Şimdi giriş sayfasından bu şifre ile giriş yapabilirsiniz.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());