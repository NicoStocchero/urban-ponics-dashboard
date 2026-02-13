import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

/**
 * Creates a Supabase client for Client Components
 * This client runs in the browser and handles client-side operations
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
