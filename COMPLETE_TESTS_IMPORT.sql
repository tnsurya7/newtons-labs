-- ============================================
-- Newton's Lab - Complete Test Data Import
-- Generated: 2026-03-04T14:36:13.457Z
-- Total Tests: 328
-- ============================================

-- Step 1: Clear all existing test data
TRUNCATE TABLE tests CASCADE;

-- Step 2: Insert all 328 tests

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
VALUES ('test-5', 'MAP59*', 'PACKAGES', 1412, 4707, 70, 30, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 6: MAP69*
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-6', 'MAP69*', 'PACKAGES', 1969, 6563, 70, 59, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 7: MAP79 *
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-7', 'MAP79 *', 'PACKAGES', 7807, 26023, 70, 28, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 8: MAP89*
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-8', 'MAP89*', 'PACKAGES', 8166, 27220, 70, 54, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 9: MAP99* FEMALE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-9', 'MAP99* FEMALE', 'PACKAGES', 11401, 38003, 70, 41, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 10: MAP99* MALE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-10', 'MAP99* MALE', 'PACKAGES', 11401, 38003, 70, 40, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 11: Antithrombin Panel
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-11', 'Antithrombin Panel', 'PACKAGES', 5000, 16667, 70, 29, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 12: Thyroid screening
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-12', 'Thyroid screening', 'PACKAGES', 2000, 6667, 70, 38, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 13: Breast Cancer screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-13', 'Breast Cancer screen', 'PACKAGES', 1500, 5000, 70, 41, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 14: 40 Plus Male Comprehensive Package
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-14', '40 Plus Male Comprehensive Package', 'PACKAGES', 2100, 7000, 70, 21, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

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

-- Test 21: Prostarate Specific Antigen, PSA Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-21', 'Prostarate Specific Antigen, PSA Total', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 22: Follicle Stimulating Hormone (FSH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-22', 'Follicle Stimulating Hormone (FSH)', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 23: Creatinine Kinase (CPK)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-23', 'Creatinine Kinase (CPK)', 'CLINICAL BIOCHEMISTRY', 130, 433, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 24: Citric Acid Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-24', 'Citric Acid Serum', 'CLINICAL BIOCHEMISTRY', 1600, 5333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 25: C-Reactive Protein (CRP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-25', 'C-Reactive Protein (CRP)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 26: Thyroxine - Total (TT4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-26', 'Thyroxine - Total (TT4)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 27: Troponin - T (CLIA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-27', 'Troponin - T (CLIA)', 'CLINICAL BIOCHEMISTRY', 1250, 4167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 28: Lipoprotein a (Lp-a)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-28', 'Lipoprotein a (Lp-a)', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 29: Copper - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-29', 'Copper - Serum', 'CLINICAL BIOCHEMISTRY', 350, 1167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 30: Sex Hormone Binding Globulin (SHBG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-30', 'Sex Hormone Binding Globulin (SHBG)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 31: Syphilis Antibodies (Total)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-31', 'Syphilis Antibodies (Total)', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 32: Osmolality
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-32', 'Osmolality', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 33: Cholesterol - HDL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-33', 'Cholesterol - HDL', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 34: Complement 3 (C3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-34', 'Complement 3 (C3)', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 35: Triglycerides (TGL)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-35', 'Triglycerides (TGL)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 36: Urea
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-36', 'Urea', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 37: Bilirubin Direct
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-37', 'Bilirubin Direct', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 38: Creatine Kinase (CK-MB)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-38', 'Creatine Kinase (CK-MB)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 39: Carcino Embryonic Antigen (CEA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-39', 'Carcino Embryonic Antigen (CEA)', 'CLINICAL BIOCHEMISTRY', 560, 1867, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 40: Albumin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-40', 'Albumin', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 41: Cholesterol - Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-41', 'Cholesterol - Total', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 42: Lipase Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-42', 'Lipase Serum', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 43: Luteinising Hormone (LH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-43', 'Luteinising Hormone (LH)', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 44: Procalcitonin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-44', 'Procalcitonin', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 45: Progesterone
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-45', 'Progesterone', 'CLINICAL BIOCHEMISTRY', 450, 1500, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 46: 1,25 Di Hydroxy Vitamin D
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-46', '1,25 Di Hydroxy Vitamin D', 'CLINICAL BIOCHEMISTRY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 47: Liver Function Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-47', 'Liver Function Profile', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 10, '-', false, 'active', NOW(), NOW());

-- Test 48: Triiodothyronine Free (FT3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-48', 'Triiodothyronine Free (FT3)', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 49: Protein Electrophoresis - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-49', 'Protein Electrophoresis - Serum', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 50: Complement 4 (C4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-50', 'Complement 4 (C4)', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 51: Erythropoietin (EPO)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-51', 'Erythropoietin (EPO)', 'CLINICAL BIOCHEMISTRY', 2250, 7500, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 52: Anti Microsomal/Thryroperoxidase Antibody (Anti TPO)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-52', 'Anti Microsomal/Thryroperoxidase Antibody (Anti TPO)', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 53: Testosterone - Free
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-53', 'Testosterone - Free', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 54: Kidney Function test
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-54', 'Kidney Function test', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 55: Ketone Bodies, Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-55', 'Ketone Bodies, Serum', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 56: Estradiol (E2)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-56', 'Estradiol (E2)', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 57: Beta Human Chorionic Gonodotropin Hormone (Free Beta HCG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-57', 'Beta Human Chorionic Gonodotropin Hormone (Free Beta HCG)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 58: Insulin - Post prandial
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-58', 'Insulin - Post prandial', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 59: Lipid Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-59', 'Lipid Profile', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 6, '-', false, 'active', NOW(), NOW());

-- Test 60: Estriol, Unconjugated (E3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-60', 'Estriol, Unconjugated (E3)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 61: IRON PROFILE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-61', 'IRON PROFILE', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 7, '-', false, 'active', NOW(), NOW());

-- Test 62: Alkaline Phosphatase (ALP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-62', 'Alkaline Phosphatase (ALP)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 63: Testosterone - TOTAL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-63', 'Testosterone - TOTAL', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 64: Lactate Dehyderogenase (LDH) - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-64', 'Lactate Dehyderogenase (LDH) - Serum', 'CLINICAL BIOCHEMISTRY', 200, 667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 65: Amylase Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-65', 'Amylase Serum', 'CLINICAL BIOCHEMISTRY', 225, 750, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 66: Thyroid Profile-I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-66', 'Thyroid Profile-I', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 13, '-', false, 'active', NOW(), NOW());

-- Test 67: Total IgE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-67', 'Total IgE', 'CLINICAL BIOCHEMISTRY', 700, 2333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 68: Intact Parathyroid Hormone (iPTH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-68', 'Intact Parathyroid Hormone (iPTH)', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 69: Ceruloplasmin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-69', 'Ceruloplasmin', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 70: Thyroid Profile - III
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-70', 'Thyroid Profile - III', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 12, '-', false, 'active', NOW(), NOW());

-- Test 71: Sodium - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-71', 'Sodium - Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 72: SOY
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-72', 'SOY', 'CLINICAL BIOCHEMISTRY', 2000, 6667, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 73: Gamma Glutamyl Transferase (GGT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-73', 'Gamma Glutamyl Transferase (GGT)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 74: CA 125 Ovarian Cancer marker
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-74', 'CA 125 Ovarian Cancer marker', 'CLINICAL BIOCHEMISTRY', 850, 2833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 75: Kidney  Basic screen - For Profiles
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-75', 'Kidney  Basic screen - For Profiles', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 13, '-', false, 'active', NOW(), NOW());

-- Test 76: Urea/Creatinine Ratio
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-76', 'Urea/Creatinine Ratio', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 77: Kidney Function Test  Advanced
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-77', 'Kidney Function Test  Advanced', 'CLINICAL BIOCHEMISTRY', 2836, 9453, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 78: Uric Acid - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-78', 'Uric Acid - Serum', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 79: Chloride - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-79', 'Chloride - Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 80: Thyroxine - Free (FT4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-80', 'Thyroxine - Free (FT4)', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 81: Alpha Feto Protein (AFP) Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-81', 'Alpha Feto Protein (AFP) Serum', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 82: Anti Thyroglobulin Antibody (ATG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-82', 'Anti Thyroglobulin Antibody (ATG)', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 83: Creatinine - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-83', 'Creatinine - Serum', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 84: Alanine Transaminase (ALT/SGPT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-84', 'Alanine Transaminase (ALT/SGPT)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 85: Iron Binding Capacity - Total (TIBC)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-85', 'Iron Binding Capacity - Total (TIBC)', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 86: 25-Hydroxy Vitamin D Total (D2 & D3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-86', '25-Hydroxy Vitamin D Total (D2 & D3)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 87: SECOND TRIMESTER RISK
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-87', 'SECOND TRIMESTER RISK', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 88: Fertility  Profile - I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-88', 'Fertility  Profile - I', 'CLINICAL BIOCHEMISTRY', 750, 2500, 70, 12, '-', false, 'active', NOW(), NOW());

-- Test 89: Stone Analysis
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-89', 'Stone Analysis', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 90: Prolactin (PRL)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-90', 'Prolactin (PRL)', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 91: Bilirubin Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-91', 'Bilirubin Total', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 92: Electrolyte Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-92', 'Electrolyte Profile', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 8, '-', false, 'active', NOW(), NOW());

-- Test 93: Cortisol Serum (3 to 5 PM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-93', 'Cortisol Serum (3 to 5 PM)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 94: Transferrin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-94', 'Transferrin', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 95: Thyroxin Binding Globulin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-95', 'Thyroxin Binding Globulin', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 96: Zinc Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-96', 'Zinc Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '10 hr 0 min', false, 'active', NOW(), NOW());

-- Test 97: Zinc (ICP-AAS)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-97', 'Zinc (ICP-AAS)', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 98: LIPID PROFILE  [ 9 ]
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-98', 'LIPID PROFILE  [ 9 ]', 'CLINICAL BIOCHEMISTRY', 450, 1500, 70, 7, '-', false, 'active', NOW(), NOW());

-- Test 99: Liver Function Test  [ 13 ]
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-99', 'Liver Function Test  [ 13 ]', 'CLINICAL BIOCHEMISTRY', 480, 1600, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 100: Transferrin %
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-100', 'Transferrin %', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 101: AST/ALT
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-101', 'AST/ALT', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 102: Bilirubin (Total + Direct)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-102', 'Bilirubin (Total + Direct)', 'CLINICAL BIOCHEMISTRY', 160, 533, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 103: Protein Total with Albumin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-103', 'Protein Total with Albumin', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 104: High Sensitive CRP (hsCRP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-104', 'High Sensitive CRP (hsCRP)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 105: Phenytoin (Eptoin)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-105', 'Phenytoin (Eptoin)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 106: Cortisol Serum (7 to 9 AM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-106', 'Cortisol Serum (7 to 9 AM)', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 107: Apolipoprotein B (APO-B)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-107', 'Apolipoprotein B (APO-B)', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 108: Insulin Fasting
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-108', 'Insulin Fasting', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 1, '6 hr 0 min', true, 'active', NOW(), NOW());

-- Test 109: Protein Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-109', 'Protein Total', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 110: Globulin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-110', 'Globulin', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 111: Potassium - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-111', 'Potassium - Serum', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 112: Thyroid Profile-II
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-112', 'Thyroid Profile-II', 'CLINICAL BIOCHEMISTRY', 500, 1667, 70, 5, '-', false, 'active', NOW(), NOW());

-- Test 113: PAPP-A
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-113', 'PAPP-A', 'CLINICAL BIOCHEMISTRY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 114: Thyroid Profile -IV
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-114', 'Thyroid Profile -IV', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 10, '-', false, 'active', NOW(), NOW());

-- Test 115: Thyroid Stimulating Hormone (TSH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-115', 'Thyroid Stimulating Hormone (TSH)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 116: eGFR
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-116', 'eGFR', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 117: Iron Deficiency Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-117', 'Iron Deficiency Profile', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 6, '-', false, 'active', NOW(), NOW());

-- Test 118: Calcium - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-118', 'Calcium - Serum', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 119: Ionized Calcium
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-119', 'Ionized Calcium', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 120: Triiodothyronine Total (TT3)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-120', 'Triiodothyronine Total (TT3)', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 121: Ferritin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-121', 'Ferritin', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 122: Apolipoprotein A1 (APO-A1)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-122', 'Apolipoprotein A1 (APO-A1)', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 123: Beta 2 Microglobulin Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-123', 'Beta 2 Microglobulin Serum', 'CLINICAL BIOCHEMISTRY', 1800, 6000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 124: Bicarbonate
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-124', 'Bicarbonate', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 125: Aspartate Aminotransferase (AST/SGOT)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-125', 'Aspartate Aminotransferase (AST/SGOT)', 'CLINICAL BIOCHEMISTRY', 100, 333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 126: Growth Hormone (HGH)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-126', 'Growth Hormone (HGH)', 'CLINICAL BIOCHEMISTRY', 850, 2833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 127: Homocysteine
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-127', 'Homocysteine', 'CLINICAL BIOCHEMISTRY', 900, 3000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 128: Beta Human Chorionic Gonodotropin Hormone (Beta HCG) - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-128', 'Beta Human Chorionic Gonodotropin Hormone (Beta HCG) - Serum', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 129: Acid Phosphatase - Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-129', 'Acid Phosphatase - Total', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 130: Cholesterol - LDL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-130', 'Cholesterol - LDL', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 131: Glomerular Filtration Rate (eGFR)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-131', 'Glomerular Filtration Rate (eGFR)', 'CLINICAL BIOCHEMISTRY', 200, 667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 132: Troponin - I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-132', 'Troponin - I', 'CLINICAL BIOCHEMISTRY', 650, 2167, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 133: Bile Acids-Total
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-133', 'Bile Acids-Total', 'CLINICAL BIOCHEMISTRY', 800, 2667, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 134: Rheumatoid Factor (RA test)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-134', 'Rheumatoid Factor (RA test)', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 135: Cholesterol VLDL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-135', 'Cholesterol VLDL', 'CLINICAL BIOCHEMISTRY', 250, 833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 136: Vitamin Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-136', 'Vitamin Profile', 'CLINICAL BIOCHEMISTRY', 1000, 3333, 70, 11, '-', false, 'active', NOW(), NOW());

-- Test 137: Kidney  Basic screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-137', 'Kidney  Basic screen', 'CLINICAL BIOCHEMISTRY', 400, 1333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 138: Folate Serum (Folic Acid)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-138', 'Folate Serum (Folic Acid)', 'CLINICAL BIOCHEMISTRY', 550, 1833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 139: Coombs Test - Indirect
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-139', 'Coombs Test - Indirect', 'HAEMATOLOGY', 450, 1500, 70, 1, '2 days 0 min', false, 'active', NOW(), NOW());

-- Test 140: Anti Phospholipid Antibody IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-140', 'Anti Phospholipid Antibody IgM', 'IMMUNO-HEMATOLOGY', 850, 2833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 141: Chikungunya Rapid
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-141', 'Chikungunya Rapid', 'IMMUNO-HEMATOLOGY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 142: Herpes Simplex Virus 2 IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-142', 'Herpes Simplex Virus 2 IgG', 'IMMUNO-HEMATOLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 143: Thyroglobulin
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-143', 'Thyroglobulin', 'CLINICAL PATHOLOGY', 1250, 4167, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 144: Fungal Stain-BAL FLUID
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-144', 'Fungal Stain-BAL FLUID', 'MICROBIOLOGY', 200, 667, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 145: Aerobic C&S Blood - DD,Blood culture bottle
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-145', 'Aerobic C&S Blood - DD,Blood culture bottle', 'MICROBIOLOGY', 400, 1333, 70, 1, 'within 5 days', false, 'active', NOW(), NOW());

-- Test 146: Culture & Sensitivity Anaerobic with MIC,Blood culture bottle
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-146', 'Culture & Sensitivity Anaerobic with MIC,Blood culture bottle', 'MICROBIOLOGY', 2100, 7000, 70, 1, 'within 5 days', false, 'active', NOW(), NOW());

-- Test 147: Ante-natal Basic Sreen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-147', 'Ante-natal Basic Sreen', 'PATHOLOGY', 100, 333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 148: INFECTIOUS PROFILE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-148', 'INFECTIOUS PROFILE', 'MICROBIOLOGY', 500, 1667, 70, 10, '-', false, 'active', NOW(), NOW());

-- Test 149: Acid Fast Bacilli (AFB) Rapid Culture Body Fluids *
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-149', 'Acid Fast Bacilli (AFB) Rapid Culture Body Fluids *', 'MICROBIOLOGY', 900, 3000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 150: VAYUSHRI FERTILITY  - ANTE NATAL PACKAGE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-150', 'VAYUSHRI FERTILITY  - ANTE NATAL PACKAGE', 'PATHOLOGY', 1150, 3833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 151: VAYUSHRI FERTILITY  - SURGICAL PACKAGE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-151', 'VAYUSHRI FERTILITY  - SURGICAL PACKAGE', 'PATHOLOGY', 1750, 5833, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 152: VAYUSHRI FERTILITY Male Hormone Test
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-152', 'VAYUSHRI FERTILITY Male Hormone Test', 'PATHOLOGY', 1250, 4167, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 153: VAYUSHRI FERTILITY PACKAGE - 1
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-153', 'VAYUSHRI FERTILITY PACKAGE - 1', 'PATHOLOGY', 1550, 5167, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 154: Tissue Biomarker - Kappa and Lambda Light Chain Restriction
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-154', 'Tissue Biomarker - Kappa and Lambda Light Chain Restriction', 'IMMUNO-HEMATOLOGY', 3500, 11667, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 155: Triple marker - AutoDELFIA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-155', 'Triple marker - AutoDELFIA', 'PATHOLOGY', 2399, 7997, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 156: Quad marker - AutoDELFIA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-156', 'Quad marker - AutoDELFIA', 'PATHOLOGY', 3399, 11330, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 157: Dual marker - AutoDELFIA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-157', 'Dual marker - AutoDELFIA', 'PATHOLOGY', 2499, 8330, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 158: Aspergillus fumigatus IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-158', 'Aspergillus fumigatus IgG', 'IMMUNOLOGY / SEROLOGY', 1100, 3667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 159: SARS CoV 2 (Spike) Antibody Titre
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-159', 'SARS CoV 2 (Spike) Antibody Titre', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 1, '1 Days 3 hr 0 min', false, 'active', NOW(), NOW());

-- Test 160: Parvovirus B 19 Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-160', 'Parvovirus B 19 Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 161: Dehydroepiandrosterone (DHEA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-161', 'Dehydroepiandrosterone (DHEA)', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 162: Anti Sm - Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-162', 'Anti Sm - Antibody', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 163: Gangiloside IgG Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-163', 'Gangiloside IgG Antibody', 'IMMUNOLOGY / SEROLOGY', 5200, 17333, 70, 1, '8 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 164: 5-Dihydrotestosterone
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-164', '5-Dihydrotestosterone', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 165: Hepatitis E virus - IgM (HEV IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-165', 'Hepatitis E virus - IgM (HEV IgM)', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 166: HIV 1 & 2 Antibody (Rapid)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-166', 'HIV 1 & 2 Antibody (Rapid)', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 167: Hepatitis C Virus (HCV Antibody) ELISA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-167', 'Hepatitis C Virus (HCV Antibody) ELISA', 'IMMUNOLOGY / SEROLOGY', 400, 1333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 168: TSH Receptor Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-168', 'TSH Receptor Antibody', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 169: Anti Neutrophilic Cytoplasmic Antibody (ANCA) IFA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-169', 'Anti Neutrophilic Cytoplasmic Antibody (ANCA) IFA', 'IMMUNOLOGY / SEROLOGY', 3000, 10000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 170: Hepatitis B Surface antigen (HBsAg) ELISA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-170', 'Hepatitis B Surface antigen (HBsAg) ELISA', 'IMMUNOLOGY / SEROLOGY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 171: ANCA - Myeloperoxidase (p-ANCA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-171', 'ANCA - Myeloperoxidase (p-ANCA)', 'IMMUNOLOGY / SEROLOGY', 750, 2500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 172: Anti ds-DNA Antibody (IFA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-172', 'Anti ds-DNA Antibody (IFA)', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 173: Mumps Virus Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-173', 'Mumps Virus Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 174: Brucella Antibody (B.Abortus & B.Melitensis)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-174', 'Brucella Antibody (B.Abortus & B.Melitensis)', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 175: Parvovirus B 19 Antibody IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-175', 'Parvovirus B 19 Antibody IgM', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 176: Ribosomal P Protein Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-176', 'Ribosomal P Protein Antibody', 'IMMUNOLOGY / SEROLOGY', 9000, 30000, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 177: Epstein Barr Virus ( viral capsid antigen) IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-177', 'Epstein Barr Virus ( viral capsid antigen) IgM', 'IMMUNOLOGY / SEROLOGY', 1100, 3667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 178: HIV 1 & 2 Western Blot
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-178', 'HIV 1 & 2 Western Blot', 'IMMUNOLOGY / SEROLOGY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 179: Salmonella typhi IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-179', 'Salmonella typhi IgM', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 180: Aspergillus fumigatus IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-180', 'Aspergillus fumigatus IgM', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 181: Legionella Pneumophila IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-181', 'Legionella Pneumophila IgM', 'IMMUNOLOGY / SEROLOGY', 6500, 21667, 70, 1, '8 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 182: Cytomegalovirus(CMV) IgG Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-182', 'Cytomegalovirus(CMV) IgG Antibody', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 183: Desmoglein III Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-183', 'Desmoglein III Antibody', 'IMMUNOLOGY / SEROLOGY', 6500, 21667, 70, 1, '8 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 184: Anti Smooth Muscle Antibody (ASMA)(F-Actin Antobody)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-184', 'Anti Smooth Muscle Antibody (ASMA)(F-Actin Antobody)', 'IMMUNOLOGY / SEROLOGY', 1250, 4167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 185: Hepatitis B Surface Antigen (HbSAg) CLIA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-185', 'Hepatitis B Surface Antigen (HbSAg) CLIA', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 186: Treponema Pallidum Hemagglutination (TPHA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-186', 'Treponema Pallidum Hemagglutination (TPHA)', 'IMMUNOLOGY / SEROLOGY', 500, 1667, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 187: Anti DNAse B
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-187', 'Anti DNAse B', 'IMMUNOLOGY / SEROLOGY', 2000, 6667, 70, 1, '1 Days 1 hr 0 min', false, 'active', NOW(), NOW());

-- Test 188: Immunoglobulin M (IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-188', 'Immunoglobulin M (IgM)', 'IMMUNOLOGY / SEROLOGY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 189: Beta 2 glycoprotein IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-189', 'Beta 2 glycoprotein IgG', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 190: Mumps Virus Antibody IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-190', 'Mumps Virus Antibody IgM', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 191: Protein C and S Antigen Panel
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-191', 'Protein C and S Antigen Panel', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 14, '-', false, 'active', NOW(), NOW());

-- Test 192: Varicella Zoster IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-192', 'Varicella Zoster IgG', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 193: Anti Sperm Antibody (ASAB)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-193', 'Anti Sperm Antibody (ASAB)', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 194: HIV P24 Antigen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-194', 'HIV P24 Antigen', 'IMMUNOLOGY / SEROLOGY', 1000, 3333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 195: Primary Aldosteronism (Conn syndrome)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-195', 'Primary Aldosteronism (Conn syndrome)', 'IMMUNOLOGY / SEROLOGY', 3000, 10000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 196: Tumor Necrosis Factor - Alpha
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-196', 'Tumor Necrosis Factor - Alpha', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 197: Herpes Simplex Virus 1 & 2 IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-197', 'Herpes Simplex Virus 1 & 2 IgG', 'IMMUNOLOGY / SEROLOGY', 450, 1500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 198: Epstein-Barr Virus (Viral Capsid Antigen) IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-198', 'Epstein-Barr Virus (Viral Capsid Antigen) IgG', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 199: Leishmania Antibody, IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-199', 'Leishmania Antibody, IgG', 'IMMUNOLOGY / SEROLOGY', 2250, 7500, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 200: PLA2 receptor antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-200', 'PLA2 receptor antibody', 'IMMUNOLOGY / SEROLOGY', 7500, 25000, 70, 1, '10 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 201: Anti Phospholipid Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-201', 'Anti Phospholipid Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 202: Varicella Zoster IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-202', 'Varicella Zoster IgM', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 203: Helicobacter Pylorii IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-203', 'Helicobacter Pylorii IgM', 'IMMUNOLOGY / SEROLOGY', 1100, 3667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 204: Herpes Simplex Virus 1 & 2 IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-204', 'Herpes Simplex Virus 1 & 2 IgM', 'IMMUNOLOGY / SEROLOGY', 450, 1500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 205: RPR / VDRL
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-205', 'RPR / VDRL', 'IMMUNOLOGY / SEROLOGY', 150, 500, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 206: Beta 2 glycoprotein IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-206', 'Beta 2 glycoprotein IgM', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 207: Chikungunya IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-207', 'Chikungunya IgM', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 208: Herpes Simplex Virus 1 IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-208', 'Herpes Simplex Virus 1 IgG', 'IMMUNOLOGY / SEROLOGY', 450, 1500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 209: Brucella IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-209', 'Brucella IgG', 'IMMUNOLOGY / SEROLOGY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 210: Anti SS-A Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-210', 'Anti SS-A Antibody', 'IMMUNOLOGY / SEROLOGY', 1000, 3333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 211: Cytomegalovirus(CMV) IgM Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-211', 'Cytomegalovirus(CMV) IgM Antibody', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 212: Tissue Transglutaminase Ttg - Dgp Screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-212', 'Tissue Transglutaminase Ttg - Dgp Screen', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 213: C1 Esterase Inhibitor
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-213', 'C1 Esterase Inhibitor', 'IMMUNOLOGY / SEROLOGY', 8000, 26667, 70, 1, '4 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 214: Infectious Mononucleosis
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-214', 'Infectious Mononucleosis', 'IMMUNOLOGY / SEROLOGY', 400, 1333, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 215: TORCH 5 IGG Profile
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-215', 'TORCH 5 IGG Profile', 'IMMUNOLOGY / SEROLOGY', 950, 3167, 70, 8, '-', false, 'active', NOW(), NOW());

-- Test 216: Neuromyelitis optica (NMO)Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-216', 'Neuromyelitis optica (NMO)Antibody', 'IMMUNOLOGY / SEROLOGY', 4500, 15000, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 217: Intrinsic factor Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-217', 'Intrinsic factor Antibody', 'IMMUNOLOGY / SEROLOGY', 3000, 10000, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 218: SCL-70 Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-218', 'SCL-70 Antibody', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 219: Dengue IgG, IgM, NS1 Antigen (Rapid)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-219', 'Dengue IgG, IgM, NS1 Antigen (Rapid)', 'IMMUNOLOGY / SEROLOGY', 656, 2187, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 220: Aspergillus fumigatus IgE
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-220', 'Aspergillus fumigatus IgE', 'IMMUNOLOGY / SEROLOGY', 1800, 6000, 70, 1, '1 Days 1 hr 0 min', false, 'active', NOW(), NOW());

-- Test 221: Anti MOG Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-221', 'Anti MOG Antibody', 'IMMUNOLOGY / SEROLOGY', 4500, 15000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 222: Hepatitis A virus - Total (HAV Total)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-222', 'Hepatitis A virus - Total (HAV Total)', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 223: Bordetella Pertussis IgG antibodies
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-223', 'Bordetella Pertussis IgG antibodies', 'IMMUNOLOGY / SEROLOGY', 16000, 53333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 224: Epstein Barr Virus EA IgA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-224', 'Epstein Barr Virus EA IgA', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 225: Anti Cyclic Citrullinated Peptide Antibody (CCP)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-225', 'Anti Cyclic Citrullinated Peptide Antibody (CCP)', 'IMMUNOLOGY / SEROLOGY', 1700, 5667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 226: RH Antibody - Titres
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-226', 'RH Antibody - Titres', 'IMMUNOLOGY / SEROLOGY', 1600, 5333, 70, 1, '10 hr 0 min', false, 'active', NOW(), NOW());

-- Test 227: Centromere IGG Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-227', 'Centromere IGG Antibody', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 228: Cryptococcus Antigen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-228', 'Cryptococcus Antigen', 'IMMUNOLOGY / SEROLOGY', 1400, 4667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 229: Galactomannan (Aspergillus Antigen)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-229', 'Galactomannan (Aspergillus Antigen)', 'IMMUNOLOGY / SEROLOGY', 2100, 7000, 70, 1, '9 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 230: Tissue Transglutaminase Antibody - IgA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-230', 'Tissue Transglutaminase Antibody - IgA', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 231: Anti SS-B Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-231', 'Anti SS-B Antibody', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 232: Epstein Barr Virus EA IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-232', 'Epstein Barr Virus EA IgG', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 233: Dengue IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-233', 'Dengue IgM', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 234: Dengue IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-234', 'Dengue IgG', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 235: SARS CoV 2 Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-235', 'SARS CoV 2 Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 1350, 4500, 70, 1, '1 Days 1 hr 0 min', false, 'active', NOW(), NOW());

-- Test 236: Clostridium Difficile Antigen Stool
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-236', 'Clostridium Difficile Antigen Stool', 'IMMUNOLOGY / SEROLOGY', 2500, 8333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 237: ANCA - Serine Proteinase 3 (c-ANCA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-237', 'ANCA - Serine Proteinase 3 (c-ANCA)', 'IMMUNOLOGY / SEROLOGY', 750, 2500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 238: Glutamic Acid decarboxylase (GAD) 65 Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-238', 'Glutamic Acid decarboxylase (GAD) 65 Antibody', 'IMMUNOLOGY / SEROLOGY', 2100, 7000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 239: Scrub Typhus
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-239', 'Scrub Typhus', 'IMMUNOLOGY / SEROLOGY', 1800, 6000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 240: Rubella Virus - IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-240', 'Rubella Virus - IgG', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 241: Inhibin A
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-241', 'Inhibin A', 'IMMUNOLOGY / SEROLOGY', 2400, 8000, 70, 1, '1 Days 12 hr 0 min', false, 'active', NOW(), NOW());

-- Test 242: Hepatitis B Core Antibody IgM (Anti HBc - IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-242', 'Hepatitis B Core Antibody IgM (Anti HBc - IgM)', 'IMMUNOLOGY / SEROLOGY', 500, 1667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 243: Measles (Rubeola) Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-243', 'Measles (Rubeola) Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 244: Echinococcus Antibody, IgG (Hydatid serology)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-244', 'Echinococcus Antibody, IgG (Hydatid serology)', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 245: Hepatitis E virus - IgG (HEV IgG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-245', 'Hepatitis E virus - IgG (HEV IgG)', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 246: Anti Nuclear Antibody - HEp-2 - IFA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-246', 'Anti Nuclear Antibody - HEp-2 - IFA', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 247: Helicobacter Pylorii IgA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-247', 'Helicobacter Pylorii IgA', 'IMMUNOLOGY / SEROLOGY', 680, 2267, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 248: Toxoplasma gondii - IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-248', 'Toxoplasma gondii - IgG', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 249: Rheumatic Factor IgA Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-249', 'Rheumatic Factor IgA Antibody', 'IMMUNOLOGY / SEROLOGY', 750, 2500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 250: Liver-Kidney Microsome (LKM) - 1 Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-250', 'Liver-Kidney Microsome (LKM) - 1 Antibody', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 251: Saccharomyces cerevisiae Antibody IgA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-251', 'Saccharomyces cerevisiae Antibody IgA', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 1, '8 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 252: Scrub Typhus IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-252', 'Scrub Typhus IgM', 'IMMUNOLOGY / SEROLOGY', 1350, 4500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 253: Dengue virus - NS1 Antigen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-253', 'Dengue virus - NS1 Antigen', 'IMMUNOLOGY / SEROLOGY', 1000, 3333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 254: AldosteroneRenin Activity Ratio
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-254', 'AldosteroneRenin Activity Ratio', 'IMMUNOLOGY / SEROLOGY', 5000, 16667, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 255: Hepatitis B Core Antibody Total (HBcAb- Total)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-255', 'Hepatitis B Core Antibody Total (HBcAb- Total)', 'IMMUNOLOGY / SEROLOGY', 500, 1667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 256: Circulating Immunocomplex (CIC)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-256', 'Circulating Immunocomplex (CIC)', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 257: Inhibin B
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-257', 'Inhibin B', 'IMMUNOLOGY / SEROLOGY', 2000, 6667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 258: 17-Hydroxy Progesterone (17-OHP) - Serum
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-258', '17-Hydroxy Progesterone (17-OHP) - Serum', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 259: Chlamydia Trachomatis IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-259', 'Chlamydia Trachomatis IgG', 'IMMUNOLOGY / SEROLOGY', 880, 2933, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 260: ENA Profile / ANA Profile (Quantitative)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-260', 'ENA Profile / ANA Profile (Quantitative)', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 6, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 261: Cardiolipin IgA Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-261', 'Cardiolipin IgA Antibody', 'IMMUNOLOGY / SEROLOGY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 262: Legionella Pneumophila Antigen detection
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-262', 'Legionella Pneumophila Antigen detection', 'IMMUNOLOGY / SEROLOGY', 7000, 23333, 70, 1, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 263: SARS CoV 2 Antibody IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-263', 'SARS CoV 2 Antibody IgM', 'IMMUNOLOGY / SEROLOGY', 1350, 4500, 70, 1, '1 Days 2 hr 0 min', false, 'active', NOW(), NOW());

-- Test 264: Anti Mitochondrial Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-264', 'Anti Mitochondrial Antibody', 'IMMUNOLOGY / SEROLOGY', 1150, 3833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 265: Anti Nuclear Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-265', 'Anti Nuclear Antibody', 'IMMUNOLOGY / SEROLOGY', 650, 2167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 266: Anti Mitochondrial Antibody - IFA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-266', 'Anti Mitochondrial Antibody - IFA', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 267: Endomysial Antibody IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-267', 'Endomysial Antibody IgM', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 268: INSULIN ANTIBODIES
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-268', 'INSULIN ANTIBODIES', 'IMMUNOLOGY / SEROLOGY', 4000, 13333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 269: Saccharomyces cerevisiae Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-269', 'Saccharomyces cerevisiae Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 1, '8 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 270: Gliadin Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-270', 'Gliadin Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 850, 2833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 271: Herpes Simplex Virus 1 IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-271', 'Herpes Simplex Virus 1 IgM', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 272: Tissue Transglutaminase Antibody - IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-272', 'Tissue Transglutaminase Antibody - IgG', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 273: Hepatitis B envelope Antibody (AntiHBe)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-273', 'Hepatitis B envelope Antibody (AntiHBe)', 'IMMUNOLOGY / SEROLOGY', 500, 1667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 274: Cardiolipin IgG Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-274', 'Cardiolipin IgG Antibody', 'IMMUNOLOGY / SEROLOGY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 275: Measles (Rubeola) Antibody IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-275', 'Measles (Rubeola) Antibody IgM', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 276: Rubella Virus - IgG Avidity
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-276', 'Rubella Virus - IgG Avidity', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 277: Endomysial Antibody IgA
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-277', 'Endomysial Antibody IgA', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 278: Mycoplasma Pneumoniae IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-278', 'Mycoplasma Pneumoniae IgG', 'IMMUNOLOGY / SEROLOGY', 3200, 10667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 279: Brucella IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-279', 'Brucella IgM', 'IMMUNOLOGY / SEROLOGY', 650, 2167, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 280: Rheumatic Factor IgM Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-280', 'Rheumatic Factor IgM Antibody', 'IMMUNOLOGY / SEROLOGY', 1350, 4500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 281: Cysticercosis (IgG) Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-281', 'Cysticercosis (IgG) Antibody', 'IMMUNOLOGY / SEROLOGY', 1000, 3333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 282: Androstenedione (A4)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-282', 'Androstenedione (A4)', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 283: Leptospira Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-283', 'Leptospira Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 700, 2333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 284: Endomysial Antibody IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-284', 'Endomysial Antibody IgG', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 285: Rheumatic Factor IgG Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-285', 'Rheumatic Factor IgG Antibody', 'IMMUNOLOGY / SEROLOGY', 1150, 3833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 286: ASO Titres (Anti Streptolysin O)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-286', 'ASO Titres (Anti Streptolysin O)', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 287: Hepatitis B Envelope Antigen (HBeAg)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-287', 'Hepatitis B Envelope Antigen (HBeAg)', 'IMMUNOLOGY / SEROLOGY', 500, 1667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 288: Rubella Virus - IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-288', 'Rubella Virus - IgM', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 289: Sm/RNP Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-289', 'Sm/RNP Antibody', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 290: Phospholipid Screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-290', 'Phospholipid Screen', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 291: ANA Profile / ENA Profile (Qualitative)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-291', 'ANA Profile / ENA Profile (Qualitative)', 'IMMUNOLOGY / SEROLOGY', 3000, 10000, 70, 12, '-', false, 'active', NOW(), NOW());

-- Test 292: Toxoplasma gondii - IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-292', 'Toxoplasma gondii - IgM', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 293: Epstein-Barr Virus Antibody Panel I
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-293', 'Epstein-Barr Virus Antibody Panel I', 'IMMUNOLOGY / SEROLOGY', 1600, 5333, 70, 13, '-', false, 'active', NOW(), NOW());

-- Test 294: HIV 1 & 2  Antibody (ELISA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-294', 'HIV 1 & 2  Antibody (ELISA)', 'IMMUNOLOGY / SEROLOGY', 200, 667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 295: Herpes Simplex Virus 2 IgM
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-295', 'Herpes Simplex Virus 2 IgM', 'IMMUNOLOGY / SEROLOGY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 296: Anti‐MuSK antibodies
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-296', 'Anti‐MuSK antibodies', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 297: Chikungunya IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-297', 'Chikungunya IgG', 'IMMUNOLOGY / SEROLOGY', 1900, 6333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 298: Cardiolipin IgM Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-298', 'Cardiolipin IgM Antibody', 'IMMUNOLOGY / SEROLOGY', 400, 1333, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 299: Treponema pallidum Antibody (FTA-ABS)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-299', 'Treponema pallidum Antibody (FTA-ABS)', 'IMMUNOLOGY / SEROLOGY', 1400, 4667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 300: Hepatitis B surface Antibody Total (Anti HBs)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-300', 'Hepatitis B surface Antibody Total (Anti HBs)', 'IMMUNOLOGY / SEROLOGY', 550, 1833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 301: Islet Cell Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-301', 'Islet Cell Antibody', 'IMMUNOLOGY / SEROLOGY', 6500, 21667, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 302: Widal Test (Tube Test)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-302', 'Widal Test (Tube Test)', 'IMMUNOLOGY / SEROLOGY', 250, 833, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 303: TORCH 8 Profile (IgG &IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-303', 'TORCH 8 Profile (IgG &IgM)', 'IMMUNOLOGY / SEROLOGY', 1600, 5333, 70, 14, '-', false, 'active', NOW(), NOW());

-- Test 304: TORCH 4 Profile (IgG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-304', 'TORCH 4 Profile (IgG)', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 9, '-', false, 'active', NOW(), NOW());

-- Test 305: IA2 - Insulin Antobodies
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-305', 'IA2 - Insulin Antobodies', 'IMMUNOLOGY / SEROLOGY', 4000, 13333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 306: Chromogranin A
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-306', 'Chromogranin A', 'IMMUNOLOGY / SEROLOGY', 3500, 11667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 307: Widal Test (Slide Test)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-307', 'Widal Test (Slide Test)', 'IMMUNOLOGY / SEROLOGY', 250, 833, 70, 1, '8 hr 0 min', false, 'active', NOW(), NOW());

-- Test 308: TORCH 10 Profile (IgG &IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-308', 'TORCH 10 Profile (IgG &IgM)', 'IMMUNOLOGY / SEROLOGY', 2000, 6667, 70, 13, '-', false, 'active', NOW(), NOW());

-- Test 309: Immunoglobulin A (IgA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-309', 'Immunoglobulin A (IgA)', 'IMMUNOLOGY / SEROLOGY', 550, 1833, 70, 1, '6 hr 0 min', false, 'active', NOW(), NOW());

-- Test 310: TORCH 5 Profile (IgG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-310', 'TORCH 5 Profile (IgG)', 'IMMUNOLOGY / SEROLOGY', 1600, 5333, 70, 7, '-', false, 'active', NOW(), NOW());

-- Test 311: Helicobacter Pylorii IgG
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-311', 'Helicobacter Pylorii IgG', 'IMMUNOLOGY / SEROLOGY', 700, 2333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 312: TORCH 5 Profile (IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-312', 'TORCH 5 Profile (IgM)', 'IMMUNOLOGY / SEROLOGY', 1600, 5333, 70, 7, '-', false, 'active', NOW(), NOW());

-- Test 313: TORCH profile 6
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-313', 'TORCH profile 6', 'IMMUNOLOGY / SEROLOGY', 1800, 6000, 70, 15, '-', false, 'active', NOW(), NOW());

-- Test 314: Parietal Cell Antibody
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-314', 'Parietal Cell Antibody', 'IMMUNOLOGY / SEROLOGY', 1600, 5333, 70, 1, '3 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- Test 315: Aldosterone
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-315', 'Aldosterone', 'IMMUNOLOGY / SEROLOGY', 1500, 5000, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 316: Hepatitis A virus - IgM (HAV- IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-316', 'Hepatitis A virus - IgM (HAV- IgM)', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 317: Immunoglobulin G (IgG)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-317', 'Immunoglobulin G (IgG)', 'IMMUNOLOGY / SEROLOGY', 550, 1833, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 318: TORCH 4 Profile (IgM)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-318', 'TORCH 4 Profile (IgM)', 'IMMUNOLOGY / SEROLOGY', 1200, 4000, 70, 9, '24 hours', false, 'active', NOW(), NOW());

-- Test 319: Cardiolipin Screen
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-319', 'Cardiolipin Screen', 'IMMUNOLOGY / SEROLOGY', 1700, 5667, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 320: Weil - Felix Test
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-320', 'Weil - Felix Test', 'IMMUNOLOGY / SEROLOGY', 600, 2000, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 321: HIV 1 & 2 Antibody (ECLIA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-321', 'HIV 1 & 2 Antibody (ECLIA)', 'IMMUNOLOGY / SEROLOGY', 750, 2500, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 322: Hepatitis C Virus (HCV) Antibody (ECLIA)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-322', 'Hepatitis C Virus (HCV) Antibody (ECLIA)', 'IMMUNOLOGY / SEROLOGY', 900, 3000, 70, 1, '24 hours', false, 'active', NOW(), NOW());

-- Test 323: APCR Activated Protein C Resistance Test, Citrated plasma
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-323', 'APCR Activated Protein C Resistance Test, Citrated plasma', 'IMMUNOLOGY / SEROLOGY', 5500, 18333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 324: Autoimmune encephalitis panel-CSF
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-324', 'Autoimmune encephalitis panel-CSF', 'IMMUNOLOGY / SEROLOGY', 18000, 60000, 70, 11, '-', false, 'active', NOW(), NOW());

-- Test 325: HIV 1 & 2 Antibody(Confirmation test)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-325', 'HIV 1 & 2 Antibody(Confirmation test)', 'IMMUNOLOGY / SEROLOGY', 800, 2667, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 326: HIV Duo -(IV generation) Ab & p24 Ag
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-326', 'HIV Duo -(IV generation) Ab & p24 Ag', 'IMMUNOLOGY / SEROLOGY', 1000, 3333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 327: HIV (p24 Antigen detection*)
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-327', 'HIV (p24 Antigen detection*)', 'IMMUNOLOGY / SEROLOGY', 1000, 3333, 70, 1, '-', false, 'active', NOW(), NOW());

-- Test 328: Hepatitis D Virus (HDV) IgM antobodies
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting_required, status, created_at, updated_at)
VALUES ('test-328', 'Hepatitis D Virus (HDV) IgM antobodies', 'IMMUNOLOGY / SEROLOGY', 1800, 6000, 70, 1, '-', false, 'active', NOW(), NOW());


-- ============================================
-- Verification Queries
-- ============================================

-- Check total count (should be 328)
SELECT COUNT(*) as total_tests FROM tests;

-- Check by category
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- Check for duplicates (should return 0 rows)
SELECT name, COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;

-- Sample tests
SELECT id, name, price, category, report_time 
FROM tests 
ORDER BY id 
LIMIT 10;
