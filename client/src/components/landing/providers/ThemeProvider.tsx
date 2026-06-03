import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ─── Types ──────────────────────────────────────────────────────────── */

export type Theme = 'dark' | 'light'

export interface ThemeTokens {
  bg:         string  // main section background
  bgDeep:     string  // opening/deepest bg
  s1:         string  // surface 1 (cards)
  s2:         string  // surface 2 (inputs, darker cards)
  s3:         string  // surface 3
  text:       string  // primary text
  text2:      string  // secondary text (muted)
  text3:      string  // tertiary text (very muted)
  cream:      string  // display / headline text
  gold:       string  // brand gold
  goldBright: string  // bright gold highlight
  goldBorder: string  // rgba gold border (0.15 opacity)
  goldSubtle: string  // rgba gold bg (0.06 opacity)
  crimson:    string  // red accent
  border:     string  // default border color
}

/* ─── Token palettes ────────────────────────────────────────────────── */

const DARK: ThemeTokens = {
  bg:         '#07070A',
  bgDeep:     '#050508',
  s1:         '#0D0D12',
  s2:         '#13131A',
  s3:         '#1A1A24',
  text:       '#E4DDD0',
  text2:      '#9D9488',
  text3:      '#5C5650',
  cream:      '#EBE1CC',
  gold:       '#C9A45A',
  goldBright: '#E8C97A',
  goldBorder: 'rgba(201,164,90,0.15)',
  goldSubtle: 'rgba(201,164,90,0.06)',
  crimson:    '#8B1B1F',
  border:     'rgba(201,164,90,0.1)',
}

const LIGHT: ThemeTokens = {
  bg:         '#F5EDD8',
  bgDeep:     '#EDE3C8',
  s1:         '#EAE0C8',
  s2:         '#E0D4B4',
  s3:         '#D4C8A0',
  text:       '#1C1508',
  text2:      '#5A4A30',
  text3:      '#8A7A60',
  cream:      '#1C1508',
  gold:       '#8B6018',
  goldBright: '#6B4810',
  goldBorder: 'rgba(139,96,24,0.22)',
  goldSubtle: 'rgba(139,96,24,0.08)',
  crimson:    '#8B1B1F',
  border:     'rgba(139,96,24,0.14)',
}

/* ─── Helpers ───────────────────────────────────────────────────────── */

const STORAGE_KEY = 'vakeel-theme'

function applyTokens(t: ThemeTokens): void {
  const s = document.documentElement.style
  s.setProperty('--c-bg',          t.bg)
  s.setProperty('--c-bg-deep',     t.bgDeep)
  s.setProperty('--c-s1',          t.s1)
  s.setProperty('--c-s2',          t.s2)
  s.setProperty('--c-s3',          t.s3)
  s.setProperty('--c-text',        t.text)
  s.setProperty('--c-text2',       t.text2)
  s.setProperty('--c-text3',       t.text3)
  s.setProperty('--c-cream',       t.cream)
  s.setProperty('--c-gold',        t.gold)
  s.setProperty('--c-gold-bright', t.goldBright)
  s.setProperty('--c-gold-border', t.goldBorder)
  s.setProperty('--c-gold-subtle', t.goldSubtle)
  s.setProperty('--c-crimson',     t.crimson)
  s.setProperty('--c-border',      t.border)
}

/* ─── Context ───────────────────────────────────────────────────────── */

interface ThemeContextValue {
  theme:       Theme
  tokens:      ThemeTokens
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:       'dark',
  tokens:      DARK,
  toggleTheme: () => {},
})

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

/* ─── Transition overlay ────────────────────────────────────────────── */
// Rendered by the provider; also exported for external use if needed.

export function ThemeTransitionOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="theme-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          style={{
            position:      'fixed',
            inset:         0,
            zIndex:        9997,
            background:    'var(--c-bg, #07070A)',
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  )
}

/* ─── Provider ──────────────────────────────────────────────────────── */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored === 'light' || stored === 'dark' ? stored : 'dark'
    } catch {
      return 'dark'
    }
  })

  const [isTransitioning, setIsTransitioning] = useState(false)

  // Sync DOM attribute, CSS custom properties, and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    applyTokens(theme === 'dark' ? DARK : LIGHT)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore QuotaExceededError / private-browsing restrictions
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Wait for the overlay to reach full opacity (~150 ms), then swap the
    // theme and begin the fade-out in a single batched React render.
    setTimeout(() => {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
      setIsTransitioning(false) // AnimatePresence drives the 300 ms exit
    }, 160)
  }, [isTransitioning])

  const tokens = theme === 'dark' ? DARK : LIGHT

  return (
    <ThemeContext.Provider value={{ theme, tokens, toggleTheme }}>
      {/* Overlay is fixed + z-index 9997, sits above all page content */}
      <ThemeTransitionOverlay visible={isTransitioning} />
      {children}
    </ThemeContext.Provider>
  )
}
