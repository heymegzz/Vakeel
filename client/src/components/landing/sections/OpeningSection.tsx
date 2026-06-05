import { Suspense, useState, useEffect, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../providers/ThemeProvider'
const CourtroomScene = lazy(() => import('../three/CourtroomScene'))

/* ─── CSS hero (light mode + mobile fallback) ────────────────── */
function CssHero() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      {/* Soft centred glow — matches the courtroom lighting atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 58%, var(--c-gold-subtle) 0%, transparent 70%)',
      }} />
    </div>
  )
}

/* ─── Skeleton while Three.js loads ─────────────────────────────── */
function SceneLoader() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#050508',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: '#C9A45A',
        animation: 'pulseGold 1.6s ease-in-out infinite',
      }} />
    </div>
  )
}

/* ─── Scroll indicator ───────────────────────────────────────────── */
function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem', letterSpacing: '0.18em',
            color: 'rgba(201,164,90,0.4)', textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div style={{ position: 'relative', width: 1, height: 48 }}>
            <div style={{
              position: 'absolute', top: 0, width: 1, height: '100%',
              background: 'rgba(201,164,90,0.18)',
            }} />
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: 0, left: -2,
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(201,164,90,0.55)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Scales mark — draws itself ─────────────────────────────────── */
function ScalesMark() {
  return (
    <motion.svg
      width="40" height="44" viewBox="0 0 40 44" fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.2 }}
      aria-hidden="true"
    >
      {/* Vertical stand */}
      <motion.line
        x1="20" y1="8" x2="20" y2="36"
        stroke="rgba(201,164,90,0.7)" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.3, ease: [0.16,1,0.3,1] }}
      />
      {/* Horizontal beam */}
      <motion.line
        x1="4" y1="10" x2="36" y2="10"
        stroke="rgba(201,164,90,0.7)" strokeWidth="1.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.5, ease: [0.16,1,0.3,1] }}
      />
      {/* Pivot circle */}
      <motion.circle cx="20" cy="10" r="2"
        fill="rgba(201,164,90,0.8)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.55 }}
        style={{ transformOrigin: '20px 10px' }}
      />
      {/* Left chain */}
      <motion.line x1="7" y1="10" x2="7" y2="19"
        stroke="rgba(201,164,90,0.55)" strokeWidth="0.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 1.75 }}
      />
      {/* Right chain */}
      <motion.line x1="33" y1="10" x2="33" y2="19"
        stroke="rgba(201,164,90,0.55)" strokeWidth="0.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 1.75 }}
      />
      {/* Left pan */}
      <motion.path d="M3 19.5 Q7 22.5 11 19.5"
        stroke="rgba(201,164,90,0.65)" strokeWidth="1.1" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.9 }}
      />
      {/* Right pan */}
      <motion.path d="M29 19.5 Q33 22.5 37 19.5"
        stroke="rgba(201,164,90,0.65)" strokeWidth="1.1" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.9 }}
      />

      {/* Base */}
      <motion.line x1="14" y1="36" x2="26" y2="36"
        stroke="rgba(201,164,90,0.5)" strokeWidth="1.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 2.0 }}
      />
    </motion.svg>
  )
}

/* ─── Wordmark reveal overlay ────────────────────────────────────── */
function WordmarkReveal({ visible, instant }: { visible: boolean; instant?: boolean }) {
  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]
  // When instant=true (light/mobile mode), skip delays so wordmark appears without waiting
  const d = (n: number) => instant ? 0 : n

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {/*
           * Scales emblem — rendered ABOVE the wordmark as a crest.
           * This keeps it visually separated from VAKEEL and prevents
           * the centered SVG from ever landing in the K–E letter gap.
           */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: instant ? 0.4 : 1, delay: d(0.15), ease: easing }}
            style={{ marginBottom: '1.4rem' }}
          >
            <ScalesMark />
          </motion.div>

          {/* Primary wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: instant ? 0.6 : 1.4, delay: d(0.6), ease: easing }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(3.8rem, 8vw, 9rem)',
              fontWeight: 300,
              letterSpacing: '0.22em',
              color: 'var(--c-cream)',
              lineHeight: 1,
              textShadow: '0 0 60px rgba(201,164,90,0.12)',
              margin: 0,
            }}
          >
            VAKEEL
          </motion.h1>

          {/* Tagline — directly under the wordmark, no divider between them */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: instant ? 0.5 : 1, delay: d(1.4), ease: easing }}
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--c-gold)',
              marginTop: '1.4rem',
            }}
          >
            The Operating System for Indian Courts
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: instant ? 0.5 : 1, delay: d(2.2), ease: easing }}
            style={{
              display: 'flex', gap: '1rem',
              marginTop: '2.5rem',
              pointerEvents: 'all',
            }}
          >
            <a
              href="#closer"
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#closer')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '10px 28px',
                border: '1px solid var(--c-gold)',
                borderRadius: 3,
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.78rem', letterSpacing: '0.1em',
                color: 'var(--c-bg)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                background: 'var(--c-gold)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Request Access
            </a>
            <a
              href="#product"
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '10px 28px',
                border: '1px solid rgba(228,221,208,0.12)',
                borderRadius: 3,
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.78rem', letterSpacing: '0.1em',
                color: 'var(--c-text2)', textDecoration: 'none',
                background: 'transparent',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--c-text)'
                e.currentTarget.style.borderColor = 'var(--c-border)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--c-text2)'
                e.currentTarget.style.borderColor = 'var(--c-border)'
              }}
            >
              See the Platform
            </a>
          </motion.div>


        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Opening section ──────────────────────────────────────────────── */
export default function OpeningSection() {
  const { theme }  = useTheme()
  const [sceneReady,  setSceneReady]  = useState(false)
  const [showScroll,  setShowScroll]  = useState(false)
  const isMobile  = typeof window !== 'undefined' && window.innerWidth < 768
  // Skip 3-D scene in light mode (courtroom is inherently dark)
  const skipScene = isMobile || theme === 'light'

  const handleSceneComplete = () => {
    setSceneReady(true)
    setTimeout(() => setShowScroll(true), 3000)
  }

  // In light/mobile mode, show scroll indicator quickly without waiting for 3-D
  useEffect(() => {
    if (skipScene) {
      const t = setTimeout(() => setShowScroll(true), 1800)
      return () => clearTimeout(t)
    }
  }, [skipScene])

  return (
    <section
      id="opening"
      data-cursor="scene"
      style={{
        position: 'relative', width: '100%', height: '100vh',
        minHeight: 600, overflow: 'hidden',
        // Dark mode: deep scene black; light mode: CSS hero handles its own bg
        background: skipScene ? 'var(--c-bg)' : '#050508',
        transition: 'background 0.35s ease',
      }}
    >
      {/* Background layer */}
      {skipScene ? (
        <CssHero />
      ) : (
        <Suspense fallback={<SceneLoader />}>
          <CourtroomScene onComplete={handleSceneComplete} />
        </Suspense>
      )}

      {/* Wordmark — visible immediately in light/mobile, after scene in dark */}
      <WordmarkReveal
        visible={skipScene || sceneReady}
        instant={skipScene}
      />

      {/* Scroll indicator */}
      <ScrollIndicator visible={showScroll} />

      {/* Bottom fade — always blends into the themed bg below */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '22%',
        background: 'linear-gradient(to bottom, transparent, var(--c-bg))',
        pointerEvents: 'none', zIndex: 5,
      }} />
    </section>
  )
}
