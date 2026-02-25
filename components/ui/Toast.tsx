'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiShoppingCart } from 'react-icons/fi';
import { useEffect } from 'react';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  price?: number;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export default function Toast({
  isOpen,
  onClose,
  title,
  description,
  price,
  type = 'success',
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const bgColor = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-cyan-500',
  }[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -100, x: '-50%' }}
          className="fixed top-4 left-1/2 z-[10000] w-full max-w-md px-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${bgColor} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  {type === 'success' ? (
                    <FiCheck size={24} className="text-white" />
                  ) : (
                    <FiShoppingCart size={24} className="text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Added to Cart!</h3>
                  <p className="text-white/90 text-sm">Item successfully added</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiShoppingCart size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {title}
                  </h4>
                  {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {description}
                    </p>
                  )}
                  {price && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ₹{price}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        • 1 item
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = '/cart';
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <FiShoppingCart size={16} />
                  View Cart
                </button>
              </div>
            </div>

            {/* Progress bar */}
            {duration > 0 && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className="h-1 bg-gradient-to-r from-blue-600 to-teal-600"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
