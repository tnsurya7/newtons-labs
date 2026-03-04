// Verify database import - checks if all tests and packages are imported correctly
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

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Expected values
const EXPECTED = {
  tests: 508,
  packages: 8,
  categories: {
    'CLINICAL BIOCHEMISTRY': 221,
    'IMMUNOLOGY': 163,
    'PATHOLOGY': 44,
    'CLINICAL MICROBIOLOGY': 38,
    'CLINICAL PATHOLOGY': 17,
    'MOLECULAR BIOLOGY': 15,
    'PACKAGES': 10
  }
};

async function verifyTests() {
  console.log('\n📋 Verifying Tests...');
  
  // Count total tests
  const { count, error } = await supabase
    .from('tests')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('  ❌ Error counting tests:', error.message);
    return false;
  }
  
  console.log(`  Total tests: ${count}`);
  
  if (count === EXPECTED.tests) {
    console.log(`  ✅ Test count matches expected (${EXPECTED.tests})`);
  } else {
    console.log(`  ⚠️  Test count mismatch! Expected: ${EXPECTED.tests}, Got: ${count}`);
    return false;
  }
  
  return true;
}

async function verifyPackages() {
  console.log('\n📦 Verifying Packages...');
  
  const { count, error } = await supabase
    .from('packages')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('  ❌ Error counting packages:', error.message);
    return false;
  }
  
  console.log(`  Total packages: ${count}`);
  
  if (count === EXPECTED.packages) {
    console.log(`  ✅ Package count matches expected (${EXPECTED.packages})`);
  } else {
    console.log(`  ⚠️  Package count mismatch! Expected: ${EXPECTED.packages}, Got: ${count}`);
    return false;
  }
  
  return true;
}

async function verifyCategories() {
  console.log('\n📊 Verifying Categories...');
  
  const { data, error } = await supabase
    .from('tests')
    .select('category');
  
  if (error) {
    console.error('  ❌ Error fetching categories:', error.message);
    return false;
  }
  
  // Count by category
  const categoryCount = {};
  data.forEach(item => {
    categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
  });
  
  console.log('\n  Category Distribution:');
  let allMatch = true;
  
  Object.entries(EXPECTED.categories).forEach(([category, expectedCount]) => {
    const actualCount = categoryCount[category] || 0;
    const match = actualCount === expectedCount;
    const icon = match ? '✅' : '⚠️';
    
    console.log(`  ${icon} ${category}: ${actualCount} (expected: ${expectedCount})`);
    
    if (!match) allMatch = false;
  });
  
  // Check for unexpected categories
  Object.keys(categoryCount).forEach(category => {
    if (!EXPECTED.categories[category]) {
      console.log(`  ⚠️  Unexpected category: ${category} (${categoryCount[category]} tests)`);
      allMatch = false;
    }
  });
  
  return allMatch;
}

async function checkDuplicates() {
  console.log('\n🔍 Checking for Duplicates...');
  
  const { data, error } = await supabase
    .from('tests')
    .select('name');
  
  if (error) {
    console.error('  ❌ Error fetching test names:', error.message);
    return false;
  }
  
  const nameCount = {};
  data.forEach(item => {
    nameCount[item.name] = (nameCount[item.name] || 0) + 1;
  });
  
  const duplicates = Object.entries(nameCount).filter(([name, count]) => count > 1);
  
  if (duplicates.length === 0) {
    console.log('  ✅ No duplicate test names found');
    return true;
  } else {
    console.log('  ⚠️  Found duplicate test names:');
    duplicates.forEach(([name, count]) => {
      console.log(`    - "${name}" appears ${count} times`);
    });
    return false;
  }
}

async function checkPrices() {
  console.log('\n💰 Verifying Prices...');
  
  const { data, error } = await supabase
    .from('tests')
    .select('id, name, price')
    .or('price.is.null,price.eq.0');
  
  if (error) {
    console.error('  ❌ Error checking prices:', error.message);
    return false;
  }
  
  if (data.length === 0) {
    console.log('  ✅ All tests have valid prices');
    return true;
  } else {
    console.log(`  ⚠️  Found ${data.length} tests with missing or zero prices:`);
    data.slice(0, 5).forEach(test => {
      console.log(`    - ${test.name} (ID: ${test.id}): ₹${test.price || 0}`);
    });
    if (data.length > 5) {
      console.log(`    ... and ${data.length - 5} more`);
    }
    return false;
  }
}

async function sampleTests() {
  console.log('\n📝 Sample Tests:');
  
  const { data, error } = await supabase
    .from('tests')
    .select('id, name, price, category')
    .order('id')
    .limit(5);
  
  if (error) {
    console.error('  ❌ Error fetching sample tests:', error.message);
    return;
  }
  
  data.forEach(test => {
    console.log(`  ${test.id}. ${test.name} - ₹${test.price} (${test.category})`);
  });
}

async function samplePackages() {
  console.log('\n📦 Sample Packages:');
  
  const { data, error } = await supabase
    .from('packages')
    .select('id, name, price, tests_count')
    .order('price');
  
  if (error) {
    console.error('  ❌ Error fetching packages:', error.message);
    return;
  }
  
  data.forEach(pkg => {
    console.log(`  ${pkg.id}. ${pkg.name} - ₹${pkg.price} (${pkg.tests_count} tests)`);
  });
}

async function main() {
  console.log('🚀 Starting Database Verification...');
  console.log('=' .repeat(60));
  
  const results = {
    tests: false,
    packages: false,
    categories: false,
    duplicates: false,
    prices: false
  };
  
  try {
    results.tests = await verifyTests();
    results.packages = await verifyPackages();
    results.categories = await verifyCategories();
    results.duplicates = await checkDuplicates();
    results.prices = await checkPrices();
    
    await sampleTests();
    await samplePackages();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Verification Summary:');
    console.log('='.repeat(60));
    
    const checks = [
      { name: 'Test Count', passed: results.tests },
      { name: 'Package Count', passed: results.packages },
      { name: 'Category Distribution', passed: results.categories },
      { name: 'No Duplicates', passed: results.duplicates },
      { name: 'Valid Prices', passed: results.prices }
    ];
    
    checks.forEach(check => {
      const icon = check.passed ? '✅' : '❌';
      console.log(`${icon} ${check.name}`);
    });
    
    const allPassed = Object.values(results).every(r => r === true);
    
    console.log('\n' + '='.repeat(60));
    if (allPassed) {
      console.log('✅ ALL CHECKS PASSED! Database import successful!');
      console.log('\n🎉 Your database has:');
      console.log(`   - ${EXPECTED.tests} tests`);
      console.log(`   - ${EXPECTED.packages} packages`);
      console.log(`   - All properly categorized`);
      console.log(`   - No duplicates`);
      console.log(`   - All with valid prices`);
    } else {
      console.log('⚠️  SOME CHECKS FAILED! Please review the issues above.');
      console.log('\n💡 Suggested Actions:');
      console.log('   1. Re-run the SQL import: supabase-data-import.sql');
      console.log('   2. Check Supabase logs for errors');
      console.log('   3. Verify database credentials in .env.local');
    }
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Run verification
main();
