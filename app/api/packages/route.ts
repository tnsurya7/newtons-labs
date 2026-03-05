import { NextResponse } from 'next/server';
import { query } from '@/lib/db/neon';

export async function GET() {
  try {
    const data = await query(
      "SELECT * FROM packages WHERE status = $1 ORDER BY price",
      ['active']
    );
    
    // Transform data to match frontend expectations
    const packages = data.map((pkg: any) => ({
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
