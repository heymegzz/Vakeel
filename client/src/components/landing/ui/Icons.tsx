/**
 * Minimal stroke-based SVG icons — Vakeel design system.
 * All icons are 20×20 viewBox, strokeWidth 1.4, rounded caps/joins.
 * Color inherits from `stroke` prop (defaults to currentColor).
 */

interface IconProps {
  size?: number
  stroke?: string
  strokeWidth?: number
  className?: string
}

const base = (size: number, strokeWidth: number): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

/* ── Shield / Lock ────────────────────────────────────────────────── */
export function IconShield({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <path d="M10 2L3 5v5c0 4 3.1 7.5 7 8.4C16.9 17.5 20 14 20 10V5l-7-3z" />
      <path d="M7.5 10.2l1.8 1.8 3.2-3.5" />
    </svg>
  )
}

/* ── Zap / Lightning ─────────────────────────────────────────────── */
export function IconZap({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <polyline points="11 2 4 11 10 11 9 18 16 9 10 9 11 2" />
    </svg>
  )
}

/* ── Archive / Document ──────────────────────────────────────────── */
export function IconVault({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <rect x="3" y="3" width="14" height="4" rx="1" />
      <path d="M5 7v9a1 1 0 001 1h8a1 1 0 001-1V7" />
      <line x1="8" y1="11" x2="12" y2="11" />
    </svg>
  )
}

/* ── Signal / Omnichannel ────────────────────────────────────────── */
export function IconSignal({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <line x1="10" y1="17" x2="10" y2="17.5" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M7 14.5a4.2 4.2 0 016 0" />
      <path d="M4 11.5a7.8 7.8 0 0112 0" />
      <path d="M1.5 8.5a11.5 11.5 0 0117 0" />
    </svg>
  )
}

/* ── Check circle (form success) ────────────────────────────────── */
export function IconCheckCircle({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <circle cx="10" cy="10" r="8" />
      <polyline points="6.5 10.2 8.8 12.5 13.5 7.5" />
    </svg>
  )
}

/* ── Scales of justice ───────────────────────────────────────────── */
export function IconScales({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <line x1="10" y1="2" x2="10" y2="17" />
      <line x1="4" y1="5" x2="16" y2="5" />
      <path d="M4 5l-2.5 5.5h5L4 5z" />
      <path d="M16 5l-2.5 5.5h5L16 5z" />
      <line x1="7" y1="17" x2="13" y2="17" />
    </svg>
  )
}

/* ── Calendar ────────────────────────────────────────────────────── */
export function IconCalendar({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <rect x="3" y="4" width="14" height="14" rx="2" />
      <line x1="7" y1="2" x2="7" y2="6" />
      <line x1="13" y1="2" x2="13" y2="6" />
      <line x1="3" y1="9" x2="17" y2="9" />
    </svg>
  )
}

/* ── Bell ────────────────────────────────────────────────────────── */
export function IconBell({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <path d="M10 2a6 6 0 016 6v3.5l1.5 2H2.5L4 11.5V8a6 6 0 016-6z" />
      <path d="M8.5 17.5a1.5 1.5 0 003 0" />
    </svg>
  )
}

/* ── Pen / Signature ─────────────────────────────────────────────── */
export function IconPen({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <path d="M12 3l5 5-9 9H3v-5l9-9z" />
      <line x1="9" y1="6" x2="14" y2="11" />
    </svg>
  )
}

/* ── File list ───────────────────────────────────────────────────── */
export function IconFileList({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <path d="M13 2H5a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V6l-3-4z" />
      <polyline points="13 2 13 6 17 6" />
      <line x1="7" y1="10" x2="13" y2="10" />
      <line x1="7" y1="13" x2="11" y2="13" />
    </svg>
  )
}

/* ── Globe ───────────────────────────────────────────────────────── */
export function IconGlobe({ size = 20, stroke = 'currentColor', strokeWidth = 1.4 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={stroke}>
      <circle cx="10" cy="10" r="8" />
      <line x1="2" y1="10" x2="18" y2="10" />
      <path d="M10 2a14 14 0 010 16M10 2a14 14 0 000 16" />
    </svg>
  )
}
