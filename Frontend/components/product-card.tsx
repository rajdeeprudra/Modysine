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
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors h-full flex flex-col">
      {/* Image Carousel */}
      <div className="relative bg-secondary overflow-hidden aspect-square">
        <img
          src={product.images[imageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex gap-2 justify-center px-3">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === imageIndex
                    ? 'bg-primary w-6'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto space-y-3">
          <div className="text-lg font-bold text-primary">
            ₹{product.price}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 border border-border rounded hover:bg-secondary transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 border border-border rounded hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
