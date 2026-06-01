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
      <div className="text-center mb-16 animate-slide-down px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Tüm Ürünler</h1>
        <p className="text-xl text-[var(--muted-foreground)] font-medium max-w-2xl mx-auto">
          En yeni modeller, en iyi fiyatlar. İhtiyacınıza uygun cihazı hemen bulun.
        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
        {products.map((product, index) => (
          <Link href={`/urunler/${product.id}`} key={product.id} className={`apple-card group block animate-fade-in delay-${(index % 5 + 1) * 100} rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500`}>
            <div className="relative h-[400px] w-full bg-[#f5f5f7] dark:bg-[#111111] p-10 flex items-center justify-center">
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
                  className={`object-contain p-10 transition-transform duration-700 ease-out ${product.status !== 'SOLD' ? 'group-hover:scale-110' : 'opacity-50'}`} 
                />
              ) : (
                <div className="text-gray-400">Görsel Yok</div>
              )}
            </div>
            <div className="p-8 bg-[var(--card)]">
              <h3 className="text-2xl font-bold mb-3 tracking-tight line-clamp-1">{product.title}</h3>
              <p className="text-[var(--muted-foreground)] text-base mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-[var(--border)]">
                <span className="font-semibold text-xl">{product.price?.toLocaleString('tr-TR')} ₺</span>
                <span className="text-[var(--accent)] text-base font-semibold group-hover:bg-[var(--accent)] group-hover:text-white px-4 py-2 rounded-full transition-all">İncele</span>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
