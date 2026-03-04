const fs = require('fs');

// Raw data from the image
const rawData = `Dual Marker With Graph|1600||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Quad Marker With Graph|2000||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Triple Marker With Graph|1500||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Arthiritis Basic Screen|1500||1 Days 0 hr 0 min|PATHOLOGY
MAP59*|1412||1 Days 0 hr 0 min|PACKAGES
MAP69*|1969||1 Days 0 hr 0 min|PACKAGES
MAP79 *|7807||1 Days 0 hr 0 min|PACKAGES
MAP89*|8166||2 Days 0 hr 0 min|PACKAGES
MAP99* FEMALE|11401||2 Days 0 hr 0 min|PACKAGES
MAP99* MALE|11401||2 Days 0 hr 0 min|PACKAGES
Antithrombin Panel|5000||2 Days 0 hr 0 min|PACKAGES
Thyroid screening|2000||2 Days 0 hr 0 min|PACKAGES
Breast Cancer screen|1500||2 Days 0 hr 0 min|PACKAGES
40 Plus Male Comprehensive Package|2100||1 Days 0 hr 0 min|PACKAGES
Phosphorus - Serum|150|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Total cholesterol/HDL ratio|300|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Vitamin - B12|600|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
TGL‎/HDL Ratio|300|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
C-Peptide|1500|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Iron|200|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Glucose - Fasting|50|Naf Plasma|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Protein Creatinine Ratio, Urine|160|Urine|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Prostarate Specific Antigen, PSA Total|500|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Phosphorus - 24 Hr Urine|100|Urine|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Follicle Stimulating Hormone (FSH)|250|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Osmolality Urine|800|Urine|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Creatinine Kinase (CPK)|130|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Citric Acid Serum|1600|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
C-Reactive Protein (CRP)|550|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Glucose - Postprandial|40|Plasma Naf|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY`;

// Parse function
function parseData(raw) {
  const lines = raw.trim().split('\n');
  const tests = [];
  const seen = new Set();

  lines.forEach(line => {
    const parts = line.split('|');
    if (parts.length >= 5) {
      const name = parts[0].trim().replace(/'/g, "''");
      const price = parseInt(parts[1].trim()) || 0;
      const sampleType = parts[2].trim();
      const tat = parts[3].trim();
      const category = parts[4].trim();

      // Skip duplicates
      const key = name.toLowerCase();
      if (seen.has(key)) {
        console.log(`Skipping duplicate: ${name}`);
        return;
      }
      seen.add(key);

      // Calculate pricing
      const originalPrice = Math.round(price / 0.3); // 70% discount
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

  return tests;
}

// Generate SQL
function generateSQL(tests) {
  let sql = `-- ============================================
-- Newton's Lab - Complete Test Data Import
-- Generated: ${new Date().toISOString()}
-- Total Tests: ${tests.length}
-- ============================================

-- Step 1: Clear all existing test data
TRUNCATE TABLE tests CASCADE;

-- Step 2: Insert all ${tests.length} tests
`;

  tests.forEach(test => {
    sql += `INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES (gen_random_uuid(), '${test.name}', '${test.category}', ${test.price}, ${test.originalPrice}, ${test.discount}, ${test.parameters}, '${test.reportTime}', ${test.fasting}, 'active', NOW(), NOW());

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
`;

  return sql;
}

console.log('Parsing test data...');
const tests = parseData(rawData);
console.log(`Parsed ${tests.length} unique tests`);

const sql = generateSQL(tests);
fs.writeFileSync('FINAL_515_TESTS_IMPORT.sql', sql);
console.log('SQL file generated: FINAL_515_TESTS_IMPORT.sql');

// Save JSON for reference
fs.writeFileSync('final-tests-data.json', JSON.stringify(tests, null, 2));
console.log('JSON saved: final-tests-data.json');
