/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#060A13',
          900: '#0B1120',
          850: '#0F172A',
          800: '#1E293B',
          700: '#334155'
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309'
        },
        zion: {
          900: '#0E0C28',
          800: '#1E1B4B',
          700: '#312E81',
          600: '#4338CA'
        },
        forest: {
          950: '#0A1C17',
          900: '#0F2A23',
          800: '#173F35',
          700: '#244E40',
          600: '#2E6352',
          500: '#3E806B'
        },
        ivory: {
          50: '#FDFBF7',
          100: '#F8F5EC',
          200: '#E8E3D5',
          300: '#D9D2BF'
        },
        champagne: {
          300: '#EED97A',
          400: '#E5C158',
          500: '#D4AF37',
          600: '#B89326',
          700: '#94751C'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'Georgia', 'serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
