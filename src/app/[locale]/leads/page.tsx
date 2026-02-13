import { Suspense } from 'react'
import { getAllLeads, getDealStageName } from '@/lib/supabase/queries'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, Building2, Briefcase, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

async function LeadsTable() {
  const leads = await getAllLeads()

  if (!leads || leads.length === 0) {
    return (
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-12 text-center">
        <p className="text-[var(--text-muted)]">No leads found</p>
      </div>
    )
  }

  const totalLeads = leads.length
  const qualifiedLeads = leads.filter((l) => l.deal_stage >= 2).length
  const closedWon = leads.filter((l) => l.deal_stage === 5).length
  const totalValue = leads.reduce((sum, l) => sum + l.deal_value, 0)

  const stageColors = {
    1: 'bg-slate-500',
    2: 'bg-blue-500',
    3: 'bg-amber-500',
    4: 'bg-orange-500',
    5: 'bg-[var(--green)]',
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Leads</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {totalLeads}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Qualified</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {qualifiedLeads}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Closed Won</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {closedWon}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Value</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                }).format(totalValue)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] backdrop-blur-[20px] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[var(--border)] hover:bg-transparent">
              <TableHead className="text-[var(--gold)] font-semibold">Name</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold">Company</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold">Position</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold">Deal Title</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold text-center">Stage</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)]"
              >
                <TableCell className="font-medium text-[var(--text-primary)]">
                  {lead.first_name} {lead.last_name}
                </TableCell>
                <TableCell className="text-[var(--text-primary)]">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[var(--text-muted)]" />
                    {lead.company}
                  </div>
                </TableCell>
                <TableCell className="text-[var(--text-muted)]">
                  {lead.position}
                </TableCell>
                <TableCell className="text-[var(--text-primary)]">
                  {lead.deal_title || '—'}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'inline-block rounded-full px-3 py-1 text-xs font-medium text-white',
                      stageColors[lead.deal_stage as keyof typeof stageColors] || 'bg-gray-500',
                    )}
                  >
                    {getDealStageName(lead.deal_stage)}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-[var(--gold)]">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                  }).format(lead.deal_value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function LeadsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 h-24 animate-pulse"
          />
        ))}
      </div>
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-8 h-96 animate-pulse" />
    </div>
  )
}

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gold)]">Leads</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          All leads and contacts in your CRM
        </p>
      </div>

      <Suspense fallback={<LeadsLoading />}>
        <LeadsTable />
      </Suspense>
    </div>
  )
}
