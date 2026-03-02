'use client';

import { motion } from 'framer-motion';

interface DNALogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function DNALogo({ size = 120, className = '', animate = true }: DNALogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 1.6 }}>
      <svg
        viewBox="0 0 100 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {animate ? (
          <>
            {/* Left Strand - Thin S-curve that crosses through middle */}
            <motion.path
              d="M 30 5 C 20 20, 15 35, 20 50 C 25 65, 35 75, 50 80 C 65 85, 75 95, 80 110 C 85 125, 80 140, 70 155"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-gray-900 dark:text-white"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Right Strand - Thin S-curve that crosses through middle (mirror) */}
            <motion.path
              d="M 70 5 C 80 20, 85 35, 80 50 C 75 65, 65 75, 50 80 C 35 85, 25 95, 20 110 C 15 125, 20 140, 30 155"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-gray-900 dark:text-white"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
            
            {/* Base Pairs - Horizontal bars connecting the strands */}
            {[
              { y: 15, x1: 28, x2: 72 },
              { y: 28, x1: 24, x2: 76 },
              { y: 41, x1: 22, x2: 78 },
              { y: 54, x1: 24, x2: 76 },
              { y: 67, x1: 30, x2: 70 },
              { y: 80, x1: 42, x2: 58 },
              { y: 93, x1: 30, x2: 70 },
              { y: 106, x1: 24, x2: 76 },
              { y: 119, x1: 22, x2: 78 },
              { y: 132, x1: 24, x2: 76 },
              { y: 145, x1: 28, x2: 72 }
            ].map((bar, index) => (
              <motion.line
                key={index}
                x1={bar.x1}
                y1={bar.y}
                x2={bar.x2}
                y2={bar.y}
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-gray-900 dark:text-white"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.6 + index * 0.08
                }}
                style={{ transformOrigin: 'center' }}
              />
            ))}
          </>
        ) : (
          <>
            {/* Static Version */}
            <path
              d="M 30 5 C 20 20, 15 35, 20 50 C 25 65, 35 75, 50 80 C 65 85, 75 95, 80 110 C 85 125, 80 140, 70 155"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-gray-900 dark:text-white"
            />
            
            <path
              d="M 70 5 C 80 20, 85 35, 80 50 C 75 65, 65 75, 50 80 C 35 85, 25 95, 20 110 C 15 125, 20 140, 30 155"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-gray-900 dark:text-white"
            />
            
            {[
              { y: 15, x1: 28, x2: 72 },
              { y: 28, x1: 24, x2: 76 },
              { y: 41, x1: 22, x2: 78 },
              { y: 54, x1: 24, x2: 76 },
              { y: 67, x1: 30, x2: 70 },
              { y: 80, x1: 42, x2: 58 },
              { y: 93, x1: 30, x2: 70 },
              { y: 106, x1: 24, x2: 76 },
              { y: 119, x1: 22, x2: 78 },
              { y: 132, x1: 24, x2: 76 },
              { y: 145, x1: 28, x2: 72 }
            ].map((bar, index) => (
              <line
                key={index}
                x1={bar.x1}
                y1={bar.y}
                x2={bar.x2}
                y2={bar.y}
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-gray-900 dark:text-white"
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
