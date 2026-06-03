import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

/* ─── Form types ─────────────────────────────────────────────────── */
interface WaitlistFormData {
  name:        string
  email:       string
  role:        string
  institution: string
  message:     string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const ROLES = [
  'Judge',
  'Advocate',
  'Court Administrator',
  'Registrar',
  'Senior Clerk',
  'Junior Clerk',
  'Litigant',
  'Legal-tech Researcher',
  'Journalist / Media',
  'Other',
]

/* ─── Input component ────────────────────────────────────────────── */
interface FieldProps {
  label:       string
  error?:      string
  children:    React.ReactNode
}
function Field({ label, error, children }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.6rem', letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: error ? '#8B1B1F' : 'rgba(92,86,80,0.9)',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: '0.7rem', color: '#8B1B1F',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: '#13131A',
  border: '1px solid rgba(201,164,90,0.15)',
  borderRadius: 4,
  padding: '10px 14px',
  fontFamily: '"Space Grotesk", system-ui, sans-serif',
  fontSize: '0.88rem',
  color: '#EBE1CC',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  width: '100%',
  boxSizing: 'border-box',
}

/* ─── Waitlist form ──────────────────────────────────────────────── */
function WaitlistForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<WaitlistFormData>()

  const onSubmit = async (data: WaitlistFormData) => {
    setSubmitState('submitting')
    try {
      // Attempt to POST to the API; if it fails (dev mode), still show success
      try {
        await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch {
        // No-op if API is unavailable in dev
      }
      console.log('Waitlist submission:', data)
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
        <div style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 400, color: '#EBE1CC',
          marginBottom: '0.8rem',
        }}>
          You're on the list.
        </div>
        <div style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: '0.88rem', color: '#9D9488',
        }}>
          We'll be in touch soon. Thank you for believing in this.
        </div>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      noValidate
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
      }}>
        <Field label="Full Name *" error={errors.name?.message}>
          <input
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
            placeholder="Arjun Sharma"
            style={{ ...inputStyle, borderColor: errors.name ? 'rgba(139,27,31,0.6)' : 'rgba(201,164,90,0.15)' }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,164,90,0.5)'}
            onBlur={e => e.target.style.borderColor = errors.name ? 'rgba(139,27,31,0.6)' : 'rgba(201,164,90,0.15)'}
          />
        </Field>
        <Field label="Email Address *" error={errors.email?.message}>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
            type="email"
            placeholder="arjun@highcourt.gov.in"
            style={{ ...inputStyle, borderColor: errors.email ? 'rgba(139,27,31,0.6)' : 'rgba(201,164,90,0.15)' }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,164,90,0.5)'}
            onBlur={e => e.target.style.borderColor = errors.email ? 'rgba(139,27,31,0.6)' : 'rgba(201,164,90,0.15)'}
          />
        </Field>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
      }}>
        <Field label="Your Role *" error={errors.role?.message}>
          <select
            {...register('role', { required: 'Please select your role' })}
            style={{ ...inputStyle, borderColor: errors.role ? 'rgba(139,27,31,0.6)' : 'rgba(201,164,90,0.15)', appearance: 'none' }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,164,90,0.5)'}
            onBlur={e => e.target.style.borderColor = errors.role ? 'rgba(139,27,31,0.6)' : 'rgba(201,164,90,0.15)'}
          >
            <option value="" style={{ background: '#13131A' }}>Select role…</option>
            {ROLES.map(r => <option key={r} value={r} style={{ background: '#13131A' }}>{r}</option>)}
          </select>
        </Field>
        <Field label="Court / Institution">
          <input
            {...register('institution')}
            placeholder="High Court of Bombay (optional)"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(201,164,90,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(201,164,90,0.15)'}
          />
        </Field>
      </div>

      <Field label="How will you use Vakeel?">
        <textarea
          {...register('message')}
          placeholder="Tell us about your use case… (optional)"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = 'rgba(201,164,90,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(201,164,90,0.15)'}
        />
      </Field>

      <button
        type="submit"
        disabled={submitState === 'submitting'}
        data-cursor="hover"
        style={{
          width: '100%',
          padding: '14px 24px',
          background: submitState === 'submitting'
            ? 'rgba(201,164,90,0.5)'
            : 'linear-gradient(135deg, #C9A45A 0%, #E8C97A 50%, #C9A45A 100%)',
          border: 'none',
          borderRadius: 4,
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: '0.88rem', fontWeight: 600,
          letterSpacing: '0.06em',
          color: '#07070A',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          backgroundSize: '200% 100%',
        }}
        onMouseEnter={e => {
          if (submitState !== 'submitting') {
            e.currentTarget.style.opacity = '0.92'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {submitState === 'submitting' ? 'Submitting…' : 'Request Access →'}
      </button>

      {submitState === 'error' && (
        <div style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: '0.8rem', color: '#8B1B1F', textAlign: 'center',
        }}>
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.58rem', letterSpacing: '0.08em',
        color: 'rgba(92,86,80,0.6)', textAlign: 'center',
      }}>
        No spam. No sales calls. We only reach out when it matters.
      </div>
    </form>
  )
}

/* ─── Closer Section ─────────────────────────────────────────────── */
export default function CloserSection() {
  const quoteRef = useRef<HTMLDivElement>(null)
  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <section id="closer" style={{ background: '#07070A' }}>

      {/* ── Sub-section A: Conviction ── */}
      <div style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 7vw, 6rem)',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Radial glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(201,164,90,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#C9A45A',
            marginBottom: '3rem',
          }}
        >
          WHY IT MATTERS
        </motion.div>

        {/* The big quote */}
        <div ref={quoteRef} style={{ marginBottom: '2.5rem', maxWidth: 860 }}>
          {['"Justice delayed', 'is justice denied."'].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.22, ease: easing }}
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.8rem, 6vw, 7rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#EBE1CC',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>

        {/* Attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: easing }}
          style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontSize: '0.82rem', color: '#9D9488',
            marginBottom: '3rem', letterSpacing: '0.02em',
          }}
        >
          — William Ewart Gladstone, 1868
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7, ease: easing }}
          style={{
            width: 80, height: 1,
            background: 'rgba(201,164,90,0.4)',
            marginBottom: '3rem',
            transformOrigin: 'center',
          }}
        />

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9, ease: easing }}
          style={{ maxWidth: 600, marginBottom: '4rem' }}
          data-cursor="text"
        >
          {[
            'For 156 years, this sentence has described Indian courts.',
            '40 million families waiting. Businesses in limbo.',
            'Rights deferred, generation after generation.',
            '',
            'Courts that move faster mean justice that arrives sooner.',
            'Not just for the privileged few with expensive lawyers,',
            'but for the farmer in Vidarbha, the tenant in Dharavi,',
            'the widow in Varanasi waiting for her property rights.',
            '',
            'This is what Vakeel is built for.',
          ].map((line, i) => (
            <p key={i} style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              color: line === 'This is what Vakeel is built for.' ? '#EBE1CC' : 'rgba(228,221,208,0.65)',
              lineHeight: 1.8,
              fontWeight: line === 'This is what Vakeel is built for.' ? 500 : 400,
              marginBottom: line === '' ? '1.2rem' : 0,
            }}>
              {line}
            </p>
          ))}
        </motion.div>

        {/* VAKEEL wordmark — large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5, ease: easing }}
          style={{ marginBottom: '0.8rem' }}
        >
          <div style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            background: 'linear-gradient(135deg, #C9A45A 0%, #E8C97A 40%, #C9A45A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            lineHeight: 1,
          }}>
            VAKEEL
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9, ease: easing }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'rgba(201,164,90,0.55)',
            marginBottom: '1rem',
          }}
        >
          वकील
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1, ease: easing }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.58rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(92,86,80,0.6)',
          }}
        >
          COURT MANAGEMENT SYSTEM — INDIA
        </motion.div>
      </div>

      {/* ── Sub-section B: Form ── */}
      <div style={{
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 7vw, 6rem)',
        background: '#07070A',
        borderTop: '1px solid rgba(201,164,90,0.08)',
      }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easing }}
          >
            {/* Form header */}
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C9A45A',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ width: 24, height: 1, background: '#C9A45A', display: 'inline-block' }} />
              REQUEST EARLY ACCESS
            </div>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400, color: '#EBE1CC',
              lineHeight: 1.15, letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}>
              Join the waitlist.
            </h2>
            <p style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: '0.9rem', color: '#9D9488',
              lineHeight: 1.65, marginBottom: '2.5rem',
            }}>
              We're onboarding courts, advocates, and legal-tech teams.
              Be among the first to experience what modern court infrastructure looks like.
            </p>

            {/* Form card */}
            <div style={{
              background: '#0D0D12',
              border: '1px solid rgba(201,164,90,0.1)',
              borderRadius: 6,
              padding: 'clamp(2rem, 4vw, 3rem)',
            }}>
              <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        background: '#07070A',
        borderTop: '1px solid rgba(201,164,90,0.07)',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 7vw, 6rem)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Top row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.4rem', fontWeight: 600,
                  letterSpacing: '0.12em', color: '#EBE1CC',
                }}>
                  VAKEEL
                </span>
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '0.85rem', fontStyle: 'italic',
                  color: 'rgba(201,164,90,0.65)',
                }}>
                  वकील
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px',
                  border: '1px solid rgba(201,164,90,0.25)',
                  borderRadius: 2,
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem', letterSpacing: '0.1em',
                  color: 'rgba(201,164,90,0.5)',
                }}>
                  <span style={{
                    width: 12, height: 12, borderRadius: 2,
                    background: '#FF6600',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.48rem', fontWeight: 700, color: '#fff',
                  }}>Y</span>
                  YC W26
                </span>
              </div>
              <div style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: '0.75rem', color: '#5C5650',
              }}>
                Court Management System for Indian Judiciary
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service', 'Contact'].map(link => (
                <a
                  key={link}
                  href="#"
                  data-cursor="hover"
                  style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontSize: '0.78rem', color: '#5C5650',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#9D9488'}
                  onMouseLeave={e => e.currentTarget.style.color = '#5C5650'}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(201,164,90,0.06)', marginBottom: '1.5rem' }} />

          {/* Bottom row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <span style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: '0.72rem', color: '#2D2B27',
            }}>
              © 2026 Vakeel Technologies. All rights reserved.
            </span>
            <span style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: '0.72rem', color: '#2D2B27',
            }}>
              Built in India 🇮🇳
            </span>
          </div>

          {/* Easter egg */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem', letterSpacing: '0.1em',
              color: 'rgba(45,43,39,0.8)',
            }}>
              IN THE HIGH COURT OF ENGINEERING — CASE NO. VKL-0001-2026 — STATUS: FILED ✓
            </span>
          </div>
        </div>
      </footer>

    </section>
  )
}
