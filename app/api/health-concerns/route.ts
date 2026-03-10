import { NextResponse } from 'next/server';
import { HARDCODED_TESTS } from '@/lib/data/hardcoded-tests';

export async function GET() {
  try {
    // Count tests by category from hardcoded data
    const categoryCount: Record<string, number> = {};
    HARDCODED_TESTS.forEach((test) => {
      if (test.category && test.category !== 'PACKAGES') {
        categoryCount[test.category] = (categoryCount[test.category] || 0) + 1;
      }
    });
    
    // Map categories to health concerns with friendly names
    const categoryMap: Record<string, string> = {
      'IMMUNOLOGY': 'IMMUNOLOGY / SEROLOGY',
      'IMMUNOLOGY / SEROLOGY': 'IMMUNOLOGY / SEROLOGY', 
      'CLINICAL MICROBIOLOGY': 'MICROBIOLOGY',
      'MICROBIOLOGY': 'MICROBIOLOGY',
      'PATHOLOGY': 'HAEMATOLOGY',
      'HAEMATOLOGY': 'HAEMATOLOGY',
      'CLINICAL PATHOLOGY': 'Kidney & Urine',
      'Kidney & Urine': 'Kidney & Urine',
      'CLINICAL BIOCHEMISTRY': 'General Health',
      'General Health': 'General Health',
      'MOLECULAR BIOLOGY': 'MOLECULAR BIOLOGY',
      'ALLERGY': 'ALLERGY'
    };
    
    // Create health concerns array
    const healthConcerns = Object.entries(categoryCount)
      .map(([category, count]) => ({
        id: category.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-'),
        name: categoryMap[category] || category,
        category: category,
        tests: count
      }))
      .sort((a, b) => b.tests - a.tests);
    
    return NextResponse.json({ healthConcerns });
  } catch (error) {
    console.error('Error in health concerns API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
