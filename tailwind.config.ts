import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── kooza brand palette (Odoo-inspired mauve) ──
        purple: {
          50: '#f7f2f5',
          100: '#ebdde5',
          200: '#d6bcc9',
          300: '#bb98ad',
          400: '#9c7891',
          500: '#875A7B',
          600: '#714B67',  // ← signature
          700: '#5c3d54',
          800: '#48303f',
          900: '#33222b',
          950: '#1f141a',
        },

        // ── Semantic tokens (UI feedback) ──
        success: {
          50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981',
          600: '#059669', 700: '#047857', 900: '#064e3b',
        },
        warning: {
          50: '#fffbeb', 100: '#fef3c7', 500: '#f59e0b',
          600: '#d97706', 700: '#b45309', 900: '#78350f',
        },
        danger: {
          50: '#fef2f2', 100: '#fee2e2', 500: '#ef4444',
          600: '#dc2626', 700: '#b91c1c', 900: '#7f1d1d',
        },
        info: {
          50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6',
          600: '#2563eb', 700: '#1d4ed8', 900: '#1e3a8a',
        },

        // legacy (compat)
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
      },

      // ── Border radius — only 3 sizes ──
      borderRadius: {
        // sm = 6px (badges, tags)
        // xl = 12px (buttons, inputs, chips) — DEFAULT for interactive
        // '2xl' = 16px (cards, modals, panels)
      },

      // ── Soft shadows (design tokens) ──
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        elevated: '0 4px 24px rgba(113,75,103,0.10)',
        card: '0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)',
        cardHover: '0 10px 40px rgba(113,75,103,0.12)',
        button: '0 1px 2px rgba(113,75,103,0.20), 0 4px 12px rgba(113,75,103,0.15)',
      },

      // ── Typography scale ──
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // override scale for consistency
        'display': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '700' }],
        'h1':      ['3rem',    { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2':      ['2.25rem', { lineHeight: '1.10', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h3':      ['1.75rem', { lineHeight: '1.20', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
