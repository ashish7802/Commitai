/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080816',
        foreground: '#f6f7fb',
        muted: '#9aa4bf',
        panel: '#12172a',
        border: 'rgba(255,255,255,0.08)',
        accent: '#7c3aed',
        secondary: '#2563eb',
      },
      boxShadow: {
        glow: '0 0 60px rgba(124, 58, 237, 0.22)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(124,58,237,0.35), transparent 35%), radial-gradient(circle at top right, rgba(37,99,235,0.28), transparent 30%)',
      },
    },
  },
  plugins: [],
};
