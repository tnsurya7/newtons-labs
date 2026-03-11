const fs = require('fs');

// Read the tests file
const content = fs.readFileSync('lib/data/hardcoded-tests.ts', 'utf8');

// Extract all tests with their prices
const tests = [];
const lines = content.split('\n');

lines.forEach(line => {
  const idMatch = line.match(/id: '(\d+)'/);
  const nameMatch = line.match(/name: '([^']+)'/);
  const priceMatch = line.match(/price: (\d+)/);
  const mrpMatch = line.match(/mrp: (\d+)/);
  
  if (idMatch && nameMatch && priceMatch && mrpMatch) {
    tests.push({
      id: idMatch[1],
      name: nameMatch[1],
      price: parseInt(priceMatch[1]),
      mrp: parseInt(mrpMatch[1])
    });
  }
});

console.log(`Total tests found: ${tests.length}\n`);

// Sort by MRP (actual selling price)
tests.sort((a, b) => a.mrp - b.mrp);

console.log('🏆 TOP 20 LOWEST PRICED TESTS:\n');
console.log('Rank | ID  | Price | Test Name');
console.log('-----|-----|-------|------------------------------------------');

tests.slice(0, 20).forEach((test, index) => {
  const rank = (index + 1).toString().padStart(2, ' ');
  const id = test.id.padStart(3, ' ');
  const price = `₹${test.mrp}`.padStart(6, ' ');
  console.log(`${rank}   | ${id} | ${price} | ${test.name}`);
});

console.log('\n📊 PRICE STATISTICS:\n');
console.log(`Lowest price: ₹${tests[0].mrp} (${tests[0].name})`);
console.log(`Highest price: ₹${tests[tests.length - 1].mrp} (${tests[tests.length - 1].name})`);

// Count tests by price range
const ranges = [
  { min: 0, max: 50, count: 0 },
  { min: 51, max: 100, count: 0 },
  { min: 101, max: 200, count: 0 },
  { min: 201, max: 500, count: 0 },
  { min: 501, max: 1000, count: 0 },
  { min: 1001, max: 2000, count: 0 },
  { min: 2001, max: 99999, count: 0 }
];

tests.forEach(test => {
  const range = ranges.find(r => test.mrp >= r.min && test.mrp <= r.max);
  if (range) range.count++;
});

console.log('\n💰 PRICE DISTRIBUTION:\n');
ranges.forEach(range => {
  const label = range.max === 99999 
    ? `₹${range.min}+` 
    : `₹${range.min}-${range.max}`;
  console.log(`${label.padEnd(15)} : ${range.count} tests`);
});

// Find tests under ₹100
const cheapTests = tests.filter(t => t.mrp <= 100);
console.log(`\n✨ Tests under ₹100: ${cheapTests.length} tests\n`);
cheapTests.forEach(test => {
  console.log(`  ₹${test.mrp.toString().padStart(3)} - ${test.name}`);
});
