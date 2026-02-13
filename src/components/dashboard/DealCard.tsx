import { Building2, User, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/types'
import { getDealStageName, getDealPriority } from '@/lib/supabase/queries'

type LeadsRow = Database['public']['Tables']['leads']['Row']

interface DealCardProps {
  deal: LeadsRow
}

export function DealCard({ deal }: DealCardProps) {
  const priority = getDealPriority(deal.deal_value)
  const stageName = getDealStageName(deal.deal_stage)

  const priorityColors = {
    high: 'bg-[var(--red)] text-white',
    medium: 'bg-[var(--gold)] text-black',
    low: 'bg-[var(--text-muted)] text-white',
  }

  const stageColors = {
    1: 'bg-slate-500',
    2: 'bg-blue-500',
    3: 'bg-amber-500',
    4: 'bg-orange-500',
    5: 'bg-[var(--green)]',
  }

  return (
    <div className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px] transition-all hover:border-[var(--border-hover)] hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            {deal.deal_title || `${deal.company} Deal`}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Building2 className="h-4 w-4" />
            <span>{deal.company}</span>
          </div>
        </div>
        <div
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold',
            priorityColors[priority],
          )}
        >
          {priority.toUpperCase()}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-primary)]">
            {deal.first_name} {deal.last_name}
          </span>
          <span className="text-[var(--text-muted)]">• {deal.position}</span>
        </div>

        {deal.expected_close_date && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Calendar className="h-4 w-4" />
            <span>
              Close: {new Date(deal.expected_close_date).toLocaleDateString('es-ES')}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium text-white',
              stageColors[deal.deal_stage as keyof typeof stageColors] || 'bg-gray-500',
            )}
          >
            {stageName}
          </div>
          <div className="text-2xl font-bold text-[var(--gold)]">
            {new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
            }).format(deal.deal_value)}
          </div>
        </div>
      </div>
    </div>
  )
}
