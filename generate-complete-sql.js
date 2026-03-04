const fs = require('fs');
const crypto = require('crypto');

// This script will read your test data and generate complete SQL
// You need to provide the data in a structured format

// Helper function to generate UUID
function generateUUID() {
  return crypto.randomUUID();
}

// Helper function to clean test name
function cleanTestName(name) {
  return name.trim().replace(/'/g, "''");
}

// Helper function to parse TAT
function parseTAT(tat) {
  if (!tat) return '24 hours';
  return tat.replace(/\s+/g, ' ').trim();
}

// Helper function to calculate discount and original price
function calculatePrices(mrp) {
  const discountPercent = Math.floor(Math.random() * (91 - 50 + 1)) + 50; // 50-91%
  const originalPrice = Math.round(mrp / (1 - discountPercent / 100));
  return { originalPrice, discount: discountPercent };
}

// Helper function to determine if test requires fasting
function requiresFasting(name) {
  const fastingKeywords = ['fasting', 'glucose', 'lipid', 'cholesterol', 'triglyceride'];
  return fastingKeywords.some(keyword => name.toLowerCase().includes(keyword));
}

// Helper function to estimate parameters
function estimateParameters(name, category) {
  if (category === 'PACKAGES') return Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  if (name.toLowerCase().includes('profile') || name.toLowerCase().includes('panel')) {
    return Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  }
  return 1;
}

// Read the data from your image/text
// Format: TestName|MRP|SampleType|TAT|Department
const testDataRaw = `Dual Marker With Graph|1600||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Quad Marker With Graph|2000||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Triple Marker With Graph|1500||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Arthiritis Basic Screen|1500||1 Days 0 hr 0 min|PATHOLOGY`;

// Parse test data
function parseTestData(rawData) {
  const lines = rawData.trim().split('\n');
  const tests = [];
  const seen = new Set();

  lines.forEach((line, index) => {
    const parts = line.split('|');
    if (parts.length >= 5) {
      const name = cleanTestName(parts[0]);
      const mrp = parseInt(parts[1]) || 0;
      const sampleType = parts[2].trim();
      const tat = parseTAT(parts[3]);
      const department = parts[4].trim();

      // Skip duplicates
      if (seen.has(name.toLowerCase())) {
        console.log(`Skipping duplicate: ${name}`);
        return;
      }
      seen.add(name.toLowerCase());

      const { originalPrice, discount } = calculatePrices(mrp);
      const fasting = requiresFasting(name);
      const parameters = estimateParameters(name, department);

      tests.push({
        id: generateUUID(),
        name,
        category: department,
        price: mrp,
        originalPrice,
        discount,
        parameters,
        reportTime: tat,
        fasting,
        sampleType,
        status: 'active'
      });
    }
  });

  return tests;
}

// Generate SQL INSERT statements
function generateSQL(tests) {
  let sql = `-- Newton's Lab - Complete Test Data Import
-- Generated: ${new Date().toISOString()}
-- Total Tests: ${tests.length}

-- Clear existing data
TRUNCATE TABLE tests CASCADE;

-- Insert tests
`;

  tests.forEach(test => {
    sql += `INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES (
  '${test.id}',
  '${test.name}',
  '${test.category}',
  ${test.price},
  ${test.originalPrice},
  ${test.discount},
  ${test.parameters},
  '${test.reportTime}',
  ${test.fasting},
  '${test.status}',
  NOW(),
  NOW()
);

`;
  });

  return sql;
}

// Main execution
console.log('Parsing test data...');
const tests = parseTestData(testDataRaw);
console.log(`Parsed ${tests.length} unique tests`);

console.log('\nGenerating SQL...');
const sql = generateSQL(tests);

// Save SQL file
fs.writeFileSync('complete-test-import.sql', sql);
console.log(`\nSQL file generated: complete-test-import.sql`);

// Save JSON for reference
fs.writeFileSync('complete-test-data.json', JSON.stringify(tests, null, 2));
console.log(`JSON file generated: complete-test-data.json`);

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
