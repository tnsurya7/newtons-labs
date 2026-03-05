import { NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    
    // Build SQL query dynamically
    let data;
    
    if (category && category !== 'all' && search) {
      // Both category and search
      data = await sql`
        SELECT * FROM tests 
        WHERE status = 'active' 
        AND category = ${category}
        AND name ILIKE ${'%' + search + '%'}
        ORDER BY name
        ${limit ? sql`LIMIT ${parseInt(limit)}` : sql``}
      `;
    } else if (category && category !== 'all') {
      // Only category
      data = await sql`
        SELECT * FROM tests 
        WHERE status = 'active' 
        AND category = ${category}
        ORDER BY name
        ${limit ? sql`LIMIT ${parseInt(limit)}` : sql``}
      `;
    } else if (search) {
      // Only search
      data = await sql`
        SELECT * FROM tests 
        WHERE status = 'active' 
        AND name ILIKE ${'%' + search + '%'}
        ORDER BY name
        ${limit ? sql`LIMIT ${parseInt(limit)}` : sql``}
      `;
    } else if (limit) {
      // Only limit
      data = await sql`
        SELECT * FROM tests 
        WHERE status = 'active' 
        ORDER BY name
        LIMIT ${parseInt(limit)}
      `;
    } else {
      // No filters
      data = await sql`
        SELECT * FROM tests 
        WHERE status = 'active' 
        ORDER BY name
      `;
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
