'use client';

import { FiHome, FiActivity, FiPackage, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MobileNav() {
  const router = useRouter();

  const navItems = [
    { 
      icon: FiHome, 
      label: 'Home', 
      action: () => router.push('/') 
    },
    { 
      icon: FiActivity, 
      label: 'Tests', 
      action: () => {
        if (window.location.pathname !== '/') {
          router.push('/');
          setTimeout(() => {
            document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: FiPackage, 
      label: 'Packages', 
      action: () => {
        if (window.location.pathname !== '/') {
          router.push('/');
          setTimeout(() => {
            document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: FiPhone, 
      label: 'Support', 
      action: () => {
        const message = `Hi, I need assistance with booking a test/package. Please help me.`;
        const whatsappUrl = `https://wa.me/919003130800?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-2 py-3 shadow-2xl"
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative px-3 py-1"
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
