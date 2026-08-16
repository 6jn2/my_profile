/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background:  '#050510',
        surface:     '#0d0d1a',
        'surface-2': '#12122a',
        border:      '#1a1a3e',
        accent:      '#00d4ff',
        'accent-dim':'#0099cc',
        purple:      '#7c3aed',
        'purple-dim':'#5b21b6',
        foreground:  '#f8fafc',
        muted:       '#94a3b8',
        faint:       '#475569',
      },
      fontFamily: {
        sans:  ['var(--font-inter)',  'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)',   'monospace'],
        space: ['var(--font-space)',  'sans-serif'],
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'gradient-x':    'gradient-x 15s ease infinite',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':     'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':      { 'background-position': '100% 50%' },
        },
      },
      backgroundSize: { '300%': '300%' },
      boxShadow: {
        'glow':        '0 0 20px rgba(0,212,255,0.3)',
        'glow-lg':     '0 0 40px rgba(0,212,255,0.4)',
        'glow-purple': '0 0 20px rgba(124,58,237,0.3)',
        'card':        '0 4px 30px rgba(0,0,0,0.5)',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
