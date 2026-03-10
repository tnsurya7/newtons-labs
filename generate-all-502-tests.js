const fs = require('fs');

// All 502 tests data
const tests = [];

// Add all tests with proper categorization
for (let i = 1; i <= 502; i++) {
  let category = 'General Health';
  let department = 'CLINICAL BIOCHEMISTRY';
  
  // Categorize based on ID ranges
  if (i >= 19 && i <= 50) {
    category = 'IMMUNOLOGY / SEROLOGY';
    department = 'IMMUNOLOGY / SEROLOGY';
  } else if (i >= 179 && i <= 250) {
    category = 'HAEMATOLOGY';
    department = 'HAEMATOLOGY';
  } else if (i >= 180 && i <= 300) {
    category = 'MICROBIOLOGY';
    department = 'MICROBIOLOGY';
  } else if (i >= 300 && i <= 502) {
    category = 'MOLECULAR BIOLOGY';
    department = 'MOLECULAR BIOLOGY';
  }
  
  // Special cases for Kidney & Urine tests
  if ([12, 14, 16, 22, 23, 25, 31, 33, 37, 46, 54, 64, 98, 99, 101, 112, 115, 119, 128, 129, 133, 140, 142, 149, 172, 173, 195, 200, 201, 208, 290, 291, 348, 361, 386, 432, 474].includes(i)) {
    category = 'Kidney & Urine';
  }
  
  tests.push({
    id: i.toString(),
    name: `Test ${i}`,
    price: Math.floor(Math.random() * 2000) + 50,
    mrp: Math.floor(Math.random() * 2000) + 50,
    sample_type: ['Serum', 'Blood', 'Urine', 'Plasma'][Math.floor(Math.random() * 4)],
    tat: ['1 Day', '2 Days', '6 hr', '8 hr'][Math.floor(Math.random() * 4)],
    department,
    category,
    fasting_required: Math.random() > 0.8,
    status: 'active'
  });
}

// Generate the TypeScript file content
const content = `// Hardcoded tests data - 502 comprehensive tests
export const HARDCODED_TESTS = [
${tests.map(test => `  { id: '${test.id}', name: '${test.name}', price: ${test.price}, mrp: ${test.mrp}, sample_type: '${test.sample_type}', tat: '${test.tat}', department: '${test.department}', category: '${test.category}', fasting_required: ${test.fasting_required}, status: '${test.status}' }`).join(',\n')}
];`;

// Write to file
fs.writeFileSync('lib/data/hardcoded-tests.ts', content);
console.log(`Generated ${tests.length} tests successfully!`);

// Count by category
const categoryCounts = {};
tests.forEach(test => {
  categoryCounts[test.category] = (categoryCounts[test.category] || 0) + 1;
});

console.log('Tests by category:');
Object.entries(categoryCounts).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} tests`);
});