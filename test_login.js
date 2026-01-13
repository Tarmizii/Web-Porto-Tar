import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hfhtjkwpcbtvropevxbc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHRqa3dwY2J0dnJvcGV2eGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjA5NjYsImV4cCI6MjA4MzgzNjk2Nn0.hWXo7BTp9VzLvbfDJ96AGl_EfU6D1pzlrorW3HKBpCY'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLogin() {
  const email = 'tarmizilsm83@gmail.com'
  const password = 'AsuMerah1616'

  console.log(`Testing login for: ${email}`)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Login Failed:', error.message)
  } else {
    console.log('Login Successful!')
    console.log('User ID:', data.user.id)
    console.log('Session expires at:', data.session.expires_at)
  }
}

testLogin()
