'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState } from 'react'

type Skill = { id:number; name:string; category:string; icon:string; icon_color:string; level:number; description:string|null }

const categoryLabels: Record<string, string> = {
  all:      'All',
  mobile:   'Mobile',
  backend:  'Backend',
  database: 'Database',
  tools:    'Tools',
  uiux:     'UI/UX',
}

const techIcons: Record<string, string> = {
  flutter:'📱', dart:'🎯', laravel:'🔴', api:'🔗', firebase:'🔥',
  mysql:'🐬', python:'🐍', git:'🌿', github:'⚫', design:'🎨',
  responsive:'📐', mobile:'📲', database:'🗄️', uiux:'✨',
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [active, setActive] = useState('all')

  const cats = ['all', ...Array.from(new Set(skills.map(s => s.category)))]
  const filtered = active === 'all' ? skills : skills.filter(s => s.category === active)

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-16">
          <span className="section-tag mb-4 inline-flex">Skills</span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">Technologies and tools I use to build exceptional mobile experiences</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,delay:0.2}} className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                active === c
                  ? 'bg-accent text-background font-semibold shadow-glow'
                  : 'glass border border-border text-muted hover:text-foreground hover:border-accent/40'
              }`}>
              {categoryLabels[c] ?? c}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity:0, scale:0.8, y:20 }}
              animate={inView ? { opacity:1, scale:1, y:0 } : {}}
              transition={{ duration:0.4, delay: Math.min(i * 0.06, 0.6) }}
              className="skill-card glass border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center gap-2 sm:gap-3 group cursor-default relative"
              style={{ borderColor: 'rgba(26,26,62,1)' }}
            >
              <div className="text-3xl" style={{ filter: `drop-shadow(0 0 8px ${skill.icon_color || '#00d4ff'})` }}>
                {techIcons[skill.icon?.toLowerCase()] ?? '⚡'}
              </div>
              <p className="text-foreground text-xs font-semibold text-center leading-tight">{skill.name}</p>

              {/* Level bar */}
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i*0.05, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skill.icon_color || '#00d4ff'}, #7c3aed)` }}
                />
              </div>

              {/* Hover tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass border border-border rounded-lg px-3 py-1.5 text-xs text-accent whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {skill.level}% proficiency
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
