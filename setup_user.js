import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hfhtjkwpcbtvropevxbc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHRqa3dwY2J0dnJvcGV2eGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjA5NjYsImV4cCI6MjA4MzgzNjk2Nn0.hWXo7BTp9VzLvbfDJ96AGl_EfU6D1pzlrorW3HKBpCY'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupUser() {
  const email = 'tarmizilsm83@gmail.com'
  const password = 'AsuMerah1616'

  console.log(`Attempting to sign up user: ${email}`)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            full_name: 'Tarmizi',
            avatar_url: ''
        }
    }
  })

  if (error) {
    console.error('Error creating user:', error.message)
    // If user already exists, try signing in to confirm credentials match
    if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
        console.log('User already exists.')
    }
  } else {
    console.log('User created successfully:', data.user?.id)
  }
}

setupUser()
