import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ users: [] });
    }

    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ users: [] });
    }

    return NextResponse.json({ users: users || [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ users: [] });
  }
}
