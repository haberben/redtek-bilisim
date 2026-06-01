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
              <a href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                <img src="/logo.png" alt="Redtek Bilişim Logo" className="w-8 h-8 rounded-lg object-cover" />
                REDTEK BİLİŞİM 
              </a>
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Ana Sayfa</a>
                <a href="/urunler" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Tüm Ürünler</a>
                <a href="/#iletisim" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">İletişim</a>
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
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li>📍 50. Yıl Mahallesi, C Caddesi, No:46 D:B, Sultangazi/İstanbul</li>
                  <li>📱 +90 501 202 38 38</li>
                  <li>📸 <a href="https://www.instagram.com/redtek.bilisim/" target="_blank" className="hover:text-[var(--foreground)]">@redtek.bilisim</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted-foreground)]">
              &copy; {new Date().getFullYear()} Redtek Bilişim. Tüm hakları saklıdır.
            </div>
          </footer>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
