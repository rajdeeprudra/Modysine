'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useApp, Product } from '@/lib/context'
import { useState } from 'react'
import { Plus, Trash2, Image as ImageIcon, ArrowLeft } from 'lucide-react'

export function AdminPage() {
  const { products, addProduct, setCurrentPage } = useApp()
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
      alert('Please fill in at least the product name, description, price, and first image URL')
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <Button
            onClick={() => setIsAddingProduct(!isAddingProduct)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-fit mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </div>

        {/* Add Product Form */}
        {isAddingProduct && (
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Add New Product</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Classic Pink T-Shirt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Premium quality pink t-shirt perfect for summer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price (₹) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="599"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-4">Product Images (4-5 URLs) *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index}>
                      <label className="block text-xs text-muted-foreground mb-2">Image {index + 1}</label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Paste image URLs from Unsplash, Pexels, or any image hosting service
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setIsAddingProduct(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add Product
              </Button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">All Products ({products.length})</h2>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg border border-border">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No products added yet</p>
              <Button
                onClick={() => setIsAddingProduct(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Plus className="w-4 h-4" />
                Add First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Product Images Carousel */}
                  <div className="relative aspect-square bg-secondary overflow-hidden group">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                      {product.images.length} Images
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-primary">
                        ₹{product.price}
                      </div>
                      <div className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                        ID: {product.id}
                      </div>
                    </div>

                    {/* Image Preview */}
                    {product.images.length > 1 && (
                      <div className="mb-4 grid grid-cols-4 gap-1">
                        {product.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded bg-secondary overflow-hidden"
                          >
                            <img
                              src={img}
                              alt={`${product.name} ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
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
