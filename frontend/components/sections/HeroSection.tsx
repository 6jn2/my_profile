'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, MessageCircle, ArrowDown, Download, Eye, Instagram, Twitter, Youtube, Send, Facebook } from 'lucide-react'

import type { Settings } from '@/lib/api'

export default function HeroSection({ settings = {} }: { settings?: Settings }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const particles: { x:number; y:number; r:number; vx:number; vy:number; alpha:number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.5+0.5, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, alpha: Math.random()*0.5+0.1 })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`
        ctx.fill()
      })
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - dist/100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Build socials list — only show entries that have a URL set
  const allSocials = [
    { icon: Github,        href: settings.github,    label: 'GitHub',    show: !!settings.github    },
    { icon: Linkedin,      href: settings.linkedin,  label: 'LinkedIn',  show: !!settings.linkedin  },
    { icon: Instagram,     href: settings.instagram, label: 'Instagram', show: !!settings.instagram },
    { icon: Twitter,       href: settings.twitter,   label: 'Twitter',   show: !!settings.twitter   },
    { icon: Send,          href: settings.telegram,  label: 'Telegram',  show: !!settings.telegram  },
    { icon: Youtube,       href: settings.youtube,   label: 'YouTube',   show: !!settings.youtube   },
    { icon: Facebook,      href: settings.facebook,  label: 'Facebook',  show: !!settings.facebook  },
    { icon: Mail,          href: settings.email ? `mailto:${settings.email}` : '', label: 'Email', show: !!settings.email },
    { icon: MessageCircle, href: settings.whatsapp ? `https://wa.me/${(settings.whatsapp||'').replace(/\D/g,'')}` : '', label: 'WhatsApp', show: !!settings.whatsapp },
  ]
  const socials = allSocials.filter(s => s.show && s.href)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl animate-float pointer-events-none" />

      {/* Rings */}
      <div className="hero-ring w-[500px] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDelay:'0s' }} />
      <div className="hero-ring w-[700px] h-[700px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDelay:'1s' }} />
      <div className="hero-ring w-[900px] h-[900px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDelay:'2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="section-tag">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for work
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mb-4"
            >
              <p className="text-muted font-space text-base sm:text-lg mb-2">Hello, I'm</p>
              <h1 className="font-space font-bold leading-tight">
                <span className="block text-4xl xs:text-5xl sm:text-6xl lg:text-7xl gradient-text text-glow break-words">{settings.hero_name_en?.split(' ')[0] || 'Mohammed'}</span>
                <span className="block text-4xl xs:text-5xl sm:text-6xl lg:text-7xl text-foreground break-words">{settings.hero_name_en?.split(' ').slice(1).join(' ') || 'Mojib'}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6 h-10"
            >
              <TypeAnimation
                sequence={[
                  'Flutter Developer', 2000,
                  'Mobile App Developer', 2000,
                  'UI/UX Developer', 2000,
                  'API Integration Expert', 2000,
                ]}
                wrapper="span"
                cursor
                repeat={Infinity}
                className="text-lg sm:text-xl lg:text-2xl font-space font-medium text-accent"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10"
            >
              أقوم بتطوير تطبيقات موبايل حديثة وعالية الجودة باستخدام Flutter، مع بناء واجهات مستخدم احترافية وربط التطبيقات بـ APIs وFirebase وقواعد البيانات.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                <Eye size={16} /> View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-outline">
                Contact Me
              </button>
              <a
                href={settings.cv_url || '#contact'}
                download={!!settings.cv_url}
                target={settings.cv_url ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={!settings.cv_url ? (e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } : undefined}
                className="btn-outline"
              >
                <Download size={16} /> {settings.cv_url ? 'Download CV' : 'Hire Me'}
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl glass border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 hover:shadow-glow transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Visual — hidden on small phones */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="hidden sm:flex flex-shrink-0 relative"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full border border-accent/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-purple/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

              {/* Profile circle */}
              <div className="absolute inset-8 rounded-full overflow-hidden bg-gradient-to-br from-surface-2 to-surface border-2 border-accent/20 shadow-glow flex items-center justify-center">
                {/* Flutter icon visual */}
                <div className="text-center select-none">
                  <div className="text-7xl mb-2">📱</div>
                  <div className="text-accent font-space font-bold text-sm">Flutter Dev</div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass border-border rounded-xl px-3 py-1.5 shadow-card"
              >
                <p className="text-xs text-muted">Tech</p>
                <p className="text-xs sm:text-sm font-bold text-accent font-space">Flutter</p>
              </motion.div>
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass border-border rounded-xl px-3 py-1.5 shadow-card"
              >
                <p className="text-xs text-muted">Backend</p>
                <p className="text-xs sm:text-sm font-bold text-purple font-space">Laravel</p>
              </motion.div>
              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-8 sm:-right-10 -translate-y-1/2 glass border-border rounded-xl px-3 py-1.5 shadow-card"
              >
                <p className="text-xs text-muted">DB</p>
                <p className="text-xs sm:text-sm font-bold text-green-400 font-space">MySQL</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 mt-20"
        >
          <span className="text-faint text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
