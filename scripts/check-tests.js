const fs = require('fs');

const content = fs.readFileSync('lib/data/hardcoded-tests.ts', 'utf8');
const tests = [];
const regex = /{ id: '(\d+)', name: '([^']+)'/g;
let match;

while ((match = regex.exec(content)) !== null) {
  tests.push({ id: match[1], name: match[2] });
}

console.log('Total tests found:', tests.length);

// Check for duplicate IDs
const ids = tests.map(t => t.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  console.log('Duplicate IDs found:', [...new Set(duplicateIds)]);
} else {
  console.log('✓ No duplicate IDs found');
}

// Check for duplicate names
const names = tests.map(t => t.name);
const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
if (duplicateNames.length > 0) {
  console.log('Duplicate names found:', [...new Set(duplicateNames)].slice(0, 10));
} else {
  console.log('✓ No duplicate names found');
}

// Check ID sequence
const missingIds = [];
for (let i = 1; i <= 502; i++) {
  if (!ids.includes(i.toString())) {
    missingIds.push(i);
  }
}
if (missingIds.length > 0) {
  console.log('Missing IDs:', missingIds.slice(0, 20));
} else {
  console.log('✓ All IDs from 1-502 present');
}

console.log('\nFirst 10 tests:');
tests.slice(0, 10).forEach(t => console.log(`  ${t.id}: ${t.name}`));
