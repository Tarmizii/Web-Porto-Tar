import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

const supabaseUrl = 'https://hfhtjkwpcbtvropevxbc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHRqa3dwY2J0dnJvcGV2eGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjA5NjYsImV4cCI6MjA4MzgzNjk2Nn0.hWXo7BTp9VzLvbfDJ96AGl_EfU6D1pzlrorW3HKBpCY'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
