const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local file
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

let supabaseUrl = '';
let supabaseKey = '';

envLines.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
    supabaseUrl = trimmedLine.substring('NEXT_PUBLIC_SUPABASE_URL='.length).trim();
  }
  if (trimmedLine.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
    supabaseKey = trimmedLine.substring('SUPABASE_SERVICE_ROLE_KEY='.length).trim();
  }
});

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// New packages data
const newPackages = [
  {
    id: 'pkg-new-69',
    name: 'New 69',
    price: 899,
    original_price: 899,
    discount: 0,
    tests_count: 10,
    popular: false,
    features: [
      'Fasting Blood Sugar',
      'Lipid Profile',
      'Liver Function Profile',
      'IRON PROFILE',
      'Complete Urine Analysis (CUE)',
      'Glycosylated Hemoglobin (GHb/HBA1c)',
      'Calcium & Phosphorus',
      'Thyroid Profile-II',
      'Complete Blood Count + ESR',
      'Kidney Basic screen'
    ],
    description: 'Comprehensive health screening package with 10 essential tests',
    status: 'active'
  },
  {
    id: 'pkg-new-79',
    name: 'New 79',
    price: 1199,
    original_price: 1199,
    discount: 0,
    tests_count: 12,
    popular: true,
    features: [
      'Fasting Blood Sugar',
      'Lipid Profile',
      'Liver Function Profile',
      'IRON PROFILE',
      'Complete Urine Analysis (CUE)',
      'Glycosylated Hemoglobin (GHb/HBA1c)',
      'Calcium & Phosphorus',
      'Folate',
      'Vitamin - B12 & 25-Hydroxy Vitamin D Total (D2 & D3)',
      'Thyroid Profile-II',
      'Complete Blood Count + ESR',
      'Kidney Basic screen'
    ],
    description: 'Enhanced health package with vitamin screening',
    status: 'active'
  },
  {
    id: 'pkg-new-89',
    name: 'New 89',
    price: 2199,
    original_price: 2199,
    discount: 0,
    tests_count: 20,
    popular: true,
    features: [
      'Fasting Blood Sugar',
      'Lipid Profile',
      'Liver Function Profile',
      'IRON PROFILE',
      'Thyroid Profile-II',
      'Complete Urine Analysis (CUE)',
      'Glycosylated Hemoglobin (GHb/HBA1c)',
      'Creatinine - 24 Hr Urine',
      'Urine Albumin(Microalbumin)/Creatinine Ratio',
      'Vitamin - B12 & 25-Hydroxy Vitamin D Total (D2 & D3)',
      'Calcium',
      'Phosphorus',
      'Amylase',
      'Lipase',
      'LDH',
      'hsCRP',
      'Ferritin',
      'Complete Blood Count + ESR',
      'Homocysteine',
      'Kidney Basic screen'
    ],
    description: 'Advanced health screening with 20 comprehensive tests',
    status: 'active'
  },
  {
    id: 'pkg-new-99-male',
    name: 'New 99 Male',
    price: 2999,
    original_price: 2999,
    discount: 0,
    tests_count: 27,
    popular: true,
    features: [
      'Lipid Profile',
      'Liver Function Profile',
      'IRON PROFILE',
      'Prostate Specific Antigen (PSA) Total',
      'Complete Urine Analysis (CUE)',
      'Urine Albumin(Microalbumin)/Creatinine Ratio',
      'Glucose - Fasting',
      'Fasting Urine Glucose',
      'Glucose - Postprandial',
      'Post Prandial Urine Glucose',
      'Glycosylated Hemoglobin (GHb/HBA1c)',
      'Homocysteine',
      'Vitamin - B12 & 25-Hydroxy Vitamin D Total (D2 & D3)',
      'Calcium',
      'Phosphorus',
      'Amylase',
      'Lipase',
      'LDH',
      'hsCRP',
      'Ferritin',
      'Zinc',
      'CK',
      'Testosterone',
      'APO-A1',
      'APO-B',
      'Thyroid Profile-I',
      'Complete Blood Count (CBC)',
      'Kidney Basic screen'
    ],
    description: 'Complete health package designed specifically for men',
    status: 'active'
  },
  {
    id: 'pkg-new-99-female',
    name: 'New 99 Female',
    price: 2999,
    original_price: 2999,
    discount: 0,
    tests_count: 27,
    popular: true,
    features: [
      'Lipid Profile',
      'Liver Function Profile',
      'IRON PROFILE',
      'CA 125 Ovarian Cancer marker',
      'Complete Urine Analysis (CUE)',
      'Urine Albumin(Microalbumin)/Creatinine Ratio',
      'Glucose - Fasting',
      'Fasting Urine Glucose',
      'Glucose - Postprandial',
      'Post Prandial Urine Glucose',
      'Glycosylated Hemoglobin (GHb/HBA1c)',
      'Homocysteine',
      'Vitamin - B12 & 25-Hydroxy Vitamin D Total (D2 & D3)',
      'Calcium',
      'Phosphorus',
      'Amylase',
      'Lipase',
      'LDH',
      'hsCRP',
      'Ferritin',
      'Zinc',
      'CK',
      'Testosterone',
      'APO-A1',
      'APO-B',
      'Thyroid Profile-I',
      'Complete Blood Count (CBC)',
      'Kidney Basic screen'
    ],
    description: 'Complete health package designed specifically for women',
    status: 'active'
  },
  {
    id: 'pkg-anaemia-screen',
    name: 'Anaemia Basic Screen',
    price: 1000,
    original_price: 1000,
    discount: 0,
    tests_count: 7,
    popular: false,
    features: [
      'Iron',
      'Ferritin',
      'Iron Binding Capacity - Total (TIBC)',
      'Transferrin',
      'Vitamin - B12',
      'Transferrin %',
      'Complete Blood Count (CBC)'
    ],
    description: 'Specialized screening for anemia detection',
    status: 'active'
  },
  {
    id: 'pkg-thyroid-screening',
    name: 'Thyroid Screening',
    price: 1999,
    original_price: 1999,
    discount: 0,
    tests_count: 9,
    popular: false,
    features: [
      'Anti Microsomal/Thryroperoxidase Antibody (Anti TPO)',
      'Anti Thyroglobulin Antibody (ATG)',
      'Calcitonin Serum',
      'Thyroglobulin',
      'Triiodothyronine Total (TT3)',
      'Thyroxine - Total (TT4)',
      'Triiodothyronine Free (FT3)',
      'Thyroxine - Free (FT4)',
      'Thyroid Stimulating Hormone (TSH)'
    ],
    description: 'Complete thyroid function assessment',
    status: 'active'
  },
  {
    id: 'pkg-fever-screen',
    name: 'Fever Basic Screen',
    price: 899,
    original_price: 899,
    discount: 0,
    tests_count: 5,
    popular: false,
    features: [
      'Erythrocyte Sedimentation Rate (ESR)',
      'Malarial Parasite Identification',
      'Widal Test (Slide Test)',
      'C-Reactive Protein (CRP)',
      'Complete Blood Count (CBC)'
    ],
    description: 'Essential tests for fever diagnosis',
    status: 'active'
  }
];

async function updatePackages() {
  console.log('🚀 Starting package update...\n');

  try {
    // Step 1: Delete all existing packages
    console.log('🗑️  Deleting old packages...');
    const { error: deleteError } = await supabase
      .from('packages')
      .delete()
      .neq('id', ''); // Delete all

    if (deleteError) {
      console.error('❌ Error deleting packages:', deleteError.message);
      process.exit(1);
    }

    console.log('✅ Old packages deleted\n');

    // Step 2: Insert new packages
    console.log('📤 Inserting new packages...\n');

    for (const pkg of newPackages) {
      console.log(`   Adding: ${pkg.name} (${pkg.tests_count} tests) - ₹${pkg.price}`);
      
      const { error: insertError } = await supabase
        .from('packages')
        .insert({
          ...pkg,
          features: JSON.stringify(pkg.features),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error(`   ❌ Error inserting ${pkg.name}:`, insertError.message);
      } else {
        console.log(`   ✅ ${pkg.name} added successfully`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total packages imported: ${newPackages.length}`);
    console.log('='.repeat(60));

    // Verify
    const { count } = await supabase
      .from('packages')
      .select('*', { count: 'exact', head: true });

    console.log(`\n🔍 Verification: Database now has ${count} packages`);

    console.log('\n✅ Package update complete!');
    console.log('🌐 Check your website: http://localhost:3000\n');

  } catch (error) {
    console.error('\n❌ Error during update:', error.message);
    process.exit(1);
  }
}

updatePackages();
