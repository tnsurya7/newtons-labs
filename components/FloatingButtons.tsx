'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

export default function FloatingButtons() {
  const handleWhatsAppClick = () => {
    const message = `Hi, I need assistance with New10Lab services. Please help me.`;
    const whatsappUrl = `https://wa.me/919003252500?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:9003252500';
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button with Float Animation */}
      <motion.button
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white" size={28} />
      </motion.button>

      {/* Call Button with Float Animation */}
      <motion.button
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCallClick}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="Call Us"
      >
        <FiPhone className="text-white" size={24} />
      </motion.button>
    </div>
  );
}
