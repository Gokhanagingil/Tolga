import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        istanbul: {
          gold: '#D4AF37',
          navy: '#1B2A4A',
          cream: '#FFF8F0',
          terracotta: '#C75B39',
          sea: '#4A90A4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, #1B2A4A 0%, #4A90A4 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
