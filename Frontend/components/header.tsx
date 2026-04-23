'use client'

import { useApp } from '@/lib/context'
import { ShoppingCart, Home } from 'lucide-react'

export function Header() {
  const { setCurrentPage, cart, currentPage } = useApp()
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-full px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Left - Navigation */}
        {currentPage === 'home' && (
          <nav className="hidden md:flex items-center gap-8">
            <button className="text-xs tracking-wide text-foreground hover:text-secondary transition-colors font-normal">
              COLLECTION
            </button>
            <button className="text-xs tracking-wide text-foreground hover:text-secondary transition-colors font-normal">
              NEW ARRIVALS
            </button>
          </nav>
        )}
        {currentPage !== 'home' && (
          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs tracking-wide text-foreground hover:text-secondary transition-colors"
          >
            ← BACK
          </button>
        )}

        {/* Center - Logo */}
        <button
          onClick={() => setCurrentPage('home')}
          className="font-serif text-2xl md:text-3xl text-foreground font-bold hover:opacity-70 transition-opacity"
        >
          MODYSINE
        </button>

        {/* Right - Actions */}
        <div className="flex items-center gap-6 md:gap-8">
          {currentPage === 'home' && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="hidden md:block text-xs tracking-wide text-foreground hover:text-secondary transition-colors font-normal"
            >
              ADMIN
            </button>
          )}
          <button
            onClick={() => setCurrentPage('checkout')}
            className="relative text-foreground hover:text-secondary transition-colors"
          >
            <ShoppingCart size={20} />
            {cartTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
