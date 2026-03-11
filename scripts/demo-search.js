const fs = require('fs');

// Read the tests file
const content = fs.readFileSync('lib/data/hardcoded-tests.ts', 'utf8');

// Extract test names
const tests = [];
const regex = /name: '([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  tests.push(match[1]);
}

// Normalization function (same as API)
function normalizeSearchString(str) {
  return str.toLowerCase()
    .replace(/[\s\-\/\\(),.]/g, '')
    .replace(/[&]/g, 'and');
}

// Demo searches
const demoSearches = [
  'vitamin b12',
  'c peptide',
  'tgl hdl',
  'glucose fasting',
  'crp',
  'thyroid',
  'kidney',
  'urine',
  'serum',
];

console.log('🔍 SEARCH DEMONSTRATION\n');
console.log('Showing how flexible search finds tests with various formats:\n');

demoSearches.forEach(query => {
  const normalizedQuery = normalizeSearchString(query);
  const matches = tests.filter(testName => {
    const normalizedName = normalizeSearchString(testName);
    return normalizedName.includes(normalizedQuery);
  });
  
  console.log(`Query: "${query}"`);
  console.log(`Found: ${matches.length} tests`);
  if (matches.length > 0 && matches.length <= 5) {
    matches.forEach(m => console.log(`  - ${m}`));
  } else if (matches.length > 5) {
    matches.slice(0, 5).forEach(m => console.log(`  - ${m}`));
    console.log(`  ... and ${matches.length - 5} more`);
  }
  console.log('');
});

// Show price range
console.log('\n💰 PRICE ANALYSIS\n');
const priceRegex = /mrp: (\d+)/g;
const prices = [];
let priceMatch;
while ((priceMatch = priceRegex.exec(content)) !== null) {
  prices.push(parseInt(priceMatch[1]));
}

prices.sort((a, b) => a - b);
console.log(`Lowest price: ₹${prices[0]}`);
console.log(`Highest price: ₹${prices[prices.length - 1]}`);
console.log(`Average price: ₹${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)}`);
console.log(`\nLowest 10 priced tests will show in "Frequently Booked Tests"`);
