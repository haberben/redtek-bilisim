import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link href={`/urunler/${product.id}`} className={`apple-card group block animate-fade-in delay-${(index % 5 + 1) * 100} rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500`}>
      <div className="relative h-[300px] sm:h-[400px] w-full bg-[#f5f5f7] dark:bg-[#111111] p-8 sm:p-10 flex items-center justify-center">
        {product.status === 'SOLD' && (
          <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Satıldı
          </div>
        )}
        {product.condition === 'USED' && product.status !== 'SOLD' && (
          <div className="absolute top-4 right-4 z-10 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            İkinci El
          </div>
        )}
        {product.images && product.images.length > 0 ? (
          <Image 
            src={product.images[0]} 
            alt={product.title} 
            fill 
            className={`object-contain p-8 sm:p-10 transition-transform duration-700 ease-out ${product.status !== 'SOLD' ? 'group-hover:scale-110' : 'opacity-50'}`} 
          />
        ) : (
          <div className="text-gray-400">Görsel Yok</div>
        )}
      </div>
      <div className="p-6 sm:p-8 bg-[var(--card)]">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-tight line-clamp-1">{product.title}</h3>
        <p className="text-[var(--muted-foreground)] text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--border)]">
          <span className="font-semibold text-lg sm:text-xl">{product.price?.toLocaleString('tr-TR')} ₺</span>
          <span className="text-[var(--accent)] text-sm sm:text-base font-semibold group-hover:bg-[var(--accent)] group-hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all">İncele</span>
        </div>
      </div>
    </Link>
  );
}
