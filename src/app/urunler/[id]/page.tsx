import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Pre-fill WhatsApp message
  const siteUrl = "https://redtekbilisim.com"; // Replace with actual domain later
  const message = `Merhaba, sitenizdeki "${product.title}" (${siteUrl}/urunler/${product.id}) ürünü hakkında bilgi almak istiyorum.`;
  const whatsappUrl = `https://wa.me/905012023838?text=${encodeURIComponent(message)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-8">
        <Link href="/urunler" className="text-[var(--accent)] hover:underline flex items-center gap-2 font-medium">
          &lt; Tüm Ürünlere Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="animate-fade-in relative rounded-3xl overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f] aspect-square flex items-center justify-center p-8">
          {product.status === 'SOLD' && (
            <div className="absolute top-6 right-6 z-10 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">
              Satıldı
            </div>
          )}
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.title} 
              fill 
              className={`object-contain p-8 ${product.status === 'SOLD' ? 'opacity-50' : ''}`} 
              priority
            />
          ) : (
            <div className="text-gray-400">Görsel Yok</div>
          )}
        </div>

        {/* Product Info */}
        <div className="animate-fade-in delay-100 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.title}</h1>
          
          <div className="text-2xl font-semibold mb-8">
            {product.price?.toLocaleString('tr-TR')} ₺
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">Ürün Hakkında</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">Özellikler</h3>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--muted-foreground)]">
                    <span className="text-[var(--foreground)] font-bold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-[var(--border)]">
            {product.status === 'SOLD' ? (
              <div className="w-full bg-[var(--muted)] text-[var(--muted-foreground)] text-center font-bold rounded-full py-4 px-8 cursor-not-allowed">
                Bu Ürün Satılmıştır
              </div>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full apple-button text-lg py-4 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                WhatsApp'tan Bilgi Al / Sipariş Ver
              </a>
            )}
            <p className="text-center text-sm text-[var(--muted-foreground)] mt-4">
              Sipariş işlemleri WhatsApp üzerinden güvenle gerçekleştirilmektedir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
