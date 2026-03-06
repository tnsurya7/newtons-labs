import { NextResponse } from 'next/server';
import { HARDCODED_PACKAGES } from '@/lib/data/hardcoded-packages';

export async function GET() {
  try {
    // Transform data to match frontend expectations
    const packages = HARDCODED_PACKAGES.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      originalPrice: pkg.mrp,
      discount: 0,
      testsIncluded: pkg.tests_included,
      features: pkg.features,
      popular: pkg.popular,
      reportTime: pkg.tat,
      sampleType: pkg.sample_type,
      fasting: pkg.fasting_required,
      category: pkg.category
    }));
    
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error in packages API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
