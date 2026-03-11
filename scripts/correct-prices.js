// Correct prices based on user's original data
const correctPrices = {
  '11': { name: 'Glucose - Fasting', mrp: 50 },
  '20': { name: 'Glucose - Postprandial', mrp: 40 },
  '42': { name: 'Glucose - Random', mrp: 40 },
  '47': { name: 'Cholesterol - Total', mrp: 50 },
  '5': { name: 'Phosphorus - Serum', mrp: 150 },
  '22': { name: 'Creatinine - 24 Hr Urine', mrp: 50 },
  '39': { name: 'Triglycerides (TGL)', mrp: 100 },
  '40': { name: 'Urea', mrp: 100 },
  '41': { name: 'Bilirubin Direct', mrp: 100 },
  '45': { name: 'Albumin', mrp: 100 },
  '21': { name: 'Thyroxine - Total (TT4)', mrp: 100 },
  '14': { name: 'Phosphorus - 24 Hr Urine', mrp: 100 },
};

console.log('Tests that need price correction:\n');
Object.entries(correctPrices).forEach(([id, data]) => {
  console.log(`ID ${id}: ${data.name} → ₹${data.mrp}`);
});

console.log('\n✅ These are the correct lowest-priced tests that should show in "Frequently Booked Tests"');
