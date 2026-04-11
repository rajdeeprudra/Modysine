'use client'

import { useApp } from '@/lib/context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Home, LogOut } from 'lucide-react'

export function Header() {
  const { setCurrentPage, cart, currentPage } = useApp()
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
  <button
    onClick={() => setCurrentPage('home')}
    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
  >
    <img 
      src="/modysine.png" 
      alt="Modysine Logo" 
      className="h-20 w-auto"
    />
  </button>
          {currentPage === 'home' && (
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                NEW DROPS
              </button>
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                MEN
              </button>
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                WOMEN
              </button>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {currentPage !== 'home' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage('home')}
              className="hover:bg-secondary"
            >
              <Home className="w-5 h-5" />
            </Button>
          )}
          {currentPage === 'home' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage('admin')}
              className="hover:bg-secondary text-xs hidden md:flex"
            >
              Admin
            </Button>
          )}
          {currentPage === 'home' && (
            <Button
              onClick={() => setCurrentPage('checkout')}
              className="relative bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartTotal}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
