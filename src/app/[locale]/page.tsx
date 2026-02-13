import { Suspense } from 'react'
import { KPICards } from '@/components/dashboard/KPICards'
import { PerformanceChartWrapper } from '@/components/dashboard/PerformanceChartWrapper'
import { DealsSection } from '@/components/dashboard/DealsSection'
import { KPICard } from '@/components/dashboard/KPICard'

// Loading skeleton for KPI Cards
function KPICardsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <KPICard key={i} title="Loading..." value="—" isLoading />
      ))}
    </div>
  )
}

// Loading skeleton for Chart
function ChartLoading() {
  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
      <div className="h-8 w-48 bg-[var(--border)] rounded animate-pulse mb-6" />
      <div className="h-[320px] bg-[var(--bg-dark)] rounded flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Loading chart...</p>
      </div>
    </div>
  )
}

// Loading skeleton for Deals
function DealsLoading() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--gold)] mb-6">
        Loading Deals...
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]"
          >
            <div className="h-6 w-48 bg-[var(--border)] rounded animate-pulse mb-4" />
            <div className="h-4 w-32 bg-[var(--border)] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--gold)]">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">
            Real-time sales intelligence and pipeline management
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[var(--bg-card)] px-4 py-2 border border-[var(--border)]">
          <div className="h-2 w-2 rounded-full bg-[var(--green)] animate-pulse" />
          <span className="text-sm text-[var(--text-muted)]">Live Data</span>
        </div>
      </div>

      {/* KPI Cards with Suspense */}
      <Suspense fallback={<KPICardsLoading />}>
        <KPICards />
      </Suspense>

      {/* Performance Chart with Suspense */}
      <Suspense fallback={<ChartLoading />}>
        <PerformanceChartWrapper />
      </Suspense>

      {/* Top Deals with Suspense */}
      <Suspense fallback={<DealsLoading />}>
        <DealsSection />
      </Suspense>
    </div>
  )
}
