import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename and add timestamp to avoid collisions
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filename = `${Date.now()}-${safeFilename}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}`,
      name: file.name,
      type: file.type
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Dosya yüklenirken bir hata oluştu' }, { status: 500 });
  }
}
