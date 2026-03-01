import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const status = {
    supabase: {
      configured: false,
      connected: false,
      error: undefined as string | undefined,
      tablesCount: 0,
    },
    email: {
      configured: false,
      service: undefined as string | undefined,
    },
    environment: {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      resendKey: !!process.env.RESEND_API_KEY,
    },
  };

  // Check Supabase configuration
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    status.supabase.configured = true;

    // Test Supabase connection
    if (supabase) {
      try {
        // Try to query the tests table
        const { data, error } = await supabase
          .from('tests')
          .select('id', { count: 'exact', head: true });

        if (error) {
          status.supabase.error = error.message;
        } else {
          status.supabase.connected = true;
          
          // Count tables by trying to access them
          const tables = ['tests', 'packages', 'bookings', 'users', 'booking_items', 'activity_logs'];
          let accessibleTables = 0;
          
          for (const table of tables) {
            try {
              const { error: tableError } = await supabase
                .from(table)
                .select('id', { count: 'exact', head: true });
              
              if (!tableError) {
                accessibleTables++;
              }
            } catch (e) {
              // Table doesn't exist or not accessible
            }
          }
          
          status.supabase.tablesCount = accessibleTables;
        }
      } catch (error: any) {
        status.supabase.error = error.message || 'Connection failed';
      }
    } else {
      status.supabase.error = 'Supabase client not initialized';
    }
  } else {
    status.supabase.error = 'Environment variables not set';
  }

  // Check email service configuration
  if (process.env.RESEND_API_KEY) {
    status.email.configured = true;
    status.email.service = 'Resend';
  } else if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    status.email.configured = true;
    status.email.service = 'SMTP';
  }

  return NextResponse.json(status);
}
