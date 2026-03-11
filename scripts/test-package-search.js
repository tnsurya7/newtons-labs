const fs = require('fs');

// Read packages file
const content = fs.readFileSync('lib/data/hardcoded-packages.ts', 'utf8');

// Extract package names
const packages = [];
const regex = /name: '([^']+)'/g;
let match;

while ((match = regex.exec(content)) !== null) {
  packages.push(match[1]);
}

console.log('📦 PACKAGE SEARCH TEST\n');
console.log(`Total packages: ${packages.length}\n`);

// Normalization function (same as API)
function normalizeSearchString(str) {
  return str.toLowerCase()
    .replace(/[\s\-\/\\(),.]/g, '')
    .replace(/[&]/g, 'and')
    .replace(/\*/g, '');
}

// Test searches
const testSearches = [
  'map59',
  'MAP 59',
  'map69',
  'thyroid',
  'arthritis',
  'health package',
  'female',
  'male',
  'checkup'
];

console.log('🔍 SEARCH RESULTS:\n');

testSearches.forEach(query => {
  const normalizedQuery = normalizeSearchString(query);
  const matches = packages.filter(pkgName => {
    const normalizedName = normalizeSearchString(pkgName);
    return normalizedName.includes(normalizedQuery);
  });
  
  console.log(`Query: "${query}"`);
  if (matches.length > 0) {
    console.log(`✓ Found ${matches.length} package(s):`);
    matches.forEach(m => console.log(`  - ${m}`));
  } else {
    console.log(`✗ No matches`);
  }
  console.log('');
});

console.log('📋 ALL PACKAGES:\n');
packages.forEach((pkg, index) => {
  console.log(`${index + 1}. ${pkg}`);
});
