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
        test.category?.toLowerCase() === category.toLowerCase() ||
        test.department?.toLowerCase() === category.toLowerCase()
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
    const transformedTests = tests.map((test) => {
      const mrp = test.mrp || test.price; // Use MRP as the actual price
      const displayOriginalPrice = Math.round(mrp * 1.2); // Calculate higher price for discount display
      const discount = Math.round(((displayOriginalPrice - mrp) / displayOriginalPrice) * 100);
      
      return {
        id: test.id,
        name: test.name,
        price: mrp, // Show MRP as selling price
        originalPrice: mrp, // Pass MRP to component
        discount: discount,
        parameters: 1, // Default to 1 parameter
        reportTime: test.tat || '24 Hours',
        fasting: test.fasting_required || false,
        category: test.category || test.department,
        sampleType: test.sample_type,
        department: test.department
      };
    });
    
    return NextResponse.json({ tests: transformedTests });
  } catch (error) {
    console.error('Error in tests API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
