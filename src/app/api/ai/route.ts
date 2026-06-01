import { NextResponse } from 'next/server';
import { generateProductDetails } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const details = await generateProductDetails(title);
    
    return NextResponse.json(details);
  } catch (error) {
    console.error("AI Generation error:", error);
    return NextResponse.json({ error: 'Failed to generate details' }, { status: 500 });
  }
}
