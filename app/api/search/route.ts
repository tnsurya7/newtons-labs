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
    
    // Search in tests
    const testResults = HARDCODED_TESTS
      .filter(test =>
        test.name.toLowerCase().includes(searchLower) ||
        test.department?.toLowerCase().includes(searchLower) ||
        test.category?.toLowerCase().includes(searchLower)
      )
      .slice(0, 10)
      .map(test => ({
        id: test.id,
        name: test.name,
        type: 'test',
        price: test.price,
        category: test.category
      }));
    
    // Search in packages
    const packageResults = HARDCODED_PACKAGES
      .filter(pkg =>
        pkg.name.toLowerCase().includes(searchLower) ||
        pkg.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        type: 'package',
        price: pkg.price,
        category: pkg.category
      }));
    
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
