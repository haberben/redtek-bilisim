"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, title, status }: { images: string[], title: string, status: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="animate-fade-in relative rounded-3xl overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f] aspect-square flex items-center justify-center p-8">
        <div className="text-gray-400">Görsel Yok</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="animate-fade-in relative rounded-3xl overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f] aspect-square flex items-center justify-center p-8">
        {status === 'SOLD' && (
          <div className="absolute top-6 right-6 z-10 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">
            Satıldı
          </div>
        )}
        <Image 
          src={images[currentIndex]} 
          alt={`${title} - Görsel ${currentIndex + 1}`} 
          fill 
          className={`object-contain p-8 ${status === 'SOLD' ? 'opacity-50' : ''}`} 
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 px-2 snap-x">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f] border-2 transition-all snap-center ${
                currentIndex === i ? 'border-[var(--accent)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${i + 1}`} 
                fill 
                className="object-contain p-2" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
