"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/lib/products";
import Image from "next/image";
import { SiteSettings, Category } from "@/lib/settings";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  
  // Product Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(""); // URL based
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState<'ACTIVE' | 'DRAFT' | 'SOLD'>("ACTIVE");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings Form states
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState<string[]>([]);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, setRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/settings')
      ]);
      const prodData = await prodRes.json();
      const setData = await setRes.json();
      
      setProducts(prodData);
      setSettings(setData);
      
      setWhatsappNumber(setData.whatsappNumber || "");
      setCategories(setData.categories || []);
      setFeaturedProducts(setData.featuredProducts || []);
      
      if (!category && setData.categories && setData.categories.length > 0) {
        setCategory(setData.categories[0].name);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle("");
    setImages("");
    setPrice("");
    setDescription("");
    setFeatures("");
    setStatus("ACTIVE");
    if (categories.length > 0) setCategory(categories[0].name);
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category || (categories[0]?.name || "Diğer"));
    setImages(product.images ? product.images.join("\n") : "");
    setPrice(product.price ? product.price.toString() : "");
    setDescription(product.description);
    setFeatures(product.features.join("\n"));
    setStatus(product.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData();
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = "/admin/login";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingFiles(true);
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        console.error("Yükleme hatası", err);
      }
    }
    
    if (uploadedUrls.length > 0) {
      setImages(prev => {
        const current = prev.trim();
        const toAdd = uploadedUrls.join('\n');
        return current ? `${current}\n${toAdd}` : toAdd;
      });
    }
    
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploadingFiles(false);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title,
      category,
      images: images.split('\n').map(img => img.trim()).filter(img => img !== ''),
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
    fetchData();
  };

  const saveSettings = async () => {
    setIsSavingSettings(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        whatsappNumber,
        categories,
        featuredProducts
      })
    });
    setIsSavingSettings(false);
    alert("Ayarlar başarıyla kaydedildi!");
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    const id = newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    setCategories([...categories, { id, name: newCatName }]);
    setNewCatName("");
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const toggleFeatured = (productId: string) => {
    if (featuredProducts.includes(productId)) {
      setFeaturedProducts(featuredProducts.filter(id => id !== productId));
    } else {
      setFeaturedProducts([...featuredProducts, productId]);
    }
  };

  if (loading && products.length === 0) {
    return <div className="p-20 text-center text-xl">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yönetim Paneli</h1>
          <p className="text-[var(--muted-foreground)]">Sitenizi ve ürünlerinizi yönetin.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]'}`}
          >
            Ürünler
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]'}`}
          >
            Site Ayarları
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium ml-4"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section - No longer sticky so it can scroll freely */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">{isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
              
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                
                {/* Media Upload Area */}
                <div className="p-4 border border-[var(--border)] rounded-xl bg-[var(--muted)]/30">
                  <label className="block text-sm font-bold mb-3">Medya (Görsel / Video)</label>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-[var(--border)] border-dashed rounded-lg cursor-pointer bg-[var(--background)] hover:bg-[var(--muted)] transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 text-[var(--muted-foreground)] mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="text-sm text-[var(--muted-foreground)]"><span className="font-semibold">Bilgisayardan Yükle</span></p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          multiple 
                          accept="image/*,video/*"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          disabled={uploadingFiles}
                        />
                      </label>
                    </div>
                    {uploadingFiles && <div className="text-sm text-center font-medium animate-pulse">Dosyalar Yükleniyor...</div>}
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]"></div></div>
                      <div className="relative flex justify-center"><span className="bg-[var(--card)] px-2 text-xs text-[var(--muted-foreground)]">veya URL yapıştır</span></div>
                    </div>
                    
                    <textarea 
                      value={images} 
                      onChange={e => setImages(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] h-24 text-sm"
                      placeholder="https://gorsel1.jpg&#10;https://video.mp4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ürün Başlığı *</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Kategori</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Açıklama</label>
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
              
              {products.length === 0 ? (
                <div className="p-12 text-center text-[var(--muted-foreground)]">Henüz ürün eklenmemiş.</div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {products.map(product => (
                    <div key={product.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-[var(--muted)]/50 transition-colors">
                      <div className="w-24 h-24 bg-[var(--background)] rounded-xl border border-[var(--border)] flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                        {product.images && product.images.length > 0 ? (
                          product.images[0].endsWith('.mp4') || product.images[0].endsWith('.webm') ? (
                            <video src={product.images[0]} className="object-cover w-full h-full" muted playsInline />
                          ) : (
                            <Image src={product.images[0]} alt={product.title} fill className="object-contain p-2" />
                          )
                        ) : (
                          <span className="text-xs text-gray-400">Görsel Yok</span>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg leading-tight">{product.title}</h3>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              product.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              product.status === 'SOLD' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                              {product.status === 'ACTIVE' ? 'Yayında' : product.status === 'SOLD' ? 'Satıldı' : 'Taslak'}
                            </span>
                            <span className="text-xs bg-[var(--muted)] px-2 py-0.5 rounded text-[var(--muted-foreground)]">
                              {product.category}
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
                            <option value="SOLD">Satıldı</option>
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
      ) : (
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Settings Section */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-[var(--border)]">İletişim Ayarları</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">WhatsApp Sipariş Numarası</label>
              <input 
                type="text" 
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="+90 555 555 55 55"
                className="w-full p-3 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <p className="text-sm text-[var(--muted-foreground)] mt-2">Bu numara sitedeki tüm iletişim butonlarına otomatik yansıyacaktır.</p>
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-[var(--border)]">Kategori Yönetimi</h2>
            
            <div className="flex gap-3 mb-6">
              <input 
                type="text" 
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="Yeni Kategori Adı"
                className="flex-1 p-3 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                onKeyDown={e => e.key === 'Enter' && addCategory()}
              />
              <button onClick={addCategory} className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg">
                Ekle
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(c => (
                <div key={c.id} className="flex items-center gap-2 bg-[var(--muted)] border border-[var(--border)] px-4 py-2 rounded-full">
                  <span className="font-medium">{c.name}</span>
                  <button onClick={() => removeCategory(c.id)} className="text-[var(--muted-foreground)] hover:text-red-500">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-[var(--border)]">Öne Çıkan Ürünler</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              Ana sayfada sergilenmesini istediğiniz ürünleri seçin. Seçme sıranız, sitede görünme sırasını belirler.
            </p>

            <div className="space-y-3">
              {products.map(product => {
                const isFeatured = featuredProducts.includes(product.id);
                const orderIndex = featuredProducts.indexOf(product.id);
                return (
                  <label key={product.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${isFeatured ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)] hover:bg-[var(--muted)]'}`}>
                    <input 
                      type="checkbox" 
                      checked={isFeatured}
                      onChange={() => toggleFeatured(product.id)}
                      className="w-5 h-5 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-bold">{product.title}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{product.price} ₺ • {product.category}</p>
                    </div>
                    {isFeatured && (
                      <div className="bg-[var(--accent)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {orderIndex + 1}
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <button 
            onClick={saveSettings}
            disabled={isSavingSettings}
            className="w-full apple-button bg-black dark:bg-white dark:text-black py-4 text-lg mt-8"
          >
            {isSavingSettings ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
          </button>
        </div>
      )}
    </div>
  );
}
