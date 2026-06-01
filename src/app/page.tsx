"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

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
      <section className="w-full relative bg-black text-white overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-90 z-0"></div>
        <div className="z-10 animate-fade-in max-w-5xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-widest text-gray-400 mb-4 uppercase">Redtek Bilişim</h2>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Teknolojinin <br /> Zirvesi.
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Avrupa Yakası'nda en yeni Apple ürünleri, garantili cihazlar ve üst düzey aksesuarlar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link href="/urunler" className="apple-button w-full sm:w-auto text-lg px-10 py-5 rounded-full font-semibold shadow-[0_0_40px_rgba(41,151,255,0.3)] hover:shadow-[0_0_60px_rgba(41,151,255,0.5)] transition-all">
              Ürünleri Keşfet
            </Link>
            <a href="https://wa.me/905012023838" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-white hover:text-[var(--accent)] text-lg font-medium transition-colors px-10 py-5">
              WhatsApp Destek &gt;
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full max-w-[1400px] mx-auto px-0 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20 animate-slide-down px-4">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Öne Çıkanlar</h2>
          <p className="text-xl text-[var(--muted-foreground)] font-medium">En çok tercih edilen, en güçlü modeller.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--accent)]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
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
      <section className="w-full bg-[var(--muted)] py-32 mt-16 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="animate-slide-down delay-100 flex flex-col items-center">
              <div className="w-20 h-20 mb-8 bg-[var(--background)] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Güvenilir Alışveriş</h3>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-sm">Sattığımız tüm ürünler Redtek Bilişim garantisi altındadır. Kontrol edilmiş, sorunsuz cihazlar.</p>
            </div>
            <div className="animate-slide-down delay-200 flex flex-col items-center">
              <div className="w-20 h-20 mb-8 bg-[var(--background)] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Hızlı Teslimat</h3>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-sm">Avrupa yakasında aynı gün kurye veya mağazadan hemen teslim seçenekleriyle.</p>
            </div>
            <div className="animate-slide-down delay-300 flex flex-col items-center">
              <div className="w-20 h-20 mb-8 bg-[var(--background)] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Birebir Destek</h3>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-sm">WhatsApp üzerinden anında iletişim, cihaz seçimi ve satış sonrası tam destek.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
