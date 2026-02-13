'use client'

import { AreaChart } from '@tremor/react'
import { useTranslations } from 'next-intl'

interface ChartDataPoint {
  quarter: string
  pipeline: number
  meetings: number
}

interface PerformanceChartProps {
  data: ChartDataPoint[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const t = useTranslations('chart')

  const customTooltip = ({ payload, active }: any) => {
    if (!active || !payload) return null
    
    return (
      <div className="rounded-lg bg-[var(--bg-card)] border border-[var(--border)] p-3 shadow-lg backdrop-blur-[20px]">
        <div className="text-sm font-semibold text-[var(--text-primary)] mb-2">
          {payload[0].payload.quarter}
        </div>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[var(--text-muted)]">{item.name}:</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {item.name === 'Pipeline'
                ? new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                  }).format(item.value)
                : item.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 backdrop-blur-[20px]">
      <h2 className="text-xl font-bold text-[var(--gold)] mb-6">
        {t('title')}
      </h2>
      <AreaChart
        className="h-80"
        data={data}
        index="quarter"
        categories={['pipeline', 'meetings']}
        colors={['amber', 'emerald']}
        valueFormatter={(value) => {
          return new Intl.NumberFormat('es-ES').format(value)
        }}
        showLegend={true}
        showGridLines={true}
        showAnimation={true}
        customTooltip={customTooltip}
        curveType="natural"
      />
    </div>
  )
}
