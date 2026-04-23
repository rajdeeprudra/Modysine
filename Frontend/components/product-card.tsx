'use client'

import { useState } from 'react'
import { Product } from '@/lib/context'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useApp } from '@/lib/context'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const { addToCart } = useApp()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="bg-transparent border-0 overflow-hidden h-full flex flex-col group">
      {/* Image */}
      <div className="relative bg-card overflow-hidden aspect-square mb-6">
        <img
          src={product.images[imageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setImageIndex(idx)}
                className={`h-px transition-all ${
                  idx === imageIndex
                    ? 'bg-primary w-6'
                    : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-light tracking-wide text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-secondary mb-4 line-clamp-2 font-light">
          {product.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="text-lg font-light text-primary">
            ₹{product.price}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 border border-border text-xs flex items-center justify-center hover:bg-muted transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 border border-border text-xs flex items-center justify-center hover:bg-muted transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-xs font-light py-3 tracking-wider transition-colors duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}
