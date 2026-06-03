import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconShield, IconZap, IconVault, IconSignal } from '../ui/Icons'
import { useTheme } from '../providers/ThemeProvider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Role data ──────────────────────────────────────────────────── */
const ROLES = [
  {
    abbr: 'SA', num: '01', label: 'Super Admin',
    desc: 'Full system control across court hierarchies',
    perms: ['All courts', 'User management', 'System config', 'Audit logs'],
  },
  {
    abbr: 'CA', num: '02', label: 'Court Admin',
    desc: 'Single court ops, staff management, reporting',
    perms: ['Court config', 'Staff roles', 'Analytics', 'Backups'],
  },
  {
    abbr: 'JJ', num: '03', label: 'Judge',
    desc: 'Case disposal, order signing, hearing control',
    perms: ['Case disposal', 'Digital orders', 'Cause list', 'Adjournments'],
  },
  {
    abbr: 'RG', num: '04', label: 'Registrar',
    desc: 'Case scrutiny, filing approval, branch oversight',
    perms: ['Filing scrutiny', 'Branch reports', 'Case approval', 'Defect notices'],
  },
  {
    abbr: 'SC', num: '05', label: 'Senior Clerk',
    desc: 'Cause list prep, case workflow, doc verification',
    perms: ['Cause list', 'Workflow mgmt', 'Doc verify', 'Scheduling'],
  },
  {
    abbr: 'JC', num: '06', label: 'Junior Clerk',
    desc: 'Data entry, case intake, scanning, initial filing',
    perms: ['Data entry', 'Case intake', 'Doc scanning', 'Filing'],
  },
  {
    abbr: 'AV', num: '07', label: 'Advocate',
    desc: 'Case filing, tracking, order access, client portal',
    perms: ['File cases', 'Track hearings', 'Access orders', 'Client portal'],
  },
  {
    abbr: 'LT', num: '08', label: 'Litigant',
    desc: 'Case status, hearing dates, order downloads, alerts',
    perms: ['Case status', 'Hearing dates', 'Orders', 'Alerts'],
  },
  {
    abbr: 'ST', num: '09', label: 'Stenographer',
    desc: 'Dictation, order transcription, judge support',
    perms: ['Order drafts', 'Transcription', 'Session notes', 'Judge assist'],
  },
]

const INFRA = [
  {
    Icon: IconShield,
    title: 'Secure by Default',
    body: 'End-to-end encryption. Role-based access control. Every action logged, timestamped, and auditable by independent authorities.',
  },
  {
    Icon: IconZap,
    title: 'Real-time Sync',
    body: 'WebSocket-powered live updates. All parties notified instantly. Status changes propagate across the system in milliseconds.',
  },
  {
    Icon: IconVault,
    title: 'Document Vault',
    body: 'Tamper-proof storage with version control on every file. Digital signatures legally valid under IT Act, Section 5.',
  },
  {
    Icon: IconSignal,
    title: 'Omnichannel',
    body: "Web, mobile, and SMS notifications. Designed for India's connectivity reality — degrades gracefully to 2G.",
  },
]

/* ─── Role Card ──────────────────────────────────────────────────── */
interface RoleCardProps {
  role: typeof ROLES[0]
  index: number
}

function RoleCard({ role, index }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      style={{
        background: 'var(--c-s1)',
        border: '1px solid var(--c-border)',
        borderRadius: 4,
        padding: 'clamp(1.2rem, 2vw, 1.6rem)',
        position: 'relative',
        transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--c-s2)'
        el.style.borderColor = 'var(--c-gold-border)'
        el.style.boxShadow = '0 0 20px rgba(201,164,90,0.08)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--c-s1)'
        el.style.borderColor = 'var(--c-border)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Abbr + num row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.78rem', fontWeight: 700,
          color: 'var(--c-gold)', letterSpacing: '0.06em',
        }}>
          {role.abbr}
        </span>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem', color: 'var(--c-text3)',
          letterSpacing: '0.08em',
        }}>
          {role.num}
        </span>
      </div>

      {/* Role name */}
      <div style={{
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        fontSize: '0.95rem', fontWeight: 500,
        color: 'var(--c-cream)', marginBottom: '0.4rem',
      }}>
        {role.label}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        fontSize: '0.72rem', color: 'var(--c-text2)',
        lineHeight: 1.5, marginBottom: '0.9rem',
      }}>
        {role.desc}
      </div>

      {/* Permission tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {role.perms.map(p => (
          <span
            key={p}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.48rem', letterSpacing: '0.05em',
              padding: '3px 7px',
              background: 'var(--c-gold-subtle)',
              border: '1px solid var(--c-gold-border)',
              borderRadius: 2,
              color: 'var(--c-gold)',
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Architecture Section ───────────────────────────────────────── */
export default function ArchitectureSection() {
  const { tokens } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll<HTMLElement>('.arch-word')
      if (words.length) {
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          duration: 1,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.arch-headline'),
            start: 'top 80%',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="architecture"
      ref={sectionRef}
      style={{
        background: tokens.bg,
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 7vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scanline overlay */}
      <div
        className="scanline"
        aria-hidden
        style={{ top: 0, opacity: 0.4 }}
      />

      {/* Radial gold glow at bottom */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '70vw', height: '40vw',
        background: 'radial-gradient(ellipse, rgba(201,164,90,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
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
            textTransform: 'uppercase', color: tokens.gold,
            marginBottom: '3rem',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ width: 24, height: 1, background: tokens.gold, display: 'inline-block' }} />
          ACT III — THE ARCHITECTURE
        </motion.div>

        {/* Headline */}
        <div
          className="arch-headline"
          style={{ marginBottom: '1rem', overflow: 'hidden' }}
        >
          {[
            { text: '9 roles.', weight: 700 },
            { text: '1 platform.', weight: 300 },
            { text: 'Complete infrastructure.', weight: 300 },
          ].map((line, li) => (
            <div
              key={li}
              style={{
                overflow: 'hidden',
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5vw, 5.2rem)',
                fontWeight: line.weight,
                color: li === 0 ? tokens.cream : tokens.text2,
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
              }}
            >
              <span className="arch-word" style={{ display: 'inline-block' }}>{line.text}</span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16,1,0.3,1] }}
          style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            color: tokens.text2, maxWidth: 500,
            lineHeight: 1.65, marginBottom: '4rem',
          }}
        >
          Purpose-built for every stakeholder in the Indian court system.
          One platform, complete court lifecycle management.
        </motion.p>

        {/* Roles grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          marginBottom: '5rem',
          background: tokens.goldSubtle,
          borderRadius: 4,
          overflow: 'hidden',
          border: `1px solid ${tokens.border}`,
        }}
        className="md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        >
          {ROLES.map((role, i) => (
            <RoleCard key={role.abbr} role={role} index={i} />
          ))}
        </div>

        {/* Infrastructure section header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,164,90,0.1)' }} />
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(201,164,90,0.5)',
          }}>
            PLATFORM CAPABILITIES
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,164,90,0.1)' }} />
        </div>

        {/* Infrastructure cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(201,164,90,0.06)',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(201,164,90,0.08)',
          marginBottom: '4rem',
        }}
        className="lg:grid-cols-4 sm:grid-cols-2 grid-cols-1"
        >
          {INFRA.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
              data-cursor="hover"
              style={{
                background: tokens.s1,
                  padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              }}
            >
              <div style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(201,164,90,0.07)',
                border: '1px solid rgba(201,164,90,0.15)',
                borderRadius: 6,
                marginBottom: '1rem',
                color: '#C9A45A',
              }}>
                <item.Icon size={18} stroke="#C9A45A" strokeWidth={1.5} />
              </div>
              <div style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.88rem', fontWeight: 600,
                  color: tokens.cream, marginBottom: '0.5rem',
              }}>
                {item.title}
              </div>
              <div style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.75rem', color: tokens.text2,
                lineHeight: 1.6,
              }}>
                {item.body}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            background: tokens.s1,
            border: `1px solid ${tokens.border}`,
            borderRadius: 4,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            overflowX: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.58rem', letterSpacing: '0.08em',
              color: tokens.text3, whiteSpace: 'nowrap',
            }}>
              VAKEEL OS v1.0 — PRODUCTION — 9 ROLES ACTIVE — COURTS: CONNECTING
              <span style={{ animation: 'blink 1.2s step-end infinite' }}>▌</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
            {[
              { k: 'UPTIME', v: '99.99%' },
              { k: 'LATENCY', v: '<50ms' },
              { k: 'ENCRYPTION', v: 'AES-256' },
            ].map(item => (
              <div key={item.k} style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.1em', color: tokens.text3 }}>{item.k}</div>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: tokens.gold }}>{item.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
