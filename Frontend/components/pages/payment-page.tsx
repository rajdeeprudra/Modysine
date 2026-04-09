'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/context'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Banknote } from 'lucide-react'

export function PaymentPage() {
  const { setCurrentPage, setPaymentMethod, paymentMethod, cart } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + 90

  const handleUPIPayment = async () => {
    setIsProcessing(true)
    setPaymentMethod('upi')
    
    // Simulate Pazorpay redirect
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentPage('checkout')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Checkout
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Payment Method</h1>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 pb-4 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground font-medium">₹90</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold text-foreground pt-4">
            <span>Total Amount</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Choose Payment Method</h2>

          {/* UPI Payment */}
          <button
            onClick={handleUPIPayment}
            disabled={isProcessing}
            className={`w-full p-6 border-2 rounded-lg transition-all ${
              paymentMethod === 'upi'
                ? 'border-primary bg-secondary'
                : 'border-border hover:border-primary'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-foreground">Pay via UPI</h3>
                <p className="text-sm text-muted-foreground">Quick and secure UPI payment</p>
              </div>
              {paymentMethod === 'upi' && <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary" />}
            </div>
          </button>

          {/* Cash on Delivery */}
          <button
            onClick={() => setPaymentMethod('cod')}
            className={`w-full p-6 border-2 rounded-lg transition-all ${
              paymentMethod === 'cod'
                ? 'border-primary bg-secondary'
                : 'border-border hover:border-primary'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Banknote className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-foreground">Cash on Delivery</h3>
                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
              </div>
              {paymentMethod === 'cod' && <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary" />}
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12">
          <Button
            onClick={() => setCurrentPage('checkout')}
            variant="outline"
            className="flex-1 py-6"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (paymentMethod === 'upi') {
                handleUPIPayment()
              } else if (paymentMethod === 'cod') {
                handleCODPayment()
              } else {
                alert('Please select a payment method')
              }
            }}
            disabled={!paymentMethod || isProcessing}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 font-semibold disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </div>
      </div>
    </div>
  )
}
