import { useTranslations } from 'next-intl'

export default function OverviewPage() {
  return (
    <div className="space-y-8">
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

      {/* Placeholder for KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]"
          >
            <div className="h-4 w-32 bg-[var(--border)] rounded animate-pulse mb-4" />
            <div className="h-10 w-20 bg-[var(--gold-dark)] rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Placeholder for Chart */}
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
        <div className="h-8 w-48 bg-[var(--border)] rounded animate-pulse mb-6" />
        <div className="h-[400px] bg-[var(--bg-dark)] rounded flex items-center justify-center">
          <p className="text-[var(--text-muted)]">Chart will appear here</p>
        </div>
      </div>

      {/* Placeholder for Deals */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--gold)] mb-6">
          Top 10 Deals
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
    </div>
  )
}
