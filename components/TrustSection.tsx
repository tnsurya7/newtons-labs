'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiActivity, FiAward, FiClock } from 'react-icons/fi';

const metrics = [
  {
    icon: FiMapPin,
    value: '250+',
    label: 'Cities Covered',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    icon: FiActivity,
    value: '10M+',
    label: 'Tests Per Year',
    color: 'from-teal-600 to-green-600',
  },
  {
    icon: FiMapPin,
    value: '10,000+',
    label: 'Collection Centers',
    color: 'from-purple-600 to-pink-600',
  },
  {
    icon: FiAward,
    value: 'NABL',
    label: 'Certified Labs',
    color: 'from-orange-600 to-red-600',
  },
  {
    icon: FiClock,
    value: '99%',
    label: 'On-Time Reports',
    color: 'from-indigo-600 to-purple-600',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-teal-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Trust Newton Labs?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            India&apos;s most trusted diagnostic laboratory with state-of-the-art facilities
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center`}>
                  <metric.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-2">{metric.value}</h3>
                <p className="text-sm text-blue-100">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3">
              <span className="font-semibold">🏆 NABL Accredited</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3">
              <span className="font-semibold">✓ ISO 9001:2015</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3">
              <span className="font-semibold">🔬 CAP Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
