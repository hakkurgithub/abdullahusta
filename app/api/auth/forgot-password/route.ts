import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Kullanıcıyı bul
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Güvenlik gereği "Böyle biri yok" demeyiz, başarılı gibi davranırız (User Enumeration Attack önlemi)
      return NextResponse.json({ success: true });
    }

    // 2. Yeni geçici şifre üret (6 haneli rastgele sayı)
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Veritabanını güncelle
    await prisma.user.update({
      where: { email },
      data: { password: tempPassword }, // Yeni şifreyi kaydet
    });

    // 4. Mail Gönderici Ayarları (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Sizin mailiniz
        pass: process.env.GMAIL_PASS, // Uygulama şifresi
      },
    });

    // 5. Mail İçeriği
    const mailOptions = {
      from: `"Abdullah Usta Lezzetleri" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🔐 Yeni Geçici Şifreniz',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c0392b;">Şifreniz Sıfırlandı</h2>
          <p>Merhaba <strong>${user.name || 'Lezzet Sever'}</strong>,</p>
          <p>Hesabınız için şifre sıfırlama talebinde bulundunuz.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; margin: 20px 0; border: 1px solid #ddd;">
            ${tempPassword}
          </div>
          <p>Bu şifre ile giriş yaptıktan sonra profilinizden şifrenizi değiştirmeyi unutmayın.</p>
          <p style="font-size: 12px; color: #888; margin-top: 30px;">Abdullah Usta Kebap & Pide Salonu</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Mail hatası:", error);
    return NextResponse.json({ error: 'Mail gönderilemedi' }, { status: 500 });
  }
}