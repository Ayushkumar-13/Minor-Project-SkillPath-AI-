/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070A13',
          card: '#0D1324',
          dark: '#03050A',
          primary: '#06b6d4', // Cyan
          secondary: '#8b5cf6', // Violet
          accent: '#ec4899', // Pink
          success: '#10b981', // Emerald
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 3s ease-in-out infinite',
        'glow-purple': 'glowPurple 3s ease-in-out infinite',
      },
      keyframes: {
        glowCyan: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2), inset 0 0 5px rgba(6, 182, 212, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(6, 182, 212, 0.3)' },
        },
        glowPurple: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.2), inset 0 0 5px rgba(139, 92, 246, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), inset 0 0 10px rgba(139, 92, 246, 0.3)' },
        }
      }
    },
  },
  plugins: [],
}
