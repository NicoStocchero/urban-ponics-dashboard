import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export const metadata = {
  title: 'Urban Ponics Dashboard - Investor Intelligence',
  description:
    'Real-time sales intelligence and pipeline management for Urban Ponics investors',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <DashboardLayout>{children}</DashboardLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
