const fs = require('fs');

// Parse the test data you provided
const rawTestData = `1.	Dual Marker With Graph — 1600 — Serum — 2 Days
2.	Quad Marker With Graph — 2000 — Serum — 2 Days
3.	Triple Marker With Graph — 1500 — Serum — 2 Days
4.	Arthiritis Basic Screen — 1500 — Serum — 1 Day
5.	Phosphorus - Serum — 150 — Serum — 1 Day
6.	Total cholesterol/HDL ratio — 300 — Serum — 1 Day
7.	Vitamin - B12 — 600 — Serum — 1 Day
8.	TGL /HDL Ratio — 300 — Serum — 1 Day
9.	C-Peptide — 1500 — Serum — 1 Day
10.	Iron — 200 — Serum — 1 Day
11.	Glucose - Fasting — 50 — Naf Plasma — 1 Day
12.	Protein Creatinine Ratio, Urine — 160 — Urine — 1 Day
13.	Prostarate Specific Antigen, PSA Total — 500 — Serum — 1 Day
14.	Phosphorus - 24 Hr Urine — 100 — Urine — 1 Day
15.	Follicle Stimulating Hormone (FSH) — 250 — Serum — 1 Day
16.	Osmolality Urine — 800 — Urine — 1 Day
17.	Creatinine Kinase (CPK) — 130 — Serum — 1 Day
18.	Citric Acid Serum — 1600 — Serum — 1 Day
19.	C-Reactive Protein (CRP) — 550 — Serum — 1 Day
20.	Glucose - Postprandial — 40 — Plasma Naf — 1 Day`;

// This is just a sample - you'll need to add all 502 tests
// For now, let me show you the structure

const lines = rawTestData.split('\n');
const tests = [];

lines.forEach(line => {
  const match = line.match(/^(\d+)\.\s+(.+?)\s+—\s+(\d+)\s+—\s+(.+?)\s+—\s+(.+)$/);
  if (match) {
    const [, id, name, price, sampleType, tat] = match;
    
    // Determine category based on test name and sample type
    let category = 'CLINICAL BIOCHEMISTRY';
    let department = 'CLINICAL BIOCHEMISTRY';
    
    if (name.includes('Glucose') || name.includes('Cholesterol') || name.includes('Lipid')) {
      category = 'General Health';
    } else if (sampleType.includes('Urine')) {
      category = 'Kidney & Urine';
    } else if (name.includes('CRP') || name.includes('Antibody')) {
      category = 'IMMUNOLOGY / SEROLOGY';
      department = 'IMMUNOLOGY / SEROLOGY';
    }
    
    tests.push({
      id,
      name: name.trim(),
      price: parseInt(price),
      mrp: parseInt(price),
      sample_type: sampleType.trim(),
      tat: tat.trim(),
      department,
      category,
      fasting_required: name.includes('Fasting'),
      status: 'active'
    });
  }
});

console.log(`Parsed ${tests.length} tests`);
console.log('Sample:', JSON.stringify(tests[0], null, 2));
