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
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-[var(--foreground)]"
        aria-label="Menüyü Aç"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Full Screen Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-[var(--background)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-4 h-16 flex items-center justify-between border-b border-[var(--border)]">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="Redtek Bilişim Logo" className="w-8 h-8 rounded-lg object-cover" />
            REDTEK 
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
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-100">
              Ana Sayfa
            </Link>
            <Link href="/urunler" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-200">
              Tüm Ürünler
            </Link>
            <Link href="/urunler/populer" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-300">
              Popüler Ürünler
            </Link>
            <Link href="/urunler/yeni" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-400">
              Yeni Eklenenler
            </Link>
            <Link href="/urunler/ikinci-el" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down delay-500">
              İkinci El Cihazlar
            </Link>
            <Link href="/admin" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors animate-slide-down" style={{ animationDelay: '600ms' }}>
              Yönetici Paneli
            </Link>
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
