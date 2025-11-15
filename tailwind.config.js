/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Child-friendly color palette
        'sky-blue': '#4A90E2',
        'energetic-orange': '#FF9500',
        'friendly-green': '#2ECC71',
        'playful-purple': '#9B59B6',
        'happy-pink': '#E91E63',
        'sunshine-yellow': '#FFC107',
        'soft-cream': '#FFF9E6',
        'deep-navy': '#2C3E50',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#4A90E2', // Updated to sky-blue
          600: '#3a7bc8',
          700: '#2a5f9e',
          800: '#1e4976',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        'playful': ['Nunito', 'Fredoka One', 'Poppins', 'sans-serif'],
        'friendly': ['Open Sans', 'Inter', 'system-ui', 'sans-serif'],
        'code': ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'child': '12px',
        'card': '16px',
      },
      boxShadow: {
        'playful': '0 4px 12px rgba(74, 144, 226, 0.2)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'hover': '0 6px 16px rgba(74, 144, 226, 0.3)',
      },
      animation: {
        'bounce-soft': 'bounce-soft 0.6s ease-in-out',
        'sparkle': 'sparkle 1s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
}
