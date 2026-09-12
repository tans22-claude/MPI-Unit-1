/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Option 1: Warm & Nostalgic (Cream + Terracotta)
        cream: {
          50: '#FFFBF5',
          100: '#FFF8F0',
          200: '#FFF0E0',
          300: '#FFE8D0',
        },
        terracotta: {
          400: '#F2937E',
          500: '#E07A5F',
          600: '#D96A4F',
          700: '#C85A3F',
        },
        sandy: {
          400: '#F7B577',
          500: '#F4A261',
          600: '#F29551',
        },
        // Text colors - Semua hitam untuk terlihat di cream background
        ink: {
          50: '#F5F5F5',   // Light (untuk navbar dark bg)
          100: '#E8E8E8',  // Light grey (untuk navbar dark bg)
          200: '#2C2C2C',  // Dark grey / Black
          300: '#2C2C2C',  // Black
          500: '#2C2C2C',  // Black
          700: '#2C2C2C',  // Black
          900: '#1A1A1A',  // Very dark (navbar bg)
        },
        deepblue: {
          500: '#3D405B',
          600: '#2D3047',
          700: '#1D2033',
        },
        accent: {
          warm: '#E07A5F',
          cool: '#3D405B',
          glow: '#F4A261',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'reveal-up': 'revealUp 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
