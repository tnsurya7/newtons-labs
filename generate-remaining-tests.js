const fs = require('fs');

console.log('📊 Analyzing test data...\n');

// Read existing tests from database
const existingTests = JSON.parse(fs.readFileSync('existing-tests.json', 'utf8'));
const existingNames = new Set(existingTests.map(t => t.name.toLowerCase()));

console.log(`✅ Database has ${existingTests.length} tests`);

// Read all test data
const allTestsData = fs.readFileSync('all-515-tests-data.txt', 'utf8');
const lines = allTestsData.trim().split('\n').filter(line => line.trim());

console.log(`📄 Data file has ${lines.length} lines\n`);

// Parse and find missing tests
const missingTests = [];
const duplicates = [];

lines.forEach((line, index) => {
  const parts = line.split('|');
  if (parts.length >= 4) {
    const name = parts[0].trim();
    const price = parseInt(parts[1].trim()) || 0;
    const sampleType = parts[2].trim();
    const tat = parts[3].trim() || '24 hours';
    const category = parts[4] ? parts[4].trim() : 'CLINICAL BIOCHEMISTRY';

    const key = name.toLowerCase();
    
    if (!existingNames.has(key)) {
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

      missingTests.push({
        name: name.replace(/'/g, "''"),
        price,
        originalPrice,
        discount,
        parameters,
        reportTime: tat,
        fasting,
        category,
        sampleType
      });
    } else {
      duplicates.push(name);
    }
  }
});

console.log(`🔍 Analysis Results:`);
console.log(`   - Tests in database: ${existingTests.length}`);
console.log(`   - Tests in data file: ${lines.length}`);
console.log(`   - Already in database: ${duplicates.length}`);
console.log(`   - Missing from database: ${missingTests.length}\n`);

if (missingTests.length === 0) {
  console.log('✅ All tests from the data file are already in the database!');
  console.log('\n💡 If you have more tests to add:');
  console.log('   1. Add them to all-515-tests-data.txt');
  console.log('   2. Format: TestName|Price|SampleType|TAT|Category');
  console.log('   3. Run this script again');
  process.exit(0);
}

// Generate SQL for missing tests
const startId = existingTests.length + 1;

let sql = `-- ============================================
-- Newton's Lab - Add Remaining Tests
-- Generated: ${new Date().toISOString()}
-- Current tests in DB: ${existingTests.length}
-- New tests to add: ${missingTests.length}
-- Total after import: ${existingTests.length + missingTests.length}
-- ============================================

-- Insert ${missingTests.length} new tests

`;

missingTests.forEach((test, index) => {
  const testId = startId + index;
  sql += `-- Test ${testId}: ${test.name}
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-${testId}', '${test.name}', '${test.category}', ${test.price}, ${test.originalPrice}, ${test.discount}, ${test.parameters}, '${test.reportTime}', ${test.fasting}, 'active', NOW(), NOW());

`;
});

sql += `
-- ============================================
-- Verification Queries
-- ============================================

-- Check total count (should be ${existingTests.length + missingTests.length})
SELECT COUNT(*) as total_tests FROM tests;

-- Check by category
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- Check newly added tests
SELECT id, name, price, category 
FROM tests 
WHERE id >= 'test-${startId}'
ORDER BY id
LIMIT 10;
`;

// Save SQL file
fs.writeFileSync('ADD_REMAINING_TESTS.sql', sql);
console.log('✅ SQL file generated: ADD_REMAINING_TESTS.sql');
console.log(`✅ File size: ${(sql.length / 1024).toFixed(2)} KB\n`);

// Save JSON for reference
fs.writeFileSync('missing-tests.json', JSON.stringify(missingTests, null, 2));
console.log('✅ Missing tests saved: missing-tests.json\n');

// Print summary
const categories = {};
missingTests.forEach(test => {
  categories[test.category] = (categories[test.category] || 0) + 1;
});

console.log('=== NEW TESTS BY CATEGORY ===');
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

console.log('\n=== SAMPLE NEW TESTS ===');
missingTests.slice(0, 5).forEach(test => {
  console.log(`  - ${test.name} (${test.category}) - ₹${test.price}`);
});

console.log('\n=== NEXT STEPS ===');
console.log('1. Open Supabase SQL Editor');
console.log('2. Copy content from ADD_REMAINING_TESTS.sql');
console.log('3. Paste and run in SQL Editor');
console.log('4. Verify with queries at the end');
console.log(`5. Total tests after import: ${existingTests.length + missingTests.length}`);
console.log('\n✅ Done!');
