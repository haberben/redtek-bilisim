import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

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
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <a href="/" className="font-bold text-lg md:text-xl tracking-tight flex items-center gap-2 shrink-0 z-50">
                <img src="/logo.png" alt="Redtek Bilişim Logo" className="w-8 h-8 rounded-lg object-cover" />
                <span className="hidden sm:inline">REDTEK BİLİŞİM </span>
                <span className="sm:hidden">REDTEK </span>
              </a>
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                <a href="/urunler?kategori=Mac" className="text-xs font-medium hover:text-[var(--accent)] transition-colors">Mac</a>
                <a href="/urunler?kategori=iPad" className="text-xs font-medium hover:text-[var(--accent)] transition-colors">iPad</a>
                <a href="/urunler?kategori=iPhone" className="text-xs font-medium hover:text-[var(--accent)] transition-colors">iPhone</a>
                <a href="/urunler?kategori=Watch" className="text-xs font-medium hover:text-[var(--accent)] transition-colors">Watch</a>
                <a href="/urunler?kategori=AirPods" className="text-xs font-medium hover:text-[var(--accent)] transition-colors">AirPods</a>
                <a href="/urunler?kategori=Aksesuarlar" className="text-xs font-medium hover:text-[var(--accent)] transition-colors">Aksesuarlar</a>
              </nav>
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <a href="https://wa.me/905012023838" target="_blank" rel="noopener noreferrer" className="apple-button text-sm px-4 py-2">
                  WhatsApp'tan Ulaşın
                </a>
              </div>
              <MobileMenu />
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-[var(--muted)] border-t border-[var(--border)] py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">REDTEK BİLİŞİM </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Sultangazi ve Avrupa Yakası'nın güvenilir teknoloji ve aksesuar mağazası.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Hızlı Bağlantılar</h3>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li><a href="/" className="hover:text-[var(--foreground)]">Ana Sayfa</a></li>
                  <li><a href="/urunler" className="hover:text-[var(--foreground)]">Ürünler</a></li>
                  <li><a href="/admin" className="hover:text-[var(--foreground)]">Yönetici Girişi</a></li>
                </ul>
              </div>
              <div id="iletisim">
                <h3 className="font-bold text-lg mb-4">İletişim</h3>
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
                    <li><a href="/urunler?kategori=Mac" className="hover:underline">Mac</a></li>
                    <li><a href="/urunler?kategori=iPad" className="hover:underline">iPad</a></li>
                    <li><a href="/urunler?kategori=iPhone" className="hover:underline">iPhone</a></li>
                    <li><a href="/urunler?kategori=Watch" className="hover:underline">Watch</a></li>
                    <li><a href="/urunler?kategori=AirPods" className="hover:underline">AirPods</a></li>
                    <li><a href="/urunler?kategori=Aksesuarlar" className="hover:underline">Aksesuarlar</a></li>
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
