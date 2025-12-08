/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Ensure components dir is scanned
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316', // Orange Primary
          600: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
        },
        accent: {
          500: '#95BF47', // Custom Green
          600: '#86ac3d',
          700: '#779833',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'orbit-enter': 'orbitEnter 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'orbit-float': 'orbitFloat 6s ease-in-out infinite',
        'orbit-spin-slow': 'orbitSpin 60s linear infinite', // Smoother, slower
        'orbit-spin-reverse-slow': 'orbitSpinReverse 60s linear infinite', // Matches spin speed
        'pulse-ring': 'pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'pulse-btn': 'pulseBtn 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
      },
      keyframes: {
        orbitEnter: {
          '0%': { opacity: '0', transform: 'translate(-50%, -50%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        orbitFloat: {
          '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0)' },
          '50%': { transform: 'translate(-50%, -50%) translateY(-8px)' },
        },
        orbitSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitSpinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        pulseRing: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.8)', opacity: '0.6' },
          '80%, 100%': { transform: 'translate(-50%, -50%) scale(2.2)', opacity: '0' },
        },
        pulseBtn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}