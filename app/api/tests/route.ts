import { NextResponse } from 'next/server';
import { query } from '@/lib/db/neon';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    
    // Build SQL query
    let sqlQuery = 'SELECT * FROM tests WHERE status = $1';
    const params: any[] = ['active'];
    let paramIndex = 2;
    
    // Filter by category if provided
    if (category && category !== 'all') {
      sqlQuery += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }
    
    // Search by name if provided
    if (search) {
      sqlQuery += ` AND name ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    
    // Order by name
    sqlQuery += ' ORDER BY name';
    
    // Limit results if provided
    if (limit) {
      sqlQuery += ` LIMIT $${paramIndex}`;
      params.push(parseInt(limit));
    }
    
    const data = await query(sqlQuery, params);
    
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
