import { createClient } from '@supabase/supabase-js'

export default () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )
}
