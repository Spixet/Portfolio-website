/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        backgroundDark: '#0a0a0a',
        backgroundBlack: '#000000',
        accentTeal: '#14b8a6', // Adjusted teal for better light theme harmony
        accentMagenta: '#d946ef', // Adjusted magenta for better light theme harmony
        foreground: '#030712', // Darker gray for better light mode contrast
        'foreground-dark': '#f9fafb', // Example: light gray for dark mode
        backgroundLight: '#f9fafb', // Tailwind gray-50 for a very light background
        cardLight: '#ffffff', // White for light mode cards/containers for contrast
        cardDark: '#1f2937', // Dark gray for dark mode cards (Tailwind gray-800)
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        headline: ['Oswald', 'sans-serif'],
        body: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'), // Add aspect-ratio plugin
  ],
  darkMode: 'class',
}