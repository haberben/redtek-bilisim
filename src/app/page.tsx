"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 3)); // Show top 3 products
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative bg-black text-white overflow-hidden py-32 flex flex-col items-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80 z-0"></div>
        <div className="z-10 animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Teknolojinin <br className="md:hidden" /> Yeni Adresi.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
            Sultangazi'de en yeni Apple ürünleri, orijinal aksesuarlar ve garantili ikinci el cihazlar Redtek Bilişim'de.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/urunler" className="apple-button text-lg px-8 py-4">
              Ürünleri Keşfedin
            </Link>
            <a href="https://wa.me/905012023838" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--accent)] font-medium transition-colors px-8 py-4">
              Bizimle İletişime Geçin &gt;
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 animate-fade-in delay-100">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Öne Çıkanlar</h2>
          <p className="text-lg text-[var(--muted-foreground)]">En çok tercih edilen modeller ve aksesuarlar.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Link href={`/urunler/${product.id}`} key={product.id} className={`apple-card group block animate-fade-in delay-${(index + 2) * 100}`}>
                <div className="relative h-80 w-full bg-[#f5f5f7] dark:bg-[#1d1d1f] p-8 flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image 
                      src={product.imageUrl} 
                      alt={product.title} 
                      fill 
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="text-gray-400">Görsel Yok</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{product.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold text-lg">{product.price?.toLocaleString('tr-TR')} ₺</span>
                    <span className="text-[var(--accent)] text-sm font-medium group-hover:underline">İncele &gt;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link href="/urunler" className="apple-button bg-transparent border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]">
            Tüm Ürünleri Gör
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="w-full bg-[var(--muted)] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--background)] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Güvenilir Alışveriş</h3>
              <p className="text-[var(--muted-foreground)]">Sattığımız tüm ürünler Redtek Bilişim garantisi altındadır. Kontrol edilmiş, sorunsuz cihazlar.</p>
            </div>
            <div className="animate-fade-in delay-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--background)] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Hızlı Teslimat</h3>
              <p className="text-[var(--muted-foreground)]">Avrupa yakasında aynı gün kurye veya mağazadan hemen teslim seçenekleri.</p>
            </div>
            <div className="animate-fade-in delay-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--background)] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Birebir Destek</h3>
              <p className="text-[var(--muted-foreground)]">WhatsApp üzerinden anında iletişim, cihaz seçimi ve satış sonrası destek.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
