import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../providers/ThemeProvider'

const NAV_LINKS = [
  { label: 'The Problem', href: '#problem'      },
  { label: 'Product',     href: '#product'      },
  { label: 'Architecture',href: '#architecture' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { tokens, theme }       = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navBg = scrolled
    ? theme === 'dark'
      ? 'rgba(7,7,10,0.90)'
      : 'rgba(245,237,216,0.92)'
    : 'transparent'

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${tokens.border}` : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <nav style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* ── Wordmark (English only) ── */}
        <a
          href="#"
          data-cursor="hover"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          {/* Scales micro-icon */}
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
            <line x1="7" y1="1" x2="7" y2="13" stroke={tokens.gold} strokeWidth="0.9" strokeLinecap="round" />
            <line x1="1" y1="3.5" x2="13" y2="3.5" stroke={tokens.gold} strokeWidth="0.9" strokeLinecap="round" />
            <circle cx="7" cy="3.5" r="1" fill={tokens.gold} />
            <path d="M1 3.5 Q2.5 7 4 3.5" stroke={tokens.gold} strokeWidth="0.85" fill="none" strokeLinecap="round" />
            <path d="M10 3.5 Q11.5 7 13 3.5" stroke={tokens.gold} strokeWidth="0.85" fill="none" strokeLinecap="round" />
            <line x1="4.5" y1="13" x2="9.5" y2="13" stroke={tokens.gold} strokeWidth="1" strokeLinecap="round" />
          </svg>

          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.4rem', fontWeight: 600,
            letterSpacing: '0.14em', color: tokens.cream,
          }}>
            VAKEEL
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              data-cursor="hover"
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none',
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.8rem', letterSpacing: '0.05em',
                color: tokens.text2, transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = tokens.text)}
              onMouseLeave={e => (e.currentTarget.style.color = tokens.text2)}
            >
              {link.label}
            </button>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* CTA */}
          <a
            href="#closer"
            data-cursor="hover"
            onClick={e => { e.preventDefault(); scrollTo('#closer') }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '7px 18px',
              border: `1px solid ${tokens.goldBorder}`,
              borderRadius: 3,
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: '0.78rem', letterSpacing: '0.06em',
              color: tokens.gold, textDecoration: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = tokens.goldSubtle
              e.currentTarget.style.borderColor = tokens.gold
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = tokens.goldBorder
            }}
          >
            Get Access
          </a>
        </div>

        {/* ── Mobile right cluster ── */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            data-cursor="hover"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', padding: 6 }}
          >
            <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', height: 1,
                  background: tokens.gold,
                  width: i === 1 ? '70%' : '100%',
                  transform: menuOpen && i === 0 ? 'translateY(5px) rotate(45deg)'
                            : menuOpen && i === 2 ? 'translateY(-5px) rotate(-45deg)'
                            : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transition: 'all 0.22s ease',
                  transformOrigin: 'left',
                }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: theme === 'dark' ? 'rgba(7,7,10,0.97)' : 'rgba(245,237,216,0.97)',
              borderTop: `1px solid ${tokens.border}`,
            }}
          >
            <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[...NAV_LINKS, { label: 'Get Access', href: '#closer' }].map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none', border: 'none', textAlign: 'left',
                    padding: '11px 0', borderBottom: `1px solid ${tokens.border}`,
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontSize: '0.95rem', color: tokens.text,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
