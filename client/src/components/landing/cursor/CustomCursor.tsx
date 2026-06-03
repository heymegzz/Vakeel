import { useEffect, useRef } from 'react'

type CursorMode = 'default' | 'hover' | 'text' | 'scene'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const pos      = useRef({ x: 0, y: 0 })
  const ringPos  = useRef({ x: 0, y: 0 })
  const rafId    = useRef<number>(0)
  const mode     = useRef<CursorMode>('default')

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Move the dot instantly, ring follows with lerp
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    // Cursor mode switching via data attributes
    const setCursorMode = (el: Element | null) => {
      if (!el) { setMode('default'); return }
      const m = el.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorMode | null
      setMode(m ?? 'default')
    }

    const setMode = (m: CursorMode) => {
      if (mode.current === m) return
      mode.current = m
      document.body.classList.remove('cursor-hover', 'cursor-text', 'cursor-scene')
      if (m !== 'default') document.body.classList.add(`cursor-${m}`)
    }

    const onMouseOver = (e: MouseEvent) => setCursorMode(e.target as Element)
    const onMouseOut  = () => setMode('default')
    const onMouseDown = () => { dot.style.transform += ' scale(0.75)' }
    const onMouseUp   = () => { dot.style.transform = dot.style.transform.replace(' scale(0.75)', '') }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout',  onMouseOut,  { passive: true })
    document.addEventListener('mousedown', onMouseDown, { passive: true })
    document.addEventListener('mouseup',   onMouseUp,   { passive: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup',   onMouseUp)
    }
  }, [])

  return (
    <>
      <div
        id="cursor-dot"
        ref={dotRef}
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, width: 10, height: 10,
                 borderRadius: '50%', background: '#C9A45A', pointerEvents: 'none',
                 zIndex: 9999, willChange: 'transform', mixBlendMode: 'difference' }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, width: 36, height: 36,
                 borderRadius: '50%', border: '1px solid rgba(201,164,90,0.55)',
                 pointerEvents: 'none', zIndex: 9998, willChange: 'transform',
                 transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, background 0.3s ease' }}
      />
    </>
  )
}
