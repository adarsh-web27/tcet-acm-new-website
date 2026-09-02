/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure Blue 5-color palette (shifted from teal/warm → cohesive blue family)
        ivory:    "#EFF6FF",   // Cool blue-white (was warm cream #FDFCE8)
        honeydew: "#DBEAFE",   // Light blue wash (was mint green #DBEBE2)
        ltblue:   "#93C5FD",   // Soft periwinkle (was powder teal #B9D9DC)
        mdblue:   "#3B82F6",   // Vivid blue (was teal #5EA3C0)
        dpblue:   "#1D4ED8",   // Royal blue (was deep teal-blue #036DA4)
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft':  '0 2px 12px 0 rgba(29, 78, 216, 0.08)',
        'card':  '0 4px 20px 0 rgba(29, 78, 216, 0.10)',
        'hover': '0 8px 32px 0 rgba(29, 78, 216, 0.14)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
