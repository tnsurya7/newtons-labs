'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiActivity } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { formatPrice } from '@/lib/utils';
import WhatsAppBookingModal from './modals/WhatsAppBookingModal';

interface TestCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  parameters: number;
  reportTime: string;
  fasting: boolean;
}

export default function TestCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  parameters,
  reportTime,
  fasting,
}: TestCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Swap display: Show MRP as main price, calculate higher "original" price
  const sellingPrice = originalPrice; // MRP from data (1600) - this is what user pays
  const displayOriginalPrice = Math.round(originalPrice * 1.2); // Add 20% (1920) - for strikethrough
  const discountPercentage = Math.round(((displayOriginalPrice - sellingPrice) / displayOriginalPrice) * 100);

  const itemDetails = `*Parameters:* ${parameters}\n*Report Time:* ${reportTime}\n*Fasting Required:* ${fasting ? 'Yes' : 'No'}`;

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full"
        data-item-id={id}
      >
        <Card className="h-full flex flex-col relative overflow-hidden group hover:shadow-2xl border-2 border-blue-100 dark:border-gray-700">
          {/* Discount Badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="success">{discountPercentage}% OFF</Badge>
          </div>

          {/* Test Name */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 pr-20">
            {name}
          </h3>

          {/* Test Details */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400 min-h-[24px]">
            <div className="flex items-center gap-1">
              <FiActivity className="text-blue-600" />
              <span>{parameters} Parameters</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="text-teal-600" />
              <span>{reportTime}</span>
            </div>
          </div>

          {fasting && (
            <div className="mb-4 min-h-[28px]">
              <Badge variant="warning">Fasting Required</Badge>
            </div>
          )}

          {!fasting && (
            <div className="mb-4 min-h-[28px]">
            </div>
          )}

          {/* Pricing */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-2">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {formatPrice(sellingPrice)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(displayOriginalPrice)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MRP: {formatPrice(displayOriginalPrice)} (Incl. of all taxes)
              </p>
            </div>

            <Button
              onClick={() => setShowBookingModal(true)}
              className="w-full group-hover:shadow-lg bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={18} />
              Book on WhatsApp
            </Button>
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
        itemType="test"
      />
    </>
  );
}
