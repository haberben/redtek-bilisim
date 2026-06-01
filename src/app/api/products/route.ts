import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/products';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newProduct = addProduct(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
