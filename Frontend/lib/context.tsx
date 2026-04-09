'use client'

import React, { createContext, useContext, useState } from 'react'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  quantity: number
  product: Product
}

interface AppContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  currentPage: 'home' | 'checkout' | 'payment' | 'confirmation' | 'admin'
  setCurrentPage: (page: 'home' | 'checkout' | 'payment' | 'confirmation' | 'admin') => void
  orderDetails: OrderDetails | null
  setOrderDetails: (details: OrderDetails) => void
  products: Product[]
  addProduct: (product: Product) => void
  paymentMethod: 'upi' | 'cod' | null
  setPaymentMethod: (method: 'upi' | 'cod') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [currentPage, setCurrentPage] = useState<'home' | 'checkout' | 'payment' | 'confirmation' | 'admin'>('home')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Classic Pink T-Shirt',
      description: 'Premium quality pink t-shirt perfect for summer',
      price: 599,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1522286052049-147daebab35d?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1556821552-5ff63b1ce4f2?w=500&h=500&fit=crop']
    },
    {
      id: '2',
      name: 'Black Stripe T-Shirt',
      description: 'Elegant black t-shirt with stripe details',
      price: 699,
      images: ['https://images.unsplash.com/photo-1556821552-5ff63b1ce4f2?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1522286052049-147daebab35d?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop']
    },
    {
      id: '3',
      name: 'White Minimalist T-Shirt',
      description: 'Clean white t-shirt with minimalist design',
      price: 549,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1522286052049-147daebab35d?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1556821552-5ff63b1ce4f2?w=500&h=500&fit=crop']
    },
  ])

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevCart, { product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product])
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        currentPage,
        setCurrentPage,
        orderDetails,
        setOrderDetails,
        products,
        addProduct,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
