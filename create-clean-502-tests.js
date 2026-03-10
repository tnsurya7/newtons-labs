const fs = require('fs');

// Generate clean 502 tests file
const header = `// Hardcoded tests data - 502 comprehensive tests
export const HARDCODED_TESTS = [`;

const footer = `];`;

// Read current file and extract valid test entries
const currentContent = fs.readFileSync('lib/data/hardcoded-tests.ts', 'utf8');
const testMatches = currentContent.match(/{ id: '\d+',.*?status: 'active' }/g);

console.log(`Found ${testMatches ? testMatches.length : 0} test entries`);

if (testMatches && testMatches.length > 0) {
  // Clean and deduplicate tests
  const uniqueTests = [];
  const seenIds = new Set();
  
  testMatches.forEach(testStr => {
    const idMatch = testStr.match(/id: '(\d+)'/);
    if (idMatch) {
      const id = idMatch[1];
      if (!seenIds.has(id)) {
        seenIds.add(id);
        uniqueTests.push('  ' + testStr + ',');
      }
    }
  });
  
  console.log(`Unique tests: ${uniqueTests.length}`);
  
  // Write clean file
  const cleanContent = header + '\n' + uniqueTests.join('\n') + '\n' + footer;
  fs.writeFileSync('lib/data/hardcoded-tests.ts', cleanContent);
  
  console.log('Clean file written successfully!');
} else {
  console.log('No valid test entries found');
}