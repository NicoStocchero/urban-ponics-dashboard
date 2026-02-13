import { Suspense } from 'react'
import { getAllLeads, getDealStageName } from '@/lib/supabase/queries'
import { Calendar, Clock, Building2, User } from 'lucide-react'
import { cn } from '@/lib/utils'

async function MeetingsView() {
  const leads = await getAllLeads()
  
  // Filter leads with expected close dates as "scheduled meetings"
  const meetings = leads
    .filter((lead) => lead.expected_close_date && lead.deal_stage < 5)
    .sort((a, b) => {
      const dateA = new Date(a.expected_close_date!).getTime()
      const dateB = new Date(b.expected_close_date!).getTime()
      return dateA - dateB
    })

  const upcoming = meetings.filter((m) => {
    const date = new Date(m.expected_close_date!)
    return date >= new Date()
  })

  const past = meetings.filter((m) => {
    const date = new Date(m.expected_close_date!)
    return date < new Date()
  })

  const stageColors = {
    1: 'bg-slate-500',
    2: 'bg-blue-500',
    3: 'bg-amber-500',
    4: 'bg-orange-500',
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Meetings</div>
              <div className="text-3xl font-bold text-[var(--gold)]">
                {meetings.length}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-[var(--green)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Upcoming</div>
              <div className="text-3xl font-bold text-[var(--green)]">
                {upcoming.length}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-[var(--text-muted)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Past</div>
              <div className="text-3xl font-bold text-[var(--text-muted)]">
                {past.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Meetings */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--gold)] mb-4">
            Upcoming Meetings
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcoming.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px] hover:border-[var(--border-hover)] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                      {meeting.deal_title || `${meeting.company} Meeting`}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <Building2 className="h-4 w-4" />
                      <span>{meeting.company}</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium text-white',
                      stageColors[meeting.deal_stage as keyof typeof stageColors] || 'bg-gray-500',
                    )}
                  >
                    {getDealStageName(meeting.deal_stage)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-[var(--text-muted)]" />
                    <span className="text-[var(--text-primary)]">
                      {meeting.first_name} {meeting.last_name}
                    </span>
                    <span className="text-[var(--text-muted)]">• {meeting.position}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[var(--gold)]" />
                    <span className="text-[var(--gold)] font-semibold">
                      {new Date(meeting.expected_close_date!).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)]">
                    <div className="text-2xl font-bold text-[var(--gold)]">
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                      }).format(meeting.deal_value)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No meetings */}
      {meetings.length === 0 && (
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-12 text-center">
          <Calendar className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-muted)]">No meetings scheduled</p>
        </div>
      )}
    </div>
  )
}

function MeetingsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 h-32 animate-pulse"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 h-48 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}

export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gold)]">Meetings</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Scheduled meetings and follow-ups
        </p>
      </div>

      <Suspense fallback={<MeetingsLoading />}>
        <MeetingsView />
      </Suspense>
    </div>
  )
}
