import { useTheme } from '../providers/ThemeProvider'

/* ─── Icons ──────────────────────────────────────────────────────────── */

// Sun: circle r=3.5 at center + 8 equidistant spokes
function SunIcon() {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const rad = (i * 45 * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    return {
      x1: parseFloat((8 + 5.5 * cos).toFixed(2)),
      y1: parseFloat((8 + 5.5 * sin).toFixed(2)),
      x2: parseFloat((8 + 7.0 * cos).toFixed(2)),
      y2: parseFloat((8 + 7.0 * sin).toFixed(2)),
    }
  })

  return (
    <svg
      width="16" height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3.5" />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
      ))}
    </svg>
  )
}

// Moon: crescent formed by two overlapping arcs
function MoonIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 10.5A6 6 0 1 1 8 5a4.5 4.5 0 0 0 6 5.5z" />
    </svg>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDark       = theme === 'dark'
  const defaultColor = isDark ? 'rgba(201,164,90,0.6)' : 'rgba(139,96,24,0.6)'
  const hoverColor   = isDark ? '#C9A45A'               : '#8B6018'

  return (
    <button
      onClick={toggleTheme}
      data-cursor="hover"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        width:          32,
        height:         32,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'transparent',
        border:         'none',
        padding:        0,
        cursor:         'pointer',
        color:          defaultColor,
        opacity:        0.8,
        transition:     'opacity 0.2s ease, color 0.2s ease',
        flexShrink:     0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.color   = hoverColor
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = '0.8'
        e.currentTarget.style.color   = defaultColor
      }}
    >
      {/* Dark mode → show sun (click to go light); light mode → show moon */}
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
