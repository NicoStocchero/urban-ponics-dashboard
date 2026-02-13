import { createClient } from '@/lib/supabase/server'
import type { Database } from './types'

type MetricsRow = Database['public']['Tables']['metrics']['Row']
type LeadsRow = Database['public']['Tables']['leads']['Row']

/**
 * Get the latest metrics for KPIs
 * Uses the most recent row from the metrics table
 */
export async function getLatestMetrics(): Promise<MetricsRow | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching latest metrics:', error)
    return null
  }

  return data
}

/**
 * Get metrics for performance chart (last 4 quarters)
 * Groups by quarter and aggregates metrics
 */
export async function getQuarterlyMetrics(): Promise<{
  quarter: string
  pipeline: number
  meetings: number
}[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('metrics')
    .select('date, total_pipeline, meetings_scheduled')
    .order('date', { ascending: true })

  if (error || !data) {
    console.error('Error fetching quarterly metrics:', error)
    return []
  }

  // For now, return the last 4 data points as quarters
  // In production, you'd group by actual quarters
  const lastFour: Array<{
    date: string
    total_pipeline: number
    meetings_scheduled: number
  }> = data.slice(-4)

  return lastFour.map((item, index) => ({
    quarter: `Q${index + 1} 2026`,
    pipeline: item.total_pipeline,
    meetings: item.meetings_scheduled,
  }))
}

/**
 * Get top 10 deals by value
 * Returns leads sorted by deal_value descending
 */
export async function getTopDeals(limit = 10): Promise<LeadsRow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('deal_value', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching top deals:', error)
    return []
  }

  return data
}

/**
 * Get deal stage name from stage number
 */
export function getDealStageName(stage: number): string {
  const stages: Record<number, string> = {
    1: 'Prospecting',
    2: 'Qualified',
    3: 'Proposal',
    4: 'Negotiation',
    5: 'Closed Won',
  }
  return stages[stage] || 'Unknown'
}

/**
 * Get priority level based on deal value
 */
export function getDealPriority(
  value: number,
): 'high' | 'medium' | 'low' {
  if (value >= 100000) return 'high'
  if (value >= 50000) return 'medium'
  return 'low'
}

/**
 * Get all companies with aggregated stats
 * Groups leads by company and calculates totals
 */
export async function getCompanies(): Promise<{
  company: string
  totalDeals: number
  totalValue: number
  avgDealValue: number
  activeDeals: number
  leads: LeadsRow[]
}[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('company', { ascending: true })

  if (error || !data) {
    console.error('Error fetching companies:', error)
    return []
  }

  // Group by company
  const companiesMap = new Map<string, LeadsRow[]>()
  const leads: LeadsRow[] = data

  for (const lead of leads) {
    if (!companiesMap.has(lead.company)) {
      companiesMap.set(lead.company, [])
    }
    companiesMap.get(lead.company)!.push(lead)
  }

  // Calculate stats for each company
  const companies = Array.from(companiesMap.entries()).map(([company, leads]) => {
    const totalValue = leads.reduce((sum, lead) => sum + lead.deal_value, 0)
    const activeDeals = leads.filter((lead) => lead.deal_stage < 5).length

    return {
      company,
      totalDeals: leads.length,
      totalValue,
      avgDealValue: totalValue / leads.length,
      activeDeals,
      leads,
    }
  })

  // Sort by total value descending
  return companies.sort((a, b) => b.totalValue - a.totalValue)
}

/**
 * Get all leads with optional filtering
 */
export async function getAllLeads(): Promise<LeadsRow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Error fetching leads:', error)
    return []
  }

  return data
}
