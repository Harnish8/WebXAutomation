'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const STACK = [
    { title: 'Digital Architecture', desc: 'Scalable systems for business velocity.' },
    { title: 'Conversion Engineering', desc: 'Turn intent into measurable action.' },
    { title: 'Automation Core', desc: 'Remove manual bottlenecks with AI flows.' },
    { title: 'Growth Engine', desc: 'Compounding optimization loops.' },
]

function StackCard({ i, card, progress }) {
    const range = [i * 0.25, (i + 1) * 0.25]

    const scale = useTransform(progress, range, [1, 0.9])
    const opacity = useTransform(progress, range, [1, 0.5])
    const y = useTransform(progress, range, [0, -50])

    return (
        <motion.div
            style={{
                scale,
                opacity,
                y,
                zIndex: 100 - i,
            }}
            className="sticky top-[15%] mb-20 flex justify-center"
        >
            <motion.div
                whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 40px rgba(255,0,154,0.25)',
                }}
                className="w-full md:w-[65%] glass-panel rounded-[2rem] p-10 md:p-14 border border-outline-variant/20 bg-background/60 backdrop-blur-xl"
            >
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                    {card.title}
                </h3>
                <p className="text-on-surface-variant">{card.desc}</p>
            </motion.div>
        </motion.div>
    )
}

export default function StackingCards() {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end'],
    })

    return (
        <section ref={ref} className="relative h-[450vh] px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
                {STACK.map((card, i) => (
                    <StackCard key={i} i={i} card={card} progress={scrollYProgress} />
                ))}
            </div>
        </section>
    )
}