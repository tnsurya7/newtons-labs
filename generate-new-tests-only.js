const fs = require('fs');

console.log('📊 Generating SQL for NEW tests only...\n');

// Read existing tests from database
const existingTests = JSON.parse(fs.readFileSync('existing-tests.json', 'utf8'));
const existingNames = new Set(existingTests.map(t => t.name.toLowerCase()));

console.log(`✅ Database has ${existingTests.length} tests`);

// Read all parsed tests
const allTests = JSON.parse(fs.readFileSync('all-parsed-tests.json', 'utf8'));

console.log(`📄 Data file has ${allTests.length} tests\n`);

// Find new tests
const newTests = allTests.filter(test => !existingNames.has(test.name.toLowerCase()));

console.log(`🆕 New tests to add: ${newTests.length}\n`);

if (newTests.length === 0) {
  console.log('✅ All tests are already in the database!');
  process.exit(0);
}

// Generate SQL for new tests only
const startId = existingTests.length + 1;

let sql = `-- ============================================
-- Newton's Lab - Add NEW Tests Only
-- Generated: ${new Date().toISOString()}
-- Current tests in DB: ${existingTests.length}
-- New tests to add: ${newTests.length}
-- Total after import: ${existingTests.length + newTests.length}
-- ============================================

-- Insert ${newTests.length} new tests

`;

newTests.forEach((test, index) => {
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

-- Check total count (should be ${existingTests.length + newTests.length})
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
LIMIT 20;

-- Sample of new tests
SELECT name, category, price 
FROM tests 
WHERE id >= 'test-${startId}'
ORDER BY price DESC
LIMIT 10;
`;

// Save SQL file
const filename = 'ADD_NEW_TESTS_ONLY.sql';
fs.writeFileSync(filename, sql);
console.log(`✅ SQL file generated: ${filename}`);
console.log(`✅ File size: ${(sql.length / 1024).toFixed(2)} KB\n`);

// Save new tests JSON
fs.writeFileSync('new-tests-only.json', JSON.stringify(newTests, null, 2));
console.log('✅ New tests saved: new-tests-only.json\n');

// Print summary
const categories = {};
newTests.forEach(test => {
  categories[test.category] = (categories[test.category] || 0) + 1;
});

console.log('=== NEW TESTS BY CATEGORY ===');
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

console.log('\n=== SAMPLE NEW TESTS ===');
newTests.slice(0, 10).forEach((test, i) => {
  console.log(`${i + 1}. ${test.name} - ₹${test.price} (${test.category})`);
});

console.log('\n=== NEXT STEPS ===');
console.log('1. Open Supabase SQL Editor');
console.log(`2. Copy the content of ${filename}`);
console.log('3. Paste and run in SQL Editor');
console.log('4. Verify with the queries at the end');
console.log(`5. Total tests after import: ${existingTests.length + newTests.length}`);
console.log('\n✅ Done!');
