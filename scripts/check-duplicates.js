const fs = require('fs');
const path = require('path');

// Read the current hardcoded-tests.ts file
const filePath = path.join(__dirname, '..', 'lib', 'data', 'hardcoded-tests.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Extract all test objects
const testMatches = content.match(/{ id: '\d+', name: '[^']+', [^}]+}/g);

if (testMatches) {
  console.log(`📊 Total tests found: ${testMatches.length}`);
  
  // Extract test names
  const testNames = testMatches.map(test => {
    const nameMatch = test.match(/name: '([^']+)'/);
    return nameMatch ? nameMatch[1] : null;
  }).filter(Boolean);
  
  // Find duplicates
  const nameCount = {};
  const duplicates = [];
  
  testNames.forEach((name, index) => {
    if (nameCount[name]) {
      nameCount[name].push(index + 1);
    } else {
      nameCount[name] = [index + 1];
    }
  });
  
  // Check for duplicates
  Object.keys(nameCount).forEach(name => {
    if (nameCount[name].length > 1) {
      duplicates.push({
        name: name,
        ids: nameCount[name]
      });
    }
  });
  
  if (duplicates.length > 0) {
    console.log(`❌ Found ${duplicates.length} duplicate test names:`);
    duplicates.forEach(dup => {
      console.log(`   "${dup.name}" appears in IDs: ${dup.ids.join(', ')}`);
    });
  } else {
    console.log('✅ No duplicate test names found!');
  }
  
  // Check ID sequence
  const ids = testMatches.map(test => {
    const idMatch = test.match(/id: '(\d+)'/);
    return idMatch ? parseInt(idMatch[1]) : null;
  }).filter(id => id !== null);
  
  const expectedIds = Array.from({length: ids.length}, (_, i) => i + 1);
  const missingIds = expectedIds.filter(id => !ids.includes(id));
  const extraIds = ids.filter(id => !expectedIds.includes(id));
  
  if (missingIds.length > 0 || extraIds.length > 0) {
    console.log('❌ ID sequence issues:');
    if (missingIds.length > 0) console.log(`   Missing IDs: ${missingIds.join(', ')}`);
    if (extraIds.length > 0) console.log(`   Extra IDs: ${extraIds.join(', ')}`);
  } else {
    console.log('✅ All IDs are sequential from 1 to ' + ids.length);
  }
  
} else {
  console.log('❌ No test objects found');
}