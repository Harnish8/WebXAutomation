/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Brand ── */
        primary: '#732c7c',   // vivid violet — buttons, icons, accents
        'primary-dark': '#43175f',   // deep plum — headings, dark elements
        'primary-dim': '#5a2268',   // mid plum — gradient midpoint
        'primary-light': '#9b52a5',   // lighter violet — hover tints
        accent: '#d1746d',   // terracotta rose — tags, badges, highlights
        'accent-warm': '#f6a16c',   // peach orange — gradient accent, decorative

        /* ── Backgrounds ── */
        bg: '#12002F',   // page background — light purple tint
        'bg-card': '#f3eef9',   // card surface — soft lavender
        'bg-elevated': '#ede5f5',   // deeper card — hover state bg
        'bg-white': '#ffffff',   // pure white — inputs, elevated elements

        /* ── Text ── */
        'text-heading': '#1a0a2e',   // near-black plum — h1/h2/h3
        'text-body': '#4a3560',   // muted dark purple — paragraphs
        'text-muted': '#8a6fa0',   // soft purple-grey — labels, meta, placeholders
        'text-faint': 'rgba(138,111,160,0.5)', // very faint — timestamps, secondary meta


        'webx-gold': '#FFB84C',
        'webx-white': '#ffffff',
        'webx-magenta': '#D6008D',
        'webx-midnight': '#12002F',
        'webx-purple': '#4B0082',


        /* ── Borders ── */
        'border-subtle': 'rgba(115,44,124,0.12)',  // default card borders
        'border-strong': 'rgba(115,44,124,0.38)',  // hover borders
        'border-accent': 'rgba(209,116,109,0.25)', // accent borders

        /* ── Legacy aliases (keep so old components dont break) ── */
        surface: '#faf7fd',
        'surface-container': '#f3eef9',
        'surface-container-low': '#f7f3fc',
        'surface-container-high': '#ede5f5',
        'surface-container-highest': '#e6dcf0',
        'surface-bright': '#ffffff',
        'on-surface': '#1a0a2e',
        'on-surface-variant': '#4a3560',
        'outline-variant': 'rgba(115,44,124,0.15)',
        outline: '#8a6fa0',
        background: '#12002F',
        secondary: '#d1746d',
        'secondary-light': '#e0958f',
        'secondary-container': 'rgba(209,116,109,0.15)',
        tertiary: '#f6a16c',
        'tertiary-dim': '#f4935a',
        'on-primary': '#ffffff',
        'primary-container': '#9b52a5',
        'primary-fixed': '#9b52a5',
        'primary-dim': '#5a2268',
      },

      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },

      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-ring': {
          '0%,100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.6)' },
        },
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin-slow 25s linear infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },

      boxShadow: {
        'card': '0 4px 24px rgba(67,23,95,0.08), 0 1px 4px rgba(67,23,95,0.05)',
        'card-hover': '0 8px 40px rgba(67,23,95,0.12), 0 24px 64px rgba(67,23,95,0.07)',
        'btn': '0 0 20px rgba(115,44,124,0.30), 0 8px 32px rgba(67,23,95,0.18)',
        'glow': '0 0 28px rgba(115,44,124,0.38), 0 12px 36px rgba(67,23,95,0.22)',
      },
    },
  },
  plugins: [],
}
