import { useEffect, useRef } from 'react'
import { useTheme } from '../providers/ThemeProvider'

/**
 * Scales-of-Justice cursor.
 *
 * Visual: A tiny SVG balance scale that follows the cursor. The two pans
 * tip left/right based on horizontal velocity, creating a subtle living
 * animation that's completely on-brand for a court-tech platform.
 *
 * Modes:
 *  default — scales gently sway
 *  hover   — scales balance perfectly (pans level), ring expands
 *  text    — thin vertical caret
 *  scene   — dashed ring only, scales hidden
 */

type CursorMode = 'default' | 'hover' | 'text' | 'scene'

export default function CustomCursor() {
  const scalesRef  = useRef<SVGSVGElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const pos        = useRef({ x: -100, y: -100 })
  const ringPos    = useRef({ x: -100, y: -100 })
  const vel        = useRef({ x: 0, lastX: -100 })
  const tilt       = useRef(0)           // current pan tilt angle (degrees)
  const targetTilt = useRef(0)           // velocity-driven target tilt
  const rafId      = useRef<number>(0)
  const modeRef    = useRef<CursorMode>('default')
  const { theme }  = useTheme()

  useEffect(() => {
    const scales = scalesRef.current
    const ring   = ringRef.current
    if (!scales || !ring) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

    const onMouseMove = (e: MouseEvent) => {
      vel.current.x   = e.clientX - vel.current.lastX
      vel.current.lastX = e.clientX
      pos.current      = { x: e.clientX, y: e.clientY }
    }

    const tick = () => {
      const { x, y } = pos.current
      const mode = modeRef.current

      // ── Scales SVG — follows cursor instantly (no lag on primary element)
      scales.style.transform = `translate3d(${x - 12}px, ${y - 20}px, 0)`

      // ── Ring — follows with lerp for trailing feel
      ringPos.current.x = lerp(ringPos.current.x, x, 0.11)
      ringPos.current.y = lerp(ringPos.current.y, y, 0.11)
      ring.style.transform = `translate3d(${ringPos.current.x - 19}px, ${ringPos.current.y - 19}px, 0)`

      // ── Pan tilt based on horizontal velocity (only in default mode)
      if (mode === 'default') {
        targetTilt.current = clamp(-vel.current.x * 0.9, -18, 18)
        tilt.current       = lerp(tilt.current, targetTilt.current, 0.08)
      } else if (mode === 'hover') {
        tilt.current = lerp(tilt.current, 0, 0.12) // balance on hover
      } else {
        tilt.current = lerp(tilt.current, 0, 0.15)
      }

      // Apply tilt to the pan group inside the SVG
      const pans = scales.querySelector<SVGGElement>('.cursor-pans')
      if (pans) {
        pans.style.transform = `rotate(${tilt.current}deg)`
        pans.style.transformOrigin = '12px 6px'
      }

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    // ── Mode detection via data-cursor attribute
    const setMode = (m: CursorMode) => {
      if (modeRef.current === m) return
      modeRef.current = m

      // Scales visibility + ring style
      if (m === 'text') {
        scales.style.opacity = '0'
        ring.style.width     = '2px'
        ring.style.height    = '26px'
        ring.style.borderRadius = '1px'
      } else if (m === 'scene') {
        scales.style.opacity    = '0.4'
        ring.style.width        = '44px'
        ring.style.height       = '44px'
        ring.style.borderRadius = '50%'
        ring.style.borderStyle  = 'dashed'
      } else if (m === 'hover') {
        scales.style.opacity    = '1'
        ring.style.width        = '52px'
        ring.style.height       = '52px'
        ring.style.borderRadius = '50%'
        ring.style.borderStyle  = 'solid'
      } else {
        scales.style.opacity    = '1'
        ring.style.width        = '38px'
        ring.style.height       = '38px'
        ring.style.borderRadius = '50%'
        ring.style.borderStyle  = 'solid'
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const attr = (e.target as Element)?.closest?.('[data-cursor]')?.getAttribute('data-cursor')
      setMode((attr as CursorMode | null) ?? 'default')
    }
    const onMouseOut = () => setMode('default')

    document.addEventListener('mousemove',  onMouseMove,  { passive: true })
    document.addEventListener('mouseover',  onMouseOver,  { passive: true })
    document.addEventListener('mouseout',   onMouseOut,   { passive: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseout',   onMouseOut)
    }
  }, [])

  const goldColor = theme === 'dark' ? '#C9A45A' : '#8B6018'
  const ringBorder = theme === 'dark'
    ? '1px solid rgba(201,164,90,0.55)'
    : '1px solid rgba(139,96,24,0.55)'

  return (
    <>
      {/* ── Scales of Justice SVG cursor ── */}
      <svg
        ref={scalesRef}
        aria-hidden="true"
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
        style={{
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 9999,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Beam group — tilts based on velocity */}
        <g className="cursor-pans">
          {/* Horizontal beam */}
          <line x1="2" y1="6" x2="22" y2="6" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" />
          {/* Left chain */}
          <line x1="4"  y1="6" x2="4"  y2="11" stroke={goldColor} strokeWidth="0.9" strokeOpacity="0.8" />
          {/* Right chain */}
          <line x1="20" y1="6" x2="20" y2="11" stroke={goldColor} strokeWidth="0.9" strokeOpacity="0.8" />
          {/* Left pan */}
          <path d="M1.5 11.5 Q4 13 6.5 11.5" stroke={goldColor} strokeWidth="1.1" fill="none" strokeLinecap="round" />
          {/* Right pan */}
          <path d="M17.5 11.5 Q20 13 22.5 11.5" stroke={goldColor} strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </g>
        {/* Center pivot — stays fixed */}
        <circle cx="12" cy="6" r="1.5" fill={goldColor} />
        {/* Vertical stand */}
        <line x1="12" y1="6" x2="12" y2="22" stroke={goldColor} strokeWidth="1.1" strokeLinecap="round" />
        {/* Base */}
        <line x1="8" y1="22" x2="16" y2="22" stroke={goldColor} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="9" y1="24" x2="15" y2="24" stroke={goldColor} strokeWidth="1.0" strokeLinecap="round" strokeOpacity="0.6" />
      </svg>

      {/* ── Trailing ring ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 38, height: 38,
          borderRadius: '50%',
          border: ringBorder,
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: [
            'width 0.3s cubic-bezier(0.16,1,0.3,1)',
            'height 0.3s cubic-bezier(0.16,1,0.3,1)',
            'border-radius 0.3s ease',
            'border-color 0.2s ease',
            'opacity 0.2s ease',
          ].join(', '),
        }}
      />
    </>
  )
}
