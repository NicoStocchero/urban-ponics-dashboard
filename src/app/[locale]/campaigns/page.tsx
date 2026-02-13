import { Suspense } from 'react'
import { getLatestMetrics } from '@/lib/supabase/queries'
import { Megaphone, TrendingUp, Users, Target, BarChart3 } from 'lucide-react'
import { BarChart } from '@tremor/react'

async function CampaignsView() {
  const metrics = await getLatestMetrics()

  if (!metrics) {
    return (
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-12 text-center">
        <p className="text-[var(--text-muted)]">No campaign data available</p>
      </div>
    )
  }

  const conversionRate = (metrics.qualified_interested / metrics.invitations_sent) * 100
  const meetingRate = (metrics.meetings_scheduled / metrics.qualified_interested) * 100

  const funnelData = [
    { stage: 'Invitations Sent', count: metrics.invitations_sent, color: '#B8A882' },
    { stage: 'Connections', count: metrics.connections_accepted, color: '#94C973' },
    { stage: 'Responses', count: metrics.total_responses, color: '#FFB84D' },
    { stage: 'Qualified', count: metrics.qualified_interested, color: '#4ECDC4' },
    { stage: 'Meetings', count: metrics.meetings_scheduled, color: '#95E1D3' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Invitations Sent</div>
              <div className="text-3xl font-bold text-[var(--gold)]">
                {metrics.invitations_sent.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-[var(--green)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Acceptance Rate</div>
              <div className="text-3xl font-bold text-[var(--green)]">
                {metrics.acceptance_rate}%
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Conversion Rate</div>
              <div className="text-3xl font-bold text-[var(--gold)]">
                {conversionRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[var(--green)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Meeting Rate</div>
              <div className="text-3xl font-bold text-[var(--green)]">
                {meetingRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funnel Chart */}
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
        <h2 className="text-xl font-bold text-[var(--gold)] mb-6">
          Campaign Funnel
        </h2>
        <BarChart
          className="h-80"
          data={funnelData}
          index="stage"
          categories={['count']}
          colors={['amber']}
          valueFormatter={(value) => value.toLocaleString()}
          showLegend={false}
          showAnimation={true}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <h3 className="text-lg font-semibold text-[var(--gold)] mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Response Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">Connections Accepted</span>
              <span className="text-xl font-bold text-[var(--gold)]">
                {metrics.connections_accepted.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">Total Responses</span>
              <span className="text-xl font-bold text-[var(--gold)]">
                {metrics.total_responses.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-muted)]">Qualified Leads</span>
              <span className="text-xl font-bold text-[var(--gold)]">
                {metrics.qualified_interested.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-muted)]">Meetings Scheduled</span>
              <span className="text-xl font-bold text-[var(--green)]">
                {metrics.meetings_scheduled.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <h3 className="text-lg font-semibold text-[var(--gold)] mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Conversion Ratios
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-muted)]">Invitation → Connection</span>
                <span className="text-sm font-semibold text-[var(--gold)]">
                  {metrics.acceptance_rate}%
                </span>
              </div>
              <div className="h-2 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--gold)] transition-all"
                  style={{ width: `${metrics.acceptance_rate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-muted)]">Connection → Response</span>
                <span className="text-sm font-semibold text-[var(--gold)]">
                  {((metrics.total_responses / metrics.connections_accepted) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--green)] transition-all"
                  style={{ width: `${(metrics.total_responses / metrics.connections_accepted) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-muted)]">Response → Qualified</span>
                <span className="text-sm font-semibold text-[var(--gold)]">
                  {((metrics.qualified_interested / metrics.total_responses) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--gold)] transition-all"
                  style={{ width: `${(metrics.qualified_interested / metrics.total_responses) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-muted)]">Qualified → Meeting</span>
                <span className="text-sm font-semibold text-[var(--green)]">
                  {meetingRate.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--green)] transition-all"
                  style={{ width: `${meetingRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CampaignsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 h-32 animate-pulse"
          />
        ))}
      </div>
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 h-96 animate-pulse" />
    </div>
  )
}

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gold)]">Campaigns</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Campaign performance and conversion analytics
        </p>
      </div>

      <Suspense fallback={<CampaignsLoading />}>
        <CampaignsView />
      </Suspense>
    </div>
  )
}
