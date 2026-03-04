const fs = require('fs');

console.log('📊 Reading all-515-tests-data.txt...\n');

const allTestsData = fs.readFileSync('all-515-tests-data.txt', 'utf8');
const lines = allTestsData.trim().split('\n');

const tests = [];
const seen = new Set();
let skipped = 0;

console.log(`Processing ${lines.length} lines...`);

lines.forEach((line, index) => {
  const trimmedLine = line.trim();
  
  // Skip empty lines and header
  if (!trimmedLine || 
      trimmedLine.includes('Tests Name') || 
      trimmedLine.includes('MRP (₹)') ||
      trimmedLine.includes('TestName|Price')) {
    skipped++;
    return;
  }

  // Try to parse with tabs first, then pipes
  let parts;
  if (trimmedLine.includes('\t')) {
    parts = trimmedLine.split('\t');
  } else if (trimmedLine.includes('|')) {
    parts = trimmedLine.split('|');
  } else {
    console.log(`Line ${index + 1}: Skipping - invalid format`);
    skipped++;
    return;
  }

  if (parts.length >= 4) {
    const name = parts[0].trim().replace(/'/g, "''");
    const priceStr = parts[1].trim().replace(/[₹,]/g, '');
    const price = parseInt(priceStr) || 0;
    const sampleType = parts[2] ? parts[2].trim() : '';
    const tat = parts[3] ? parts[3].trim() : '24 hours';
    const category = parts[4] ? parts[4].trim() : 'CLINICAL BIOCHEMISTRY';

    // Skip if no name or price
    if (!name || price === 0) {
      skipped++;
      return;
    }

    // Skip duplicates
    const key = name.toLowerCase();
    if (seen.has(key)) {
      console.log(`Line ${index + 1}: Skipping duplicate - ${name}`);
      skipped++;
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
      reportTime: tat || '24 hours',
      fasting,
      category,
      sampleType
    });
  } else {
    skipped++;
  }
});

console.log(`\n✅ Parsed ${tests.length} unique tests`);
console.log(`⏭️  Skipped ${skipped} lines (headers/duplicates/invalid)\n`);

if (tests.length === 0) {
  console.error('❌ ERROR: No tests found!');
  process.exit(1);
}

// Generate SQL
let sql = `-- ============================================
-- Newton's Lab - Complete Test Data Import
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

-- Check total count (should be ${tests.length})
SELECT COUNT(*) as total_tests FROM tests;

-- Check by category
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- Check for duplicates (should return 0 rows)
SELECT name, COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;

-- Sample tests
SELECT id, name, price, category, report_time 
FROM tests 
ORDER BY id 
LIMIT 10;
`;

// Save SQL file
const filename = 'COMPLETE_TESTS_IMPORT.sql';
fs.writeFileSync(filename, sql);
console.log(`✅ SQL file generated: ${filename}`);
console.log(`✅ File size: ${(sql.length / 1024).toFixed(2)} KB\n`);

// Save JSON for reference
fs.writeFileSync('all-parsed-tests.json', JSON.stringify(tests, null, 2));
console.log('✅ JSON saved: all-parsed-tests.json\n');

// Print summary
const categories = {};
tests.forEach(test => {
  categories[test.category] = (categories[test.category] || 0) + 1;
});

console.log('=== SUMMARY ===');
console.log(`Total Tests: ${tests.length}\n`);
console.log('Tests by Category:');
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

console.log('\n=== SAMPLE TESTS ===');
tests.slice(0, 5).forEach((test, i) => {
  console.log(`${i + 1}. ${test.name} - ₹${test.price} (${test.category})`);
});

console.log('\n=== NEXT STEPS ===');
console.log('1. Open Supabase SQL Editor');
console.log(`2. Copy the content of ${filename}`);
console.log('3. Paste and run in SQL Editor');
console.log('4. Verify with the queries at the end');
console.log(`5. Total tests after import: ${tests.length}`);
console.log('\n✅ Done!');
