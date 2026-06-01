"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import { StoreCarousel } from "@/components/store-carousel";

export default function Home() {
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

  const newProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);
  const accessories = products.filter(p => p.category === 'Aksesuarlar').slice(0, 8);
  const popularProducts = [...products].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10);

  return (
    <div className="flex flex-col items-center bg-[var(--background)]">
      
      {/* Store Header */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground)] mb-4 md:mb-0">
          Mağaza. <span className="text-[var(--muted-foreground)]">En sevdiğiniz ürünleri satın almanın en iyi yolu.</span>
        </h1>
      </div>

      {/* Categories Bar */}
      <div className="w-full overflow-x-auto hide-scrollbar py-8 border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 md:gap-12 min-w-max">
          {[
            { name: "Mac", icon: "💻", href: "/urunler?kategori=Mac" },
            { name: "iPhone", icon: "📱", href: "/urunler?kategori=iPhone" },
            { name: "iPad", icon: "📝", href: "/urunler?kategori=iPad" },
            { name: "Watch", icon: "⌚", href: "/urunler?kategori=Watch" },
            { name: "AirPods", icon: "🎧", href: "/urunler?kategori=AirPods" },
            { name: "Aksesuarlar", icon: "🔌", href: "/urunler?kategori=Aksesuarlar" },
          ].map((cat, i) => (
            <Link href={cat.href} key={i} className="flex flex-col items-center gap-3 group">
              <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
              <span className="text-sm font-medium text-[var(--foreground)]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* New Products Carousel */}
      <StoreCarousel title={<>Son çıkanlar. <span className="text-[var(--muted-foreground)]">Yeni olanlara göz atın.</span></>}>
        {loading ? (
          <div className="w-full flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div></div>
        ) : (
          newProducts.map((p, i) => (
            <Link href={`/urunler/${p.id}`} key={p.id} className="snap-always flex-shrink-0 w-[300px] sm:w-[400px] bg-[var(--card)] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group relative">
              <div className="absolute top-6 left-6 z-10">
                <span className="text-xs font-bold uppercase tracking-wide text-orange-500 mb-1 block">YENİ</span>
                <h3 className="text-2xl font-bold text-[var(--foreground)]">{p.title}</h3>
                <p className="text-[var(--foreground)] font-medium mt-1">{p.price?.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla</p>
              </div>
              <div className="h-[400px] sm:h-[500px] w-full relative bg-[#f5f5f7] dark:bg-[#111111] pt-32 p-8 flex items-center justify-center">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.title} fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-gray-400">Görsel Yok</div>
                )}
              </div>
            </Link>
          ))
        )}
      </StoreCarousel>

      {/* Help Here Section */}
      <StoreCarousel title={<>Yardım burada. <span className="text-[var(--muted-foreground)]">Ne zaman ve ne şekilde ihtiyacınız olursa.</span></>} dark>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-gray-900 rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-[350px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">Apple Destek Uzmanı</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-[280px]">Uzmandan bire bir yardım alarak alışveriş yapın.</h3>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full text-9xl flex items-end justify-end pb-4 pr-4">👩🏽‍💻</div>
          </div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-gray-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-[350px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">Hızlı Teslimat</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-[280px]">Avrupa yakasında aynı gün kurye ile teslimat.</h3>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full text-9xl flex items-end justify-end pb-4 pr-4">🚚</div>
          </div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-gray-900 rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-[350px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">WhatsApp</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-[280px]">Satış sonrası anında destek ve hızlı iade/değişim.</h3>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full text-9xl flex items-end justify-end pb-4 pr-4">💬</div>
          </div>
        </div>
      </StoreCarousel>

      {/* Accessories */}
      <StoreCarousel title={<>Aksesuarlar. <span className="text-[var(--muted-foreground)]">En sevdiğiniz aygıtlarınızla mükemmel eşleşiyorlar.</span></>}>
        {accessories.map((p, i) => (
          <Link href={`/urunler/${p.id}`} key={p.id} className="snap-always flex-shrink-0 w-[240px] sm:w-[320px] bg-[var(--card)] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group p-8 flex flex-col items-center text-center">
            <div className="relative h-48 w-full mb-6">
              {p.images?.[0] ? (
                <Image src={p.images[0]} alt={p.title} fill className="object-contain group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="text-gray-400">Görsel Yok</div>
              )}
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-2">{p.title}</h3>
            <p className="text-[var(--foreground)] font-medium mt-auto pt-4">{p.price?.toLocaleString('tr-TR')} ₺</p>
          </Link>
        ))}
      </StoreCarousel>

    </div>
  );
}
