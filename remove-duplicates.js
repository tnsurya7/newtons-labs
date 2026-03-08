// Remove duplicate tests (those ending with " 2", " 3", etc.)
const fs = require('fs');

const content = fs.readFileSync('lib/data/hardcoded-tests.ts', 'utf8');
const lines = content.split('\n');

const output = [];
let testCount = 0;
let newId = 1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Keep header and export lines
  if (line.includes('// Hardcoded') || line.includes('export const')) {
    output.push(line);
    continue;
  }
  
  // Check if this is a test line
  if (line.includes("{ id: '")) {
    // Check if the test name ends with a space and number (duplicate pattern)
    const nameMatch = line.match(/name: '([^']+)'/);
    if (nameMatch) {
      const testName = nameMatch[1];
      // Skip if name ends with " 2", " 3", " 4", etc.
      if (/\s+\d+$/.test(testName)) {
        console.log(`Skipping duplicate: ${testName}`);
        continue;
      }
      
      // This is a unique test - update the ID and add it
      const updatedLine = line.replace(/id: '\d+'/, `id: '${newId}'`);
      output.push(updatedLine);
      testCount++;
      newId++;
    }
  } else if (line.trim() === '];') {
    // Add closing bracket
    output.push(line);
  }
}

fs.writeFileSync('lib/data/hardcoded-tests.ts', output.join('\n'));
console.log(`\n✅ Removed duplicates! Kept ${testCount} unique tests`);
console.log(`File saved to: lib/data/hardcoded-tests.ts`);
