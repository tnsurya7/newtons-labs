'use client';

import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { formatPrice } from '@/lib/utils';
import testsData from '@/lib/data/tests.json';

export default function Radiology() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Radiology Services
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Advanced imaging services with latest technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testsData.radiologyServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col text-center border-2 border-purple-100 dark:border-purple-900 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                  {service.available ? '📷' : '🔜'}
                </div>

                <h3 className="text-xl font-bold mb-2">{service.name}</h3>

                {service.available ? (
                  <>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <FiClock />
                      <span>{service.reportTime}</span>
                    </div>

                    <p className="text-2xl font-bold text-purple-600 mb-4">
                      {formatPrice(service.price)}
                    </p>

                    <Button 
                      variant="secondary" 
                      className="w-full mt-auto"
                      onClick={() => alert(`📷 ${service.name}\n\nPrice: ${formatPrice(service.price)}\nReport Time: ${service.reportTime}\n\n✓ Latest equipment\n✓ Expert radiologists\n✓ Digital reports\n✓ Home service available\n\nCall 1800-123-4567 to book!`)}
                    >
                      Book Now
                    </Button>
                  </>
                ) : (
                  <>
                    <Badge variant="warning" className="mx-auto mb-4">
                      Coming Soon
                    </Badge>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Available Soon
                    </p>
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
