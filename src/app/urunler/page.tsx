"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Tüm Ürünler</h1>
        <p className="text-xl text-[var(--muted-foreground)]">Aradığınız teknolojiyi keşfedin.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted-foreground)]">
          <p className="text-xl">Şu anda listelenen ürün bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.filter(p => p.status !== 'DRAFT').map((product, index) => (
            <Link href={`/urunler/${product.id}`} key={product.id} className="apple-card group block animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="relative h-64 w-full bg-[#f5f5f7] dark:bg-[#1d1d1f] p-6 flex items-center justify-center">
                {product.status === 'SOLD' && (
                  <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Satıldı
                  </div>
                )}
                {product.images && product.images.length > 0 ? (
                  <Image 
                    src={product.images[0]} 
                    alt={product.title} 
                    fill 
                    className={`object-contain p-6 transition-transform duration-500 ${product.status !== 'SOLD' ? 'group-hover:scale-105' : 'opacity-50'}`} 
                  />
                ) : (
                  <div className="text-gray-400">Görsel Yok</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-1 line-clamp-2 leading-tight">{product.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-lg">{product.price?.toLocaleString('tr-TR')} ₺</span>
                  <span className="text-[var(--accent)] text-sm font-medium group-hover:underline">İncele</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
