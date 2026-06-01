import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function UsedProductsPage() {
  const allProducts = getProducts();
  
  // Filter by condition === 'USED'
  const products = allProducts
    .filter(p => p.status !== 'DRAFT' && p.condition === 'USED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16 animate-slide-down px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">İkinci El Ürünler</h1>
        <p className="text-xl text-[var(--muted-foreground)] font-medium max-w-2xl mx-auto">
          Redtek Bilişim garantisiyle kontrol edilmiş, sorunsuz ve uygun fiyatlı ikinci el cihazlar.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted-foreground)]">
          <p className="text-xl">Şu anda listelenen ikinci el ürün bulunmuyor.</p>
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
