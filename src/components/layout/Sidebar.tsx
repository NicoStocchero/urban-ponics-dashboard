'use client'

import { useUIStore } from '@/stores/uiStore'
import { SidebarNav } from './SidebarNav'
import { SidebarHeader } from './SidebarHeader'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-transform duration-300',
        'bg-[var(--bg-dark)] border-r border-[var(--border)]',
        'backdrop-blur-[20px]',
        sidebarCollapsed ? '-translate-x-full' : 'translate-x-0',
      )}
      style={{ width: 'var(--sidebar-width)' }}
    >
      <div className="flex h-full flex-col">
        <SidebarHeader />
        <SidebarNav />
      </div>
    </aside>
  )
}
