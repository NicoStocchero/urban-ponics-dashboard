import { Suspense } from 'react'
import { getCompanies } from '@/lib/supabase/queries'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Building2, TrendingUp, Users, DollarSign } from 'lucide-react'

async function CompaniesTable() {
  const companies = await getCompanies()

  if (!companies || companies.length === 0) {
    return (
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-12 text-center">
        <p className="text-[var(--text-muted)]">No companies found</p>
      </div>
    )
  }

  const totalCompanies = companies.length
  const totalPipeline = companies.reduce((sum, c) => sum + c.totalValue, 0)
  const totalDeals = companies.reduce((sum, c) => sum + c.totalDeals, 0)
  const avgDealValue = totalPipeline / totalDeals

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Companies</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {totalCompanies}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Deals</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {totalDeals}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Pipeline</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                }).format(totalPipeline)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 backdrop-blur-[20px]">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[var(--gold)]" />
            <div>
              <div className="text-sm text-[var(--text-muted)]">Avg Deal Size</div>
              <div className="text-2xl font-bold text-[var(--gold)]">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                }).format(avgDealValue)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] backdrop-blur-[20px] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[var(--border)] hover:bg-transparent">
              <TableHead className="text-[var(--gold)] font-semibold">Company</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold text-right">Total Deals</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold text-right">Active Deals</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold text-right">Total Value</TableHead>
              <TableHead className="text-[var(--gold)] font-semibold text-right">Avg Deal Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow
                key={company.company}
                className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)]"
              >
                <TableCell className="font-medium text-[var(--text-primary)]">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[var(--gold)]" />
                    {company.company}
                  </div>
                </TableCell>
                <TableCell className="text-right text-[var(--text-primary)]">
                  {company.totalDeals}
                </TableCell>
                <TableCell className="text-right text-[var(--text-primary)]">
                  <span className="inline-flex items-center gap-1">
                    {company.activeDeals}
                    {company.activeDeals > 0 && (
                      <TrendingUp className="h-3 w-3 text-[var(--green)]" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-[var(--gold)]">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                  }).format(company.totalValue)}
                </TableCell>
                <TableCell className="text-right text-[var(--text-muted)]">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                  }).format(company.avgDealValue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function CompaniesLoading() {
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

export default function CompaniesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gold)]">Companies</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Overview of all companies in your pipeline
        </p>
      </div>

      <Suspense fallback={<CompaniesLoading />}>
        <CompaniesTable />
      </Suspense>
    </div>
  )
}
