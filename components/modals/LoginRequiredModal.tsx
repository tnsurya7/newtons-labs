'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock, FiUser, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  feature?: string;
}

export default function LoginRequiredModal({ 
  isOpen, 
  onClose, 
  message = 'Please login to continue',
  feature = 'this feature'
}: LoginRequiredModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push('/login');
  };

  const handleSignup = () => {
    onClose();
    router.push('/signup');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white p-4">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <FiX size={20} />
                </button>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mb-3">
                    <FiLock size={28} />
                  </div>
                  <h2 className="text-xl font-bold">Login Required</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-5 text-sm">
                  {message}
                </p>

                {/* Features List */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-3 mb-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                    <FiShoppingCart size={16} className="text-blue-600" />
                    Why create an account?
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Book tests and packages easily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Track your orders and reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Save your medical history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Get personalized recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Access exclusive offers</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <Button
                    onClick={handleLogin}
                    className="w-full gap-2"
                  >
                    <FiUser />
                    Login to Continue
                  </Button>
                  <Button
                    onClick={handleSignup}
                    variant="outline"
                    className="w-full"
                  >
                    Create New Account
                  </Button>
                  <button
                    onClick={onClose}
                    className="w-full text-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors py-1.5"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
