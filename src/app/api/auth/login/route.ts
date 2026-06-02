import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === 'Enesredtek' && password === 'Redtek.65') {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return response;
    }

    return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Giriş yapılamadı' }, { status: 500 });
  }
}
