const fs = require('fs');

// Read the raw data (you'll need to paste the data)
const rawData = `Dual Marker With Graph   1600      2 Days 0 hr 0 min   CLINICAL BIOCHEMISTRY
Quad Marker With Graph   2000      2 Days 0 hr 0 min   CLINICAL BIOCHEMISTRY
Triple Marker With Graph   1500      2 Days 0 hr 0 min   CLINICAL BIOCHEMISTRY
Arthiritis Basic Screen   1500      1 Days 0 hr 0 min   PATHOLOGY
MAP59*   1412      1 Days 0 hr 0 min   PACKAGES
MAP69*   1969      1 Days 0 hr 0 min   PACKAGES
MAP79 *   7807      1 Days 0 hr 0 min   PACKAGES
MAP89*   8166      2 Days 0 hr 0 min   PACKAGES
MAP99* FEMALE   11401      2 Days 0 hr 0 min   PACKAGES
MAP99* MALE   11401      2 Days 0 hr 0 min   PACKAGES
Antithrombin Panel   5000      2 Days 0 hr 0 min   PACKAGES
Thyroid screening   2000      2 Days 0 hr 0 min   PACKAGES
Breast Cancer screen   1500      2 Days 0 hr 0 min   PACKAGES
40 Plus Male Comprehensive Package   2100      1 Days 0 hr 0 min   PACKAGES`;

// Parse the data
const lines = rawData.trim().split('\n');
const tests = [];

lines.forEach(line => {
  // Split by multiple spaces to separate fields
  const parts = line.split(/\s{2,}/);
  
  if (parts.length >= 4) {
    const name = parts[0].trim();
    const mrp = parseInt(parts[1].trim());
    const sampleType = parts[2].trim() || '';
    const tat = parts[3].trim();
    const department = parts[4] ? parts[4].trim() : '';
    
    tests.push({
      name,
      mrp,
      sampleType,
      tat,
      department
    });
  }
});

console.log(`Parsed ${tests.length} tests`);
console.log('Sample:', tests[0]);

// Save to JSON
fs.writeFileSync('parsed-new-tests.json', JSON.stringify(tests, null, 2));
console.log('Saved to parsed-new-tests.json');
