import { createClient } from '@supabase/supabase-js'

export default () => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    return null
  }

  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )
}
