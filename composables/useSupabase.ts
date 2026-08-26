import { createClient } from '@supabase/supabase-js'

export default () => {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl || 'https://placeholder.supabase.co'
  const key = config.public.supabaseAnonKey || 'placeholder-key'

  return createClient(url, key)
}
