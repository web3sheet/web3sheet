import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: { relative: true, files: ['./!(node_modules)/**/*.{ts,tsx}', './index.ts'] },
  prefix: 'w3s-',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      borderColor: {
        DEFAULT: 'var(--w3s-primary)',
      },
      colors: {
        text: {
          primary: 'var(--web3sheet-text)',
        },
        green: {
          DEFAULT: '#31F196',
          50: '#DDFDEE',
          100: '#CAFBE4',
          200: '#A4F9D0',
          300: '#7DF6BD',
          400: '#57F4A9',
          500: 'var(--w3s-primary)',
          600: '#0FDB7A',
          700: '#0BA65D',
          800: '#087240',
          900: '#043D22',
          950: '#022314',
        },
        black: 'var(--web3sheet-black)',
        border: 'hsl(var(--w3s-border))',
        input: 'hsl(var(--w3s-input))',
        ring: 'hsl(var(--w3s-ring))',
        foreground: 'hsl(var(--w3s-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--w3s-primary))',
          foreground: 'hsl(var(--w3s-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--w3s-secondary))',
          foreground: 'hsl(var(--w3s-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--w3s-destructive))',
          foreground: 'hsl(var(--w3s-destructive-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--w3s-warning))',
          foreground: 'hsl(var(--w3s-warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--w3s-info))',
          foreground: 'hsl(var(--w3s-info-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--w3s-muted))',
          foreground: 'hsl(var(--w3s-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--w3s-accent))',
          foreground: 'hsl(var(--w3s-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--w3s-popover))',
          foreground: 'hsl(var(--w3s-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--w3s-card))',
          foreground: 'hsl(var(--w3s-card-foreground))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
      backgroundColor: ['selection'],
      blur: ['hover'],
      borderWidth: ['first'],
      borderRadius: ['last'],
      display: ['group-hover', 'hover'],
      filter: ['hover'],
      transitionDuration: ['group-hover'],
    },
  },
  plugins: [require('tailwindcss-selection-variant'), require('tailwindcss-animate')],
} satisfies Config
