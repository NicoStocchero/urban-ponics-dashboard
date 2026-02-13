import { getLatestMetrics } from '@/lib/supabase/queries'
import { KPICard } from './KPICard'
import { useTranslations } from 'next-intl'

export async function KPICards() {
  const metrics = await getLatestMetrics()
  const t = useTranslations('kpi')

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <KPICard key={i} title="Loading..." value="—" isLoading />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <KPICard
        title={t('invitations_sent')}
        value={metrics.invitations_sent}
        format="number"
      />
      <KPICard
        title={t('acceptance_rate')}
        value={metrics.acceptance_rate}
        format="percentage"
        trend={5}
      />
      <KPICard
        title={t('qualified_interested')}
        value={metrics.qualified_interested}
        format="number"
        trend={12}
      />
      <KPICard
        title={t('meetings_scheduled')}
        value={metrics.meetings_scheduled}
        format="number"
        trend={-3}
      />
      <KPICard
        title={t('total_pipeline')}
        value={metrics.total_pipeline}
        format="currency"
        trend={8}
      />
    </div>
  )
}
