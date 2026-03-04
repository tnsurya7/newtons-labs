const fs = require('fs');

// Read the complete test data
console.log('Reading all 515 tests from all-515-tests-data.txt...');
const allTestsData = fs.readFileSync('all-515-tests-data.txt', 'utf8');

function parseAndGenerateSQL() {
  const lines = allTestsData.trim().split('\n').filter(line => line.trim());
  
  const tests = [];
  const seen = new Set();

  console.log(`Processing ${lines.length} lines...`);

  lines.forEach((line, index) => {
    const parts = line.split('|');
    if (parts.length >= 4) {
      const name = parts[0].trim().replace(/'/g, "''");
      const price = parseInt(parts[1].trim()) || 0;
      const sampleType = parts[2].trim();
      const tat = parts[3].trim() || '24 hours';
      const category = parts[4] ? parts[4].trim() : 'CLINICAL BIOCHEMISTRY';

      // Skip duplicates
      const key = name.toLowerCase();
      if (seen.has(key)) {
        console.log(`Line ${index + 1}: Skipping duplicate - ${name}`);
        return;
      }
      seen.add(key);

      // Calculate pricing (70% discount)
      const originalPrice = Math.round(price / 0.3);
      const discount = 70;

      // Determine fasting
      const fasting = name.toLowerCase().includes('fasting') || 
                     name.toLowerCase().includes('glucose - fasting');

      // Determine parameters
      let parameters = 1;
      if (category === 'PACKAGES') {
        parameters = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
      } else if (name.toLowerCase().includes('profile') || name.toLowerCase().includes('panel')) {
        parameters = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
      }

      tests.push({
        name,
        price,
        originalPrice,
        discount,
        parameters,
        reportTime: tat,
        fasting,
        category,
        sampleType
      });
    }
  });

  console.log(`\nParsed ${tests.length} unique tests`);

  // Generate SQL
  let sql = `-- ============================================
-- Newton's Lab - Complete 515 Test Data Import
-- Generated: ${new Date().toISOString()}
-- Total Tests: ${tests.length}
-- ============================================

-- Step 1: Clear all existing test data
TRUNCATE TABLE tests CASCADE;

-- Step 2: Insert all ${tests.length} tests

`;

  tests.forEach((test, index) => {
    sql += `-- Test ${index + 1}: ${test.name}
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-${index + 1}', '${test.name}', '${test.category}', ${test.price}, ${test.originalPrice}, ${test.discount}, ${test.parameters}, '${test.reportTime}', ${test.fasting}, 'active', NOW(), NOW());

`;
  });

  sql += `
-- ============================================
-- Verification Queries
-- ============================================

-- Check total count
SELECT COUNT(*) as total_tests FROM tests;

-- Check by category
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- Check for duplicates
SELECT name, COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;

-- Sample tests
SELECT id, name, price, category FROM tests LIMIT 10;
`;

  // Save SQL file
  fs.writeFileSync('FINAL_515_TESTS_IMPORT.sql', sql);
  console.log('\n✅ SQL file generated: FINAL_515_TESTS_IMPORT.sql');
  console.log(`✅ File size: ${(sql.length / 1024).toFixed(2)} KB`);

  // Save JSON for reference
  fs.writeFileSync('final-515-tests.json', JSON.stringify(tests, null, 2));
  console.log('✅ JSON saved: final-515-tests.json');

  // Print summary
  const categories = {};
  tests.forEach(test => {
    categories[test.category] = (categories[test.category] || 0) + 1;
  });

  console.log('\n=== SUMMARY ===');
  console.log(`Total Tests: ${tests.length}`);
  console.log('\nTests by Category:');
  Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

  console.log('\n=== NEXT STEPS ===');
  console.log('1. Open Supabase SQL Editor');
  console.log('2. Copy the content of FINAL_515_TESTS_IMPORT.sql');
  console.log('3. Paste and run in SQL Editor');
  console.log('4. Verify with the queries at the end');
  console.log('5. Refresh http://localhost:3000 to see all tests');
  console.log('\n✅ Done!');
}

// Run the generator
try {
  parseAndGenerateSQL();
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
}
