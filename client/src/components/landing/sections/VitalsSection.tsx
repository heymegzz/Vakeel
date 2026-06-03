import { motion } from 'framer-motion'
import { useTheme } from '../providers/ThemeProvider'

/* ─── Ticker data ────────────────────────────────────────────────────── */

const ROW1 =
  'HC-MUM-0042 · PROPERTY DISPUTE · 2019 · ADJOURNED ◦ ' +
  'HC-DEL-0234 · CRIMINAL APPEAL · 2021 · PENDING ◦ ' +
  'DC-PUN-0188 · CIVIL SUIT · 2022 · LISTED ◦ ' +
  'HC-HYD-0891 · WRIT PETITION · 2018 · PART HEARD ◦ ' +
  'SC-IND-0012 · SPECIAL LEAVE · 2020 · ADJOURNED ◦ ' +
  'HC-CHN-0456 · DIVORCE PETITION · 2017 · PENDING ◦ '

const ROW2 =
  'DC-KOL-0234 · EVICTION SUIT · 2020 · LISTED ◦ ' +
  'HC-MUM-0301 · TRADEMARK DISPUTE · 2019 · PART HEARD ◦ ' +
  'HC-BLR-0567 · SERVICE MATTER · 2021 · PENDING ◦ ' +
  'SC-IND-0089 · CONSTITUTIONAL · 2018 · ADJOURNED ◦ ' +
  'HC-JAI-0123 · LAND ACQUISITION · 2016 · PENDING ◦ ' +
  'DC-NAG-0445 · FAMILY COURT · 2022 · LISTED ◦ '

const ROW3 =
  'HC-AHM-0678 · INSURANCE CLAIM · 2021 · PENDING ◦ ' +
  'DC-LUC-0090 · RECOVERY SUIT · 2019 · ADJOURNED ◦ ' +
  'HC-PAT-0234 · ELECTION PETITION · 2022 · LISTED ◦ ' +
  'HC-MUM-0744 · CONTEMPT · 2020 · PART HEARD ◦ ' +
  'SC-IND-0445 · PIL · 2017 · PENDING ◦ ' +
  'DC-JDH-0123 · SUCCESSION · 2018 · LISTED ◦ '

/* ─── Component ──────────────────────────────────────────────────────── */

export default function VitalsSection() {
  const { tokens } = useTheme()
  return (
    <section
      id="vitals"
      style={{
        position:   'relative',
        background: tokens.bg,
        padding:    '8rem 0',
        overflow:   'hidden',
      }}
    >
      {/* ── CSS keyframe animations for the tickers ── */}
      <style>{`
        @keyframes docketScrollRight {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes docketScrollLeft {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* ── Background watermark ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          fontFamily:    '"Cormorant Garamond", Georgia, serif',
          fontSize:      '22vw',
          fontWeight:    700,
          lineHeight:    1,
          letterSpacing: '-0.02em',
          color:         tokens.goldSubtle,
          whiteSpace:    'nowrap',
          userSelect:    'none',
          pointerEvents: 'none',
        }}
      >
        4.5 Cr
      </div>

      {/* ── Top fade — blends into adjacent section ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          right:         0,
          height:        200,
          background:    `linear-gradient(to bottom, ${tokens.bg} 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex:        4,
        }}
      />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Section label */}
        <div
          style={{
            textAlign:     'center',
            fontFamily:    '"Space Mono", monospace',
            fontSize:      '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         tokens.gold,
          }}
        >
          CASES PENDING TODAY
        </div>

        {/* Ticker rows */}
        <div
          style={{
            marginTop:     '3rem',
            display:       'flex',
            flexDirection: 'column',
            gap:           '0.5rem',
          }}
        >
          {/* Row 1 — scrolls right → left, 40 s */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display:       'inline-block',
                whiteSpace:    'nowrap',
                fontFamily:    '"Space Mono", monospace',
                fontSize:      '0.6rem',
                letterSpacing: '0.12em',
                color:         'rgba(201,164,90,0.25)',
                padding:       '0.4rem 0',
                animation:     'docketScrollRight 40s linear infinite',
              }}
            >
              {ROW1.repeat(3)}
            </div>
          </div>

          {/* Row 2 — scrolls left → right, 55 s */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display:       'inline-block',
                whiteSpace:    'nowrap',
                fontFamily:    '"Space Mono", monospace',
                fontSize:      '0.6rem',
                letterSpacing: '0.12em',
                color:         'rgba(201,164,90,0.18)',
                padding:       '0.4rem 0',
                animation:     'docketScrollLeft 55s linear infinite',
              }}
            >
              {ROW2.repeat(3)}
            </div>
          </div>

          {/* Row 3 — scrolls right → left, 35 s */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display:       'inline-block',
                whiteSpace:    'nowrap',
                fontFamily:    '"Space Mono", monospace',
                fontSize:      '0.6rem',
                letterSpacing: '0.12em',
                color:         'rgba(201,164,90,0.22)',
                padding:       '0.4rem 0',
                animation:     'docketScrollRight 35s linear infinite',
              }}
            >
              {ROW3.repeat(3)}
            </div>
          </div>
        </div>

        {/* Impact statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            maxWidth:  640,
            margin:    '5rem auto 0',
            padding:   '0 2rem',
          }}
        >
          {/* Headline */}
          <div
            style={{
              fontFamily:    '"Cormorant Garamond", Georgia, serif',
              fontSize:      'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight:    400,
              color:         tokens.cream,
              lineHeight:    1.3,
              letterSpacing: '-0.01em',
            }}
          >
            Every one of these is a person waiting.
          </div>

          {/* Sub-copy */}
          <div
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize:   '0.95rem',
              color:      tokens.text2,
              lineHeight: 1.7,
              marginTop:  '1rem',
            }}
          >
            A property. A business. A right. On hold — sometimes for decades.
          </div>

          {/* Ornamental divider */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '0.75rem',
              margin:         '1.5rem auto',
            }}
          >
            <div
              style={{
                width:      48,
                height:     1,
                background: 'linear-gradient(to right, transparent, rgba(201,164,90,0.45))',
              }}
            />
            <div
              style={{
                width:        4,
                height:       4,
                borderRadius: '50%',
                background:   'rgba(201,164,90,0.55)',
              }}
            />
            <div
              style={{
                width:      48,
                height:     1,
                background: 'linear-gradient(to left, transparent, rgba(201,164,90,0.45))',
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily:    '"Space Mono", monospace',
              fontSize:      '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(201,164,90,0.5)',
            }}
          >
            Vakeel exists to end the wait.
          </div>
        </motion.div>

        {/* Horizontal progress indicator */}
        <div
          aria-hidden="true"
          style={{
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            marginTop:      '4rem',
            gap:            6,
          }}
        >
          <div style={{ width: 8,  height: 1, background: 'rgba(201,164,90,0.2)', borderRadius: 1 }} />
          <div style={{ width: 32, height: 1, background: 'rgba(201,164,90,0.5)', borderRadius: 1 }} />
          <div style={{ width: 8,  height: 1, background: 'rgba(201,164,90,0.2)', borderRadius: 1 }} />
        </div>

      </div>

      {/* ── Bottom fade — blends into adjacent section ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        200,
          background:    `linear-gradient(to top, ${tokens.bg} 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex:        4,
        }}
      />
    </section>
  )
}
