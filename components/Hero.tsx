'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiHome, FiActivity } from 'react-icons/fi';
import DNALogo from './ui/DNALogo';
import Button from './ui/Button';
import LoginRequiredModal from './modals/LoginRequiredModal';
import { useAuthStore } from '@/store/auth';

export default function Hero() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginFeature, setLoginFeature] = useState('');

  const handleHomeVisit = () => {
    if (!isAuthenticated) {
      setLoginFeature('book home visit services');
      setShowLoginModal(true);
      return;
    }
    router.push('/home-visit');
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-teal-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 md:py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4 flex items-center gap-2">
                <FiActivity size={16} />
                <span>India&apos;s Trusted Diagnostic Lab</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Home Collections
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Made Easy</span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Book diagnostic tests from the comfort of your home. NABL certified labs, accurate reports, and free home sample collection.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={handleHomeVisit}
                >
                  <FiHome /> Book Home Visit
                </Button>
              </div>

              {/* Quality Highlights */}
              <div className="grid grid-cols-2 gap-6 mt-12 max-w-md">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiHome className="text-white" size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Home Visit</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Available</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiActivity className="text-white" size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Chennai</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">600102</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-white/50">
                <div className="text-white text-center p-8">
                  <DNALogo size={160} className="mx-auto mb-6" animate={true} />
                  <h3 className="text-2xl font-bold mb-2">Advanced Diagnostics</h3>
                  <p className="text-blue-100">Precision. Care. Trust.</p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-w-[200px] border-2 border-teal-200 dark:border-teal-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 dark:bg-teal-900 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Quality Testing</p>
                    <p className="text-xs text-gray-500">Accurate Results</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-8 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-w-[200px] border-2 border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                    <FiHome size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Home Visit</p>
                    <p className="text-xs text-gray-500">Safe & Convenient</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Login Required Modal */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message={`Please login to ${loginFeature}`}
        feature={loginFeature}
      />
    </>
  );
}
