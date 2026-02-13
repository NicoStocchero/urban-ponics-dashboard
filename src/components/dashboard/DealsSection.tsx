import { getTopDeals } from '@/lib/supabase/queries'
import { DealCard } from './DealCard'
import { useTranslations } from 'next-intl'

export async function DealsSection() {
  const deals = await getTopDeals(10)
  const t = useTranslations('deals')

  if (!deals || deals.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-[var(--gold)] mb-6">
          {t('title')}
        </h2>
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-12 backdrop-blur-[20px] text-center">
          <p className="text-[var(--text-muted)]">No deals available</p>
        </div>
      </div>
    )
  }

  // Calculate summary stats
  const totalPipeline = deals.reduce((sum, deal) => sum + deal.deal_value, 0)
  const avgDealSize = totalPipeline / deals.length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--gold)]">
          {t('title')}
        </h2>
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-sm text-[var(--text-muted)]">
              {t('totalPipeline')}
            </div>
            <div className="text-xl font-bold text-[var(--gold)]">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
              }).format(totalPipeline)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--text-muted)]">
              {t('avgDealSize')}
            </div>
            <div className="text-xl font-bold text-[var(--gold)]">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
              }).format(avgDealSize)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}
