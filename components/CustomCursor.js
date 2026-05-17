'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    const handleMouseEnterLink = () => {
      ring.style.transform = 'translate(-50%,-50%) scale(2)'
      ring.style.borderColor = '#ff87b9'
      dot.style.opacity = '0'
    }
    const handleMouseLeaveLink = () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.borderColor = 'rgba(255,135,185,0.5)'
      dot.style.opacity = '1'
    }

    const links = document.querySelectorAll('a, button')
    links.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] w-2 h-2 rounded-full bg-primary pointer-events-none"
        style={{ transform: 'translate(-50%,-50%)', transition: 'opacity 0.2s' }}
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] w-8 h-8 rounded-full border border-primary/50 pointer-events-none hidden md:block"
        style={{ transform: 'translate(-50%,-50%)', transition: 'transform 0.3s, border-color 0.3s' }}
      />
    </>
  )
}
