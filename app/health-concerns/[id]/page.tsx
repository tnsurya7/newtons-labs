'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import TestCard from '@/components/TestCard';
import SupportModal from '@/components/modals/SupportModal';
import testsData from '@/lib/data/tests.json';

export default function HealthConcernPage() {
  const params = useParams();
  const router = useRouter();
  const concernId = params.id as string;
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Find the concern
  const concern = testsData.healthConcerns.find(c => c.id === concernId);

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

  // Get related tests (for demo, showing all tests - in production, filter by concern)
  const relatedTests = testsData.frequentlyBookedTests;

  const colorMap: { [key: string]: string } = {
    'from-red-400 to-orange-400': 'from-red-500 to-orange-500',
    'from-blue-400 to-cyan-400': 'from-blue-500 to-cyan-500',
    'from-purple-400 to-pink-400': 'from-purple-500 to-pink-500',
    'from-green-400 to-teal-400': 'from-green-500 to-teal-500',
    'from-indigo-400 to-purple-400': 'from-indigo-500 to-purple-500',
    'from-rose-400 to-red-400': 'from-rose-500 to-red-500',
    'from-yellow-400 to-orange-400': 'from-yellow-500 to-orange-500',
    'from-pink-400 to-rose-400': 'from-pink-500 to-rose-500',
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
            <div className="text-8xl">{concern.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {concern.name} Tests
              </h1>
              <p className="text-xl text-white/90">
                {concern.tests} specialized tests available
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">
            <span className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
              Recommended Tests
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TestCard {...test} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${gradientClass} rounded-3xl p-8 text-center text-white`}
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
