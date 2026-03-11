const fs = require('fs');

// All 502 tests with accurate data from user
const testsData = `
1	Dual Marker With Graph	1600	Serum	2 Days
2	Quad Marker With Graph	2000	Serum	2 Days
3	Triple Marker With Graph	1500	Serum	2 Days
4	Arthiritis Basic Screen	1500	Serum	1 Day
5	Phosphorus - Serum	150	Serum	1 Day
6	Total cholesterol/HDL ratio	300	Serum	1 Day
7	Vitamin - B12	600	Serum	1 Day
8	TGL /HDL Ratio	300	Serum	1 Day
9	C-Peptide	1500	Serum	1 Day
10	Iron	200	Serum	1 Day
11	Glucose - Fasting	50	Naf Plasma	1 Day
12	Protein Creatinine Ratio, Urine	160	Urine	1 Day
13	Prostarate Specific Antigen, PSA Total	500	Serum	1 Day
14	Phosphorus - 24 Hr Urine	100	Urine	1 Day
15	Follicle Stimulating Hormone (FSH)	250	Serum	1 Day
16	Osmolality Urine	800	Urine	1 Day
17	Creatinine Kinase (CPK)	130	Serum	1 Day
18	Citric Acid Serum	1600	Serum	1 Day
19	C-Reactive Protein (CRP)	550	Serum	1 Day
20	Glucose - Postprandial	40	Plasma Naf	1 Day
21	Thyroxine - Total (TT4)	100	Serum	1 Day
22	Creatinine - 24 Hr Urine	50	Urine	1 Day
23	Creatinine Clearence Test (CCT)	160	Urine	1 Day
24	Pregnancy Test	400	Urine	1 Day
25	Potassium - 24 Hr Urine	400	Urine	1 Day
26	Troponin - T (CLIA)	1250	Serum	1 Day
27	Lactate CSF	250	CSF	1 Day
28	Lipoprotein a (Lp-a)	650	Serum	1 Day
29	Copper - Serum	350	Serum	1 Day
30	Sex Hormone Binding Globulin (SHBG)	900	Serum	1 Day
31	Protein - Random (Spot)	120	Urine	1 Day
32	Syphilis Antibodies (Total)	2500	Serum	1 Day
33	Microalbumin	600	Urine	1 Day
34	Osmolality	400	Serum	1 Day
35	Cholesterol - HDL	250	Serum	1 Day
36	Calprotectin Stool	3000	Stool	1 Day
37	Beta -2 Microglobulin Urine	1800	Urine	2 Days
38	Complement 3 (C3)	700	Serum	1 Day
39	Triglycerides (TGL)	100	Serum	1 Day
40	Urea	100	Serum	1 Day
41	Bilirubin Direct	100	Serum	1 Day
42	Glucose - Random	40	Naf Plasma	1 Day
43	Creatine Kinase (CK-MB)	900	Serum	1 Day
44	Carcino Embryonic Antigen (CEA)	560	Serum	1 Day
45	Albumin	100	Serum	1 Day
46	24hrs Urinary Protein	120	Urine	1 Day
47	Cholesterol - Total	50	Serum	1 Day
48	Glucose Challenge Test	150	Naf Plasma	1 Day
49	Lipase Serum	800	Serum	1 Day
50	Luteinising Hormone (LH)	250	Serum	1 Day
`;

console.log('Script ready to generate tests');
