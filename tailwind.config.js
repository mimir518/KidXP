/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#DDF6E2',
        sky: '#DDEEFF',
        peach: '#FFE8D6',
        ok: '#34C759',
        warn: '#FF9F0A',
        ink: '#22313F',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(34, 49, 63, 0.08)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        stamp: {
          '0%': { transform: 'scale(1.6) rotate(-12deg)', opacity: '0' },
          '55%': { transform: 'scale(0.92) rotate(-8deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-8deg)', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop .35s ease-out',
        stamp: 'stamp .4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
