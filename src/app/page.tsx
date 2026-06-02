"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import { StoreCarousel } from "@/components/store-carousel";
import { 
  Headset, Truck, MessageCircle, CreditCard, RefreshCcw, Bike, Gift,
  Laptop, Smartphone, Watch, GraduationCap, Briefcase
} from "lucide-react";

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
            { name: "Mac", img: "https://pngimg.com/uploads/macbook/macbook_PNG8.png", href: "/urunler?kategori=Mac" },
            { name: "iPhone", img: "https://pngimg.com/uploads/iphone_14/iphone_14_PNG18.png", href: "/urunler?kategori=iPhone" },
            { name: "iPad", img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-model-select-gallery-2-202405?wid=512&hei=512&fmt=png-alpha", href: "/urunler?kategori=iPad" },
            { name: "Watch", img: "https://pngimg.com/uploads/apple_watch/apple_watch_PNG27.png", href: "/urunler?kategori=Watch" },
            { name: "AirPods", img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MME73?wid=512&hei=512&fmt=png-alpha", href: "/urunler?kategori=AirPods" },
            { name: "Dyson", img: "https://pngimg.com/uploads/vacuum_cleaner/vacuum_cleaner_PNG66.png", href: "/urunler?kategori=Dyson" },
            { name: "Aksesuarlar", img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MU7E2?wid=512&hei=512&fmt=png-alpha", href: "/urunler?kategori=Aksesuarlar" },
          ].map((cat, i) => (
            <Link href={cat.href} key={i} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-12 relative group-hover:scale-110 transition-transform flex items-center justify-center">
                <img src={cat.img} alt={cat.name} className="max-w-full max-h-full object-contain drop-shadow-sm" />
              </div>
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
            <Link href={`/urunler/${p.id}`} key={p.id} className="snap-always flex-shrink-0 w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] bg-[#f5f5f7] dark:bg-[#111111] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col relative">
              <div className="p-8 pb-0 z-10">
                <span className="text-xs font-bold uppercase tracking-wide text-orange-500 mb-1 block">YENİ</span>
                <h3 className="text-2xl font-bold text-[var(--foreground)] line-clamp-2">{p.title}</h3>
                <p className="text-[var(--foreground)] font-medium mt-1">{p.price?.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla</p>
              </div>
              <div className="flex-grow w-full relative p-8 pt-4">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.title} fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-gray-400 w-full h-full flex items-center justify-center">Görsel Yok</div>
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
            <div className="w-full h-full flex items-end justify-end pb-4 pr-4">
              <Headset strokeWidth={1} className="w-40 h-40 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-gray-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-[350px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">Hızlı Teslimat</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-[280px]">Avrupa yakasında aynı gün kurye ile teslimat.</h3>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full flex items-end justify-end pb-4 pr-4">
              <Truck strokeWidth={1} className="w-40 h-40 text-green-400" />
            </div>
          </div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-gray-900 rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-[350px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">WhatsApp</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-[280px]">Satış sonrası anında destek ve hızlı iade/değişim.</h3>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full flex items-end justify-end pb-4 pr-4">
              <MessageCircle strokeWidth={1} className="w-40 h-40 text-purple-400" />
            </div>
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

      {/* Why Redtek Bilisim */}
      <StoreCarousel title={<>Neden Redtek Bilişim? <span className="text-[var(--muted-foreground)]">Bizden alışveriş yapmak için şimdi daha da fazla sebebiniz var.</span></>}>
        <div className="snap-always flex-shrink-0 w-[240px] sm:w-[320px] bg-[var(--card)] rounded-3xl p-8 flex flex-col justify-between h-[240px] shadow-sm hover:shadow-lg transition-shadow">
          <div className="mb-4 text-blue-500"><CreditCard strokeWidth={1.5} className="w-10 h-10" /></div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Esnek ödeme seçenekleri ve taksit imkanları.</h3>
        </div>
        <div className="snap-always flex-shrink-0 w-[240px] sm:w-[320px] bg-[var(--card)] rounded-3xl p-8 flex flex-col justify-between h-[240px] shadow-sm hover:shadow-lg transition-shadow">
          <div className="mb-4 text-green-500"><RefreshCcw strokeWidth={1.5} className="w-10 h-10" /></div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Eski cihazınızı getirin, yenisini indirimle götürün.</h3>
        </div>
        <div className="snap-always flex-shrink-0 w-[240px] sm:w-[320px] bg-[var(--card)] rounded-3xl p-8 flex flex-col justify-between h-[240px] shadow-sm hover:shadow-lg transition-shadow">
          <div className="mb-4 text-purple-500"><Bike strokeWidth={1.5} className="w-10 h-10" /></div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">İstanbul içi aynı gün özel kurye ile teslimat.</h3>
        </div>
        <div className="snap-always flex-shrink-0 w-[240px] sm:w-[320px] bg-[var(--card)] rounded-3xl p-8 flex flex-col justify-between h-[240px] shadow-sm hover:shadow-lg transition-shadow">
          <div className="mb-4 text-orange-500"><Gift strokeWidth={1.5} className="w-10 h-10" /></div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Her alışverişinizde sürpriz hediyeler.</h3>
        </div>
      </StoreCarousel>

      {/* Dyson Section */}
      <StoreCarousel title={<>Dyson teknolojisi. <span className="text-[var(--muted-foreground)]">Eviniz için en iyisi.</span></>}>
        {products.filter(p => p.category === 'Dyson').slice(0, 6).map((p, i) => (
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

      {/* Sound (AirPods) */}
      <StoreCarousel title={<>Sesli düşünün. <span className="text-[var(--muted-foreground)]">Zengin ve yüksek kaliteli ses için benzersiz seçimler.</span></>}>
        {products.filter(p => p.category === 'AirPods').slice(0, 6).map((p, i) => (
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

      {/* Experience Section */}
      <StoreCarousel title={<>Redtek Bilişim deneyimi. <span className="text-[var(--muted-foreground)]">Aygıtlarınızla daha da fazlasını yapın.</span></>}>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-white rounded-3xl p-8 sm:p-10 flex flex-col h-[400px] relative overflow-hidden group border border-gray-200">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2 block">Redtek Zeka</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-black max-w-[300px]">Yeni cihazınızı sizin için yapılandıralım. Hemen kullanmaya başlayın.</h3>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 opacity-20 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-tl-full"></div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-[#f5f5f7] rounded-3xl p-8 sm:p-10 flex flex-col h-[400px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 block">Ekosistem</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-black max-w-[280px]">Tek başlarına güçlü. Birlikte süper güçlü.</h3>
          </div>
          <div className="absolute bottom-4 right-4 opacity-50 group-hover:scale-110 transition-transform duration-500 flex items-end justify-end gap-2">
            <Laptop strokeWidth={1} className="w-20 h-20 text-gray-800" />
            <Smartphone strokeWidth={1} className="w-16 h-16 text-gray-800" />
            <Watch strokeWidth={1} className="w-12 h-12 text-gray-800" />
          </div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-white rounded-3xl p-8 sm:p-10 flex flex-col h-[400px] relative overflow-hidden group border border-gray-200">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-red-500 mb-2 block">Hediye Kartı</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-black max-w-[280px]">Hediye alın. Veya hediye edin.</h3>
          </div>
          <div className="absolute bottom-4 right-4 opacity-50 group-hover:scale-110 transition-transform duration-500 flex items-end justify-end">
            <Gift strokeWidth={1} className="w-32 h-32 text-red-500" />
          </div>
        </div>
      </StoreCarousel>

      {/* Offers Section */}
      <StoreCarousel title={<>Tasarruf fırsatları ve teklifler. <span className="text-[var(--muted-foreground)]">Kampanyalar, özel indirimler ve daha fazlası.</span></>}>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-[#1d1d1f] rounded-3xl p-8 sm:p-10 flex flex-col h-[480px] relative overflow-hidden group">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">Öğrenci İndirimi</span>
            <h3 className="text-3xl font-bold text-white max-w-[280px]">Eğitime özel fiyatlarla yeni bir Mac veya iPad alın, tasarruf edin.</h3>
          </div>
          <div className="absolute bottom-4 right-4 opacity-50 group-hover:scale-110 transition-transform duration-500 flex items-end justify-end">
            <GraduationCap strokeWidth={1} className="w-40 h-40 text-gray-300" />
          </div>
        </div>
        <div className="snap-always flex-shrink-0 w-[300px] sm:w-[480px] bg-black rounded-3xl p-8 sm:p-10 flex flex-col h-[480px] relative overflow-hidden group border border-gray-800">
          <div className="z-10 relative">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 block">Kurumsal Satış</span>
            <h3 className="text-3xl font-bold text-white max-w-[280px]">Tüm çalışma yöntemleriniz için kurumsal çözümler.</h3>
          </div>
          <div className="absolute bottom-4 right-4 opacity-50 group-hover:scale-110 transition-transform duration-500 flex items-end justify-end">
            <Briefcase strokeWidth={1} className="w-40 h-40 text-gray-400" />
          </div>
        </div>
      </StoreCarousel>

    </div>
  );
}
