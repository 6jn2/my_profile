import { getProject, getProjects } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Github, ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react'

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map(p => ({ slug: p.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = await getProject(params.slug)
    return { title: `${project.title} | Mohammed Mojib`, description: project.short_description }
  } catch { return {} }
}

const techColors: Record<string, string> = {
  flutter:'#54C5F8', dart:'#00B4AB', laravel:'#FF2D20', mysql:'#00758F',
  firebase:'#FFCA28', 'rest api':'#00D4FF', python:'#3776AB',
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  let project
  try { project = await getProject(params.slug) }
  catch { notFound() }

  const images = (project.media || []).filter(m => m.type === 'image')
  const videos = (project.media || []).filter(m => m.type === 'video')

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent text-sm mb-12 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="section-tag">{project.category}</span>
          </div>
          <h1 className="font-space font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8">{project.short_description}</p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github size={16} /> View Code
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Cover image */}
        {project.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-16 border border-border shadow-card">
            <img src={project.cover_image} alt={project.title} className="w-full h-auto" />
          </div>
        )}

        {/* Grid content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {project.description && (
              <section>
                <h2 className="font-space font-bold text-2xl text-foreground mb-4">Project Overview</h2>
                <p className="text-muted leading-relaxed">{project.description}</p>
              </section>
            )}
            {project.challenge && (
              <section>
                <h2 className="font-space font-bold text-2xl text-foreground mb-4">The Challenge</h2>
                <p className="text-muted leading-relaxed">{project.challenge}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="font-space font-bold text-2xl text-foreground mb-4">The Solution</h2>
                <p className="text-muted leading-relaxed">{project.solution}</p>
              </section>
            )}
            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="font-space font-bold text-2xl text-foreground mb-4">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 glass border border-border rounded-xl p-3">
                      <ChevronRight size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Image gallery */}
            {images.length > 0 && (
              <section>
                <h2 className="font-space font-bold text-2xl text-foreground mb-4">Screenshots</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {images.map(img => (
                    <div key={img.id} className="rounded-xl overflow-hidden border border-border">
                      <img src={img.url} alt={img.title || project.title} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <section>
                <h2 className="font-space font-bold text-2xl text-foreground mb-4">Demo Video</h2>
                {videos.map(v => (
                  <div key={v.id} className="rounded-xl overflow-hidden border border-border aspect-video">
                    {v.provider === 'youtube' ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.url.includes('watch?v=') ? v.url.split('watch?v=')[1] : v.url}`}
                        className="w-full h-full" allowFullScreen title={v.title || project.title}
                      />
                    ) : (
                      <video src={v.url} controls className="w-full h-full" />
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech stack */}
            {project.technologies && (
              <div className="glass border border-border rounded-2xl p-6">
                <h3 className="font-space font-bold text-sm text-foreground uppercase tracking-wider mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                      style={{ borderColor:`${techColors[t.toLowerCase()]||'#1a1a3e'}50`, color:techColors[t.toLowerCase()]||'#94a3b8', background:`${techColors[t.toLowerCase()]||'#00d4ff'}0a` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.results && (
              <div className="glass border border-border rounded-2xl p-6">
                <h3 className="font-space font-bold text-sm text-foreground uppercase tracking-wider mb-3">Results</h3>
                <p className="text-muted text-sm leading-relaxed">{project.results}</p>
              </div>
            )}

            {/* Links */}
            <div className="glass border border-border rounded-2xl p-6 space-y-3">
              <h3 className="font-space font-bold text-sm text-foreground uppercase tracking-wider mb-4">Links</h3>
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-foreground text-sm transition-colors">
                  <Github size={16} className="text-accent" /> View Source Code
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-foreground text-sm transition-colors">
                  <ExternalLink size={16} className="text-accent" /> Live Demo
                </a>
              )}
              <Link href="/#contact" className="flex items-center gap-3 text-muted hover:text-accent text-sm transition-colors">
                💬 Discuss this project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
