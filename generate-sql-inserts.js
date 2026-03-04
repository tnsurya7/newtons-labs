// Generate SQL INSERT statements for Supabase
const fs = require('fs');
const path = require('path');

// Read data files
const allTestsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/data/all-tests.json'), 'utf8'));
const packagesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/data/packages.json'), 'utf8'));

function escapeString(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function generateTestsSQL() {
  let sql = '-- Insert Tests Data\n';
  sql += '-- Total: ' + allTestsData.allTests.length + ' tests\n\n';
  
  // Delete existing data
  sql += 'DELETE FROM tests;\n\n';
  
  // Generate INSERT statements in batches
  const batchSize = 50;
  
  for (let i = 0; i < allTestsData.allTests.length; i += batchSize) {
    const batch = allTestsData.allTests.slice(i, i + batchSize);
    
    sql += `-- Batch ${Math.floor(i / batchSize) + 1} (Tests ${i + 1} to ${Math.min(i + batchSize, allTestsData.allTests.length)})\n`;
    sql += 'INSERT INTO tests (id, name, price, original_price, discount, parameters, report_time, fasting_required, category, status) VALUES\n';
    
    const values = batch.map(test => {
      return `  (${escapeString(test.id)}, ${escapeString(test.name)}, ${test.price}, ${test.originalPrice}, ${test.discount || 0}, ${test.parameters || 0}, ${escapeString(test.reportTime || '24 Hours')}, ${test.fasting ? 'true' : 'false'}, ${escapeString(test.category || 'General')}, 'active')`;
    });
    
    sql += values.join(',\n');
    sql += ';\n\n';
  }
  
  return sql;
}

function generatePackagesSQL() {
  let sql = '-- Insert Packages Data\n';
  sql += '-- Total: ' + packagesData.packages.length + ' packages\n\n';
  
  // Delete existing data
  sql += 'DELETE FROM packages;\n\n';
  
  sql += 'INSERT INTO packages (id, name, price, original_price, discount, tests_count, popular, features, description, status) VALUES\n';
  
  const values = packagesData.packages.map(pkg => {
    const features = JSON.stringify(pkg.features || []).replace(/'/g, "''");
    return `  (${escapeString(pkg.id)}, ${escapeString(pkg.name)}, ${pkg.price}, ${pkg.original_price}, ${pkg.discount || 0}, ${pkg.tests_count || 0}, ${pkg.popular ? 'true' : 'false'}, '${features}'::jsonb, ${escapeString(pkg.description || null)}, ${escapeString(pkg.status || 'active')})`;
  });
  
  sql += values.join(',\n');
  sql += ';\n\n';
  
  return sql;
}

function generateVerificationSQL() {
  let sql = '-- Verification Queries\n\n';
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
  
  return sql;
}

// Generate all SQL
console.log('🚀 Generating SQL INSERT statements...\n');

const testsSQL = generateTestsSQL();
const packagesSQL = generatePackagesSQL();
const verificationSQL = generateVerificationSQL();

const fullSQL = `-- New10Labs Data Import SQL
-- Generated: ${new Date().toISOString()}
-- 
-- Instructions:
-- 1. Open Supabase Dashboard
-- 2. Go to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute
--
-- This will:
-- - Delete existing tests and packages
-- - Insert all 516 tests
-- - Insert all 8 packages
-- - Run verification queries

${testsSQL}

${packagesSQL}

${verificationSQL}
`;

// Write to file
const outputPath = path.join(__dirname, 'supabase-data-import.sql');
fs.writeFileSync(outputPath, fullSQL, 'utf8');

console.log('✅ SQL file generated successfully!');
console.log(`📄 File: ${outputPath}`);
console.log(`\n📊 Summary:`);
console.log(`  - Tests: ${allTestsData.allTests.length}`);
console.log(`  - Packages: ${packagesData.packages.length}`);
console.log(`\n📋 Next Steps:`);
console.log(`  1. Open Supabase Dashboard: https://supabase.com/dashboard`);
console.log(`  2. Select your project`);
console.log(`  3. Go to SQL Editor`);
console.log(`  4. Click "New Query"`);
console.log(`  5. Copy contents of: supabase-data-import.sql`);
console.log(`  6. Paste and click "Run"`);
console.log(`\n⚠️  Note: This will DELETE existing data and insert fresh data`);
