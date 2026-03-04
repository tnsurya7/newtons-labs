// Generate final SQL with proper categories
const fs = require('fs');
const path = require('path');

// Read parsed tests
const tests = JSON.parse(fs.readFileSync('parsed-tests.json', 'utf8'));

// Read packages
const packagesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/data/packages.json'), 'utf8'));

// Function to assign category based on test name
function assignCategory(testName) {
  const name = testName.toLowerCase();
  
  // Immunology & Serology
  if (name.includes('antibody') || name.includes('antigen') || name.includes('igg') || 
      name.includes('igm') || name.includes('iga') || name.includes('hiv') || 
      name.includes('hepatitis') || name.includes('virus') || name.includes('torch') ||
      name.includes('dengue') || name.includes('malaria') || name.includes('typhoid') ||
      name.includes('rubella') || name.includes('toxoplasma') || name.includes('cmv') ||
      name.includes('herpes') || name.includes('chikungunya') || name.includes('sars') ||
      name.includes('immunoglobulin') || name.includes('anca') || name.includes('ana') ||
      name.includes('rheumatoid') || name.includes('brucella') || name.includes('leptospira')) {
    return 'IMMUNOLOGY';
  }
  
  // Microbiology & Culture
  if (name.includes('culture') || name.includes('c/s') || name.includes('c&s') ||
      name.includes('aerobic') || name.includes('anaerobic') || name.includes('fungal') ||
      name.includes('afb') || name.includes('gram stain') || name.includes('zeil neelsen') ||
      name.includes('sensitivity')) {
    return 'CLINICAL MICROBIOLOGY';
  }
  
  // Hematology
  if (name.includes('blood count') || name.includes('cbc') || name.includes('hemoglobin') ||
      name.includes('platelet') || name.includes('wbc') || name.includes('rbc') ||
      name.includes('esr') || name.includes('hemogram') || name.includes('reticulocyte') ||
      name.includes('bleeding time') || name.includes('clotting') || name.includes('pt') ||
      name.includes('aptt') || name.includes('fibrinogen') || name.includes('d-dimer') ||
      name.includes('thrombin') || name.includes('factor') || name.includes('coombs') ||
      name.includes('blood grouping') || name.includes('peripheral smear') ||
      name.includes('absolute') && (name.includes('count') || name.includes('neutrophil') || name.includes('eosinophil'))) {
    return 'PATHOLOGY';
  }
  
  // Hormones
  if (name.includes('hormone') || name.includes('thyroid') || name.includes('tsh') ||
      name.includes('t3') || name.includes('t4') || name.includes('ft3') || name.includes('ft4') ||
      name.includes('testosterone') || name.includes('estradiol') || name.includes('progesterone') ||
      name.includes('prolactin') || name.includes('fsh') || name.includes('lh') ||
      name.includes('cortisol') || name.includes('insulin') || name.includes('hcg') ||
      name.includes('growth hormone') || name.includes('parathyroid') || name.includes('pth') ||
      name.includes('aldosterone') || name.includes('dhea') || name.includes('androstenedione')) {
    return 'CLINICAL BIOCHEMISTRY';
  }
  
  // Biochemistry
  if (name.includes('glucose') || name.includes('cholesterol') || name.includes('triglyceride') ||
      name.includes('hdl') || name.includes('ldl') || name.includes('vldl') || name.includes('lipid') ||
      name.includes('creatinine') || name.includes('urea') || name.includes('uric acid') ||
      name.includes('bilirubin') || name.includes('protein') || name.includes('albumin') ||
      name.includes('globulin') || name.includes('calcium') || name.includes('phosphorus') ||
      name.includes('sodium') || name.includes('potassium') || name.includes('chloride') ||
      name.includes('iron') || name.includes('ferritin') || name.includes('tibc') ||
      name.includes('vitamin') || name.includes('folate') || name.includes('b12') ||
      name.includes('alkaline phosphatase') || name.includes('alt') || name.includes('ast') ||
      name.includes('ggt') || name.includes('ldh') || name.includes('amylase') ||
      name.includes('lipase') || name.includes('cpk') || name.includes('ck-mb') ||
      name.includes('troponin') || name.includes('hba1c') || name.includes('glycosylated') ||
      name.includes('liver function') || name.includes('kidney function') || name.includes('lipid profile') ||
      name.includes('electrolyte') || name.includes('homocysteine') || name.includes('apolipoprotein')) {
    return 'CLINICAL BIOCHEMISTRY';
  }
  
  // Urine Analysis
  if (name.includes('urine') || name.includes('urinary') || name.includes('urinogram') ||
      name.includes('microalbumin') || name.includes('ketone') && name.includes('urine')) {
    return 'CLINICAL PATHOLOGY';
  }
  
  // Tumor Markers
  if (name.includes('cea') || name.includes('ca 125') || name.includes('ca 19-9') ||
      name.includes('afp') && name.includes('serum') || name.includes('psa') ||
      name.includes('cancer') || name.includes('chromogranin')) {
    return 'CLINICAL BIOCHEMISTRY';
  }
  
  // Molecular & Genetic
  if (name.includes('molecular') || name.includes('genetic') || name.includes('ngs') ||
      name.includes('gene panel') || name.includes('biomarker') || name.includes('kappa') ||
      name.includes('lambda') || name.includes('hla') || name.includes('cd4') || name.includes('cd8') ||
      name.includes('cd') && /cd[-\s]?\d+/.test(name)) {
    return 'MOLECULAR BIOLOGY';
  }
  
  // Allergy
  if (name.includes('ige') && !name.includes('total ige')) {
    return 'ALLERGY';
  }
  
  // Packages
  if (name.includes('profile') || name.includes('panel') || name.includes('package') ||
      name.includes('screen') && (name.includes('basic') || name.includes('comprehensive') || name.includes('fertility'))) {
    return 'PACKAGES';
  }
  
  // Fluid Analysis
  if (name.includes('csf') || name.includes('pleural') || name.includes('ascitic') ||
      name.includes('synovial') || name.includes('fluid examination')) {
    return 'CLINICAL PATHOLOGY';
  }
  
  // Stool
  if (name.includes('stool') || name.includes('occult blood') || name.includes('calprotectin')) {
    return 'CLINICAL PATHOLOGY';
  }
  
  // Default
  return 'CLINICAL BIOCHEMISTRY';
}

// Assign categories and other properties
const testsWithDetails = tests.map(test => ({
  id: test.id,
  name: test.name,
  price: test.mrp, // Use MRP as price
  original_price: test.mrp,
  discount: 17,
  parameters: 1, // Default to 1, can be updated later
  report_time: '24 Hours',
  fasting_required: test.name.toLowerCase().includes('fasting'),
  category: assignCategory(test.name),
  status: 'active'
}));

// Check for duplicates
const nameCount = {};
testsWithDetails.forEach(test => {
  nameCount[test.name] = (nameCount[test.name] || 0) + 1;
});

const duplicates = Object.entries(nameCount).filter(([name, count]) => count > 1);
if (duplicates.length > 0) {
  console.log('\n⚠️  Found duplicate test names:');
  duplicates.forEach(([name, count]) => {
    console.log(`  - "${name}" appears ${count} times`);
  });
}

// Remove duplicates (keep first occurrence)
const seen = new Set();
const uniqueTests = testsWithDetails.filter(test => {
  if (seen.has(test.name)) {
    return false;
  }
  seen.add(test.name);
  return true;
});

console.log(`\nOriginal tests: ${testsWithDetails.length}`);
console.log(`Unique tests: ${uniqueTests.length}`);
console.log(`Duplicates removed: ${testsWithDetails.length - uniqueTests.length}`);

// Generate SQL
function escapeString(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- New10Labs Data Import SQL
-- Generated: ${new Date().toISOString()}
-- Total: ${uniqueTests.length} unique tests + ${packagesData.packages.length} packages
-- 
-- Instructions:
-- 1. Open Supabase Dashboard
-- 2. Go to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute

-- Delete existing data
DELETE FROM tests;
DELETE FROM packages;

-- Insert Tests Data
`;

// Insert tests in batches of 50
const batchSize = 50;
for (let i = 0; i < uniqueTests.length; i += batchSize) {
  const batch = uniqueTests.slice(i, i + batchSize);
  
  sql += `\n-- Batch ${Math.floor(i / batchSize) + 1} (Tests ${i + 1} to ${Math.min(i + batchSize, uniqueTests.length)})\n`;
  sql += 'INSERT INTO tests (id, name, price, original_price, discount, parameters, report_time, fasting_required, category, status) VALUES\n';
  
  const values = batch.map(test => {
    return `  (${escapeString(test.id)}, ${escapeString(test.name)}, ${test.price}, ${test.original_price}, ${test.discount}, ${test.parameters}, ${escapeString(test.report_time)}, ${test.fasting_required ? 'true' : 'false'}, ${escapeString(test.category)}, 'active')`;
  });
  
  sql += values.join(',\n');
  sql += ';\n';
}

// Insert packages
sql += `\n-- Insert Packages Data\n`;
sql += 'INSERT INTO packages (id, name, price, original_price, discount, tests_count, popular, features, description, status) VALUES\n';

const packageValues = packagesData.packages.map(pkg => {
  const features = JSON.stringify(pkg.features || []).replace(/'/g, "''");
  return `  (${escapeString(pkg.id)}, ${escapeString(pkg.name)}, ${pkg.price}, ${pkg.original_price}, ${pkg.discount || 0}, ${pkg.tests_count || 0}, ${pkg.popular ? 'true' : 'false'}, '${features}'::jsonb, ${escapeString(pkg.description || null)}, ${escapeString(pkg.status || 'active')})`;
});

sql += packageValues.join(',\n');
sql += ';\n';

// Add verification queries
sql += `\n-- Verification Queries\n\n`;
sql += '-- Count tests\n';
sql += 'SELECT COUNT(*) as total_tests FROM tests;\n\n';
sql += '-- Count packages\n';
sql += 'SELECT COUNT(*) as total_packages FROM packages;\n\n';
sql += '-- Sample tests\n';
sql += 'SELECT id, name, price, category FROM tests LIMIT 10;\n\n';
sql += '-- Sample packages\n';
sql += 'SELECT id, name, price, tests_count FROM packages;\n\n';
sql += '-- Tests by category\n';
sql += 'SELECT category, COUNT(*) as count FROM tests GROUP BY category ORDER BY count DESC;\n';

// Write SQL file
fs.writeFileSync('supabase-data-import.sql', sql);

console.log('\n✅ SQL file generated successfully!');
console.log(`📄 File: supabase-data-import.sql`);
console.log(`\n📊 Summary:`);
console.log(`  - Tests: ${uniqueTests.length}`);
console.log(`  - Packages: ${packagesData.packages.length}`);

// Show category distribution
const categoryCount = {};
uniqueTests.forEach(test => {
  categoryCount[test.category] = (categoryCount[test.category] || 0) + 1;
});

console.log(`\n📋 Tests by Category:`);
Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`  - ${category}: ${count} tests`);
  });
