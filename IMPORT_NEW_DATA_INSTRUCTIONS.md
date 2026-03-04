# Import New Test Data to Supabase

## Overview
You have provided new test data with additional fields (Sample Type, TAT, Department). This guide will help you import this data into Supabase.

## Data Format
Your data includes:
- Test Name
- MRP (₹)
- Sample Type
- Average TAT (Turnaround Time)
- Department

## Quick Import Steps

### Option 1: Direct Supabase Import (Recommended)

1. **Prepare CSV File**
   - Convert your data to CSV format with columns:
     ```
     name,price,sample_type,report_time,category
     ```

2. **Import via Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to Table Editor → `tests` table
   - Click "Insert" → "Import data from CSV"
   - Map columns appropriately
   - Set these defaults:
     - `status`: 'active'
     - `fasting`: false (update specific tests later)
     - `parameters`: 1 (update packages later)
     - `discount`: 70
     - `original_price`: price * 3.33 (for 70% discount)

### Option 2: Use Excel/Google Sheets

1. **Create Spreadsheet** with columns:
   ```
   name | price | original_price | discount | parameters | report_time | fasting | category | status
   ```

2. **Fill Data**:
   - `name`: Test name from your data
   - `price`: MRP value
   - `original_price`: Calculate as `price / (1 - discount/100)`
   - `discount`: 70 (or calculate based on your pricing)
   - `parameters`: 1 for single tests, higher for packages/profiles
   - `report_time`: TAT from your data
   - `fasting`: TRUE/FALSE based on test type
   - `category`: Department from your data
   - `status`: 'active'

3. **Export as CSV** and import to Supabase

### Option 3: Generate SQL Script

I can create a custom SQL generator for you. To do this:

1. **Save your data** in a text file with this format (pipe-separated):
   ```
   TestName|MRP|SampleType|TAT|Department
   ```

2. **Example**:
   ```
   Dual Marker With Graph|1600||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
   Vitamin - B12|600|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
   ```

3. **Run the generator**:
   ```bash
   # Edit generate-complete-sql.js and paste your data
   # Then run:
   node generate-complete-sql.js
   ```

4. **Import the generated SQL**:
   - Go to Supabase SQL Editor
   - Paste the generated SQL
   - Execute

## Data Mapping

### Categories (Department → category)
- CLINICAL BIOCHEMISTRY
- IMMUNOLOGY / SEROLOGY
- HAEMATOLOGY
- MICROBIOLOGY
- CLINICAL PATHOLOGY
- IMMUNO-HEMATOLOGY
- PATHOLOGY
- PACKAGES
- MOLECULAR BIOLOGY

### Sample Types
- SERUM
- WB EDTA (Whole Blood EDTA)
- Urine
- Plasma
- CSF (Cerebrospinal Fluid)
- Stool
- Swab
- etc.

### Report Time (TAT)
- Format: "X Days Y hr Z min"
- Examples: "1 Days 0 hr 0 min", "24 hours", "2-3 days"

### Fasting Requirements
Tests that typically require fasting:
- Glucose tests (Fasting, Random, PP)
- Lipid Profile
- Cholesterol tests
- Triglycerides
- Liver Function Tests (some)

### Parameters Count
- Single tests: 1
- Small profiles: 3-8
- Medium profiles: 10-20
- Large packages: 20-80+

## Pricing Calculation

If you want to show discounts:

```javascript
// For 70% discount:
originalPrice = price / 0.30  // price is 30% of original
discount = 70

// For 50% discount:
originalPrice = price / 0.50  // price is 50% of original
discount = 50

// For 91% discount (maximum shown):
originalPrice = price / 0.09  // price is 9% of original
discount = 91
```

## After Import

1. **Verify the import**:
   ```bash
   node verify-database-import.js
   ```

2. **Check the website**:
   - Visit http://localhost:3000
   - Go to /tests page
   - Search for specific tests
   - Check categories

3. **Update specific fields** if needed:
   ```sql
   -- Update fasting requirement for glucose tests
   UPDATE tests 
   SET fasting = true 
   WHERE name ILIKE '%glucose%' OR name ILIKE '%fasting%';

   -- Update parameters for profiles
   UPDATE tests 
   SET parameters = 10 
   WHERE name ILIKE '%profile%' OR name ILIKE '%panel%';
   ```

## Need Help?

If you need me to:
1. Generate the complete SQL file
2. Create a CSV file
3. Write a custom import script

Just provide the data in a structured format (text file, CSV, or even paste it directly) and I'll process it for you!

## Current Status

- ✅ Database schema ready
- ✅ API endpoints created
- ✅ Frontend components updated
- ⏳ Waiting for complete test data import
- ⏳ Need to verify data after import

## Next Steps

1. Choose your import method (Option 1, 2, or 3)
2. Prepare your data
3. Import to Supabase
4. Verify the import
5. Test the website
