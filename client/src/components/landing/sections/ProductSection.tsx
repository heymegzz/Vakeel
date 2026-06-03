import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../providers/ThemeProvider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Mock UI: Cause List ────────────────────────────────────────── */
const CAUSE_LIST_CASES = [
  { sr: '01', cnr: 'HC-MUM-0042-2024', parties: 'Sharma vs Maharashtra State',   adv: 'A.K. Verma',    status: 'LISTED'     },
  { sr: '02', cnr: 'HC-MUM-0091-2024', parties: 'Patel Const. vs MMRDA',         adv: 'R.S. Iyer',     status: 'PART HEARD' },
  { sr: '03', cnr: 'HC-DEL-0234-2023', parties: 'Union of India vs B. Gupta',     adv: 'S. Mehta',      status: 'LISTED'     },
  { sr: '04', cnr: 'HC-MUM-0188-2024', parties: 'Krishnamurthy vs State Bank',    adv: 'P. Desai',      status: 'ADJOURNED'  },
  { sr: '05', cnr: 'HC-MUM-0301-2024', parties: 'Roshan Lal vs Collector Pune',   adv: 'T. Kapoor',     status: 'LISTED'     },
]

function CauseListMock() {
  const statusColor: Record<string, string> = {
    'LISTED':     'var(--c-gold-subtle)',
    'PART HEARD': 'rgba(180,110,20,0.12)',
    'ADJOURNED':  'var(--c-s3)',
  }
  const statusText: Record<string, string> = {
    'LISTED':     'var(--c-gold)',
    'PART HEARD': '#C97A30',
    'ADJOURNED':  'var(--c-text3)',
  }

  return (
    <div style={{
      background: 'var(--c-s1)',
      border: '1px solid var(--c-gold-border)',
      borderRadius: 6,
      width: 'min(420px, 90vw)',
      overflow: 'hidden',
      fontFamily: '"Space Mono", monospace',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--c-border)',
        padding: '12px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--c-gold)' }}>
            HIGH COURT — BENCH I — 03.06.2026
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--c-cream)', marginTop: 2 }}>
            Daily Cause List
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#22C55E',
            animation: 'pulseGold 1.5s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '0.58rem', color: '#22C55E', letterSpacing: '0.1em' }}>LIVE</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '28px 1fr 1fr 72px',
        padding: '6px 16px',
        background: 'var(--c-gold-subtle)',
        borderBottom: '1px solid var(--c-border)',
      }}>
        {['SR', 'CASE', 'ADVOCATE', 'STATUS'].map(h => (
          <span key={h} style={{ fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--c-text3)' }}>{h}</span>
        ))}
      </div>

      {/* Rows — staggered reveal */}
      {CAUSE_LIST_CASES.map((c, i) => (
        <motion.div
          key={c.cnr}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.09, ease: [0.16,1,0.3,1] }}
          style={{
            display: 'grid', gridTemplateColumns: '28px 1fr 1fr 72px',
            padding: '10px 16px',
            borderBottom: '1px solid rgba(201,164,90,0.05)',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.58rem', color: 'var(--c-text3)' }}>{c.sr}</span>
          <div>
            <div style={{ fontSize: '0.6rem', color: 'var(--c-gold)', letterSpacing: '0.04em' }}>{c.cnr}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--c-text2)', marginTop: 2 }}>{c.parties}</div>
          </div>
          <span style={{ fontSize: '0.62rem', color: 'var(--c-text2)' }}>{c.adv}</span>
          <span style={{
            fontSize: '0.52rem', letterSpacing: '0.06em',
            background: statusColor[c.status] ?? 'rgba(60,60,70,0.3)',
            color: statusText[c.status] ?? '#5C5650',
            padding: '3px 6px', borderRadius: 2,
            textAlign: 'center',
          }}>
            {c.status}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Mock UI: CNR Number Generator ─────────────────────────────── */
function CaseFilingMock() {
  const [cnr, setCnr] = useState('')
  const [accepted, setAccepted] = useState(false)
  const fullCnr = 'HC-MUM-0043-2026'

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setCnr(fullCnr.slice(0, i + 1))
        i++
        if (i >= fullCnr.length) {
          clearInterval(interval)
          setTimeout(() => setAccepted(true), 600)
        }
      }, 90)
      return () => clearInterval(interval)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      background: 'var(--c-s1)', border: '1px solid var(--c-gold-border)',
      borderRadius: 6, width: 'min(380px, 90vw)',
      overflow: 'hidden', fontFamily: '"Space Mono", monospace',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--c-gold)', marginBottom: 2 }}>
          DIGITAL CASE FILING
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--c-cream)' }}>New Writ Petition</div>
      </div>
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'CASE TYPE', value: 'CIVIL — WRIT PETITION' },
          { label: 'COURT', value: 'HON\'BLE HIGH COURT, BOMBAY' },
          { label: 'PETITIONER', value: 'Sharma & Associates' },
          { label: 'RESPONDENT', value: 'Maharashtra State' },
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: '0.52rem', letterSpacing: '0.12em', color: 'var(--c-text3)', marginBottom: 3 }}>{f.label}</div>
            <div style={{
              background: 'var(--c-s2)', border: '1px solid var(--c-border)',
              borderRadius: 3, padding: '7px 10px',
              fontSize: '0.65rem', color: 'var(--c-text2)',
            }}>{f.value}</div>
          </div>
        ))}

        {/* CNR generation */}
        <div style={{ borderTop: '1px solid rgba(201,164,90,0.08)', paddingTop: 12, marginTop: 4 }}>
          <div style={{ fontSize: '0.52rem', letterSpacing: '0.12em', color: 'var(--c-text3)', marginBottom: 6 }}>
            CNR NUMBER — AUTO GENERATED
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--c-bg)', border: '1px solid var(--c-gold-border)',
            borderRadius: 3, padding: '10px 12px',
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--c-gold)', letterSpacing: '0.08em' }}>
              {cnr}<span style={{ animation: 'blink 1s step-end infinite', opacity: cnr.length < fullCnr.length ? 1 : 0 }}>|</span>
            </span>
            <AnimatePresence>
              {accepted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    fontSize: '0.58rem', letterSpacing: '0.1em',
                    color: '#22C55E',
                    background: 'rgba(34,197,94,0.1)',
                    padding: '3px 7px', borderRadius: 2,
                  }}
                >
                  ACCEPTED ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {accepted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '0.55rem', color: 'var(--c-text3)', marginTop: 6 }}
            >
              Filed: 03 Jun 2026, 10:42:17 IST
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Mock UI: Hearing Scheduler ─────────────────────────────────── */
const CALENDAR_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const CALENDAR_CASES = [
  [null,           'HC-0042',    null,           'HC-0091',    'HC-0188'  ],
  ['HC-0234',      null,         'HC-0301',      null,         null       ],
  [null,           'HC-0412',    'HC-0503',      null,         'HC-0611'  ],
  ['HC-0704',      null,         null,           'HC-0812',    null       ],
]

function SchedulerMock() {
  const [filledSlot, setFilledSlot] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setFilledSlot('NEW'), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      background: 'var(--c-s1)', border: '1px solid var(--c-gold-border)',
      borderRadius: 6, width: 'min(400px, 90vw)',
      overflow: 'hidden', fontFamily: '"Space Mono", monospace',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--c-gold)' }}>BENCH II — JUNE 2026</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--c-cream)', marginTop: 2 }}>Hearing Scheduler</div>
        </div>
        <div style={{ fontSize: '0.55rem', color: 'var(--c-text2)' }}>12 / 15 slots</div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4, marginBottom: 4 }}>
          {CALENDAR_DAYS.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '0.52rem', color: 'var(--c-text3)', letterSpacing: '0.08em' }}>{d}</div>
          ))}
        </div>
        {/* Calendar rows */}
        {CALENDAR_CASES.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4, marginBottom: 4 }}>
            {row.map((cell, ci) => {
              const isNew = filledSlot === 'NEW' && ri === 1 && ci === 1
              return (
                <motion.div
                  key={ci}
                  animate={isNew ? { background: 'rgba(201,164,90,0.15)', borderColor: 'rgba(201,164,90,0.4)' } : {}}
                  transition={{ duration: 0.4 }}
                  style={{
                    height: 38, borderRadius: 3,
                    background: cell ? 'var(--c-gold-subtle)' : 'var(--c-s3)',
                    border: `1px solid ${cell ? 'var(--c-gold-border)' : 'var(--c-border)'}`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', padding: 2,
                  }}
                >
                  {cell && (
                    <span style={{ fontSize: '0.45rem', color: 'var(--c-gold)', letterSpacing: '0.04em', textAlign: 'center' }}>
                      {isNew ? '✦ HC-0406' : cell}
                    </span>
                  )}
                  {isNew && !cell && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ fontSize: '0.45rem', color: 'var(--c-gold)' }}
                    >
                      ✦ NEW
                    </motion.span>
                  )}
                </motion.div>
              )
            })}
          </div>
        ))}
        {/* Progress bar */}
        <div style={{ marginTop: 12, borderTop: '1px solid rgba(201,164,90,0.06)', paddingTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: '0.55rem', color: 'var(--c-text3)' }}>SLOT UTILIZATION</span>
            <span style={{ fontSize: '0.55rem', color: 'var(--c-gold)' }}>80%</span>
          </div>
          <div style={{ height: 3, background: 'var(--c-gold-subtle)', borderRadius: 2 }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16,1,0.3,1] }}
              style={{ height: '100%', background: 'var(--c-gold)', borderRadius: 2 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mock UI: Order Signing ─────────────────────────────────────── */
function OrderSigningMock() {
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSigned(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      background: 'var(--c-s1)', border: '1px solid var(--c-gold-border)',
      borderRadius: 6, width: 'min(380px, 90vw)',
      overflow: 'hidden', fontFamily: '"Space Mono", monospace',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--c-gold)' }}>ORDER DRAFTING & SIGNING</div>
        <div style={{ fontSize: '0.62rem', color: 'var(--c-text2)', marginTop: 2 }}>Civil Appeal No. 0042 of 2024</div>
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--c-cream)', lineHeight: 1.8, marginBottom: 16 }}>
          IN THE HIGH COURT OF JUDICATURE AT BOMBAY
        </div>
        <div style={{ fontSize: '0.62rem', color: 'var(--c-text2)', lineHeight: 1.75, marginBottom: 16, borderLeft: '2px solid var(--c-gold-border)', paddingLeft: 10 }}>
          Having heard the parties and perused the material on record, this Court is of the considered opinion that the matter be listed for final hearing on 10.06.2026. The interim order dated 01.05.2026 shall continue...
        </div>

        {/* Signature zone */}
        <div style={{
          border: '1px dashed rgba(201,164,90,0.25)',
          borderRadius: 4, padding: '14px 16px',
          position: 'relative', minHeight: 70,
        }}>
          <div style={{ fontSize: '0.52rem', color: 'var(--c-text3)', marginBottom: 8 }}>DIGITAL SIGNATURE ZONE</div>

          {/* SVG signature path animation */}
          <AnimatePresence>
            {signed && (
              <motion.svg
                width="160" height="36"
                viewBox="0 0 160 36"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'block', marginBottom: 4 }}
              >
                <motion.path
                  d="M 5,28 C 15,10 25,32 35,18 C 45,5 55,30 70,20 C 85,10 90,28 105,22 C 118,16 130,30 155,25"
                  stroke="var(--c-gold)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16,1,0.3,1] }}
                />
              </motion.svg>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {signed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                style={{
                  position: 'absolute', top: 8, right: 10,
                  border: '1px solid rgba(201,164,90,0.5)',
                  borderRadius: '50%', width: 52, height: 52,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(201,164,90,0.05)',
                }}
              >
                <div style={{ fontSize: '0.38rem', letterSpacing: '0.04em', color: 'var(--c-gold)', textAlign: 'center', lineHeight: 1.4 }}>
                  DIGITALLY<br />SIGNED
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {signed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ fontSize: '0.52rem', color: 'var(--c-text3)', marginTop: 8 }}
          >
            Hon'ble Mr. Justice R.K. Mehta &nbsp;|&nbsp; 03.06.2026 &nbsp;|&nbsp; 14:23 IST
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ─── Mock UI: Notifications ─────────────────────────────────────── */
const NOTIFICATIONS = [
  { dot: '#C9A45A', text: 'Hearing scheduled — HC-MUM-0042 — 10 Jun 2026 at 11:00 AM',   time: '09:05' },
  { dot: '#22C55E', text: 'Order uploaded — HC-MUM-0043 — Available to download',          time: '09:12' },
  { dot: '#C97A30', text: 'Adjournment — HC-MUM-0041 — Next date: 15 Jun 2026',            time: '10:30' },
  { dot: '#C9A45A', text: 'New case filed — HC-MUM-0044 — Listed 12 Jun 2026',            time: '11:02' },
]

function NotificationsMock() {
  return (
    <div style={{
      width: 'min(260px, 85vw)',
      background: 'var(--c-s1)',
      border: '1px solid var(--c-gold-border)',
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      {/* Phone top bar */}
      <div style={{
        background: 'var(--c-s2)',
        padding: '10px 16px 8px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid var(--c-border)',
      }}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.58rem', color: 'var(--c-text3)' }}>9:41 AM</span>
        <div style={{
          width: 60, height: 6, borderRadius: 3,
          background: 'var(--c-s3)',
        }} />
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.58rem', color: 'var(--c-text3)' }}>VAKEEL</span>
      </div>

      {/* Notification lock screen label */}
      <div style={{ padding: '10px 14px 6px', fontFamily: '"Space Mono", monospace', fontSize: '0.52rem', color: 'var(--c-text3)', letterSpacing: '0.08em' }}>
        NOTIFICATIONS
      </div>

      {/* Notifications */}
      <div style={{ padding: '0 8px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.4 + i * 0.15, ease: [0.16,1,0.3,1] }}
            style={{
              background: 'var(--c-s2)',
              border: '1px solid var(--c-border)',
              borderRadius: 10, padding: '8px 10px',
              display: 'flex', gap: 8, alignItems: 'flex-start',
            }}
          >
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: n.dot, flexShrink: 0, marginTop: 3,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', fontSize: '0.6rem', color: 'var(--c-text2)', lineHeight: 1.4 }}>
                {n.text}
              </div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', color: 'var(--c-text3)', marginTop: 3 }}>
                {n.time} IST
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Panel config ───────────────────────────────────────────────── */
const PANELS = [
  {
    label: 'FEATURE 01 / CAUSE LIST',
    headline: 'Every advocate walks in knowing exactly where to stand.',
    body: 'The daily cause list — generated automatically at midnight. Every case, every bench, every advocate. Distributed by SMS before 7 AM.',
    Mock: CauseListMock,
  },
  {
    label: 'FEATURE 02 / CASE FILING',
    headline: 'From petition to case number in minutes, not weeks.',
    body: 'Digitally file any case type. Instant automated scrutiny. CNR number generated the moment filing is accepted.',
    Mock: CaseFilingMock,
  },
  {
    label: 'FEATURE 03 / HEARING SCHEDULER',
    headline: 'No more endless adjournments. Smart scheduling.',
    body: 'Intelligent slot allocation based on case complexity, advocate availability, and bench capacity. Adjournments require justification.',
    Mock: SchedulerMock,
  },
  {
    label: 'FEATURE 04 / DIGITAL ORDERS',
    headline: 'Signed. Sealed. Delivered. Digitally.',
    body: 'Judges review and digitally sign orders on the platform. Instant notification to all parties. Legally valid under IT Act, Section 5.',
    Mock: OrderSigningMock,
  },
  {
    label: 'FEATURE 05 / NOTIFICATIONS',
    headline: 'Every party. Every update. In real time.',
    body: 'SMS, email, and push notifications the moment an order is passed, hearing is scheduled, or document is uploaded. No more calling the court.',
    Mock: NotificationsMock,
  },
]

/* ─── Main Component ─────────────────────────────────────────────── */
export default function ProductSection() {
  const { tokens } = useTheme()
  const pinRef   = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const pin   = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 0),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      })
      return () => tween.kill()
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section id="product" style={{ background: tokens.bg, overflow: 'hidden', color: tokens.text }}>
      {/* Section header — always visible above the scroll */}
      <div style={{
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 7vw, 8rem) 0',
        maxWidth: 1200, margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.62rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: tokens.gold,
            marginBottom: '2rem',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ width: 24, height: 1, background: tokens.gold, display: 'inline-block' }} />
          ACT II — THE PRODUCT
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)',
            fontWeight: 300, color: tokens.cream,
            letterSpacing: '-0.015em', lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}
        >
          The platform that runs
          <em style={{ fontStyle: 'italic', color: '#C9A45A' }}> on the other<br />side of the bench.</em>
        </motion.h2>
      </div>

      {/* ── Desktop: GSAP pinned horizontal scroll ── */}
      {!isMobile && (
        <div
          ref={pinRef}
          style={{
            height: '100vh', overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Horizontal mid-line */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            height: 1,
            background: 'rgba(201,164,90,0.03)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          <div
            ref={trackRef}
            style={{
              display: 'flex',
              height: '100%',
              willChange: 'transform',
            }}
          >
            {PANELS.map((panel, i) => (
              <div
                key={i}
                style={{
                  minWidth: '100vw',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 clamp(3rem, 8vw, 9rem)',
                  gap: 'clamp(3rem, 6vw, 8rem)',
                }}
              >
                {/* Copy */}
                <div style={{ flex: '0 0 auto', maxWidth: 420 }}>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.58rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: tokens.gold,
                    marginBottom: '1.5rem',
                  }}>
                    {panel.label}
                  </div>
                  <h3
                    data-cursor="text"
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 'clamp(1.8rem, 2.5vw, 3rem)',
                      fontWeight: 400, color: tokens.cream,
                      lineHeight: 1.2, letterSpacing: '-0.01em',
                      marginBottom: '1.2rem',
                    }}
                  >
                    {panel.headline}
                  </h3>
                  <p style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontSize: '0.9rem', color: tokens.text2,
                    lineHeight: 1.75, maxWidth: 360,
                  }}>
                    {panel.body}
                  </p>
                  {/* Panel number */}
                  <div style={{
                    marginTop: '2.5rem',
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(4rem, 6vw, 7rem)',
                    fontWeight: 700,
                    color: tokens.goldSubtle,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    userSelect: 'none',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Mock UI — slight tilt for "placed on desk" feel */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(1.2deg)',
                }}>
                  <panel.Mock />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile: vertical stack ── */}
      {isMobile && (
        <div style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)' }}>
          {PANELS.map((panel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
              style={{
                marginBottom: 'clamp(3rem, 8vw, 5rem)',
                borderBottom: '1px solid rgba(201,164,90,0.07)',
                paddingBottom: 'clamp(3rem, 8vw, 5rem)',
              }}
            >
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: tokens.gold, marginBottom: '1rem' }}>
                {panel.label}
              </div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 400, color: tokens.cream, lineHeight: 1.2, marginBottom: '1rem' }}>
                {panel.headline}
              </h3>
              <p style={{ fontFamily: '"Space Grotesk"', fontSize: '0.88rem', color: tokens.text2, lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {panel.body}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <panel.Mock />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
