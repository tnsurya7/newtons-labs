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
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking database...\n');

  try {
    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('tests')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error getting count:', countError.message);
      return;
    }

    console.log(`📊 Total tests in database: ${totalCount}`);

    // Get tests by category
    const { data: tests, error: testsError } = await supabase
      .from('tests')
      .select('id, name, category, price, status');

    if (testsError) {
      console.error('❌ Error getting tests:', testsError.message);
      return;
    }

    // Count by category
    const categories = {};
    tests.forEach(test => {
      categories[test.category] = (categories[test.category] || 0) + 1;
    });

    console.log('\n📋 Tests by Category:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count}`);
      });

    // Get test names for comparison
    const existingNames = new Set(tests.map(t => t.name.toLowerCase()));

    console.log('\n📝 Sample tests in database:');
    tests.slice(0, 5).forEach(test => {
      console.log(`  - ${test.name} (${test.category}) - ₹${test.price}`);
    });

    // Save existing test names to file
    fs.writeFileSync('existing-tests.json', JSON.stringify(tests, null, 2));
    console.log('\n✅ Saved existing tests to: existing-tests.json');

    return { totalCount, tests, existingNames };

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDatabase();
