/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#E5EEA0',
          soft: '#F2F7CC',
          muted: '#D7E384',
        },
        sky: {
          DEFAULT: '#C9E5F5',
          soft: '#E5F3FB',
          muted: '#A9D4ED',
        },
        maroon: {
          DEFAULT: '#68152B',
          dark: '#4A0D1D',
          light: '#85223D',
        },
        ink: '#0E0E10',
        charcoal: '#17171B',
        paper: '#FFFFFF',
        offwhite: '#FAF9F6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        editorial: '0 20px 50px -15px rgba(14, 14, 16, 0.14)',
        polaroid: '0 18px 40px -12px rgba(14, 14, 16, 0.22)',
      },
    },
  },
  plugins: [],
};
