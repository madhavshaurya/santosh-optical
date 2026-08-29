import { createClient } from '@supabase/supabase-js'

export default () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabaseUrl || 'https://placeholder.supabase.co',
    config.public.supabaseAnonKey || 'placeholder-anon-key'
  )
}
