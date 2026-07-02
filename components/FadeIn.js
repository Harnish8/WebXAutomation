'use client'
import { useInView } from 'react-intersection-observer'

/**
 * FadeIn — pure CSS animation, zero framer-motion.
 * Supports: up (default), down, left, right, scale directions.
 */
export default function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const dirMap = {
    up: 'fade-in-up',
    down: 'fade-in-down',
    left: 'fade-in-left',
    right: 'fade-in-right',
    scale: 'fade-in-scale',
  }

  const dirClass = dirMap[direction] || 'fade-in-up'

  return (
    <div
      ref={ref}
      className={`fade-in-el ${dirClass} ${inView ? 'fade-in-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
