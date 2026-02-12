'use client'

import { Menu } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function SidebarToggle() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        'fixed top-4 z-50 rounded-lg p-2 transition-all',
        'bg-[var(--bg-card)] border border-[var(--border)]',
        'hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)]',
        'backdrop-blur-[20px]',
        sidebarCollapsed ? 'left-4' : 'left-[calc(var(--sidebar-width)+1rem)]',
      )}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-5 w-5 text-[var(--gold)]" />
    </button>
  )
}
