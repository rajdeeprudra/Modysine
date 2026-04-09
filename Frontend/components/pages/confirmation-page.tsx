'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/context'
import { CheckCircle, Mail, Phone, Copy } from 'lucide-react'
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Order Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Date</p>
              <p className="text-foreground font-medium">
                {new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p className="text-foreground font-medium uppercase">
                {paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
              <p className="text-foreground font-medium">{orderDetails?.address}</p>
              <p className="text-sm text-foreground">{orderDetails?.city} - {orderDetails?.zipCode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Expected Delivery</p>
              <p className="text-foreground font-medium">3-5 Business Days</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-foreground font-semibold">₹{item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">₹90</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total Amount</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-secondary border border-border rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Track Your Order</h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve sent order confirmation and tracking details to:
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-card p-4 rounded-lg">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="text-foreground font-medium">{orderDetails?.email}</p>
              </div>
              <button
                onClick={() => copyToClipboard(orderDetails?.email || '', 'email')}
                className="p-2 hover:bg-secondary rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-primary" />
              </button>
              {copied === 'email' && <span className="text-xs text-green-600">Copied!</span>}
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-lg">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <p className="text-foreground font-medium">{orderDetails?.phone}</p>
              </div>
              <button
                onClick={() => copyToClipboard(orderDetails?.phone || '', 'phone')}
                className="p-2 hover:bg-secondary rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-primary" />
              </button>
              {copied === 'phone' && <span className="text-xs text-green-600">Copied!</span>}
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="text-lg font-semibold text-primary">+91 98765 43210</p>
              <p className="text-xs text-muted-foreground mt-1">Available Mon-Sat, 9AM-6PM IST</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-lg font-semibold text-foreground">support@modysine.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Brand Owner</p>
              <p className="text-lg font-semibold text-foreground">Modysine Team</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleBackHome}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 font-semibold"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-secondary border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Your order tracking details have been sent to your email and phone number. Please check your inbox and SMS for updates. If you don&apos;t receive them within 5 minutes, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}
