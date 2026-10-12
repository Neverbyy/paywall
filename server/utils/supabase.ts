import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

export const useSupabase = (): SupabaseClient => {
  if (client) return client

  const config = useRuntimeConfig()
  const supabaseUrl = config.supabaseUrl || process.env.SUPABASE_URL
  const supabaseSecretKey = config.supabaseSecretKey || process.env.SUPABASE_SECRET_KEY
  if (!supabaseUrl || !supabaseSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase is not configured: set SUPABASE_URL and SUPABASE_SECRET_KEY',
    })
  }

  client = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
