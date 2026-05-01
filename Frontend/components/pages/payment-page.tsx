'use client'

import { Header } from '@/components/header'
import { useApp } from '@/lib/context'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Banknote } from 'lucide-react'

// NEW: 1. Add the script loader outside your component
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function PaymentPage() {
  // NEW: 2. Assuming your context holds the user's shipping details from the previous step!
  const { setCurrentPage, setPaymentMethod, cart, customerDetails } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + 90

  // NEW: 3. The Real Razorpay Integration
  const handleUPIPayment = async () => {
    setIsProcessing(true);
    setPaymentMethod('upi');

    // A. Load the Razorpay window
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay failed to load. Check your internet connection.");
      setIsProcessing(false);
      return;
    }

    try {
      // B. Format the cart exactly how our Zod schema expects it
      // Note: Adjust item.variantId to match whatever ID you store in your cart state!
      const formattedItems = cart.map(item => ({
        variantId:  item.product.id, 
        quantity: item.quantity
      }));

      // C. Call YOUR backend to calculate the price and get the Order ID
      // Change localhost:4000 to whatever port your backend is running on
      const orderResponse = await fetch("http://localhost:4000/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: formattedItems,
          // If customerDetails isn't in context yet, we use dummy data so you can test it today!
          customerDetails: customerDetails || {
            name: "Rajdeep Rudra",
            email: "rajdeeprudra2003@gmail.com",
            phoneNo: "8017055790",
            address: "123 Test St",
            city: "Kolkata",
            zipcode: "700001"
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) throw new Error(orderData.error);

      // D. Open the Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Modysine",
        description: "Premium T-Shirt Purchase",
        order_id: orderData.razorpayOrderId,
        
        // E. What happens when the user successfully pays?
        handler: async function (response: any) {
          try {
            // Send the signature to your backend verify route
            const verifyResponse = await fetch("http://localhost:4000/api/v1/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyResponse.ok) {
              // SUCCESS! Go to the confirmation page
              setCurrentPage('confirmation');
            } else {
              alert("Payment verification failed! Please contact support.");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Error verifying payment.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: customerDetails?.name || "Rajdeep Rudra",
          email: customerDetails?.email || "rajdeeprudra2003@gmail.com",
          contact: customerDetails?.phoneNo || "8017055790"
        },
        theme: {
          color: "#000000" // Modysine Black
        },
        modal: {
          ondismiss: function() {
            // If the user clicks the X and closes the black box, stop the loading spinner
            setIsProcessing(false); 
          }
        }
      };

      // In TypeScript Next.js, window might complain about Razorpay. (window as any) fixes it.
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error("Checkout Error:", error);
      alert(error.message);
      setIsProcessing(false);
    }
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
                  Secure payment via UPI through Razorpay gateway. Quick and easy payment using your phone.
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










//6966366c-ce46-4cb3-a69e-5d5008ec03fb