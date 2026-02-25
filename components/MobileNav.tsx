'use client';

import { FiHome, FiActivity, FiMapPin, FiUser, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';

export default function MobileNav() {
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems);
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    { icon: FiHome, label: 'Home', action: () => router.push('/') },
    { icon: FiActivity, label: 'Tests', action: () => document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' }) },
    { 
      icon: FiShoppingCart, 
      label: 'Cart', 
      badge: totalItems,
      action: () => router.push('/cart')
    },
    { 
      icon: FiMapPin, 
      label: 'Locations', 
      action: async () => {
        const pincode = prompt('Enter your pincode to find nearby labs:');
        if (pincode) {
          try {
            const response = await fetch(`/api/locations/nearby?pincode=${pincode}`);
            const result = await response.json();
            if (result.success) {
              const locations = result.data.locations.map((loc: any, i: number) => 
                `${i + 1}. ${loc.name}\n   ${loc.address}\n   Distance: ${loc.distance}\n   Phone: ${loc.phone}`
              ).join('\n\n');
              alert(`📍 Found ${result.data.count} labs near ${pincode}\n\n${locations}`);
            }
          } catch (error) {
            alert('Failed to find locations. Please try again.');
          }
        }
      }
    },
    { 
      icon: FiUser, 
      label: 'Profile', 
      action: () => {
        if (isAuthenticated) {
          router.push('/profile');
        } else {
          router.push('/login');
        }
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
            <div className="relative">
              <item.icon size={24} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
