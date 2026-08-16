/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0a0a0f',
        surface: '#111118',
        border:  '#1e1e2e',
        accent:  '#00d4ff',
        purple:  '#7c3aed',
        fg:      '#f8fafc',
        muted:   '#64748b',
      }
    }
  },
  plugins: []
}
