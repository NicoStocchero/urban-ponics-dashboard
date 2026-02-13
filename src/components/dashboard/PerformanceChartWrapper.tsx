import { getQuarterlyMetrics } from '@/lib/supabase/queries'
import { PerformanceChart } from './PerformanceChart'

export async function PerformanceChartWrapper() {
  const data = await getQuarterlyMetrics()

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
        <h2 className="text-xl font-bold text-[var(--gold)] mb-6">
          Pipeline Performance
        </h2>
        <div className="h-80 flex items-center justify-center text-[var(--text-muted)]">
          No chart data available
        </div>
      </div>
    )
  }

  return <PerformanceChart data={data} />
}
