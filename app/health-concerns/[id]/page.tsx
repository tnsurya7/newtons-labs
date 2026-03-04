'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import TestCard from '@/components/TestCard';
import SupportModal from '@/components/modals/SupportModal';
import { useTests } from '@/lib/hooks/useTests';

const TESTS_PER_PAGE = 24;

// Health concerns data
const healthConcerns = [
  { id: 'c1', name: 'Immunity', color: 'from-red-400 to-orange-400' },
  { id: 'c2', name: 'Infections', color: 'from-blue-400 to-cyan-400' },
  { id: 'c3', name: 'Blood Tests', color: 'from-purple-400 to-pink-400' },
  { id: 'c4', name: 'Kidney', color: 'from-green-400 to-teal-400' },
  { id: 'c5', name: 'Liver', color: 'from-indigo-400 to-purple-400' },
  { id: 'c6', name: 'Allergy', color: 'from-rose-400 to-red-400' },
  { id: 'c7', name: 'Hormones', color: 'from-yellow-400 to-orange-400' },
  { id: 'c8', name: 'Diabetes', color: 'from-pink-400 to-rose-400' },
  { id: 'c9', name: 'Heart', color: 'from-cyan-400 to-blue-400' },
  { id: 'c10', name: 'Thyroid', color: 'from-red-400 to-pink-400' },
  { id: 'c11', name: 'Fever', color: 'from-purple-400 to-indigo-400' },
  { id: 'c12', name: 'Vitamin', color: 'from-orange-400 to-red-400' },
];

// Define filter keywords for each health concern
const concernFilters: { [key: string]: RegExp } = {
  'c1': /Immun|IgG|IgM|IgA|Antibod|Antigen|CD\d+/i, // Immunity
  'c2': /Fever|Malaria|Dengue|Typhoid|Infection|Culture|Bacterial|Viral|Fungal|Microb/i, // Infections
  'c3': /Blood|Haemoglobin|Hemoglobin|CBC|Platelet|WBC|RBC|Haematology|Erythrocyte|Leukocyte/i, // Blood Tests
  'c4': /Kidney|Creatinine|Urea|Uric Acid|Urine|Renal|BUN|Microalbumin/i, // Kidney
  'c5': /Liver|SGOT|SGPT|Bilirubin|ALT|AST|Hepatitis|GGT|ALP|Alkaline Phosphatase/i, // Liver
  'c6': /Allergy|IgE|Allergen|Hypersensitivity/i, // Allergy
  'c7': /Hormone|Testosterone|Estrogen|Progesterone|Cortisol|Prolactin|FSH|LH|DHEA/i, // Hormones
  'c8': /Glucose|Diabetes|HbA1c|Insulin|C-Peptide|Sugar|Glyc/i, // Diabetes
  'c9': /Heart|Cardiac|Lipid|Cholesterol|Triglyceride|HDL|LDL|Troponin|CK-MB|VLDL/i, // Heart
  'c10': /Thyroid|TSH|T3|T4|Thyroxine|Triiodothyronine/i, // Thyroid
  'c11': /Fever|Pyrexia|Temperature/i, // Fever
  'c12': /Vitamin|B12|D3|D2|Folate|Folic|Cobalamin|Calciferol/i, // Vitamin
};

export default function HealthConcernPage() {
  const params = useParams();
  const router = useRouter();
  const concernId = params.id as string;
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all tests from database
  const { tests: allTests, loading } = useTests();

  // Find the concern
  const concern = healthConcerns.find(c => c.id === concernId);

  // Filter tests based on concern
  const filteredTests = useMemo(() => {
    if (!concern || !allTests.length) return [];
    
    const filter = concernFilters[concernId];
    if (!filter) return [];

    return allTests.filter(test => 
      filter.test(test.name) || filter.test(test.category)
    );
  }, [concernId, concern, allTests]);

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / TESTS_PER_PAGE);
  const startIndex = (currentPage - 1) * TESTS_PER_PAGE;
  const endIndex = startIndex + TESTS_PER_PAGE;
  const currentTests = filteredTests.slice(startIndex, endIndex);

  if (!concern) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Health Concern Not Found</h1>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const colorMap: { [key: string]: string } = {
    'from-red-400 to-orange-400': 'from-red-500 to-orange-500',
    'from-blue-400 to-cyan-400': 'from-blue-500 to-cyan-500',
    'from-purple-400 to-pink-400': 'from-purple-500 to-pink-500',
    'from-green-400 to-teal-400': 'from-green-500 to-teal-500',
    'from-indigo-400 to-purple-400': 'from-indigo-500 to-purple-500',
    'from-rose-400 to-red-400': 'from-rose-500 to-red-500',
    'from-yellow-400 to-orange-400': 'from-yellow-500 to-orange-500',
    'from-pink-400 to-rose-400': 'from-pink-500 to-rose-500',
    'from-cyan-400 to-blue-400': 'from-cyan-500 to-blue-500',
    'from-red-400 to-pink-400': 'from-red-500 to-pink-500',
    'from-purple-400 to-indigo-400': 'from-purple-500 to-indigo-500',
    'from-orange-400 to-red-400': 'from-orange-500 to-red-500',
  };

  const gradientClass = colorMap[concern.color] || 'from-blue-500 to-teal-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientClass} text-white`}>
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <FiArrowLeft size={24} />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="flex items-center gap-6">
            <div className="text-6xl md:text-8xl">
              <FiActivity size={80} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                {concern.name} Tests
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {filteredTests.length} specialized tests available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 mb-12 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FiActivity className="text-blue-600" />
            About {concern.name} Testing
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Why Get Tested?</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Early detection of {concern.name.toLowerCase()}-related conditions</li>
                <li>Monitor existing health conditions</li>
                <li>Preventive health screening</li>
                <li>Track treatment effectiveness</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What We Offer</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>NABL certified laboratory testing</li>
                <li>Free home sample collection</li>
                <li>Reports within 24-48 hours</li>
                <li>Expert consultation available</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Tests Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tests...</p>
          </div>
        ) : filteredTests.length > 0 ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                  <span className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                    Available Tests
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredTests.length)} of {filteredTests.length} tests
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="h-full"
                  >
                    <TestCard
                      id={test.id}
                      name={test.name}
                      price={test.price}
                      originalPrice={test.originalPrice}
                      discount={test.discount}
                      parameters={test.parameters}
                      reportTime={test.reportTime}
                      fasting={test.fasting}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="w-10 h-10 flex items-center justify-center">...</span>;
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No tests found for this health concern.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${gradientClass} rounded-3xl p-8 text-center text-white mt-12`}
        >
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-6 text-white/90">
            Our healthcare experts can help you select the right tests
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 border-0"
              onClick={() => setShowSupportModal(true)}
            >
              Talk to Expert
            </Button>
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 border-2 border-white"
              onClick={() => router.push('/cart')}
            >
              View Cart
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Support Modal */}
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  );
}
