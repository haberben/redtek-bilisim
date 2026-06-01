"use client";

import { useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StoreCarouselProps {
  title?: ReactNode;
  children: ReactNode;
  dark?: boolean;
}

export function StoreCarousel({ title, children, dark = false }: StoreCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of width
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`w-full py-12 md:py-20 ${dark ? 'bg-black text-white' : 'bg-[var(--background)] text-[var(--foreground)]'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-between items-end">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
        )}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors ${dark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
            aria-label="Sola Kaydır"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors ${dark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
            aria-label="Sağa Kaydır"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="relative w-full">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar snap-mandatory snap-x pb-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto gap-4 md:gap-6"
        >
          {children}
          {/* Spacer for the end */}
          <div className="min-w-[4px] md:min-w-[24px] flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
}
