'use client'

import { useApp } from '@/lib/context'

export function HomePage() {
  const { products, setCurrentPage, setSelectedProductId } = useApp()

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId)
    setCurrentPage('product-detail')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-full px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Left - Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <button className="text-xs tracking-widest text-foreground hover:text-secondary transition-colors font-normal">
              COLLECTION
            </button>
            <button className="text-xs tracking-widest text-foreground hover:text-secondary transition-colors font-normal">
              NEW ARRIVALS
            </button>
          </nav>

          {/* Center - Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="font-serif text-2xl md:text-3xl text-foreground font-bold hover:opacity-70 transition-opacity"
          >
            MODYSINE
          </button>

          {/* Right - Actions */}
          <div className="flex items-center gap-8 md:gap-12">
            <button
              onClick={() => setCurrentPage('admin')}
              className="hidden md:block text-xs tracking-widest text-foreground hover:text-secondary transition-colors font-normal"
            >
              ACCOUNT
            </button>
            <button
              onClick={() => setCurrentPage('checkout')}
              className="text-xs tracking-widest text-foreground hover:text-secondary transition-colors font-normal"
            >
              CART
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width */}
      <section className="relative w-full h-[600px] md:h-[800px] bg-muted overflow-hidden">
        <img
          src={'/hero.jpeg'}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with Content */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <p className="text-xs tracking-[0.3em] text-white font-normal">
              THE MODYSINE WORLD
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-tight max-w-3xl">
              Elevate Your Everyday
            </h1>
            <button
              onClick={() => handleProductClick(products[0]?.id)}
              className="inline-block text-xs tracking-widest text-white border-b-2 border-white hover:border-transparent hover:text-secondary transition-all duration-300 pb-2 font-normal"
            >
              EXPLORE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* Featured Product - Two Column */}
      <section className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[500px] md:min-h-[600px]">
          {/* Large Image - Left 2 cols */}
          <div
            className="col-span-1 md:col-span-2 bg-muted overflow-hidden cursor-pointer group"
            onClick={() => handleProductClick(products[0]?.id)}
          >
            <img

              src='/featured.jpg'
              //{products[0]?.images[0]}
              alt={products[0]?.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content - Right */}
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center space-y-8 border-l border-border">
            <div>
              <p className="text-xs tracking-widest text-secondary font-normal mb-4">
                FEATURED ITEM
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground font-light mb-4">
                {products[0]?.name}
              </h2>
              <p className="text-sm text-secondary font-normal leading-relaxed">
                {products[0]?.description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs tracking-widest text-secondary font-normal">
                PRICE
              </p>
              <p className="text-xl text-foreground font-normal">
                ₹{products[0]?.price}
              </p>
            </div>

            <button
              onClick={() => handleProductClick(products[0]?.id)}
              className="text-xs tracking-widest text-foreground hover:text-secondary transition-colors border-b border-foreground hover:border-secondary pb-3 font-normal"
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      </section>

      {/* The Collection */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <h2 className="font-serif text-5xl md:text-6xl text-foreground font-light mb-16">
          THE COLLECTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-r border-border">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="border-r border-b border-border group cursor-pointer last:border-r-0"
            >
              {/* Image */}
              <div className="bg-muted aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="p-8 bg-background">
                <p className="text-xs tracking-widest text-secondary font-normal mb-3">
                  T-SHIRT
                </p>
                <h3 className="font-serif text-lg text-foreground font-light mb-3">
                  {product.name}
                </h3>
                <p className="text-xs text-secondary font-normal mb-6 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg text-foreground font-normal">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
          {/* Image - Right on desktop */}
          <div className="bg-muted overflow-hidden order-2 md:order-2 md:border-l border-border">
            <img
              src={products[1]?.images[0] || '/tshirt-2.jpg'}
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content - Left on desktop */}
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center space-y-8 order-1 md:order-1">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light">
              ABOUT US
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-secondary font-normal leading-relaxed">
                Fashion is the armor to survive the reality of everyday life. At Modysine, we craft timeless pieces that transcend seasons and trends.
              </p>
              <p className="text-sm text-secondary font-normal leading-relaxed">
                Every garment is thoughtfully designed with premium materials and meticulous attention to detail. We create more than just t-shirts—we create a lifestyle for the modern individual who values quality and authenticity.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('admin')}
              className="w-full md:w-auto text-xs tracking-widest text-white bg-foreground hover:bg-secondary transition-colors py-4 px-8 font-normal"
            >
              MANAGE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-full">
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
                <li>
                  <a href="#" className="text-xs text-background/70 hover:text-background transition-colors font-normal">
                    Sale
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
                <li>
                  <a href="#" className="text-xs text-background/70 hover:text-background transition-colors font-normal">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-background font-normal mb-6">
                CONTACT
              </h3>
              <p className="text-xs text-background/70 font-normal mb-2">
                support@modysine.com
              </p>
              <p className="text-xs text-background/70 font-normal">
                +91 98765 43210
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
