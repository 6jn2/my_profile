'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, ChevronRight } from 'lucide-react'
import type { Project } from '@/lib/api'

const techColors: Record<string, string> = {
  flutter:'#54C5F8', dart:'#00B4AB', laravel:'#FF2D20', mysql:'#00758F',
  firebase:'#FFCA28', 'rest api':'#00D4FF', python:'#3776AB', git:'#F05032',
}

const categories = [
  { key:'all',     label:'All'     },
  { key:'mobile',  label:'Mobile'  },
  { key:'web',     label:'Web'     },
  { key:'backend', label:'Backend' },
]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity:0, scale:0.9, y:20 }}
        animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.9, y:20 }}
        transition={{ duration:0.3 }}
        onClick={e => e.stopPropagation()}
        className="glass border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative p-8 pb-6 border-b border-border/50">
          <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground">
            <X size={16} />
          </button>
          <h3 className="font-space font-bold text-2xl text-foreground pr-12">{project.title}</h3>
          <p className="text-muted mt-2 text-sm">{project.short_description}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {project.description && (
            <div>
              <h4 className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">About</h4>
              <p className="text-muted leading-relaxed text-sm">{project.description}</p>
            </div>
          )}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">Features</h4>
              <ul className="grid grid-cols-2 gap-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.technologies && (
            <div>
              <h4 className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium border border-border/50 text-muted"
                    style={{ borderColor: `${techColors[t.toLowerCase()] || '#1a1a3e'}60`, color: techColors[t.toLowerCase()] || '#94a3b8' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2.5 px-5">
                <Github size={15} /> GitHub
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5 px-5">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            <Link href={`/projects/${project.slug}`} className="btn-outline text-sm py-2.5 px-5">
              View Details →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.05 })
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-28 lg:py-36">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-[800px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-10 sm:mb-16">
          <span className="section-tag mb-4 inline-flex">Projects</span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">Real-world applications built with modern technologies</p>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,delay:0.2}} className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
          {categories.map(c => (
            <button key={c.key} onClick={() => setFilter(c.key)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter===c.key ? 'bg-accent text-background font-semibold shadow-glow' : 'glass border border-border text-muted hover:text-foreground hover:border-accent/40'
              }`}>
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{opacity:0, scale:0.9}}
                animate={{opacity:1, scale:1}}
                exit={{opacity:0, scale:0.9}}
                transition={{duration:0.4, delay: i*0.08}}
                className="project-card glass border border-border rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => setSelected(p)}
              >
                {/* Image / Cover */}
                <div className="relative h-48 overflow-hidden bg-surface-2 flex items-center justify-center">
                  {p.cover_image ? (
                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="text-6xl select-none">
                      {p.category === 'mobile' ? '📱' : p.category === 'web' ? '🌐' : '⚙️'}
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="project-overlay absolute inset-0 bg-accent/10 flex items-center justify-center">
                    <span className="text-accent text-sm font-semibold border border-accent/50 rounded-full px-4 py-1.5 backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                  {/* Featured badge */}
                  {p.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-accent to-purple text-white shadow-glow">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-space font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{p.short_description}</p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(p.technologies || []).slice(0,4).map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-xs border border-border/50 text-faint"
                        style={{ borderColor: `${techColors[t.toLowerCase()]||'#1a1a3e'}50`, color: techColors[t.toLowerCase()]||'#475569' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {p.github_url && (
                      <a href={p.github_url} onClick={e=>e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
                        <Github size={16} />
                      </a>
                    )}
                    {p.demo_url && (
                      <a href={p.demo_url} onClick={e=>e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link href={`/projects/${p.slug}`} onClick={e=>e.stopPropagation()} className="ml-auto text-xs text-accent hover:underline">
                      Full Case Study →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
