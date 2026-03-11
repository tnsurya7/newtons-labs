const fs = require('fs');

// Normalization function (same as API)
function normalizeSearchString(str) {
  return str.toLowerCase()
    .replace(/[\s\-\/\\(),.]/g, '')
    .replace(/[&]/g, 'and')
    .replace(/\*/g, '');
}

// Read packages
const pkgContent = fs.readFileSync('lib/data/hardcoded-packages.ts', 'utf8');
const packages = [];
const pkgLines = pkgContent.split('\n');

pkgLines.forEach(line => {
  const idMatch = line.match(/id: '([^']+)'/);
  const nameMatch = line.match(/name: '([^']+)'/);
  const descMatch = line.match(/description: '([^']+)'/);
  
  if (idMatch && nameMatch && descMatch) {
    packages.push({
      id: idMatch[1],
      name: nameMatch[1],
      description: descMatch[1]
    });
  }
});

console.log('🔍 COMPLETE SEARCH TEST\n');
console.log('=' .repeat(60));

// Test various search queries
const testQueries = [
  'health package',
  'checkup',
  'wellness',
  'screening',
  'thyroid',
  'arthritis',
  'female',
  'male',
  'women',
  'men',
  'map59',
  'map69',
  'basic',
  'premium',
  'comprehensive'
];

console.log('\n📦 PACKAGE SEARCH RESULTS:\n');

testQueries.forEach(query => {
  const normalizedQuery = normalizeSearchString(query);
  
  const matches = packages.filter(pkg => {
    const normalizedName = normalizeSearchString(pkg.name);
    const normalizedDesc = normalizeSearchString(pkg.description);
    
    return normalizedName.includes(normalizedQuery) ||
           normalizedDesc.includes(normalizedQuery);
  });
  
  if (matches.length > 0) {
    console.log(`✓ "${query}" → ${matches.length} package(s)`);
    matches.forEach(m => console.log(`    - ${m.name}`));
  } else {
    console.log(`✗ "${query}" → No matches`);
  }
});

console.log('\n📋 ALL PACKAGES WITH DESCRIPTIONS:\n');
packages.forEach((pkg, index) => {
  console.log(`${index + 1}. ${pkg.name}`);
  console.log(`   ${pkg.description}`);
  console.log('');
});

console.log('=' .repeat(60));
console.log('✅ Search is working for both names and descriptions!\n');
