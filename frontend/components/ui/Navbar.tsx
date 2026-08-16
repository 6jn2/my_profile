'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: 'home',       label: 'Home'       },
  { href: 'about',      label: 'About'      },
  { href: 'skills',     label: 'Skills'     },
  { href: 'services',   label: 'Services'   },
  { href: 'projects',   label: 'Projects'   },
  { href: 'experience', label: 'Experience' },
  { href: 'contact',    label: 'Contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('home')
  const ticking = useRef(false)

  // ── Detect active section by scroll position ─────────────────────
  useEffect(() => {
    const NAVBAR_HEIGHT = 100

    const detectActive = () => {
      const scrollY = window.scrollY
      const winH    = window.innerHeight

      // Check if near bottom → last section active
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        setActive('contact')
        return
      }

      // Find the section whose top is closest above the middle of screen
      let current = 'home'
      for (const l of links) {
        const el = document.getElementById(l.href)
        if (!el) continue
        const top = el.getBoundingClientRect().top + scrollY
        if (top - NAVBAR_HEIGHT <= scrollY + winH * 0.4) {
          current = l.href
        }
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          detectActive()
          ticking.current = false
        })
        ticking.current = true
      }
    }

    // Run once on mount
    detectActive()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setActive(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'navbar-glass py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-white font-bold text-sm font-space shadow-glow">
              MM
            </span>
            <span className="hidden sm:block font-space font-semibold text-foreground">Mohammed</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(l => {
              const isActive = active === l.href
              return (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-accent' : 'text-muted hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6"
            >
              Let's Talk
            </button>
            <button
              className="lg:hidden p-2 rounded-lg border border-border text-muted hover:text-foreground transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 mobile-menu flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l.href)}
                className={`text-2xl font-space font-semibold transition-colors ${
                  active === l.href ? 'text-accent' : 'text-foreground hover:text-accent'
                }`}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 }}
              onClick={() => scrollTo('contact')}
              className="btn-primary mt-4"
            >
              Let's Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
