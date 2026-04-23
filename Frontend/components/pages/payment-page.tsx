'use client'

import { Header } from '@/components/header'
import { useApp } from '@/lib/context'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Banknote } from 'lucide-react'

export function PaymentPage() {
  const { setCurrentPage, setPaymentMethod, cart } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + 90

  const handleUPIPayment = async () => {
    setIsProcessing(true)
    setPaymentMethod('upi')
    
    setTimeout(() => {
      alert('Redirecting to Pazorpay UPI Payment Gateway...\n\nIn a real app, this would redirect to Pazorpay.')
      setIsProcessing(false)
      setCurrentPage('confirmation')
    }, 1500)
  }

  const handleCODPayment = () => {
    setPaymentMethod('cod')
    setCurrentPage('confirmation')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <button
          onClick={() => setCurrentPage('checkout')}
          className="flex items-center gap-2 text-secondary hover:text-foreground mb-12 transition-colors text-xs font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to checkout
        </button>

        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12">PAYMENT METHOD</h1>

        {/* Order Summary */}
        <div className="border-b border-border mb-12 pb-8">
          <h2 className="text-sm font-light tracking-widest text-secondary mb-6">ORDER TOTAL</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-light">Subtotal</span>
              <span className="text-foreground font-light">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary font-light">Shipping</span>
              <span className="text-foreground font-light">₹90</span>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-foreground font-light">Total</span>
            <span className="text-primary font-light">₹{total}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-6">
          <h2 className="text-sm font-light tracking-widest text-secondary mb-8">SELECT PAYMENT METHOD</h2>

          {/* UPI Payment */}
          <button
            onClick={handleUPIPayment}
            disabled={isProcessing}
            className="w-full border border-border hover:border-primary bg-card hover:bg-muted transition-all p-8 group disabled:opacity-50"
          >
            <div className="flex items-start gap-4">
              <Smartphone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="text-left flex-1">
                <h3 className="text-sm font-light text-foreground mb-2">Pay via UPI</h3>
                <p className="text-xs text-secondary font-light leading-relaxed">
                  Secure payment via UPI through Pazorpay gateway. Quick and easy payment using your phone.
                </p>
              </div>
              {isProcessing && (
                <div className="animate-spin">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          </button>

          {/* Cash on Delivery */}
          <button
            onClick={handleCODPayment}
            className="w-full border border-border hover:border-primary bg-card hover:bg-muted transition-all p-8 group"
          >
            <div className="flex items-start gap-4">
              <Banknote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="text-left flex-1">
                <h3 className="text-sm font-light text-foreground mb-2">Cash on Delivery</h3>
                <p className="text-xs text-secondary font-light leading-relaxed">
                  Pay when your order arrives. No advance payment required. Available for selected areas.
                </p>
              </div>
            </div>
          </button>
        </div>

        <p className="text-xs text-secondary text-center mt-12 font-light">
          All payments are secure and encrypted
        </p>
      </div>
    </div>
  )
}
