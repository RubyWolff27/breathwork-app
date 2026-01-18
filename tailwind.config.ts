import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        breath: {
          bg: '#0a0f1a',
          card: '#131b2e',
          primary: '#3b82f6',
          secondary: '#22d3ee',
          accent: '#10b981',
          warning: '#f59e0b',
          text: '#e2e8f0',
          muted: '#64748b',
        },
      },
      animation: {
        'breathe-in': 'breatheIn 4s ease-in-out',
        'breathe-out': 'breatheOut 4s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        breatheIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        breatheOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.6)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
export default config
