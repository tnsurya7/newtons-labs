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

async function importNewTests() {
  console.log('🚀 Starting import of new tests...\n');

  try {
    // Read new tests
    const newTests = JSON.parse(fs.readFileSync('new-tests-only.json', 'utf8'));
    console.log(`📊 Found ${newTests.length} new tests to import\n`);

    // Get current test count
    const { count: currentCount } = await supabase
      .from('tests')
      .select('*', { count: 'exact', head: true });

    console.log(`✅ Current tests in database: ${currentCount}`);
    
    const startId = currentCount + 1;
    console.log(`🆔 Starting ID: test-${startId}\n`);

    // Prepare data for insertion
    const testsToInsert = newTests.map((test, index) => ({
      id: `test-${startId + index}`,
      name: test.name,
      category: test.category,
      price: test.price,
      original_price: test.originalPrice,
      discount: test.discount,
      parameters: test.parameters,
      report_time: test.reportTime,
      fasting_required: test.fasting,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    console.log('📤 Importing tests in batches...\n');

    // Insert in batches of 50 to avoid timeout
    const batchSize = 50;
    let imported = 0;
    let failed = 0;

    for (let i = 0; i < testsToInsert.length; i += batchSize) {
      const batch = testsToInsert.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(testsToInsert.length / batchSize);

      console.log(`   Batch ${batchNum}/${totalBatches}: Importing ${batch.length} tests...`);

      const { data, error } = await supabase
        .from('tests')
        .insert(batch)
        .select();

      if (error) {
        console.error(`   ❌ Error in batch ${batchNum}:`, error.message);
        failed += batch.length;
      } else {
        console.log(`   ✅ Batch ${batchNum} imported successfully (${data.length} tests)`);
        imported += data.length;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully imported: ${imported} tests`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed} tests`);
    }
    console.log(`📈 Total tests in database: ${currentCount + imported}`);
    console.log('='.repeat(60));

    // Verify final count
    const { count: finalCount } = await supabase
      .from('tests')
      .select('*', { count: 'exact', head: true });

    console.log(`\n🔍 Verification: Database now has ${finalCount} tests`);

    // Get category breakdown
    const { data: tests } = await supabase
      .from('tests')
      .select('category');

    const categories = {};
    tests.forEach(test => {
      categories[test.category] = (categories[test.category] || 0) + 1;
    });

    console.log('\n📋 Tests by Category:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`   ${cat}: ${count}`);
      });

    console.log('\n✅ Import complete!');
    console.log('🌐 Check your website: http://localhost:3000\n');

  } catch (error) {
    console.error('\n❌ Error during import:', error.message);
    process.exit(1);
  }
}

importNewTests();
