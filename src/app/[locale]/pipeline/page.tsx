import { Suspense } from 'react'
import { getAllLeads, getDealStageName } from '@/lib/supabase/queries'
import { TrendingUp, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

async function PipelineView() {
  const leads = await getAllLeads()

  // Group by stage
  const stages = [1, 2, 3, 4, 5]
  const pipelineByStage = stages.map((stage) => {
    const stageLeads = leads.filter((l) => l.deal_stage === stage)
    const totalValue = stageLeads.reduce((sum, l) => sum + l.deal_value, 0)
    return {
      stage,
      name: getDealStageName(stage),
      leads: stageLeads,
      count: stageLeads.length,
      value: totalValue,
    }
  })

  const totalDeals = leads.length
  const totalValue = leads.reduce((sum, l) => sum + l.deal_value, 0)
  const activeDeals = leads.filter((l) => l.deal_stage < 5).length
  const wonDeals = leads.filter((l) => l.deal_stage === 5).length
  const wonValue = pipelineByStage[4].value

  const stageColors = {
    1: 'bg-slate-500',
    2: 'bg-blue-500',
    3: 'bg-amber-500',
    4: 'bg-orange-500',
    5: 'bg-[var(--green)]',
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Deals</div>
              <div className="text-3xl font-bold text-[var(--gold)]">
                {totalDeals}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[var(--green)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Active Deals</div>
              <div className="text-3xl font-bold text-[var(--green)]">
                {activeDeals}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Pipeline</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(totalValue)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[var(--green)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Won Value</div>
              <div className="text-2xl font-bold text-[var(--green)]">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(wonValue)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Funnel */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--gold)]">Pipeline Stages</h2>
        
        {pipelineByStage.map((stage, index) => {
          const maxWidth = Math.max(...pipelineByStage.map((s) => s.count))
          const widthPercent = (stage.count / maxWidth) * 100

          return (
            <div
              key={stage.stage}
              className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px] hover:border-[var(--border-hover)] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full text-white font-bold',
                      stageColors[stage.stage as keyof typeof stageColors],
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {stage.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {stage.count} deal{stage.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--gold)]">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(stage.value)}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {((stage.value / totalValue) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    stageColors[stage.stage as keyof typeof stageColors],
                  )}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              {/* Top deals in this stage */}
              {stage.leads.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <div className="space-y-2">
                    {stage.leads.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[var(--text-primary)]">
                          {lead.company} - {lead.first_name} {lead.last_name}
                        </span>
                        <span className="font-semibold text-[var(--gold)]">
                          {new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0,
                          }).format(lead.deal_value)}
                        </span>
                      </div>
                    ))}
                    {stage.leads.length > 3 && (
                      <div className="text-xs text-[var(--text-muted)] italic">
                        +{stage.leads.length - 3} more deals
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PipelineLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 h-32 animate-pulse"
          />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 h-40 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}

export default function PipelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gold)]">Pipeline</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Visual pipeline funnel across all deal stages
        </p>
      </div>

      <Suspense fallback={<PipelineLoading />}>
        <PipelineView />
      </Suspense>
    </div>
  )
}
