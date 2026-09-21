/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Barlow Condensed"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'the-green': '#027b49',
        'the-pink': '#f19ec8',
        'the-red': '#fa4d43',
        'the-yellow': '#fbb833',
        concrete: '#d9d9d9',
        iron: '#1f1f1f',
        carbon: '#000000',
      },
      letterSpacing: {
        tighter: '-0.06em',
        tight: '-0.03em',
      },
      lineHeight: {
        display: '0.7',
        heading: '0.8',
        subheading: '1',
        body: '1.2',
      },
      spacing: {
        15: '15px',
        19: '19px',
        30: '30px',
        40: '40px',
        50: '50px',
        100: '100px',
        130: '130px',
        170: '170px',
      },
      borderRadius: {
        pill: '100px',
      },
      maxWidth: {
        site: '1440px',
      },
    },
  },
  plugins: [],
};
