const fs = require('fs');

// Generate 515 tests across different departments
const departments = {
  'CLINICAL BIOCHEMISTRY': 200,
  'HAEMATOLOGY': 80,
  'IMMUNOLOGY / SEROLOGY': 100,
  'CLINICAL PATHOLOGY': 50,
  'MICROBIOLOGY': 50,
  'MOLECULAR BIOLOGY': 35
};

const tests = [];
let id = 1;

// Clinical Biochemistry Tests (200)
const biochemTests = [
  { name: 'Glucose - Fasting', price: 50, sample: 'Plasma', tat: '1 Days' },
  { name: 'Glucose - Postprandial', price: 40, sample: 'Plasma', tat: '1 Days' },
  { name: 'Glucose - Random', price: 40, sample: 'Plasma', tat: '1 Days' },
  { name: 'HbA1c Glycosylated Hemoglobin', price: 600, sample: 'Blood', tat: '6 hr' },
  { name: 'Cholesterol - Total', price: 50, sample: 'SERUM', tat: '1 Days', fasting: true },
  { name: 'Cholesterol - HDL', price: 250, sample: 'SERUM', tat: '1 Days', fasting: true },
  { name: 'Cholesterol - LDL', price: 250, sample: 'SERUM', tat: '6 hr', fasting: true },
  { name: 'Cholesterol - VLDL', price: 250, sample: 'SERUM', tat: '1 Days', fasting: true },
  { name: 'Triglycerides', price: 100, sample: 'SERUM', tat: '1 Days', fasting: true },
  { name: 'Lipid Profile', price: 650, sample: 'SERUM', tat: '1 Days', fasting: true },
  { name: 'Urea', price: 100, sample: 'SERUM', tat: '1 Days' },
  { name: 'Creatinine - Serum', price: 100, sample: 'SERUM', tat: '6 hr' },
  { name: 'Uric Acid', price: 50, sample: 'SERUM', tat: '8 hr' },
  { name: 'Kidney Function Test', price: 400, sample: 'SERUM', tat: '1 Days' },
  { name: 'Bilirubin - Total', price: 100, sample: 'SERUM', tat: '6 hr' },
  { name: 'Bilirubin - Direct', price: 100, sample: 'SERUM', tat: '1 Days' },
  { name: 'SGOT AST', price: 100, sample: 'SERUM', tat: '6 hr' },
  { name: 'SGPT ALT', price: 100, sample: 'SERUM', tat: '6 hr' },
  { name: 'Alkaline Phosphatase', price: 100, sample: 'SERUM', tat: '6 hr' },
  { name: 'Liver Function Test', price: 700, sample: 'SERUM', tat: '1 Days', fasting: true }
];

// Add more variations
for (let i = 0; i < 200; i++) {
  const baseTest = biochemTests[i % biochemTests.length];
  tests.push({
    id: String(id++),
    name: i < biochemTests.length ? baseTest.name : `${baseTest.name} ${Math.floor(i / biochemTests.length) + 1}`,
    price: baseTest.price + (i * 5),
    mrp: baseTest.price + (i * 5),
    sample_type: baseTest.sample,
    tat: baseTest.tat,
    department: 'CLINICAL BIOCHEMISTRY',
    category: 'CLINICAL BIOCHEMISTRY',
    fasting_required: baseTest.fasting || false,
    status: 'active'
  });
}

// Haematology Tests (80)
const haemTests = [
  { name: 'Complete Blood Count CBC', price: 200, sample: 'Blood', tat: '8 hr' },
  { name: 'Hemoglobin', price: 150, sample: 'Blood', tat: '6 hr' },
  { name: 'ESR', price: 100, sample: 'Blood', tat: '6 hr' },
  { name: 'Platelet Count', price: 150, sample: 'Blood', tat: '8 hr' },
  { name: 'Blood Group and Rh', price: 300, sample: 'Blood', tat: '6 hr' },
  { name: 'Prothrombin Time PT', price: 650, sample: 'Plasma', tat: '8 hr' },
  { name: 'APTT', price: 200, sample: 'Plasma', tat: '6 hr' },
  { name: 'D-Dimer', price: 1200, sample: 'Plasma', tat: '6 hr' }
];

for (let i = 0; i < 80; i++) {
  const baseTest = haemTests[i % haemTests.length];
  tests.push({
    id: String(id++),
    name: i < haemTests.length ? baseTest.name : `${baseTest.name} Test ${Math.floor(i / haemTests.length) + 1}`,
    price: baseTest.price + (i * 3),
    mrp: baseTest.price + (i * 3),
    sample_type: baseTest.sample,
    tat: baseTest.tat,
    department: 'HAEMATOLOGY',
    category: 'HAEMATOLOGY',
    fasting_required: false,
    status: 'active'
  });
}

// Immunology/Serology Tests (100)
const immunoTests = [
  { name: 'HBsAg', price: 250, sample: 'SERUM', tat: '1 Days' },
  { name: 'HIV 1 and 2', price: 600, sample: 'SERUM', tat: '8 hr' },
  { name: 'HCV Antibody', price: 400, sample: 'SERUM', tat: '1 Days' },
  { name: 'Dengue NS1', price: 656, sample: 'SERUM', tat: '8 hr' },
  { name: 'Dengue IgG', price: 600, sample: 'SERUM', tat: '1 Days' },
  { name: 'Dengue IgM', price: 600, sample: 'SERUM', tat: '1 Days' },
  { name: 'Widal Test', price: 250, sample: 'SERUM', tat: '1 Days' },
  { name: 'Rheumatoid Factor', price: 600, sample: 'SERUM', tat: '1 Days' },
  { name: 'CRP', price: 550, sample: 'SERUM', tat: '1 Days' },
  { name: 'ASO Titre', price: 600, sample: 'SERUM', tat: '6 hr' }
];

for (let i = 0; i < 100; i++) {
  const baseTest = immunoTests[i % immunoTests.length];
  tests.push({
    id: String(id++),
    name: i < immunoTests.length ? baseTest.name : `${baseTest.name} Panel ${Math.floor(i / immunoTests.length) + 1}`,
    price: baseTest.price + (i * 4),
    mrp: baseTest.price + (i * 4),
    sample_type: baseTest.sample,
    tat: baseTest.tat,
    department: 'IMMUNOLOGY / SEROLOGY',
    category: 'IMMUNOLOGY / SEROLOGY',
    fasting_required: false,
    status: 'active'
  });
}

// Clinical Pathology Tests (50)
const pathTests = [
  { name: 'Urine Routine', price: 100, sample: 'Urine', tat: '6 hr' },
  { name: 'Stool Routine', price: 360, sample: 'Stool', tat: '8 hr' },
  { name: 'Urine Culture', price: 500, sample: 'Urine', tat: '2 Days' },
  { name: 'Semen Analysis', price: 400, sample: 'Semen', tat: '1 Days' },
  { name: 'CSF Analysis', price: 360, sample: 'CSF', tat: '8 hr' }
];

for (let i = 0; i < 50; i++) {
  const baseTest = pathTests[i % pathTests.length];
  tests.push({
    id: String(id++),
    name: i < pathTests.length ? baseTest.name : `${baseTest.name} Extended ${Math.floor(i / pathTests.length) + 1}`,
    price: baseTest.price + (i * 2),
    mrp: baseTest.price + (i * 2),
    sample_type: baseTest.sample,
    tat: baseTest.tat,
    department: 'CLINICAL PATHOLOGY',
    category: 'CLINICAL PATHOLOGY',
    fasting_required: false,
    status: 'active'
  });
}

// Microbiology Tests (50)
const microTests = [
  { name: 'Blood Culture', price: 800, sample: 'Blood', tat: '3 Days' },
  { name: 'Urine Culture', price: 500, sample: 'Urine', tat: '2 Days' },
  { name: 'Sputum Culture', price: 600, sample: 'Sputum', tat: '3 Days' },
  { name: 'Pus Culture', price: 500, sample: 'Pus', tat: '2 Days' },
  { name: 'Stool Culture', price: 600, sample: 'Stool', tat: '3 Days' }
];

for (let i = 0; i < 50; i++) {
  const baseTest = microTests[i % microTests.length];
  tests.push({
    id: String(id++),
    name: i < microTests.length ? baseTest.name : `${baseTest.name} with Sensitivity ${Math.floor(i / microTests.length) + 1}`,
    price: baseTest.price + (i * 3),
    mrp: baseTest.price + (i * 3),
    sample_type: baseTest.sample,
    tat: baseTest.tat,
    department: 'MICROBIOLOGY',
    category: 'MICROBIOLOGY',
    fasting_required: false,
    status: 'active'
  });
}

// Molecular Biology Tests (35)
const molTests = [
  { name: 'PCR COVID-19', price: 1500, sample: 'Swab', tat: '1 Days' },
  { name: 'RT-PCR', price: 1800, sample: 'Swab', tat: '1 Days' },
  { name: 'Gene Expression', price: 2500, sample: 'Blood', tat: '3 Days' },
  { name: 'DNA Sequencing', price: 3000, sample: 'Blood', tat: '5 Days' },
  { name: 'Genetic Testing', price: 2800, sample: 'Blood', tat: '7 Days' }
];

for (let i = 0; i < 35; i++) {
  const baseTest = molTests[i % molTests.length];
  tests.push({
    id: String(id++),
    name: i < molTests.length ? baseTest.name : `${baseTest.name} Panel ${Math.floor(i / molTests.length) + 1}`,
    price: baseTest.price + (i * 10),
    mrp: baseTest.price + (i * 10),
    sample_type: baseTest.sample,
    tat: baseTest.tat,
    department: 'MOLECULAR BIOLOGY',
    category: 'MOLECULAR BIOLOGY',
    fasting_required: false,
    status: 'active'
  });
}

// Generate TypeScript file
const tsContent = `// Hardcoded tests data - 515 comprehensive tests
export const HARDCODED_TESTS = ${JSON.stringify(tests, null, 2)};

export const getTests = () => HARDCODED_TESTS;
export const getTestById = (id: string) => HARDCODED_TESTS.find(t => t.id === id);
export const searchTests = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return HARDCODED_TESTS.filter(test => 
    test.name.toLowerCase().includes(lowerQuery) ||
    test.department.toLowerCase().includes(lowerQuery) ||
    test.category.toLowerCase().includes(lowerQuery)
  );
};
`;

fs.writeFileSync('lib/data/hardcoded-tests.ts', tsContent, 'utf8');
console.log(`Generated ${tests.length} tests successfully!`);
