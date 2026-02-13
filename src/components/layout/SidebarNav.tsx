'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  Megaphone,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    href: '',
    labelKey: 'overview',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    href: '/companies',
    labelKey: 'companies',
    icon: Building2,
    badge: '1.2K',
  },
  {
    href: '/leads',
    labelKey: 'leads',
    icon: Users,
    badge: '7.3K',
  },
  {
    href: '/meetings',
    labelKey: 'meetings',
    icon: Calendar,
    badge: '16',
  },
  {
    href: '/campaigns',
    labelKey: 'campaigns',
    icon: Megaphone,
    badge: '11',
  },
  {
    href: '/pipeline',
    labelKey: 'pipeline',
    icon: TrendingUp,
    badge: null,
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  // Extract locale and path from pathname
  const pathParts = pathname.split('/').filter(Boolean)
  const locale = pathParts[0] || 'es'
  const currentPath = pathParts.slice(1).join('/')

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const isActive = currentPath === item.href.slice(1)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
              'hover:bg-[var(--bg-hover)]',
              isActive
                ? 'bg-[var(--bg-card)] text-[var(--gold)] border-l-2 border-[var(--gold)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="flex-1">{t(item.labelKey)}</span>
            {item.badge && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  isActive
                    ? 'bg-[var(--gold)] text-black'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)]',
                )}
              >
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
