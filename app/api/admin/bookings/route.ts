import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ bookings: [] });
    }

    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json({ bookings: [] });
    }

    return NextResponse.json({ bookings: bookings || [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ bookings: [] });
  }
}
