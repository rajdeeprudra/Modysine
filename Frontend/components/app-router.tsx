'use client'

import { useApp } from '@/lib/context'
import { HomePage } from '@/components/pages/home-page'
import { CheckoutPage } from '@/components/pages/checkout-page'
import { PaymentPage } from '@/components/pages/payment-page'
import { ConfirmationPage } from '@/components/pages/confirmation-page'
import { AdminPage } from '@/components/pages/admin-page'

export function AppRouter({ children }: { children: React.ReactNode }) {
  const { currentPage } = useApp()

  switch (currentPage) {
    case 'home':
      return <HomePage />
    case 'checkout':
      return <CheckoutPage />
    case 'payment':
      return <PaymentPage />
    case 'confirmation':
      return <ConfirmationPage />
    case 'admin':
      return <AdminPage />
    default:
      return <HomePage />
  }
}
