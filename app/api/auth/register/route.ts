import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Tüm alanları doldurunuz.' },
        { status: 400 }
      );
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kayıtlı.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      { message: 'Kayıt başarıyla oluşturuldu!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
