import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { getSettings } from "@/lib/settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redtek Bilişim | Avrupa Yakası İkinci El ve Sıfır Telefon",
  description: "Sultangazi ve Avrupa Yakası'nın güvenilir teknoloji mağazası. İkinci el ve sıfır Apple iPhone, Samsung ve aksesuarlarında en uygun fiyatlar.",
  keywords: ["Redtek Bilişim", "Sultangazi telefoncu", "Avrupa yakası ikinci el telefon", "Sultangazi iPhone tamir ve satış", "telefon aksesuarları"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();
  const rawNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <a href="/" className="font-bold text-lg md:text-xl tracking-tight flex items-center gap-2 shrink-0 z-50">
                <img src="/logo.png" alt="Redtek Bilişim Logo" className="w-8 h-8 rounded-lg object-cover" />
                <div className="flex items-center gap-1.5">
                  <span className="hidden sm:inline">REDTEK BİLİŞİM</span>
                  <span className="sm:hidden">REDTEK</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 md:w-5 md:h-5 fill-current" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                </div>
              </a>
              <nav className="hidden lg:flex space-x-6 xl:space-x-8">
                {settings.categories.map(cat => (
                  <a key={cat.id} href={`/urunler?kategori=${encodeURIComponent(cat.name)}`} className="text-xs font-medium hover:text-[var(--accent)] transition-colors">
                    {cat.name}
                  </a>
                ))}
              </nav>
              <div className="hidden lg:flex items-center space-x-4">
                <ThemeToggle />
                <a href={`https://wa.me/${rawNumber}`} target="_blank" rel="noopener noreferrer" className="apple-button text-sm px-4 py-2">
                  WhatsApp'tan Ulaşın
                </a>
              </div>
              <MobileMenu categories={settings.categories} whatsappNumber={rawNumber} />
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-[#f5f5f7] dark:bg-[#111111] border-t border-gray-300 dark:border-gray-800 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Fine Print */}
              <div className="border-b border-gray-300 dark:border-gray-800 pb-4 mb-4">
                <p className="mb-2">* Fiyatlara KDV dahildir. Taksit imkanları kredi kartınızın bankasına göre değişiklik gösterebilir. Kurumsal satışlarda farklı fiyatlandırmalar uygulanabilir.</p>
                <p className="mb-2">1. Takas desteği, getirdiğiniz cihazın kondisyonuna, modeline ve yılına göre değişiklik gösterir. Redtek Bilişim, cihazı kabul etmeme veya değerleme fiyatını değiştirme hakkını saklı tutar.</p>
                <p className="mb-2">2. İstanbul içi aynı gün teslimat hizmeti, stok durumuna ve siparişin verildiği saate bağlıdır. Teslimat ücreti mesafe bazlı hesaplanabilir.</p>
                <p>Apple Intelligence, yakında uyumlu cihazlara beta olarak sunulacaktır. Özellikler ve desteklenen diller bölgeye göre farklılık gösterebilir.</p>
              </div>

              {/* Footer Links Columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Alışveriş ve İnceleme</h3>
                  <ul className="space-y-2">
                    {settings.categories.map(cat => (
                      <li key={cat.id}><a href={`/urunler?kategori=${encodeURIComponent(cat.name)}`} className="hover:underline">{cat.name}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Hesap</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Redtek Bilişim Hesabınızı Yönetin</a></li>
                    <li><a href="#" className="hover:underline">iCloud.com</a></li>
                  </ul>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">Redtek Bilişim Değerleri</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Erişilebilirlik</a></li>
                    <li><a href="#" className="hover:underline">Çevre</a></li>
                    <li><a href="#" className="hover:underline">Gizlilik</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Redtek Store</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Mağaza Bulun</a></li>
                    <li><a href="#" className="hover:underline">Randevu Alın</a></li>
                    <li><a href="#" className="hover:underline">Takas Desteği</a></li>
                    <li><a href="#" className="hover:underline">Finansman Seçenekleri</a></li>
                    <li><a href="#" className="hover:underline">Sipariş Durumu</a></li>
                    <li><a href="#" className="hover:underline">Alışveriş Yardımı</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Kurumsal</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Kurumsal Satış</a></li>
                    <li><a href="#" className="hover:underline">İşletmeler İçin Çözümler</a></li>
                  </ul>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">Eğitim</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Eğitim İçin Satın Alın</a></li>
                    <li><a href="#" className="hover:underline">Öğrenci İndirimleri</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Redtek Bilişim Hakkında</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Kariyer Fırsatları</a></li>
                    <li><a href="#" className="hover:underline">Yatırımcılar</a></li>
                    <li><a href="#" className="hover:underline">Etik ve Uyumluluk</a></li>
                    <li><a href="#" className="hover:underline">İletişim</a></li>
                  </ul>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-gray-300 dark:border-gray-800 pt-4 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <p>Telif Hakkı &copy; {new Date().getFullYear()} Redtek Bilişim Inc. Tüm hakları saklıdır.</p>
                  <div className="flex gap-4">
                    <a href="#" className="hover:underline">Gizlilik Politikası</a>
                    <span className="hidden md:inline">|</span>
                    <a href="#" className="hover:underline">Kullanım Şartları</a>
                    <span className="hidden md:inline">|</span>
                    <a href="#" className="hover:underline">Satış ve Para İadesi</a>
                    <span className="hidden md:inline">|</span>
                    <a href="#" className="hover:underline">Site Haritası</a>
                  </div>
                </div>
                <div>
                  <a href="#" className="hover:underline">Türkiye</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
