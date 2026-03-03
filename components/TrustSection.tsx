'use client';

import { motion } from 'framer-motion';

export default function TrustSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional healthcare services at your doorstep
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blood Sample Collection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
                {/* Nurse */}
                <motion.circle
                  cx="100"
                  cy="60"
                  r="25"
                  fill="#FDB4B4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.path
                  d="M 75 85 Q 100 95 125 85 L 125 140 L 75 140 Z"
                  fill="#60A5FA"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
                {/* Blood vial */}
                <motion.rect
                  x="130"
                  y="100"
                  width="20"
                  height="40"
                  rx="3"
                  fill="#EF4444"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.rect
                  x="130"
                  y="95"
                  width="20"
                  height="5"
                  fill="#991B1B"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                />
                {/* Arm */}
                <motion.path
                  d="M 125 110 L 145 115"
                  stroke="#FDB4B4"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.4 }}
                />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Home Sample Collection
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Trained phlebotomists collect samples at your convenience
            </p>
          </motion.div>

          {/* Lab Testing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
                {/* Microscope */}
                <motion.circle
                  cx="100"
                  cy="60"
                  r="15"
                  fill="#3B82F6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                />
                <motion.rect
                  x="95"
                  y="75"
                  width="10"
                  height="50"
                  fill="#1E40AF"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ transformOrigin: 'top' }}
                />
                <motion.ellipse
                  cx="100"
                  cy="130"
                  rx="40"
                  ry="10"
                  fill="#60A5FA"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                />
                {/* Test tubes */}
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <rect x="140" y="90" width="12" height="35" rx="2" fill="#10B981" />
                  <rect x="155" y="95" width="12" height="30" rx="2" fill="#EF4444" />
                </motion.g>
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Advanced Lab Testing
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              State-of-the-art equipment for accurate results
            </p>
          </motion.div>

          {/* Digital Reports */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
                {/* Phone/Tablet */}
                <motion.rect
                  x="60"
                  y="40"
                  width="80"
                  height="120"
                  rx="10"
                  fill="#1F2937"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                />
                <motion.rect
                  x="70"
                  y="55"
                  width="60"
                  height="90"
                  rx="5"
                  fill="#60A5FA"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                {/* Report lines */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.line
                    key={i}
                    x1="75"
                    y1={65 + i * 15}
                    x2="125"
                    y2={65 + i * 15}
                    stroke="#1F2937"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  />
                ))}
                {/* Checkmark */}
                <motion.path
                  d="M 85 125 L 95 135 L 115 115"
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 1 }}
                />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Digital Reports
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get reports instantly on your phone or email
            </p>
          </motion.div>

          {/* Doctor Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
                {/* Doctor */}
                <motion.circle
                  cx="100"
                  cy="70"
                  r="30"
                  fill="#FDB4B4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.path
                  d="M 70 100 Q 100 110 130 100 L 130 160 L 70 160 Z"
                  fill="#FFFFFF"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
                {/* Stethoscope */}
                <motion.path
                  d="M 85 110 Q 85 130 100 135 Q 115 130 115 110"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.7 }}
                />
                <motion.circle
                  cx="100"
                  cy="135"
                  r="8"
                  fill="#3B82F6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                />
                {/* Medical cross on coat */}
                <motion.path
                  d="M 100 115 L 100 125 M 95 120 L 105 120"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.9 }}
                />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Expert Consultation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Discuss results with qualified healthcare professionals
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
