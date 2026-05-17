'use client'
import { useEffect, useRef } from 'react'

export default function AuroraBackground() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const w = window.innerWidth
      const h = window.innerHeight
      const xPercent = (clientX / w) * 100
      const yPercent = (clientY / h) * 100

      if (orb1Ref.current) {
        orb1Ref.current.style.left = `${xPercent * 0.3}%`
        orb1Ref.current.style.top = `${yPercent * 0.3}%`
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.right = `${(100 - xPercent) * 0.2}%`
        orb2Ref.current.style.bottom = `${(100 - yPercent) * 0.2}%`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary orb - follows mouse */}
      <div
        ref={orb1Ref}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12] transition-all duration-[2000ms] ease-out"
        style={{
          background: 'radial-gradient(circle, #874cff 0%, transparent 70%)',
          filter: 'blur(80px)',
          left: '-10%',
          top: '-10%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Secondary orb */}
      <div
        ref={orb2Ref}
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.10] transition-all duration-[3000ms] ease-out"
        style={{
          background: 'radial-gradient(circle, #ff009a 0%, transparent 70%)',
          filter: 'blur(80px)',
          right: '-10%',
          bottom: '-10%',
          transform: 'translate(50%, 50%)',
        }}
      />
      {/* Static ambient orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #8ff5ff 0%, transparent 70%)',
          filter: 'blur(60px)',
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
