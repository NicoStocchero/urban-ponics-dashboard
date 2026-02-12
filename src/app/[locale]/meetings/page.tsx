export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gold)] capitalize">
          Meetings
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Meetings management and analytics
        </p>
      </div>

      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-12 backdrop-blur-[20px] text-center">
        <h2 className="text-xl font-semibold text-[var(--gold)] mb-2">
          Coming Soon
        </h2>
        <p className="text-[var(--text-muted)]">
          This view will display meetings data from Supabase
        </p>
      </div>
    </div>
  )
}
