import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('status', 'active')
      .order('price');
    
    if (error) {
      console.error('Error fetching packages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch packages' },
        { status: 500 }
      );
    }
    
    // Transform data to match frontend expectations
    const packages = data.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.original_price,
      discount: pkg.discount,
      tests: pkg.tests_count,
      popular: pkg.popular,
      features: pkg.features || []
    }));
    
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error in packages API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
