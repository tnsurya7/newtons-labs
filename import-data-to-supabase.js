// Script to import all tests and packages data into Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
}

const env = loadEnvFile();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Read data files
const allTestsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/data/all-tests.json'), 'utf8'));
const packagesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/data/packages.json'), 'utf8'));

async function importTests() {
  console.log('\n📋 Importing Tests...');
  console.log(`Total tests to import: ${allTestsData.allTests.length}`);
  
  // Transform data to match database schema
  const testsToInsert = allTestsData.allTests.map(test => ({
    id: test.id.toString(),
    name: test.name,
    price: test.price,
    original_price: test.originalPrice,
    discount: test.discount || 0,
    parameters: test.parameters || 0,
    report_time: test.reportTime || '24 Hours',
    fasting_required: test.fasting || false,
    description: test.description || null,
    category: test.category || 'General',
    status: 'active'
  }));

  // Insert in batches of 100 to avoid timeout
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < testsToInsert.length; i += batchSize) {
    const batch = testsToInsert.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(testsToInsert.length / batchSize);
    
    console.log(`\n  Processing batch ${batchNumber}/${totalBatches} (${batch.length} tests)...`);
    
    const { data, error } = await supabase
      .from('tests')
      .upsert(batch, { onConflict: 'id' });
    
    if (error) {
      console.error(`  ❌ Error in batch ${batchNumber}:`, error.message);
      errorCount += batch.length;
    } else {
      console.log(`  ✅ Batch ${batchNumber} imported successfully`);
      successCount += batch.length;
    }
  }

  console.log(`\n📊 Tests Import Summary:`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
  
  return { successCount, errorCount };
}

async function importPackages() {
  console.log('\n📦 Importing Packages...');
  console.log(`Total packages to import: ${packagesData.packages.length}`);
  
  // Transform data to match database schema
  const packagesToInsert = packagesData.packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    original_price: pkg.original_price,
    discount: pkg.discount || 0,
    tests_count: pkg.tests_count || 0,
    popular: pkg.popular || false,
    features: pkg.features || [],
    description: pkg.description || null,
    status: pkg.status || 'active'
  }));

  const { data, error } = await supabase
    .from('packages')
    .upsert(packagesToInsert, { onConflict: 'id' });
  
  if (error) {
    console.error('  ❌ Error importing packages:', error.message);
    return { successCount: 0, errorCount: packagesToInsert.length };
  } else {
    console.log(`  ✅ All ${packagesToInsert.length} packages imported successfully`);
    return { successCount: packagesToInsert.length, errorCount: 0 };
  }
}

async function verifyImport() {
  console.log('\n🔍 Verifying Import...');
  
  // Count tests
  const { count: testsCount, error: testsError } = await supabase
    .from('tests')
    .select('*', { count: 'exact', head: true });
  
  if (testsError) {
    console.error('  ❌ Error counting tests:', testsError.message);
  } else {
    console.log(`  ✅ Total tests in database: ${testsCount}`);
  }
  
  // Count packages
  const { count: packagesCount, error: packagesError } = await supabase
    .from('packages')
    .select('*', { count: 'exact', head: true });
  
  if (packagesError) {
    console.error('  ❌ Error counting packages:', packagesError.message);
  } else {
    console.log(`  ✅ Total packages in database: ${packagesCount}`);
  }
  
  // Sample some tests
  const { data: sampleTests, error: sampleError } = await supabase
    .from('tests')
    .select('id, name, price, category')
    .limit(5);
  
  if (!sampleError && sampleTests) {
    console.log('\n  📋 Sample Tests:');
    sampleTests.forEach(test => {
      console.log(`    - ${test.name} (₹${test.price}) - ${test.category}`);
    });
  }
  
  // Sample packages
  const { data: samplePackages, error: pkgError } = await supabase
    .from('packages')
    .select('id, name, price, tests_count')
    .limit(3);
  
  if (!pkgError && samplePackages) {
    console.log('\n  📦 Sample Packages:');
    samplePackages.forEach(pkg => {
      console.log(`    - ${pkg.name} (₹${pkg.price}) - ${pkg.tests_count} tests`);
    });
  }
}

async function main() {
  console.log('🚀 Starting Supabase Data Import...');
  console.log('=' .repeat(50));
  
  try {
    // Import tests
    const testsResult = await importTests();
    
    // Import packages
    const packagesResult = await importPackages();
    
    // Verify import
    await verifyImport();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Data Import Complete!');
    console.log('\n📊 Final Summary:');
    console.log(`  Tests: ${testsResult.successCount} imported, ${testsResult.errorCount} errors`);
    console.log(`  Packages: ${packagesResult.successCount} imported, ${packagesResult.errorCount} errors`);
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Run the import
main();
