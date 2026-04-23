'use client'

import { Header } from '@/components/header'
import { useApp, Product } from '@/lib/context'
import { useState } from 'react'
import { Plus, Trash2, ArrowLeft } from 'lucide-react'

export function AdminPage() {
  const { products, addProduct, removeProduct, setCurrentPage } = useApp()
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrls: ['', '', '', '']
  })

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.imageUrls]
    newUrls[index] = value
    setFormData(prev => ({ ...prev, imageUrls: newUrls }))
  }

  const handleAddProduct = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.imageUrls[0]) {
      alert('Please fill in product name, description, price, and at least one image URL')
      return
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      images: formData.imageUrls.filter(url => url.trim() !== '')
    }

    addProduct(newProduct)
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrls: ['', '', '', '']
    })
    setIsAddingProduct(false)
    alert('Product added successfully!')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-secondary hover:text-foreground mb-12 transition-colors text-xs font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to store
        </button>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground">ADMIN DASHBOARD</h1>
          <button
            onClick={() => setIsAddingProduct(!isAddingProduct)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-3 text-xs font-light tracking-widest transition-colors"
          >
            <Plus className="w-4 h-4" />
            ADD PRODUCT
          </button>
        </div>

        {/* Add Product Form */}
        {isAddingProduct && (
          <div className="border border-border bg-card mb-12 p-8">
            <h2 className="text-sm font-light tracking-widest text-secondary mb-8">NEW PRODUCT</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-light tracking-widest text-secondary mb-3">PRODUCT NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Premium T-Shirt"
                />
              </div>

              <div>
                <label className="block text-xs font-light tracking-widest text-secondary mb-3">DESCRIPTION</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="High quality cotton t-shirt"
                />
              </div>

              <div>
                <label className="block text-xs font-light tracking-widest text-secondary mb-3">PRICE</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="799"
                />
              </div>

              <div>
                <label className="block text-xs font-light tracking-widest text-secondary mb-6">PRODUCT IMAGES (4-5)</label>
                <div className="space-y-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder={`Image URL ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground text-xs font-light py-3 tracking-widest transition-colors"
                >
                  ADD PRODUCT
                </button>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="flex-1 border border-border hover:bg-muted text-foreground text-xs font-light py-3 tracking-widest transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div>
          <h2 className="text-sm font-light tracking-widest text-secondary mb-8">PRODUCTS ({products.length})</h2>

          {products.length === 0 ? (
            <div className="text-center py-16 border border-border">
              <p className="text-sm text-secondary font-light">No products yet. Add your first product to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="border border-border bg-card overflow-hidden group">
                  <div className="relative bg-muted aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => {
                          removeProduct(product.id)
                          alert('Product deleted')
                        }}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-sm font-light text-foreground mb-2">{product.name}</h3>
                    <p className="text-xs text-secondary mb-4 font-light line-clamp-2">{product.description}</p>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-secondary font-light mb-1">PRICE</p>
                        <p className="text-lg text-primary font-light">₹{product.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary font-light mb-1">IMAGES</p>
                        <p className="text-sm text-foreground font-light">{product.images.length}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-border">
                      {product.images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="flex-1 aspect-square bg-muted overflow-hidden">
                          <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover text-xs" />
                        </div>
                      ))}
                      {product.images.length > 3 && (
                        <div className="flex-1 aspect-square bg-muted flex items-center justify-center text-xs text-secondary font-light">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
