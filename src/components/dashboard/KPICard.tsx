import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  trend?: number
  format?: 'number' | 'currency' | 'percentage'
  isLoading?: boolean
}

export function KPICard({
  title,
  value,
  trend,
  format = 'number',
  isLoading = false,
}: KPICardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val)
      case 'percentage':
        return `${val}%`
      default:
        return new Intl.NumberFormat('es-ES').format(val)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
        <div className="h-4 w-32 bg-[var(--border)] rounded animate-pulse mb-4" />
        <div className="h-10 w-20 bg-[var(--gold-dark)] rounded animate-pulse" />
      </div>
    )
  }

  const trendIsPositive = trend !== undefined && trend > 0
  const trendIsNegative = trend !== undefined && trend < 0

  return (
    <div className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px] transition-all hover:border-[var(--border-hover)] hover:shadow-lg">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-[var(--text-muted)]">
          {title}
        </h3>
        {trend !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-semibold',
              trendIsPositive && 'text-[var(--green)]',
              trendIsNegative && 'text-[var(--red)]',
            )}
          >
            {trendIsPositive && <TrendingUp className="h-3 w-3" />}
            {trendIsNegative && <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-[var(--gold)] tracking-tight">
        {formatValue(value)}
      </div>
    </div>
  )
}
