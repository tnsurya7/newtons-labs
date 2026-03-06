import { NextResponse } from 'next/server';
import { HARDCODED_TESTS } from '@/lib/data/hardcoded-tests';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    
    let tests = [...HARDCODED_TESTS];
    
    // Filter by category if provided
    if (category && category !== 'all') {
      tests = tests.filter(test => 
        test.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search query if provided
    if (search) {
      const searchLower = search.toLowerCase();
      tests = tests.filter(test =>
        test.name.toLowerCase().includes(searchLower) ||
        test.department?.toLowerCase().includes(searchLower) ||
        test.category?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply limit if provided
    if (limit) {
      tests = tests.slice(0, parseInt(limit));
    }
    
    // Transform data to match frontend expectations
    const transformedTests = tests.map((test) => ({
      id: test.id,
      name: test.name,
      price: test.price,
      originalPrice: test.mrp,
      discount: 0,
      parameters: test.sample_type || '',
      reportTime: test.tat,
      fasting: test.fasting_required,
      category: test.category,
      sampleType: test.sample_type,
      department: test.department
    }));
    
    return NextResponse.json({ tests: transformedTests });
  } catch (error) {
    console.error('Error in tests API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
