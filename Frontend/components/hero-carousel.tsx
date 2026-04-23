'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: '/tshirt-1.jpg',
    title: 'NEW COLLECTION',
    subtitle: 'SPRING 2025',
    cta: 'EXPLORE'
  },
  {
    image: '/tshirt-2.jpg',
    title: 'TIMELESS PIECES',
    subtitle: 'QUALITY MATTERS',
    cta: 'SHOP NOW'
  },
  {
    image: '/tshirt-3.jpg',
    title: 'LUXURY MINIMALISM',
    subtitle: 'CURATED DESIGNS',
    cta: 'DISCOVER'
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-background">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center text-white z-10 px-4">
          <p className="text-xs md:text-sm font-light tracking-[0.2em] mb-3 opacity-70">
            {slides[currentSlide].subtitle}
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wider mb-8 text-balance">
            {slides[currentSlide].title}
          </h1>
          <button
            className="px-8 py-3 bg-primary hover:bg-primary/80 text-primary-foreground text-xs font-light tracking-widest transition-colors duration-300"
          >
            {slides[currentSlide].cta}
          </button>
        </div>
      </div>

      {/* Navigation Arrows - Subtle */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 text-white/40 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 text-white/40 hover:text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots - Minimalist */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-px transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-white/30 w-3 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
