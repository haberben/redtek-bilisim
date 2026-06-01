"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

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
          <ProductCard key={product.id} product={product} index={index} />
        ))}
        </div>
      )}
    </div>
  );
}
