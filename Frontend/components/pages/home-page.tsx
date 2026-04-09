'use client'

import { Header } from '@/components/header'
import { HeroCarousel } from '@/components/hero-carousel'
import { ProductCard } from '@/components/product-card'
import { useApp } from '@/lib/context'
import { AlertCircle } from 'lucide-react'

export function HomePage() {
  const { products } = useApp()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroCarousel />

      {/* Benefits Section */}
      <section className="bg-secondary py-12 md:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10%</div>
              <p className="text-sm font-medium text-foreground">Cashback on All Orders</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">30</div>
              <p className="text-sm font-medium text-foreground">Days Easy Returns & Exchanges</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">FREE</div>
              <p className="text-sm font-medium text-foreground">Fast Shipping on Orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            Latest Drops
          </h2>
          <p className="text-muted-foreground">
            Discover our newest collection of premium t-shirts
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No products available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">MODYSINE</h3>
              <p className="text-sm opacity-70">Premium quality t-shirts for modern lifestyle</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="text-sm space-y-2 opacity-70">
                <li><a href="#" className="hover:text-primary transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <p className="text-sm opacity-70">support@modysine.com</p>
              <p className="text-sm opacity-70">+91 98765 43210</p>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-50">
            <p>&copy; 2025 Modysine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
