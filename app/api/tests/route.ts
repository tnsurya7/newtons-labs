import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    
    let query = supabase
      .from('tests')
      .select('*')
      .eq('status', 'active');
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    // Search by name if provided
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    // Limit results if provided
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    // Order by name
    query = query.order('name');
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching tests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tests' },
        { status: 500 }
      );
    }
    
    // Transform data to match frontend expectations
    const tests = data.map((test: any) => ({
      id: test.id,
      name: test.name,
      price: test.price,
      originalPrice: test.original_price,
      discount: test.discount,
      parameters: test.parameters,
      reportTime: test.report_time,
      fasting: test.fasting_required,
      category: test.category
    }));
    
    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Error in tests API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
