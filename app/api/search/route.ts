import { NextResponse } from 'next/server';
import { HARDCODED_TESTS } from '@/lib/data/hardcoded-tests';
import { HARDCODED_PACKAGES } from '@/lib/data/hardcoded-packages';

// Normalize string for flexible search (remove spaces, hyphens, slashes, special chars, convert to lowercase)
function normalizeSearchString(str: string): string {
  return str.toLowerCase()
    .replace(/[\s\-\/\\(),.]/g, '')  // Remove spaces, hyphens, slashes, parentheses, commas, dots
    .replace(/[&]/g, 'and');  // Convert & to 'and'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query || query.length < 1) {
      return NextResponse.json({ results: [] });
    }
    
    const normalizedQuery = normalizeSearchString(query);
    
    // Search in tests - flexible matching
    const testResults = HARDCODED_TESTS
      .filter(test => {
        const normalizedName = normalizeSearchString(test.name);
        const normalizedDept = normalizeSearchString(test.department || '');
        const normalizedCat = normalizeSearchString(test.category || '');
        const normalizedSample = normalizeSearchString(test.sample_type || '');
        
        return normalizedName.includes(normalizedQuery) ||
               normalizedDept.includes(normalizedQuery) ||
               normalizedCat.includes(normalizedQuery) ||
               normalizedSample.includes(normalizedQuery);
      })
      .slice(0, 10)
      .map(test => {
        const mrp = test.mrp || test.price;
        const displayOriginalPrice = Math.round(mrp * 1.2);
        const discount = Math.round(((displayOriginalPrice - mrp) / displayOriginalPrice) * 100);
        
        return {
          id: test.id,
          name: test.name,
          type: 'test' as const,
          price: mrp,
          originalPrice: displayOriginalPrice,
          discount: discount,
          details: `${test.department || test.category}`
        };
      });
    
    // Search in packages - flexible matching
    const packageResults = HARDCODED_PACKAGES
      .filter(pkg => {
        const normalizedName = normalizeSearchString(pkg.name);
        const normalizedDesc = normalizeSearchString(pkg.description || '');
        
        return normalizedName.includes(normalizedQuery) ||
               normalizedDesc.includes(normalizedQuery);
      })
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
