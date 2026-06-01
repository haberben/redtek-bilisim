"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/products";
import Image from "next/image";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState<'ACTIVE' | 'DRAFT' | 'SOLD'>("ACTIVE");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle("");
    setImageUrl("");
    setPrice("");
    setDescription("");
    setFeatures("");
    setStatus("ACTIVE");
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setTitle(product.title);
    setImageUrl(product.imageUrl || "");
    setPrice(product.price ? product.price.toString() : "");
    setDescription(product.description);
    setFeatures(product.features.join("\n"));
    setStatus(product.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchProducts();
  };

  const generateWithAi = async () => {
    if (!title) {
      alert("Lütfen önce ürün başlığını girin!");
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      
      const data = await res.json();
      if (data.description) setDescription(data.description);
      if (data.features) setFeatures(data.features.join("\n"));
    } catch (error) {
      alert("Yapay zeka ile üretilirken bir hata oluştu.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title,
      imageUrl: imageUrl || null,
      price: price ? parseFloat(price) : null,
      description,
      features: features.split('\n').filter(f => f.trim() !== ''),
      status,
    };

    if (isEditing && editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    }

    resetForm();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Yönetim Paneli</h1>
        <p className="text-[var(--muted-foreground)]">Ürünlerinizi yönetin ve yapay zeka ile hızlıca yeni ilanlar ekleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-6">{isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Görsel URL (İsteğe Bağlı)</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ürün Başlığı *</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="Örn: iPhone 14 128GB Temiz"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="45000"
                />
              </div>

              <div className="pt-2 border-t border-[var(--border)]">
                <button 
                  type="button" 
                  onClick={generateWithAi}
                  disabled={isAiLoading || !title}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <span className="animate-pulse">Yapay Zeka Üretiyor...</span>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                      Yapay Zeka ile Doldur
                    </>
                  )}
                </button>
                <p className="text-xs text-[var(--muted-foreground)] text-center mt-2">
                  Sadece başlık girip bu butona tıklayarak açıklama ve özellikleri otomatik doldurabilirsiniz.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">SEO Uyumlu Açıklama</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Özellikler (Her satıra bir özellik)</label>
                <textarea 
                  value={features} 
                  onChange={e => setFeatures(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Durum</label>
                <select 
                  value={status} 
                  onChange={e => setStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                >
                  <option value="ACTIVE">Aktif (Yayında)</option>
                  <option value="DRAFT">Taslak (Gizli)</option>
                  <option value="SOLD">Satıldı</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 apple-button bg-black dark:bg-white dark:text-black hover:bg-gray-800 rounded-lg py-3">
                  {isEditing ? 'Güncelle' : 'Ürünü Ekle'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]">
                    İptal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--muted)]">
              <h2 className="text-xl font-bold">Mevcut İlanlar</h2>
              <span className="text-sm font-medium bg-[var(--background)] px-3 py-1 rounded-full border border-[var(--border)]">
                Toplam: {products.length}
              </span>
            </div>
            
            {loading ? (
              <div className="p-12 text-center text-[var(--muted-foreground)]">Yükleniyor...</div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center text-[var(--muted-foreground)]">Henüz ürün eklenmemiş.</div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {products.map(product => (
                  <div key={product.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-[var(--muted)]/50 transition-colors">
                    <div className="w-24 h-24 bg-[var(--background)] rounded-xl border border-[var(--border)] flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                      {product.imageUrl ? (
                        <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-2" />
                      ) : (
                        <span className="text-xs text-gray-400">Görsel Yok</span>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg leading-tight">{product.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            product.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            product.status === 'SOLD' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {product.status === 'ACTIVE' ? 'Yayında' : product.status === 'SOLD' ? 'Satıldı' : 'Taslak'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="font-semibold mb-3">{product.price?.toLocaleString('tr-TR')} ₺</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleEdit(product)} className="text-sm px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                          Düzenle
                        </button>
                        <select 
                          value={product.status}
                          onChange={(e) => handleStatusChange(product.id, e.target.value)}
                          className="text-sm px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none"
                        >
                          <option value="ACTIVE">Yayına Al</option>
                          <option value="DRAFT">Taslağa Çek</option>
                          <option value="SOLD">Satıldı İşaretle</option>
                        </select>
                        <button onClick={() => handleDelete(product.id)} className="text-sm px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors ml-auto">
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
