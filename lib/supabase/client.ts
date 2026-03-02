import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validate that credentials are not placeholder values
function isValidCredential(value: string): boolean {
  if (!value) return false;
  if (value.includes('your_') || value.includes('_here')) return false;
  return true;
}

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase Config Check:');
  console.log('- URL valid:', isValidCredential(supabaseUrl));
  console.log('- Anon Key valid:', isValidCredential(supabaseAnonKey));
  console.log('- Service Key valid:', isValidCredential(supabaseServiceKey));
}

// Supabase client options with increased timeout
const clientOptions = {
  auth: {
    persistSession: false,
  },
  global: {
    headers: {
      'x-client-info': 'new10lab-admin',
    },
  },
  db: {
    schema: 'public',
  },
  // Increase timeout to 30 seconds
  realtime: {
    timeout: 30000,
  },
};

// Create clients only if environment variables are properly set
export const supabase = isValidCredential(supabaseUrl) && isValidCredential(supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, clientOptions)
  : null as any;

// Admin client with service role (bypasses RLS)
export const supabaseAdmin = isValidCredential(supabaseUrl) && isValidCredential(supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, clientOptions)
  : null as any;
