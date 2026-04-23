'use client'

import { Header } from '@/components/header'
import { useApp, OrderDetails } from '@/lib/context'
import { useState } from 'react'
import { Trash2, ArrowLeft } from 'lucide-react'

const SHIPPING_CHARGE = 90

export function CheckoutPage() {
  const { cart, setCurrentPage, setOrderDetails, removeFromCart } = useApp()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + SHIPPING_CHARGE

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill in all fields')
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    const orderDetail: OrderDetails = {
      ...formData,
      quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
      product: cart[0].product,
    }

    setOrderDetails(orderDetail)
    setCurrentPage('payment')
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
          Back to shop
        </button>

        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {/* Delivery Form */}
              <div>
                <h2 className="text-lg font-light tracking-wide text-foreground mb-8">Delivery Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-light tracking-widest text-secondary mb-3">FULL NAME</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light tracking-widest text-secondary mb-3">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light tracking-widest text-secondary mb-3">PHONE</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light tracking-widest text-secondary mb-3">ADDRESS</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-light tracking-widest text-secondary mb-3">CITY</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="New Delhi"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-widest text-secondary mb-3">ZIP CODE</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="110001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div>
                <h2 className="text-lg font-light tracking-wide text-foreground mb-8">Order Items</h2>
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-start gap-6 pb-6 border-b border-border">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-light text-foreground mb-2">{item.product.name}</h3>
                        <p className="text-xs text-secondary mb-3">Quantity: {item.quantity}</p>
                        <p className="text-sm text-primary font-light">₹{item.product.price * item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 hover:bg-muted transition-colors text-secondary hover:text-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div>
            <div className="sticky top-24">
              <h2 className="text-lg font-light tracking-wide text-foreground mb-8">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary font-light">Subtotal</span>
                  <span className="text-foreground font-light">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary font-light">Shipping</span>
                  <span className="text-foreground font-light">₹{SHIPPING_CHARGE}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <span className="text-sm text-secondary font-light">Total</span>
                <span className="text-lg text-primary font-light">₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-xs font-light py-4 tracking-widest transition-colors disabled:opacity-50"
              >
                PLACE ORDER
              </button>

              <p className="text-xs text-secondary text-center mt-6 font-light">
                By placing an order you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
