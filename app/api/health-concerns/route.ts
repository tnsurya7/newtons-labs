import { NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';

export async function GET() {
  try {
    // Get all tests grouped by category
    const data = await sql`
      SELECT category FROM tests WHERE status = 'active'
    `;
    
    // Count tests by category
    const categoryCount: Record<string, number> = {};
    data.forEach((test: any) => {
      if (test.category && test.category !== 'PACKAGES') {
        categoryCount[test.category] = (categoryCount[test.category] || 0) + 1;
      }
    });
    
    // Map categories to health concerns with friendly names
    const categoryMap: Record<string, string> = {
      'IMMUNOLOGY': 'Immunity',
      'CLINICAL MICROBIOLOGY': 'Infections',
      'PATHOLOGY': 'Blood Tests',
      'CLINICAL PATHOLOGY': 'Kidney',
      'CLINICAL BIOCHEMISTRY': 'General Health',
      'MOLECULAR BIOLOGY': 'Genetic Tests',
      'ALLERGY': 'Allergy'
    };
    
    // Create health concerns array
    const healthConcerns = Object.entries(categoryCount)
      .map(([category, count]) => ({
        id: category.toLowerCase().replace(/\s+/g, '-'),
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
