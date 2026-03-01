import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Check if Supabase is configured
    if (!supabase) {
      // Fallback to JSON file search
      const testsData = await import('@/lib/data/tests.json');
      const results: any[] = [];

      // Search tests
      testsData.frequentlyBookedTests.forEach((test: any) => {
        if (test.name.toLowerCase().includes(query)) {
          results.push({
            id: test.id,
            name: test.name,
            type: 'test',
            price: test.price,
            originalPrice: test.originalPrice,
            discount: test.discount,
            details: `${test.parameters} parameters • ${test.reportTime}`,
          });
        }
      });

      // Search packages
      testsData.healthPackages.forEach((pkg: any) => {
        if (pkg.name.toLowerCase().includes(query)) {
          results.push({
            id: pkg.id,
            name: pkg.name,
            type: 'package',
            price: pkg.price,
            originalPrice: pkg.originalPrice,
            discount: pkg.discount,
            details: `${pkg.tests} tests included`,
            popular: pkg.popular,
          });
        }
      });

      return NextResponse.json({ 
        results: results.slice(0, 10),
        total: results.length 
      });
    }

    const results: any[] = [];

    // Search tests
    const { data: tests, error: testsError } = await supabase
      .from('tests')
      .select('*')
      .eq('status', 'active')
      .or(`name.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`);

    if (!testsError && tests) {
      tests.forEach((test) => {
        results.push({
          id: test.id,
          name: test.name,
          type: 'test',
          price: test.price,
          originalPrice: test.original_price,
          discount: test.discount,
          details: `${test.parameters} parameters • ${test.report_time}`,
          category: test.category,
        });
      });
    }

    // Search packages
    const { data: packages, error: packagesError } = await supabase
      .from('packages')
      .select('*')
      .eq('status', 'active')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (!packagesError && packages) {
      packages.forEach((pkg) => {
        results.push({
          id: pkg.id,
          name: pkg.name,
          type: 'package',
          price: pkg.price,
          originalPrice: pkg.original_price,
          discount: pkg.discount,
          details: `${pkg.tests_count} tests included`,
          popular: pkg.popular,
        });
      });
    }

    // Sort by relevance (exact matches first, then by name)
    results.sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(query);
      const bExact = b.name.toLowerCase().startsWith(query);
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return a.name.localeCompare(b.name);
    });

    // Limit to 10 results
    const limitedResults = results.slice(0, 10);

    return NextResponse.json({ 
      results: limitedResults,
      total: results.length 
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
