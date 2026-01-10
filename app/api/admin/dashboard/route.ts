import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // 1. Oturum kontrolü (Cookie var mı?)
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Oturum açılmamış.' }, { status: 401 });
    }

    // 2. Token doğrulama ve Admin yetkisi kontrolü
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== 'admin') {
      return NextResponse.json({ message: 'Yetkisiz erişim. Sadece adminler girebilir.' }, { status: 403 });
    }

    // 3. Veritabanından bilgileri çek
    // Toplam kullanıcı sayısı
    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    const totalUsers = countResult.rows[0].count;

    // Son 10 kullanıcıyı getir
    const usersResult = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 10');

    return NextResponse.json({
      stats: {
        totalUsers: parseInt(totalUsers),
        totalOrders: 0, // İleride sipariş sistemi gelince burası dolacak
      },
      users: usersResult.rows
    });

  } catch (error) {
    console.error('Admin Dashboard Hatası:', error);
    return NextResponse.json({ message: 'Sunucu hatası.' }, { status: 500 });
  }
}
