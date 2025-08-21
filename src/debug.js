import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://gjnufxsbbffycbpymbkn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbnVmeHNiYmZmeWNicHltYmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMzg2MzEsImV4cCI6MjA3MDYxNDYzMX0.m8vCPD73Gt4E5K5fTy1oDJLUJSjROiy-hpHvlX9TLCA')

const { data, error } = await supabase
  .from('projects')
  .select()
  console.log('error', error);
  console.log('data', data);