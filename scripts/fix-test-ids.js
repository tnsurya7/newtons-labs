const fs = require('fs');
const path = require('path');

// Read the current hardcoded-tests.ts file
const filePath = path.join(__dirname, '..', 'lib', 'data', 'hardcoded-tests.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Extract all test objects
const testMatches = content.match(/{ id: '\d+', name: '[^']+', [^}]+}/g);

if (testMatches) {
  console.log(`Found ${testMatches.length} tests`);
  
  // Fix IDs to be sequential starting from 1
  let fixedContent = content;
  testMatches.forEach((testMatch, index) => {
    const currentId = testMatch.match(/id: '(\d+)'/)[1];
    const newId = (index + 1).toString();
    
    if (currentId !== newId) {
      console.log(`Fixing ID ${currentId} -> ${newId}`);
      const fixedTest = testMatch.replace(/id: '\d+'/, `id: '${newId}'`);
      fixedContent = fixedContent.replace(testMatch, fixedTest);
    }
  });
  
  // Write the fixed content back
  fs.writeFileSync(filePath, fixedContent);
  console.log('✅ Fixed all test IDs to be sequential');
  console.log(`Total tests: ${testMatches.length}`);
} else {
  console.log('❌ No test objects found');
}