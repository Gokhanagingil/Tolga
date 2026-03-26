'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { PropertyImage } from '@/types';
import { ChevronLeft, ChevronRight, X, Maximize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageGalleryProps {
  images: PropertyImage[];
  has360Tour?: boolean;
}

export default function ImageGallery({ images, has360Tour = false }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [show360, setShow360] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const tourRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreen) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') setFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreen, prevImage, nextImage]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!show360) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !show360) return;
    const delta = e.clientX - dragStartX;
    setRotation((prev) => prev + delta * 0.5);
    setDragStartX(e.clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
          {show360 ? (
            <div
              ref={tourRef}
              className="gallery-360 w-full h-full relative"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <img
                src={images[currentIndex]?.url}
                alt="360° Tour"
                className="w-full h-full object-cover transition-transform"
                style={{
                  transform: `scale(${zoom}) rotateY(${rotation}deg)`,
                  transformOrigin: 'center center',
                }}
                draggable={false}
              />
              <div className="tour-overlay absolute inset-0 pointer-events-none" />
              <div className="absolute top-4 left-4 badge bg-istanbul-gold text-white px-4 py-2">
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
                360° Sanal Tur - Sürükleyerek Döndürün
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                  className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                  className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <img
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.alt}
              className="w-full h-full object-cover"
            />
          )}

          {!show360 && images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute top-3 right-3 flex gap-2">
            {has360Tour && (
              <button
                onClick={() => { setShow360(!show360); setRotation(0); setZoom(1); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  show360 ? 'bg-istanbul-gold text-white' : 'bg-white/80 backdrop-blur text-gray-700 hover:bg-white'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                {show360 ? 'Galeri' : '360° Tur'}
              </button>
            )}
            <button
              onClick={() => setFullscreen(true)}
              className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setShow360(false); }}
              className={`aspect-[4/3] rounded-xl overflow-hidden transition-all ${
                i === currentIndex ? 'ring-2 ring-istanbul-navy ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <img
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-6 right-6 text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
