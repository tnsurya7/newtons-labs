'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiStar } from 'react-icons/fi';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Toast from './ui/Toast';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

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
  discount,
  tests,
  popular,
  features,
}: PackageCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, price, type: 'package' }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        addItem({ id, name, price, type: 'package' });
        // Show toast notification
        setShowToast(true);
      }
    } catch (error) {
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        glass
        className={`h-full flex flex-col relative overflow-hidden border-2 ${
          popular ? 'ring-2 ring-purple-500 border-purple-200 dark:border-purple-700' : 'border-blue-100 dark:border-gray-700'
        }`}
      >
        {/* Popular Badge */}
        {popular && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-bl-2xl flex items-center gap-1">
            <FiStar size={14} />
            <span className="text-xs font-semibold">POPULAR</span>
          </div>
        )}

        {/* Package Name */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Includes {tests} Tests
        </p>

        {/* Discount Badge */}
        <div className="mb-4">
          <Badge variant="success">Save {discount}%</Badge>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-end gap-2 mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {formatPrice(price)}
            </span>
            <span className="text-sm text-gray-500 line-through mb-1">
              {formatPrice(originalPrice)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            variant={popular ? 'secondary' : 'primary'}
            className="w-full"
          >
            Book Package
          </Button>
        </div>

        {/* Toast Notification */}
        <Toast
          isOpen={showToast}
          onClose={() => setShowToast(false)}
          title={name}
          description={`Includes ${tests} Tests • Save ${discount}%`}
          price={price}
          type="success"
        />
      </Card>
    </motion.div>
  );
}
