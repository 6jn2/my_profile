'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import type { Experience } from '@/lib/api'

const typeLabels: Record<string, string> = {
  education: 'Education', learning: 'Learning', project: 'Project',
  work: 'Work', freelance: 'Freelance', certificate: 'Certificate',
}
const typeColors: Record<string, string> = {
  education: '#7c3aed', learning: '#00d4ff', project: '#10b981',
  work: '#f59e0b', freelance: '#ec4899', certificate: '#6366f1',
}

function formatDate(date: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" ref={ref} className="relative py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-20">
          <span className="section-tag mb-4 inline-flex">Journey</span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">The path that shaped me as a developer</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-purple to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity:0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:0.6, delay: i * 0.12 }}
                  className={`relative flex items-start gap-8 pl-16 md:pl-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="glass border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors duration-300">
                      <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: `${typeColors[exp.type]||'#00d4ff'}15`, color: typeColors[exp.type]||'#00d4ff', border: `1px solid ${typeColors[exp.type]||'#00d4ff'}30` }}>
                          {typeLabels[exp.type] ?? exp.type}
                        </span>
                        {exp.is_current && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-400/10 text-green-400 border border-green-400/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Current
                          </span>
                        )}
                      </div>
                      <h3 className="font-space font-bold text-lg text-foreground mb-1">{exp.title}</h3>
                      {exp.organization && <p className="text-accent text-sm font-medium mb-2">{exp.organization}</p>}
                      {exp.description && <p className="text-muted text-sm leading-relaxed mb-3">{exp.description}</p>}
                      {exp.start_date && (
                        <p className="text-faint text-xs">
                          {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-7 timeline-dot z-10 ring-4 ring-background" />

                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
