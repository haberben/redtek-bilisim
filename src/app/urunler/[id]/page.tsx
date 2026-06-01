import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";

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
      <div className="mb-12">
        <Link href="/urunler" className="text-[var(--accent)] hover:underline flex items-center gap-2 font-medium">
          &lt; Tüm Ürünlere Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Gallery */}
        <ProductGallery images={product.images || []} title={product.title} status={product.status} />

        {/* Product Info */}
        <div className="animate-fade-in delay-100 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">{product.title}</h1>
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] mb-10 leading-relaxed font-medium">
            {product.description}
          </p>
          
          <div className="text-3xl md:text-4xl font-bold mb-10 pb-10 border-b border-[var(--border)]">
            {product.price?.toLocaleString('tr-TR')} ₺
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6 tracking-tight uppercase text-[var(--muted-foreground)]">Öne Çıkan Özellikler</h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-lg">
                    <span className="text-[var(--accent)] mr-4 font-bold">•</span>
                    <span className="font-medium text-[var(--foreground)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-8">
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
