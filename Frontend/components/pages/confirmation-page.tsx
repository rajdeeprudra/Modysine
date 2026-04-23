'use client'

import { Header } from '@/components/header'
import { useApp } from '@/lib/context'
import { CheckCircle, Copy } from 'lucide-react'
import { useState } from 'react'

export function ConfirmationPage() {
  const { setCurrentPage, orderDetails, paymentMethod, clearCart, cart } = useApp()
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + 90

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleBackHome = () => {
    clearCart()
    setCurrentPage('home')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-8">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4">
            Order Placed Successfully
          </h1>
          <p className="text-sm text-secondary font-light leading-relaxed max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly. Check your email and phone for order tracking details.
          </p>
        </div>

        {/* Order Details */}
        <div className="border-b border-border mb-12 pb-12">
          <h2 className="text-sm font-light tracking-widest text-secondary mb-8">ORDER INFORMATION</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-light tracking-widest text-secondary mb-2">ORDER DATE</p>
              <p className="text-sm text-foreground font-light">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs font-light tracking-widest text-secondary mb-2">PAYMENT METHOD</p>
              <p className="text-sm text-foreground font-light uppercase">{paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</p>
            </div>
            <div>
              <p className="text-xs font-light tracking-widest text-secondary mb-2">ESTIMATED DELIVERY</p>
              <p className="text-sm text-foreground font-light">3-5 Business Days</p>
            </div>
            <div>
              <p className="text-xs font-light tracking-widest text-secondary mb-2">ORDER TOTAL</p>
              <p className="text-sm text-primary font-light">₹{total}</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        {orderDetails && (
          <div className="border-b border-border mb-12 pb-12">
            <h2 className="text-sm font-light tracking-widest text-secondary mb-8">DELIVERY ADDRESS</h2>
            <div className="space-y-2">
              <p className="text-sm text-foreground font-light">{orderDetails.fullName}</p>
              <p className="text-sm text-foreground font-light">{orderDetails.address}</p>
              <p className="text-sm text-foreground font-light">{orderDetails.city} {orderDetails.zipCode}</p>
              <p className="text-sm text-secondary font-light mt-4">{orderDetails.phone}</p>
            </div>
          </div>
        )}

        {/* Items Ordered */}
        <div className="border-b border-border mb-12 pb-12">
          <h2 className="text-sm font-light tracking-widest text-secondary mb-8">ITEMS ORDERED</h2>
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-start gap-6">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-light text-foreground mb-2">{item.product.name}</h3>
                  <p className="text-xs text-secondary mb-2">Qty: {item.quantity}</p>
                  <p className="text-sm text-primary font-light">₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-12">
          <h2 className="text-sm font-light tracking-widest text-secondary mb-8">NEED HELP?</h2>
          <p className="text-sm text-foreground font-light mb-6">Contact our support team for any inquiries:</p>
          
          <div className="space-y-3">
            <button
              onClick={() => copyToClipboard('support@modysine.com', 'email')}
              className="flex items-center gap-3 p-4 border border-border hover:border-primary hover:bg-muted transition-all group"
            >
              <div className="text-primary">📧</div>
              <div className="text-left flex-1">
                <p className="text-xs font-light tracking-widest text-secondary mb-1">EMAIL</p>
                <p className="text-sm text-foreground font-light">support@modysine.com</p>
              </div>
              <Copy className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              {copied === 'email' && <span className="text-xs text-primary font-light">Copied!</span>}
            </button>

            <button
              onClick={() => copyToClipboard('+91 98765 43210', 'phone')}
              className="flex items-center gap-3 p-4 border border-border hover:border-primary hover:bg-muted transition-all group"
            >
              <div className="text-primary">📱</div>
              <div className="text-left flex-1">
                <p className="text-xs font-light tracking-widest text-secondary mb-1">PHONE</p>
                <p className="text-sm text-foreground font-light">+91 98765 43210</p>
              </div>
              <Copy className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              {copied === 'phone' && <span className="text-xs text-primary font-light">Copied!</span>}
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBackHome}
          className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-xs font-light py-4 tracking-widest transition-colors"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  )
}
