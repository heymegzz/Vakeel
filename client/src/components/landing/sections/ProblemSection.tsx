import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../providers/ThemeProvider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ───────────────────────────────────────────────────────── */
const STATS = [
  {
    value:   '4.5 Cr',
    suffix:  '',
    label:   'Cases pending',
    detail:  'Across all tiers of Indian courts right now',
    source:  'NJDG, 2024',
    accent:  '#C9A45A',
  },
  {
    value:   '18',
    suffix:  'months',
    label:   'Avg. wait for first hearing',
    detail:  'In High Courts across India',
    source:  'Law Commission Report',
    accent:  '#C9A45A',
  },
  {
    value:   '₹50K Cr',
    suffix:  '',
    label:   'Annual GDP cost',
    detail:  'Of judicial delay to the Indian economy',
    source:  'World Bank, 2023',
    accent:  '#8B1B1F',
  },
  {
    value:   '5,000+',
    suffix:  '',
    label:   'Courts without internet',
    detail:  'Operating on paper with zero digital infrastructure',
    source:  'DoJ Survey, 2023',
    accent:  '#8B1B1F',
  },
]

/* ─── Component ──────────────────────────────────────────────────── */
export default function ProblemSection() {
  const { tokens } = useTheme()
  const sectionRef   = useRef<HTMLElement>(null)
  const headlineRef  = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const paraRef      = useRef<HTMLParagraphElement>(null)
  const ruleRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {

      // ── Headline words reveal (mask technique)
      const words = section.querySelectorAll<HTMLSpanElement>('.word-wrap span')
      if (words.length) {
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          duration: 0.9,
          stagger: 0.055,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        })
      }

      // ── Stats entrance: fragmented → ordered
      const cards = section.querySelectorAll<HTMLElement>('.stat-card')
      if (cards.length) {
        gsap.from(cards, {
          x: -48,
          y: 20,
          opacity: 0,
          skewX: 4,
          rotate: 0.8,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 72%',
          },
        })
      }

      // ── Paragraph line-by-line reveal
      if (paraRef.current) {
        gsap.from(paraRef.current, {
          opacity: 0,
          y: 28,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paraRef.current,
            start: 'top 80%',
          },
        })
      }

      // ── Growing rule
      if (ruleRef.current) {
        gsap.from(ruleRef.current, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: ruleRef.current,
            start: 'top 85%',
          },
        })
      }

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{
        background: tokens.bg,
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 7vw, 8rem)',
          position: 'relative',
          overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: 0.025,
      }} />

      {/* Red vertical accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 'clamp(1.5rem, 7vw, 8rem)',
        width: 1, height: '40%',
        background: 'linear-gradient(to bottom, rgba(139,27,31,0.6), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.62rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C9A45A',
            marginBottom: '3rem',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ width: 24, height: 1, background: '#C9A45A', display: 'inline-block' }} />
          ACT I — THE PROBLEM
        </motion.div>

        {/* Headline */}
        <div ref={headlineRef} style={{ marginBottom: '4rem' }}>
          {[
            "India's courts carry",
            'the weight of',
            'a broken system.',
          ].map((line, li) => (
            <div
              key={li}
              className="word-wrap"
              style={{
                overflow: 'hidden',
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
                fontWeight: li === 2 ? 700 : 300,
                fontStyle: li === 1 ? 'italic' : 'normal',
                color: li === 2 ? '#EBE1CC' : 'rgba(228,221,208,0.7)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              <span style={{ display: 'inline-block' }}>{line}</span>
            </div>
          ))}
        </div>

        {/* Stats grid */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1px',
            marginBottom: '5rem',
            border: '1px solid rgba(201,164,90,0.08)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-card"
              data-cursor="hover"
              style={{
                background: '#0D0D12',
                padding: 'clamp(1.8rem, 3vw, 2.5rem) clamp(1.5rem, 2.5vw, 2rem)',
                borderTop: `2px solid ${stat.accent}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Index */}
              <span style={{
                position: 'absolute', top: 14, right: 16,
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.58rem', letterSpacing: '0.1em',
                color: 'rgba(92,86,80,0.6)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Big number */}
              <div style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)',
                fontWeight: 700,
                color: '#EBE1CC',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {stat.value}
                {stat.suffix && (
                  <span style={{
                    fontSize: '45%', fontWeight: 400,
                    color: 'rgba(201,164,90,0.7)',
                    marginLeft: '0.25em',
                  }}>
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.9rem', fontWeight: 500,
                color: '#C9A45A', marginBottom: 6,
              }}>
                {stat.label}
              </div>

              {/* Detail */}
              <div style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.78rem',
                color: 'rgba(157,148,136,0.8)',
                lineHeight: 1.5,
                marginBottom: 10,
              }}>
                {stat.detail}
              </div>

              {/* Source badge */}
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.56rem', letterSpacing: '0.1em',
                color: 'rgba(92,86,80,0.7)',
                borderTop: '1px solid rgba(201,164,90,0.08)',
                paddingTop: 8, display: 'block',
              }}>
                SOURCE: {stat.source}
              </span>
            </div>
          ))}
        </div>

        {/* Narrative paragraph */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'start',
        }}
        className="md:grid-cols-[1fr_2fr] grid-cols-1"
        >
          {/* Left: visual accent */}
          <div style={{ paddingTop: '0.3rem' }}>
            <div style={{
              width: 1, height: 80,
              background: 'linear-gradient(to bottom, #C9A45A, transparent)',
              marginBottom: '1.5rem',
            }} />
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem', letterSpacing: '0.15em',
              color: 'rgba(92,86,80,0.7)',
              textTransform: 'uppercase',
              lineHeight: 2,
            }}>
              THE WEIGHT<br />OF WAITING
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <p
              ref={paraRef}
              data-cursor="text"
              style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                color: 'rgba(228,221,208,0.75)',
                lineHeight: 1.85,
                letterSpacing: '0.01em',
              }}
            >
              Every postponed hearing is not a procedural delay.
              It is someone's livelihood frozen in amber.
              A property dispute that outlasts the property.
              A criminal case where the accused waits longer than the sentence would last.{' '}
              <span style={{ color: '#EBE1CC' }}>
                65,000 courts. 40 million cases. Zero shared infrastructure.
              </span>
              {' '}Until now.
            </p>

            {/* Growing rule */}
            <div ref={ruleRef} style={{
              height: 1,
              background: 'linear-gradient(90deg, #C9A45A 0%, rgba(201,164,90,0.2) 60%, transparent 100%)',
              marginTop: '2.5rem',
              transformOrigin: 'left',
            }} />
          </div>
        </div>

      </div>
    </section>
  )
}
