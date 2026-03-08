'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiStar, FiList, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { formatPrice } from '@/lib/utils';
import WhatsAppBookingModal from './modals/WhatsAppBookingModal';

interface PackageCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  tests: number;
  popular: boolean;
  features: string[];
}

export default function PackageCard({
  id,
  name,
  price,
  originalPrice,
  tests,
  popular,
  features,
}: PackageCardProps) {
  const [showTestsModal, setShowTestsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Parse features if it's a JSON string from database
  const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
  const featuresList = Array.isArray(parsedFeatures) ? parsedFeatures : [];

  const sellingPrice = originalPrice;
  const displayOriginalPrice = Math.round(originalPrice * 1.2);
  const discountPercentage = Math.round(((displayOriginalPrice - sellingPrice) / displayOriginalPrice) * 100);

  const itemDetails = `*Tests Included:* ${tests}\n*Package Type:* Health Package`;

  // Show only first 4 features in card
  const displayFeatures = featuresList.slice(0, 4);
  const hasMoreFeatures = featuresList.length > 4;

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full"
        data-item-id={id}
      >
        <Card
          glass
          className={`h-full flex flex-col relative overflow-hidden border-2 ${
            popular ? 'ring-2 ring-purple-500 border-purple-200 dark:border-purple-700' : 'border-blue-100 dark:border-gray-700'
          }`}
        >
          {/* Popular Badge */}
          {popular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10 text-xs font-semibold">
              <FiStar size={12} />
              <span>POPULAR</span>
            </div>
          )}

          {/* Package Name - Fixed Height */}
          <div className="mb-3 min-h-[60px]">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-1 pr-16 leading-tight">
              {name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Includes {tests} Tests
            </p>
          </div>

          {/* Discount Badge */}
          <div className="mb-3">
            <Badge variant="success" className="text-xs">Save {discountPercentage}%</Badge>
          </div>

          {/* Features */}
          <div className="mb-3">
            <ul className="space-y-1.5">
              {displayFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-xs">
                  <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
            {hasMoreFeatures && (
              <button
                onClick={() => setShowTestsModal(true)}
                className="text-xs text-blue-600 dark:text-blue-400 mt-1.5 font-medium hover:underline"
              >
                +{featuresList.length - 4} more tests
              </button>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-3">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {formatPrice(sellingPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(displayOriginalPrice)}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                MRP: {formatPrice(displayOriginalPrice)} (Incl. of all taxes)
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button
                onClick={() => setShowBookingModal(true)}
                className="w-full text-sm py-2 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={16} />
                Book on WhatsApp
              </Button>

              <button
                onClick={() => setShowTestsModal(true)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
              >
                <FiList size={14} />
                <span>View Tests Included</span>
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* WhatsApp Booking Modal */}
      <WhatsAppBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        itemName={name}
        itemPrice={sellingPrice}
        itemDetails={itemDetails}
        itemType="package"
      />

      {/* Tests Modal - Outside card to prevent z-index issues */}
      <AnimatePresence>
        {showTestsModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTestsModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={() => setShowTestsModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-5 text-white flex-shrink-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-1 truncate">{name}</h3>
                      <p className="text-sm text-blue-100">
                        {tests} Tests Included • {formatPrice(sellingPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowTestsModal(false)}
                      className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors flex-shrink-0"
                      aria-label="Close"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-5 overflow-y-auto flex-1">
                  <h4 className="text-base font-semibold mb-3 text-gray-900 dark:text-white">
                    Tests Included in This Package:
                  </h4>
                  <div className="grid gap-2.5">
                    {featuresList.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="flex items-start gap-3 p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white font-medium break-words">
                            {feature}
                          </p>
                        </div>
                        <FiCheck className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setShowTestsModal(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowTestsModal(false);
                        setShowBookingModal(true);
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp size={16} />
                      Book on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
