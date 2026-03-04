-- ============================================
-- Newton's Lab - Complete 515 Test Data Import
-- Generated: 2026-03-04T14:11:14.181Z
-- Total Tests: 189
-- ============================================

-- Step 1: Clear all existing test data
TRUNCATE TABLE tests CASCADE;

-- Step 2: Insert all 189 tests

-- Test 1: Dual Marker With Graph
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-1', 'Dual Marker With Graph', 'CLINICAL BIOCHEMISTRY', 1600, 5333, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 2: Quad Marker With Graph
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-2', 'Quad Marker With Graph', 'CLINICAL BIOCHEMISTRY', 2000, 6667, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 3: Triple Marker With Graph
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-3', 'Triple Marker With Graph', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 4: Arthiritis Basic Screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-4', 'Arthiritis Basic Screen', 'PATHOLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 5: MAP59*
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-5', 'MAP59*', 'PACKAGES', 1412, 4707, 70, 43, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 6: MAP69*
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-6', 'MAP69*', 'PACKAGES', 1969, 6563, 70, 38, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 7: MAP79 *
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-7', 'MAP79 *', 'PACKAGES', 7807, 26023, 70, 48, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 8: MAP89*
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-8', 'MAP89*', 'PACKAGES', 8166, 27220, 70, 54, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 9: MAP99* FEMALE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-9', 'MAP99* FEMALE', 'PACKAGES', 11401, 38003, 70, 57, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 10: MAP99* MALE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-10', 'MAP99* MALE', 'PACKAGES', 11401, 38003, 70, 34, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 11: Antithrombin Panel
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-11', 'Antithrombin Panel', 'PACKAGES', 5000, 16667, 70, 34, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 12: Thyroid screening
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-12', 'Thyroid screening', 'PACKAGES', 2000, 6667, 70, 30, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 13: Breast Cancer screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-13', 'Breast Cancer screen', 'PACKAGES', 1500, 5000, 70, 55, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 14: 40 Plus Male Comprehensive Package
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-14', '40 Plus Male Comprehensive Package', 'PACKAGES', 2100, 7000, 70, 39, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 15: Phosphorus - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-15', 'Phosphorus - Serum', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 16: Total cholesterol/HDL ratio
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-16', 'Total cholesterol/HDL ratio', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 17: Vitamin - B12
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-17', 'Vitamin - B12', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 18: TGL‎/HDL Ratio
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-18', 'TGL‎/HDL Ratio', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 19: C-Peptide
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-19', 'C-Peptide', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 20: Iron
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-20', 'Iron', 'CLINICAL BIOCHEMISTRY', 200, 667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 21: Glucose - Fasting
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-21', 'Glucose - Fasting', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '1 Days 0 hr 0 min', true, 'active', NOW(), NOW());

-- Test 22: Protein Creatinine Ratio, Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-22', 'Protein Creatinine Ratio, Urine', 'CLINICAL BIOCHEMISTRY', 160, 533, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 23: Prostarate Specific Antigen, PSA Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-23', 'Prostarate Specific Antigen, PSA Total', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 24: Phosphorus - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-24', 'Phosphorus - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 25: Follicle Stimulating Hormone (FSH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-25', 'Follicle Stimulating Hormone (FSH)', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 26: Osmolality Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-26', 'Osmolality Urine', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 27: Creatinine Kinase (CPK)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-27', 'Creatinine Kinase (CPK)', 'CLINICAL BIOCHEMISTRY', 130, 433, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 28: Citric Acid Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-28', 'Citric Acid Serum', 'CLINICAL BIOCHEMISTRY', 1600, 5333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 29: C-Reactive Protein (CRP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-29', 'C-Reactive Protein (CRP)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 30: Glucose - Postprandial
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-30', 'Glucose - Postprandial', 'CLINICAL BIOCHEMISTRY', 40, 133, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 31: Thyroxine - Total (TT4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-31', 'Thyroxine - Total (TT4)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 32: Creatinine - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-32', 'Creatinine - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 33: Creatinine Clearence Test (CCT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-33', 'Creatinine Clearence Test (CCT)', 'CLINICAL BIOCHEMISTRY', 160, 533, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 34: Pregnancy Test
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-34', 'Pregnancy Test', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 35: Potassium - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-35', 'Potassium - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 36: Troponin - T (CLIA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-36', 'Troponin - T (CLIA)', 'CLINICAL BIOCHEMISTRY', 1250, 4167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 37: Lactate CSF
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-37', 'Lactate CSF', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 38: Lipoprotein a (Lp-a)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-38', 'Lipoprotein a (Lp-a)', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 39: Copper - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-39', 'Copper - Serum', 'CLINICAL BIOCHEMISTRY', 350, 1167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 40: Sex Hormone Binding Globulin (SHBG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-40', 'Sex Hormone Binding Globulin (SHBG)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 41: Protein - Random (Spot)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-41', 'Protein - Random (Spot)', 'CLINICAL BIOCHEMISTRY', 120, 400, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 42: Syphilis Antibodies (Total)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-42', 'Syphilis Antibodies (Total)', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 43: Microalbumin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-43', 'Microalbumin', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 44: Osmolality
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-44', 'Osmolality', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 45: Cholesterol - HDL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-45', 'Cholesterol - HDL', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 46: Calprotectin Stool
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-46', 'Calprotectin Stool', 'CLINICAL BIOCHEMISTRY', 3000, 10000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 47: Beta -2 Microglobulin Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-47', 'Beta -2 Microglobulin Urine', 'CLINICAL BIOCHEMISTRY', 1800, 6000, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 48: Complement 3 (C3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-48', 'Complement 3 (C3)', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 49: Triglycerides (TGL)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-49', 'Triglycerides (TGL)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 50: Urea
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-50', 'Urea', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 51: Bilirubin Direct
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-51', 'Bilirubin Direct', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 52: Glucose - Random
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-52', 'Glucose - Random', 'CLINICAL BIOCHEMISTRY', 40, 133, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 53: Creatine Kinase (CK-MB)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-53', 'Creatine Kinase (CK-MB)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 54: Carcino Embryonic Antigen (CEA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-54', 'Carcino Embryonic Antigen (CEA)', 'CLINICAL BIOCHEMISTRY', 560, 1867, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 55: Albumin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-55', 'Albumin', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 56: 24hrs Urinary Protein
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-56', '24hrs Urinary Protein', 'CLINICAL BIOCHEMISTRY', 120, 400, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 57: Cholesterol - Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-57', 'Cholesterol - Total', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 58: Glucose Challenge Test
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-58', 'Glucose Challenge Test', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 59: Lipase Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-59', 'Lipase Serum', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 60: Luteinising Hormone (LH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-60', 'Luteinising Hormone (LH)', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 61: Procalcitonin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-61', 'Procalcitonin', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 62: Cortisol (Saliva)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-62', 'Cortisol (Saliva)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 63: Progesterone
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-63', 'Progesterone', 'CLINICAL BIOCHEMISTRY', 450, 1500, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 64: Copper - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-64', 'Copper - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 350, 1167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 65: Oxalates - Plasma
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-65', 'Oxalates - Plasma', 'CLINICAL BIOCHEMISTRY', 2000, 6667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 66: 1,25 Di Hydroxy Vitamin D
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-66', '1,25 Di Hydroxy Vitamin D', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 67: Liver Function Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-67', 'Liver Function Profile', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 9, '-', false, 'active', NOW(), NOW());

-- Test 68: Triiodothyronine Free (FT3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-68', 'Triiodothyronine Free (FT3)', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 69: Protein Electrophoresis - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-69', 'Protein Electrophoresis - Serum', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 70: Complement 4 (C4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-70', 'Complement 4 (C4)', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 71: Erythropoietin (EPO)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-71', 'Erythropoietin (EPO)', 'CLINICAL BIOCHEMISTRY', 2250, 7500, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 72: Anti Microsomal/Thryroperoxidase Antibody (Anti TPO)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-72', 'Anti Microsomal/Thryroperoxidase Antibody (Anti TPO)', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 73: Testosterone - Free
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-73', 'Testosterone - Free', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 74: Urea 24 hrs Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-74', 'Urea 24 hrs Urine', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 75: Chloride - CSF
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-75', 'Chloride - CSF', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 76: Kidney Function test
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-76', 'Kidney Function test', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 77: Ketone Bodies, Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-77', 'Ketone Bodies, Serum', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 78: Estradiol (E2)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-78', 'Estradiol (E2)', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 79: Beta Human Chorionic Gonodotropin Hormone (Free Beta HCG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-79', 'Beta Human Chorionic Gonodotropin Hormone (Free Beta HCG)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 80: Insulin - Post prandial
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-80', 'Insulin - Post prandial', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 81: Lipid Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-81', 'Lipid Profile', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 6, '-', false, 'active', NOW(), NOW());

-- Test 82: Estriol, Unconjugated (E3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-82', 'Estriol, Unconjugated (E3)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 83: CA 19-9 IHC MARKER
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-83', 'CA 19-9 IHC MARKER', 'CLINICAL BIOCHEMISTRY', 6800, 22667, 70, 1, '5 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 84: IRON PROFILE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-84', 'IRON PROFILE', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 6, '-', false, 'active', NOW(), NOW());

-- Test 85: Alkaline Phosphatase (ALP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-85', 'Alkaline Phosphatase (ALP)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 86: Testosterone - TOTAL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-86', 'Testosterone - TOTAL', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 87: Lactate Dehyderogenase (LDH) - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-87', 'Lactate Dehyderogenase (LDH) - Serum', 'CLINICAL BIOCHEMISTRY', 200, 667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 88: Amylase Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-88', 'Amylase Serum', 'CLINICAL BIOCHEMISTRY', 225, 750, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 89: Thyroid Profile-I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-89', 'Thyroid Profile-I', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 6, '-', false, 'active', NOW(), NOW());

-- Test 90: Total IgE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-90', 'Total IgE', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 91: Glycosylated Hemoglobin (GHb/HBA1c)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-91', 'Glycosylated Hemoglobin (GHb/HBA1c)', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 92: Intact Parathyroid Hormone (iPTH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-92', 'Intact Parathyroid Hormone (iPTH)', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 93: Ceruloplasmin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-93', 'Ceruloplasmin', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 94: Thyroid Profile - III
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-94', 'Thyroid Profile - III', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 8, '-', false, 'active', NOW(), NOW());

-- Test 95: Oral Glucose Tolerance Test (O-GTT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-95', 'Oral Glucose Tolerance Test (O-GTT)', 'CLINICAL BIOCHEMISTRY', 240, 800, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 96: Sodium - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-96', 'Sodium - Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 97: Glucose-1hr
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-97', 'Glucose-1hr', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 98: Protein (CSF)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-98', 'Protein (CSF)', 'CLINICAL BIOCHEMISTRY', 120, 400, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 99: SOY
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-99', 'SOY', 'CLINICAL BIOCHEMISTRY', 2000, 6667, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 100: Gamma Glutamyl Transferase (GGT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-100', 'Gamma Glutamyl Transferase (GGT)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 101: Estimated Average Glucose (eAG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-101', 'Estimated Average Glucose (eAG)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 102: CA 125 Ovarian Cancer marker
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-102', 'CA 125 Ovarian Cancer marker', 'CLINICAL BIOCHEMISTRY', 850, 2833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 103: Kidney    Basic screen - For Profiles
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-103', 'Kidney    Basic screen - For Profiles', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 14, '-', false, 'active', NOW(), NOW());

-- Test 104: Urea/Creatinine Ratio
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-104', 'Urea/Creatinine Ratio', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 105: Lactate NaF Plasma
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-105', 'Lactate NaF Plasma', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 106: Kidney Function Test  Advanced
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-106', 'Kidney Function Test  Advanced', 'CLINICAL BIOCHEMISTRY', 2836, 9453, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 107: Uric Acid - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-107', 'Uric Acid - Serum', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 108: Cortisol Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-108', 'Cortisol Urine', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 109: Sodium - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-109', 'Sodium - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 110: Ammonia
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-110', 'Ammonia', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 111: Urine Albumin(Microalbumin)/Creatinine Ratio
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-111', 'Urine Albumin(Microalbumin)/Creatinine Ratio', 'CLINICAL BIOCHEMISTRY', 525, 1750, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 112: Chloride - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-112', 'Chloride - Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 113: Thyroxine - Free (FT4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-113', 'Thyroxine - Free (FT4)', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 114: Alpha Feto Protein (AFP) Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-114', 'Alpha Feto Protein (AFP) Serum', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 115: Anti Thyroglobulin Antibody (ATG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-115', 'Anti Thyroglobulin Antibody (ATG)', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 116: Creatinine - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-116', 'Creatinine - Serum', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 117: Alanine Transaminase (ALT/SGPT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-117', 'Alanine Transaminase (ALT/SGPT)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 118: Iron Binding Capacity - Total (TIBC)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-118', 'Iron Binding Capacity - Total (TIBC)', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 119: 25-Hydroxy Vitamin D Total (D2 & D3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-119', '25-Hydroxy Vitamin D Total (D2 & D3)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 120: SECOND TRIMESTER RISK
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-120', 'SECOND TRIMESTER RISK', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 121: Fertility    Profile - I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-121', 'Fertility    Profile - I', 'CLINICAL BIOCHEMISTRY', 750, 2500, 70, 8, '-', false, 'active', NOW(), NOW());

-- Test 122: Bence Jones protein (BJ protein)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-122', 'Bence Jones protein (BJ protein)', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 123: Stone Analysis
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-123', 'Stone Analysis', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 124: Prolactin (PRL)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-124', 'Prolactin (PRL)', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 125: Immunofixation Electrophoresis - Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-125', 'Immunofixation Electrophoresis - Urine', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 126: Bilirubin Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-126', 'Bilirubin Total', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 127: Electrolyte Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-127', 'Electrolyte Profile', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 10, '-', false, 'active', NOW(), NOW());

-- Test 128: Cortisol Serum (3 to 5 PM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-128', 'Cortisol Serum (3 to 5 PM)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 129: Random Urine Glucose
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-129', 'Random Urine Glucose', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 130: IgG (CSF)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-130', 'IgG (CSF)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 131: Transferrin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-131', 'Transferrin', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 132: Thyroxin Binding Globulin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-132', 'Thyroxin Binding Globulin', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 133: Zinc Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-133', 'Zinc Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '10 hr 0 min', false, 'active', NOW(), NOW());

-- Test 134: Zinc (ICP-AAS)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-134', 'Zinc (ICP-AAS)', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 135: LIPID PROFILE  [ 9 ]
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-135', 'LIPID PROFILE  [ 9 ]', 'CLINICAL BIOCHEMISTRY', 450, 1500, 70, 10, '-', false, 'active', NOW(), NOW());

-- Test 136: Liver Function Test  [ 13 ]
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-136', 'Liver Function Test  [ 13 ]', 'CLINICAL BIOCHEMISTRY', 480, 1600, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 137: Transferrin %
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-137', 'Transferrin %', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 138: Drugs of Abuse (5 Drugs)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-138', 'Drugs of Abuse (5 Drugs)', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 139: Fasting Urine Glucose
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-139', 'Fasting Urine Glucose', 'CLINICAL BIOCHEMISTRY', 80, 267, 70, 1, '-', true, 'active', NOW(), NOW());

-- Test 140: AST/ALT
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-140', 'AST/ALT', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 141: Bilirubin (Total + Direct)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-141', 'Bilirubin (Total + Direct)', 'CLINICAL BIOCHEMISTRY', 160, 533, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 142: Protein Total with Albumin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-142', 'Protein Total with Albumin', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 143: Benzodiazepines
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-143', 'Benzodiazepines', 'CLINICAL BIOCHEMISTRY', 1250, 4167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 144: High Sensitive CRP (hsCRP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-144', 'High Sensitive CRP (hsCRP)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 145: Phenytoin (Eptoin)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-145', 'Phenytoin (Eptoin)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 146: Alpha Feto Protein (AFP) - Ascitic Fluid
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-146', 'Alpha Feto Protein (AFP) - Ascitic Fluid', 'CLINICAL BIOCHEMISTRY', 350, 1167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 147: Cortisol Serum (7 to 9 AM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-147', 'Cortisol Serum (7 to 9 AM)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 148: Apolipoprotein B (APO-B)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-148', 'Apolipoprotein B (APO-B)', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 149: Insulin Fasting
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-149', 'Insulin Fasting', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '6 hr 0 min', true, 'active', NOW(), NOW());

-- Test 150: Chloride - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-150', 'Chloride - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 151: Protein Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-151', 'Protein Total', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 152: Amylase Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-152', 'Amylase Urine', 'CLINICAL BIOCHEMISTRY', 225, 750, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 153: Globulin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-153', 'Globulin', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 154: Potassium - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-154', 'Potassium - Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 155: Thyroid Profile-II
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-155', 'Thyroid Profile-II', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 7, '-', false, 'active', NOW(), NOW());

-- Test 156: PAPP-A
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-156', 'PAPP-A', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 157: Thyroid Profile -IV
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-157', 'Thyroid Profile -IV', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 7, '-', false, 'active', NOW(), NOW());

-- Test 158: Thyroid Stimulating Hormone (TSH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-158', 'Thyroid Stimulating Hormone (TSH)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 159: ELECTROLYTES PROFILE urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-159', 'ELECTROLYTES PROFILE urine', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 9, '-', false, 'active', NOW(), NOW());

-- Test 160: eGFR
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-160', 'eGFR', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 161: Iron Deficiency Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-161', 'Iron Deficiency Profile', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 8, '-', false, 'active', NOW(), NOW());

-- Test 162: HOMA-IR; Insulin Resistance
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-162', 'HOMA-IR; Insulin Resistance', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 163: Calcium - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-163', 'Calcium - Serum', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 164: Ionized Calcium
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-164', 'Ionized Calcium', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 165: Triiodothyronine Total (TT3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-165', 'Triiodothyronine Total (TT3)', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 166: Ferritin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-166', 'Ferritin', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 167: Apolipoprotein A1 (APO-A1)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-167', 'Apolipoprotein A1 (APO-A1)', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 168: Beta 2 Microglobulin Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-168', 'Beta 2 Microglobulin Serum', 'CLINICAL BIOCHEMISTRY', 1800, 6000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 169: Angiotensin Converting Enzyme (ACE) CSF
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-169', 'Angiotensin Converting Enzyme (ACE) CSF', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 170: Bicarbonate
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-170', 'Bicarbonate', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 171: Aspartate Aminotransferase (AST/SGOT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-171', 'Aspartate Aminotransferase (AST/SGOT)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 172: Growth Hormone (HGH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-172', 'Growth Hormone (HGH)', 'CLINICAL BIOCHEMISTRY', 850, 2833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 173: Homocysteine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-173', 'Homocysteine', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 174: Beta Human Chorionic Gonodotropin Hormone (Beta HCG) - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-174', 'Beta Human Chorionic Gonodotropin Hormone (Beta HCG) - Serum', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 175: Acid Phosphatase - Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-175', 'Acid Phosphatase - Total', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 176: Cholesterol - LDL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-176', 'Cholesterol - LDL', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 177: Protein - Fluids
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-177', 'Protein - Fluids', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 178: Fluid Examination Routine Pleural Fluid
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-178', 'Fluid Examination Routine Pleural Fluid', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 179: Glomerular Filtration Rate (eGFR)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-179', 'Glomerular Filtration Rate (eGFR)', 'CLINICAL BIOCHEMISTRY', 200, 667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 180: Troponin - I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-180', 'Troponin - I', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 181: Bile Acids-Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-181', 'Bile Acids-Total', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 182: Calcium - 24 Hr Urine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-182', 'Calcium - 24 Hr Urine', 'CLINICAL BIOCHEMISTRY', 80, 267, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 183: Post Prandial Urine Glucose
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-183', 'Post Prandial Urine Glucose', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 184: Rheumatoid Factor (RA test)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-184', 'Rheumatoid Factor (RA test)', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 185: Cholesterol VLDL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-185', 'Cholesterol VLDL', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 186: Vitamin Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-186', 'Vitamin Profile', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 9, '-', false, 'active', NOW(), NOW());

-- Test 187: Kidney    Basic screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-187', 'Kidney    Basic screen', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 188: Folate Serum (Folic Acid)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-188', 'Folate Serum (Folic Acid)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 189: HOMA-IR- 2; Insulin Resistance
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-189', 'HOMA-IR- 2; Insulin Resistance', 'CLINICAL BIOCHEMISTRY', 1600, 5333, 70, 1, '-', false, 'active', NOW(), NOW());


-- ============================================
-- Verification Queries
-- ============================================

-- Check total count
SELECT COUNT(*) as total_tests FROM tests;

-- Check by category
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- Check for duplicates
SELECT name, COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;

-- Sample tests
SELECT id, name, price, category FROM tests LIMIT 10;
