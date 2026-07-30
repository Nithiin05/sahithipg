/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        accent2: 'hsl(var(--accent2))',
        success: 'hsl(var(--success))',
        'success-bg': 'hsl(var(--success-bg))',
        danger: 'hsl(var(--danger))',
        'danger-bg': 'hsl(var(--danger-bg))',
        warning: 'hsl(var(--warning))',
        'warning-bg': 'hsl(var(--warning-bg))',
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}
