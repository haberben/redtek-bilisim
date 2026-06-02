"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-[var(--foreground)]"
        aria-label="Menüyü Aç"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Full Screen Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-[var(--background)] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 h-16 flex items-center justify-between border-b border-[var(--border)]">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="Redtek Bilişim Logo" className="w-8 h-8 rounded-lg object-cover" />
            <div className="flex items-center gap-1.5">
              <span>REDTEK</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            </div>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-[var(--foreground)]"
            aria-label="Menüyü Kapat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 px-6 py-8 flex flex-col gap-6 overflow-y-auto">
          <nav className="flex flex-col gap-6 text-2xl font-bold tracking-tight">
            <Link href="/urunler?kategori=Mac" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-100">Mac</Link>
            <Link href="/urunler?kategori=iPad" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-200">iPad</Link>
            <Link href="/urunler?kategori=iPhone" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-300">iPhone</Link>
            <Link href="/urunler?kategori=Watch" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-400">Watch</Link>
            <Link href="/urunler?kategori=AirPods" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-500">AirPods</Link>
            <Link href="/urunler?kategori=Dyson" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down" style={{ animationDelay: '550ms' }}>Dyson</Link>
            <Link href="/urunler?kategori=Aksesuarlar" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down" style={{ animationDelay: '600ms' }}>Aksesuarlar</Link>
          </nav>

          <div className="mt-auto pt-8 border-t border-[var(--border)] animate-slide-down" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-medium text-[var(--muted-foreground)]">Tema Değiştir</span>
              <ThemeToggle />
            </div>
            <a 
              href="https://wa.me/905012023838" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="apple-button w-full text-center text-lg py-4"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp'tan Ulaşın
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
