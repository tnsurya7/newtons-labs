/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    // Health Concerns gradient colors
    'from-red-400',
    'to-orange-400',
    'from-blue-400',
    'to-cyan-400',
    'from-purple-400',
    'to-pink-400',
    'from-green-400',
    'to-teal-400',
    'from-indigo-400',
    'to-purple-400',
    'from-rose-400',
    'to-red-400',
    'from-yellow-400',
    'to-orange-400',
    'from-pink-400',
    'to-rose-400',
    'bg-gradient-to-br',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
