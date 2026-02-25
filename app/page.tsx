'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TestCard from '@/components/TestCard';
import PackageCard from '@/components/PackageCard';
import HealthConcerns from '@/components/HealthConcerns';
import Radiology from '@/components/Radiology';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import Button from '@/components/ui/Button';
import testsData from '@/lib/data/tests.json';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">
      <Header />
      <main className="w-full">
        <Hero />

        {/* Frequently Booked Tests */}
        <section id="tests" className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Frequently Booked Tests
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Most popular diagnostic tests with up to 60% discount
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testsData.frequentlyBookedTests.map((test) => (
                <TestCard key={test.id} {...test} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Health Packages */}
        <section id="packages" className="py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Popular Health Packages
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive health checkup packages at best prices
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testsData.healthPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Health Concerns */}
        <HealthConcerns />

        {/* Radiology Services */}
        <Radiology />

        {/* Trust Section */}
        <TrustSection />

        {/* Doctor Consultation CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-teal-500 to-purple-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center text-white border-2 border-white/30 shadow-2xl"
            >
              <div className="text-6xl mb-6">👨‍⚕️</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Expert Medical Advice?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Consult with our experienced doctors online. Get personalized health guidance from the comfort of your home.
              </p>
              <Button
                size="lg"
                onClick={() => router.push('/consultation')}
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100"
              >
                Book Online Consultation
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
        <MobileNav />
      </main>
    </div>
  );
}
