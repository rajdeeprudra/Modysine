'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const SIZE_CHART = [
  { size: 'XS', chest: '32"', length: '26"' },
  { size: 'S', chest: '34"', length: '27"' },
  { size: 'M', chest: '38"', length: '28"' },
  { size: 'L', chest: '42"', length: '29"' },
  { size: 'XL', chest: '46"', length: '30"' },
  { size: 'XXL', chest: '50"', length: '31"' },
]

export function ProductDetailPage() {
  const { products, selectedProductId, setCurrentPage, addToCart } = useApp()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [showSizeChart, setShowSizeChart] = useState(false)

  const product = products.find(p => p.id === selectedProductId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product, quantity)
    setCurrentPage('checkout')
  }

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-full px-6 md:px-12 py-5 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs tracking-widest text-foreground hover:text-secondary transition-colors font-normal"
          >
            ← BACK
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className="font-serif text-2xl md:text-3xl text-foreground font-bold hover:opacity-70 transition-opacity"
          >
            MODYSINE
          </button>

          <button
            onClick={() => setCurrentPage('checkout')}
            className="text-xs tracking-widest text-foreground hover:text-secondary transition-colors font-normal"
          >
            CART
          </button>
        </div>
      </header>

      {/* Product Detail */}
      <section className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="bg-muted relative">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden relative">
              <img
                src={product.images[imageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 p-4 border-t border-border bg-background">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${
                      idx === imageIndex ? 'border-foreground' : 'border-border hover:border-foreground'
                    }`}
                  >
                    <img src={image} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-8 md:p-12 flex flex-col justify-between border-l border-border">
            {/* Header */}
            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest text-secondary font-normal mb-2">
                  MODYSINE COLLECTION
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground font-light mb-4">
                  {product.name}
                </h1>
                <p className="text-sm text-secondary font-normal leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="border-t border-border pt-6">
                <p className="text-xs tracking-widest text-secondary font-normal mb-2">
                  PRICE
                </p>
                <p className="text-2xl text-foreground font-normal">
                  ₹{product.price}
                </p>
              </div>

              {/* Size Selection */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-widest text-foreground font-normal">
                    SELECT SIZE
                  </p>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-xs text-secondary hover:text-foreground transition-colors font-normal underline"
                  >
                    SIZE GUIDE
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border transition-colors text-xs tracking-widest font-normal ${
                        selectedSize === size
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Chart */}
              {showSizeChart && (
                <div className="bg-muted p-6 space-y-4">
                  <h3 className="text-xs tracking-widest text-foreground font-normal">
                    SIZE CHART
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-2 font-normal tracking-widest">SIZE</th>
                          <th className="text-left py-2 px-2 font-normal tracking-widest">CHEST</th>
                          <th className="text-left py-2 px-2 font-normal tracking-widest">LENGTH</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_CHART.map((row) => (
                          <tr key={row.size} className="border-b border-border/50">
                            <td className="py-2 px-2 text-secondary font-normal">{row.size}</td>
                            <td className="py-2 px-2 text-secondary font-normal">{row.chest}</td>
                            <td className="py-2 px-2 text-secondary font-normal">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-4 space-y-2 text-xs text-secondary font-normal leading-relaxed">
                    <p>• All measurements are in inches</p>
                    <p>• Premium 100% cotton fabric</p>
                    <p>• Machine wash cold, tumble dry low</p>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="border-t border-border pt-6">
                <p className="text-xs tracking-widest text-foreground font-normal mb-3">
                  QUANTITY
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-normal w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4 border-t border-border pt-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-foreground text-background text-xs tracking-widest py-4 font-normal hover:bg-secondary transition-colors"
              >
                ADD TO CART
              </button>
              <button
                className="w-full border border-foreground text-xs tracking-widest py-4 font-normal hover:bg-muted transition-colors"
              >
                SAVE FOR LATER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 md:py-20 px-6 md:px-12 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm tracking-widest text-foreground font-normal mb-3">
                MATERIAL
              </h3>
              <p className="text-sm text-secondary font-normal leading-relaxed">
                Premium 100% organic cotton fabric, soft and breathable. Perfect for everyday comfort without compromising on style.
              </p>
            </div>
            <div>
              <h3 className="text-sm tracking-widest text-foreground font-normal mb-3">
                CARE INSTRUCTIONS
              </h3>
              <ul className="text-sm text-secondary font-normal leading-relaxed space-y-1">
                <li>• Machine wash cold with similar colors</li>
                <li>• Tumble dry low heat</li>
                <li>• Iron on low if needed</li>
                <li>• Do not bleach</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm tracking-widest text-foreground font-normal mb-3">
                SHIPPING & RETURNS
              </h3>
              <p className="text-sm text-secondary font-normal leading-relaxed">
                Free shipping on all orders. Easy returns within 30 days of purchase. No questions asked.
              </p>
            </div>
            <div>
              <h3 className="text-sm tracking-widest text-foreground font-normal mb-3">
                ABOUT THIS ITEM
              </h3>
              <p className="text-sm text-secondary font-normal leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 md:py-20">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-background/20">
            <div>
              <h3 className="font-serif text-lg text-background font-light mb-4">
                MODYSINE
              </h3>
              <p className="text-xs text-background/70 font-normal leading-relaxed">
                Premium quality crafted for the modern individual
              </p>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-background font-normal mb-6">
                SHOP
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-xs text-background/70 hover:text-background transition-colors font-normal">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-background/70 hover:text-background transition-colors font-normal">
                    Collection
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-background font-normal mb-6">
                HELP
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-xs text-background/70 hover:text-background transition-colors font-normal">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-background/70 hover:text-background transition-colors font-normal">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-background font-normal mb-6">
                CONTACT
              </h3>
              <p className="text-xs text-background/70 font-normal">
                support@modysine.com
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-background/50 font-normal">
              © 2025 MODYSINE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
