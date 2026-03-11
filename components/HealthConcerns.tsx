'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiThermometer, FiDroplet, FiFilter, FiHeart, FiZap, FiSun, FiAlertCircle, FiActivity, FiX, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Toast from './ui/Toast';
import WhatsAppBookingModal from './modals/WhatsAppBookingModal';
// Removed cart functionality - using WhatsApp booking instead

const colorMap: { [key: string]: string } = {
  'IMMUNOLOGY / SEROLOGY': 'bg-gradient-to-br from-blue-500 to-blue-600',
  'CLINICAL BIOCHEMISTRY': 'bg-gradient-to-br from-purple-500 to-purple-600',
  'PATHOLOGY': 'bg-gradient-to-br from-pink-500 to-pink-600',
  'MICROBIOLOGY': 'bg-gradient-to-br from-slate-600 to-slate-700',
  'IMMUNO-HEMATOLOGY': 'bg-gradient-to-br from-orange-500 to-orange-600',
  'HAEMATOLOGY': 'bg-gradient-to-br from-red-500 to-red-600',
  'CLINICAL PATHOLOGY': 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  'MOLECULAR BIOLOGY': 'bg-gradient-to-br from-cyan-500 to-cyan-600',
};

const iconMap: { [key: string]: React.ReactNode } = {
  'IMMUNOLOGY / SEROLOGY': <FiActivity size={40} />,
  'CLINICAL BIOCHEMISTRY': <FiZap size={40} />,
  'PATHOLOGY': <FiHeart size={40} />,
  'MICROBIOLOGY': <FiDroplet size={40} />,
  'IMMUNO-HEMATOLOGY': <FiFilter size={40} />,
  'HAEMATOLOGY': <FiActivity size={40} />,
  'CLINICAL PATHOLOGY': <FiFilter size={40} />,
  'MOLECULAR BIOLOGY': <FiSun size={40} />,
};

const nameMap: { [key: string]: string } = {
  'IMMUNOLOGY / SEROLOGY': 'IMMUNOLOGY / SEROLOGY',
  'CLINICAL BIOCHEMISTRY': 'General Health',
  'PATHOLOGY': 'Blood Tests',
  'MICROBIOLOGY': 'MICROBIOLOGY',
  'IMMUNO-HEMATOLOGY': 'IMMUNO-HEMATOLOGY',
  'HAEMATOLOGY': 'HAEMATOLOGY',
  'CLINICAL PATHOLOGY': 'Kidney & Urine',
  'MOLECULAR BIOLOGY': 'MOLECULAR BIOLOGY',
};

export default function HealthConcerns() {
  const router = useRouter();
  const [healthConcerns, setHealthConcerns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcern, setSelectedConcern] = useState<any>(null);
  const [concernTests, setConcernTests] = useState<any[]>([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  
  // Removed cart functionality

  useEffect(() => {
    async function fetchHealthConcerns() {
      try {
        const response = await fetch('/api/health-concerns');
        const data = await response.json();
        if (data.healthConcerns) {
          // Show only first 8 categories
          setHealthConcerns(data.healthConcerns.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching health concerns:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHealthConcerns();
  }, []);

  const handleCardClick = async (concern: any) => {
    setSelectedConcern(concern);
    setLoadingTests(true);
    
    try {
      const response = await fetch(`/api/tests?category=${encodeURIComponent(concern.category)}`);
      const data = await response.json();
      if (data.tests) {
        setConcernTests(data.tests);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoadingTests(false);
    }
  };

  const closeModal = () => {
    setSelectedConcern(null);
    setConcernTests([]);
  };

  const handleBookTest = (test: any) => {
    // Close the health concerns modal first
    setSelectedConcern(null);
    setConcernTests([]);
    
    // Then open the booking modal
    setSelectedTest(test);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Health Concerns
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find tests based on your health concerns
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {healthConcerns.map((concern, index) => (
              <motion.div
                key={concern.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="cursor-pointer"
                onClick={() => handleCardClick(concern)}
              >
                <div className={`${colorMap[concern.category] || 'bg-gradient-to-br from-gray-500 to-gray-600'} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all aspect-square flex flex-col items-center justify-center text-center`}>
                  <div className="mb-4 flex items-center justify-center opacity-90">
                    {iconMap[concern.category] || <FiActivity size={40} />}
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2 leading-tight px-2">
                    {nameMap[concern.category] || concern.category}
                  </h3>
                  <p className="text-sm opacity-90 font-medium">{concern.tests} Tests</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tests Modal */}
      <AnimatePresence>
        {selectedConcern && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className={`${colorMap[selectedConcern.category] || 'bg-gradient-to-br from-gray-500 to-gray-600'} p-6 text-white flex-shrink-0`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {iconMap[selectedConcern.category] || <FiActivity size={40} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold mb-1 truncate">
                          {nameMap[selectedConcern.category] || selectedConcern.category}
                        </h3>
                        <p className="text-sm opacity-90">
                          {selectedConcern.tests} Tests Available
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors flex-shrink-0"
                      aria-label="Close"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-900">
                  {loadingTests ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white">
                        Available Tests ({concernTests.length}):
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {concernTests.map((test, index) => (
                          <motion.div
                            key={test.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                          >
                            {/* Test Header */}
                            <div className="mb-3">
                              <h5 className="font-bold text-base text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[48px]">
                                {test.name}
                              </h5>
                              {test.discount > 0 && (
                                <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded">
                                  {test.discount}% OFF
                                </span>
                              )}
                            </div>

                            {/* Test Details */}
                            <div className="space-y-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <FiActivity size={14} className="text-blue-600 flex-shrink-0" />
                                <span>{test.parameters || 1} Parameters</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiClock size={14} className="text-teal-600 flex-shrink-0" />
                                <span>{test.report_time || '24 Hours'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiDroplet size={14} className="text-purple-600 flex-shrink-0" />
                                <span>{test.sample_type || 'Blood'}</span>
                              </div>
                            </div>

                            {/* Fasting Badge */}
                            {test.fasting_required && (
                              <div className="mb-3">
                                <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-medium rounded">
                                  Fasting Required
                                </span>
                              </div>
                            )}

                            {/* Pricing */}
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                  ₹{test.price}
                                </span>
                                {test.original_price && test.original_price > test.price && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{test.original_price}
                                  </span>
                                )}
                              </div>

                              {/* Book Button */}
                              <button
                                onClick={() => handleBookTest(test)}
                                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                              >
                                <FaWhatsapp size={16} />
                                Book on WhatsApp
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => router.push('/tests')}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg transition-colors"
                    >
                      View All Tests
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp Booking Modal */}
      {selectedTest && (
        <WhatsAppBookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedTest(null);
          }}
          itemName={selectedTest.name}
          itemPrice={selectedTest.price}
          itemDetails={`Parameters: ${selectedTest.parameters || 1} • Report Time: ${selectedTest.report_time || '24 Hours'} • Sample: ${selectedTest.sample_type || 'Blood'}`}
          itemType="test"
        />
      )}

      {/* Toast Notification */}
      {toastData && (
        <Toast
          isOpen={showToast}
          onClose={() => setShowToast(false)}
          title={toastData.name}
          description={`${toastData.parameters} Parameters • ${toastData.reportTime}`}
          price={toastData.price}
          type="success"
        />
      )}
    </>
  );
}
