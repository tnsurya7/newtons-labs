'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiThermometer, FiDroplet, FiFilter, FiHeart, FiZap, FiSun, FiAlertCircle } from 'react-icons/fi';
import testsData from '@/lib/data/tests.json';

const colorMap: { [key: string]: string } = {
  'from-red-400 to-orange-400': 'bg-gradient-to-br from-red-400 to-orange-400',
  'from-blue-400 to-cyan-400': 'bg-gradient-to-br from-blue-400 to-cyan-400',
  'from-purple-400 to-pink-400': 'bg-gradient-to-br from-purple-400 to-pink-400',
  'from-green-400 to-teal-400': 'bg-gradient-to-br from-green-400 to-teal-400',
  'from-indigo-400 to-purple-400': 'bg-gradient-to-br from-indigo-400 to-purple-400',
  'from-rose-400 to-red-400': 'bg-gradient-to-br from-rose-400 to-red-400',
  'from-yellow-400 to-orange-400': 'bg-gradient-to-br from-yellow-400 to-orange-400',
  'from-pink-400 to-rose-400': 'bg-gradient-to-br from-pink-400 to-rose-400',
};

const iconMap: { [key: string]: React.ReactNode } = {
  'Thermometer': <FiThermometer size={40} />,
  'Droplet': <FiDroplet size={40} />,
  'Filter': <FiFilter size={40} />,
  'Heart': <FiHeart size={40} />,
  'Zap': <FiZap size={40} />,
  'Sun': <FiSun size={40} />,
  'AlertCircle': <FiAlertCircle size={40} />,
};

export default function HealthConcerns() {
  const router = useRouter();

  return (
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {testsData.healthConcerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer h-full"
              onClick={() => router.push(`/health-concerns/${concern.id}`)}
            >
              <div className={`${colorMap[concern.color]} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all h-full flex flex-col items-center justify-center text-center`}>
                <div className="mb-3 flex items-center justify-center">
                  {iconMap[concern.icon]}
                </div>
                <h3 className="font-bold text-lg mb-1">{concern.name}</h3>
                <p className="text-sm opacity-90">{concern.tests} Tests</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
