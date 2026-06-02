import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updated = updateSettings(data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
