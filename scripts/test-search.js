// Test search normalization
function normalizeSearchString(str) {
  return str.toLowerCase()
    .replace(/[\s\-\/\\(),.]/g, '')
    .replace(/[&]/g, 'and');
}

const testCases = [
  { input: 'C-Peptide', normalized: normalizeSearchString('C-Peptide') },
  { input: 'c peptide', normalized: normalizeSearchString('c peptide') },
  { input: 'CPEPTIDE', normalized: normalizeSearchString('CPEPTIDE') },
  { input: 'C Peptide', normalized: normalizeSearchString('C Peptide') },
  { input: 'Vitamin - B12', normalized: normalizeSearchString('Vitamin - B12') },
  { input: 'vitamin b12', normalized: normalizeSearchString('vitamin b12') },
  { input: 'VitaminB12', normalized: normalizeSearchString('VitaminB12') },
  { input: 'TGL /HDL Ratio', normalized: normalizeSearchString('TGL /HDL Ratio') },
  { input: 'tgl hdl ratio', normalized: normalizeSearchString('tgl hdl ratio') },
  { input: 'TGLHDL', normalized: normalizeSearchString('TGLHDL') },
];

console.log('Search Normalization Test Results:\n');
testCases.forEach(test => {
  console.log(`Input: "${test.input}"`);
  console.log(`Normalized: "${test.normalized}"`);
  console.log('---');
});

// Test if different formats match
const testName = 'C-Peptide';
const normalizedTestName = normalizeSearchString(testName);

const searchQueries = ['c-peptide', 'c peptide', 'cpeptide', 'C Peptide', 'CPEPTIDE'];
console.log(`\nTest: Does "${testName}" match various search queries?\n`);
searchQueries.forEach(query => {
  const normalizedQuery = normalizeSearchString(query);
  const matches = normalizedTestName.includes(normalizedQuery);
  console.log(`Query: "${query}" → ${matches ? '✓ MATCH' : '✗ NO MATCH'}`);
});
