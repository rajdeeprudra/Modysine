'use client'

import { AppProvider } from '@/lib/context'
import { AppRouter } from './app-router'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AppRouter>
        {children}
      </AppRouter>
    </AppProvider>
  )
}
