'use client'

import { useUIStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function MainContent({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)

  return (
    <main
      className={cn(
        'min-h-screen transition-all duration-300 p-8',
        sidebarCollapsed ? 'ml-0' : 'ml-[var(--sidebar-width)]',
      )}
    >
      {children}
    </main>
  )
}
