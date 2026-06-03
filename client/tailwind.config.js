/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vakeel: {
          // Core surfaces
          black:    '#07070A',
          s1:       '#0D0D12',
          s2:       '#13131A',
          s3:       '#1A1A24',
          s4:       '#222230',

          // Brand gold (brass court-seal)
          gold:       '#C9A45A',
          goldBright: '#E8C97A',
          goldDim:    '#8A6E38',
          goldGlow:   'rgba(201,164,90,0.15)',

          // Parchment cream
          cream:    '#EBE1CC',
          creamDim: '#C4B89A',
          creamDark:'#8A7D65',

          // Red seal / crimson
          crimson:  '#8B1B1F',
          crimsonDim:'#4A1012',

          // Typography
          text:     '#E4DDD0',
          muted:    '#9D9488',
          dim:      '#5C5650',
          faint:    '#2D2B27',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
        body:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        display1: ['clamp(3.5rem, 8vw, 8rem)',  { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        display2: ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        display3: ['clamp(1.8rem, 3.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        stat:     ['clamp(3rem, 7vw, 7rem)',     { lineHeight: '1',    letterSpacing: '-0.03em' }],
      },
      spacing: {
        section: 'clamp(5rem, 10vw, 10rem)',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      borderRadius: {
        sm: '3px',
        md: '6px',
        lg: '12px',
        xl: '20px',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        'gold-radial': 'radial-gradient(ellipse at 50% 100%, rgba(201,164,90,0.12) 0%, transparent 70%)',
        'hero-glow':   'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,164,90,0.08) 0%, transparent 100%)',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'scan':       'scan 8s linear infinite',
        'blink':      'blink 1.2s step-end infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseGold: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        scan:      { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(100vh)' } },
        blink:     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      boxShadow: {
        'gold-sm': '0 0 12px rgba(201,164,90,0.2)',
        'gold-md': '0 0 30px rgba(201,164,90,0.25)',
        'gold-lg': '0 0 60px rgba(201,164,90,0.2)',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,0.04)',
        'card': '0 1px 1px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        'expo-out':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':    'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
