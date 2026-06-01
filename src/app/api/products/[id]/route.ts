import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const updated = updateProduct(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const success = deleteProduct(params.id);
  if (!success) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
