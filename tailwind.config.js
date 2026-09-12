/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          warm: '#E07A5F',
          cool: '#3D405B',
          glow: '#F4A261',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
        ink: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#2C2C2C',
          300: '#2C2C2C',
          500: '#2C2C2C',
          700: '#2C2C2C',
          900: '#1A1A1A',
        },
        deepblue: {
          500: '#3D405B',
          600: '#2D3047',
          700: '#1D2033',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
