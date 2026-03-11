'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TestCard from '@/components/TestCard';
import PackageCard from '@/components/PackageCard';
import HealthConcerns from '@/components/HealthConcerns';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import Button from '@/components/ui/Button';
import { useTests } from '@/lib/hooks/useTests';
import { usePackages } from '@/lib/hooks/usePackages';
import { FiUserCheck } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  
  // Fetch data from database - sort by lowest price for frequently booked
  const { tests: frequentlyBookedTests, loading: testsLoading } = useTests({ limit: 8, sortBy: 'price-low' });
  const { packages: healthPackages, loading: packagesLoading } = usePackages();

  const handleConsultationClick = () => {
    router.push('/consultation');
  };
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
                Most popular diagnostic tests with up to 77% discount
              </p>
            </motion.div>

            {testsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tests...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {frequentlyBookedTests.map((test) => (
                  <TestCard key={test.id} {...test} />
                ))}
              </div>
            )}

            {/* View All Button */}
            <div className="text-center">
              <Button
                onClick={() => router.push('/tests')}
                size="lg"
                variant="primary"
              >
                View All Tests
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Health Packages */}
        <section id="packages" className="py-16 pb-14 bg-white dark:bg-gray-900">
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

            {/* Horizontal Scrollable Container with Arrows */}
            {packagesLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading packages...</p>
              </div>
            ) : (
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={() => {
                    const container = document.getElementById('packages-scroll-container');
                    if (container) {
                      container.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-xl rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110 border-2 border-gray-200 dark:border-gray-700"
                  aria-label="Scroll left"
                >
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => {
                    const container = document.getElementById('packages-scroll-container');
                    if (container) {
                      container.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-xl rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110 border-2 border-gray-200 dark:border-gray-700"
                  aria-label="Scroll right"
                >
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Scrollable Container */}
                <div 
                  id="packages-scroll-container"
                  className="overflow-x-auto pb-4 scrollbar-hide px-12"
                >
                  <div className="flex gap-6 py-2" style={{ minWidth: 'min-content' }}>
                    {healthPackages.map((pkg) => (
                      <div key={pkg.id} className="flex-shrink-0 w-[280px] h-[510px]">
                        <PackageCard {...pkg} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Health Concerns */}
        <HealthConcerns />

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
              <FiUserCheck className="mx-auto mb-6" size={64} />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Expert Medical Advice?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Consult with our experienced doctors online. Get personalized health guidance from the comfort of your home.
              </p>
              <Button
                size="lg"
                onClick={handleConsultationClick}
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
