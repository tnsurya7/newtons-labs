import { NextResponse } from 'next/server';
import { HARDCODED_TESTS } from '@/lib/data/hardcoded-tests';
import { HARDCODED_PACKAGES } from '@/lib/data/hardcoded-packages';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }
    
    const searchLower = query.toLowerCase();
    
    // Search in tests - show actual MRP and calculate display price
    const testResults = HARDCODED_TESTS
      .filter(test =>
        test.name.toLowerCase().includes(searchLower) ||
        test.department?.toLowerCase().includes(searchLower) ||
        test.category?.toLowerCase().includes(searchLower)
      )
      .slice(0, 10)
      .map(test => {
        const mrp = test.mrp || test.price; // Actual MRP
        const displayOriginalPrice = Math.round(mrp * 1.2); // Show 20% higher for discount effect
        const discount = Math.round(((displayOriginalPrice - mrp) / displayOriginalPrice) * 100);
        
        return {
          id: test.id,
          name: test.name,
          type: 'test' as const,
          price: mrp, // Show actual MRP as selling price
          originalPrice: displayOriginalPrice,
          discount: discount,
          details: `${test.department || test.category}`
        };
      });
    
    // Search in packages
    const packageResults = HARDCODED_PACKAGES
      .filter(pkg =>
        pkg.name.toLowerCase().includes(searchLower) ||
        pkg.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map(pkg => {
        const mrp = pkg.mrp || pkg.price;
        const displayOriginalPrice = Math.round(mrp * 1.2);
        const discount = Math.round(((displayOriginalPrice - mrp) / displayOriginalPrice) * 100);
        
        return {
          id: pkg.id,
          name: pkg.name,
          type: 'package' as const,
          price: mrp,
          originalPrice: displayOriginalPrice,
          discount: discount,
          details: `${pkg.tests_included} Tests Included`
        };
      });
    
    const results = [...testResults, ...packageResults];
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
