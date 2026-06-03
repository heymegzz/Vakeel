import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Problem',      href: '#problem'      },
  { label: 'Product',      href: '#product'      },
  { label: 'Architecture', href: '#architecture' },
]

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(7,7,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,164,90,0.08)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <nav
        style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          data-cursor="hover"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 8 }}
        >
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.45rem', fontWeight: 600, letterSpacing: '0.12em',
            color: '#EBE1CC',
          }}>
            VAKEEL
          </span>
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '0.85rem', fontStyle: 'italic',
            color: 'rgba(201,164,90,0.7)', letterSpacing: '0.05em',
          }}>
            वकील
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              data-cursor="hover"
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', padding: '4px 0',
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.82rem', letterSpacing: '0.06em',
                color: 'rgba(228,221,208,0.55)',
                transition: 'color 0.2s ease', cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EBE1CC')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(228,221,208,0.55)')}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#closer"
            data-cursor="hover"
            onClick={(e) => { e.preventDefault(); scrollTo('#closer') }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 20px',
              border: '1px solid rgba(201,164,90,0.4)',
              borderRadius: 3,
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: '0.8rem', letterSpacing: '0.06em',
              color: '#C9A45A', textDecoration: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,164,90,0.08)'
              e.currentTarget.style.borderColor = 'rgba(201,164,90,0.7)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,164,90,0.4)'
            }}
          >
            Request Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          data-cursor="hover"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', padding: 8 }}
        >
          <div style={{ width: 22, height: 14, position: 'relative' }}>
            <span style={{
              display: 'block', height: 1, width: menuOpen ? '70%' : '100%',
              background: '#C9A45A', marginBottom: 5,
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              transition: 'all 0.25s ease', transformOrigin: 'left',
            }} />
            <span style={{
              display: 'block', height: 1, background: '#C9A45A',
              opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s ease',
              marginBottom: 5,
            }} />
            <span style={{
              display: 'block', height: 1, width: menuOpen ? '70%' : '100%',
              background: '#C9A45A',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              transition: 'all 0.25s ease', transformOrigin: 'left',
            }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(7,7,10,0.97)',
              borderTop: '1px solid rgba(201,164,90,0.08)',
            }}
          >
            <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[...NAV_LINKS, { label: 'Request Access', href: '#closer' }].map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none', border: 'none', textAlign: 'left',
                    padding: '12px 0', borderBottom: '1px solid rgba(201,164,90,0.06)',
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontSize: '1rem', color: '#E4DDD0',
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
