import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase Environment Variables. Please check if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file or deployment settings."
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
