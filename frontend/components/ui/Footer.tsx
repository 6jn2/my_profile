'use client'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, MessageCircle, Instagram, Twitter, Youtube, Send, Facebook } from 'lucide-react'
import { getSettings } from '@/lib/api'
import type { Settings } from '@/lib/api'

const navLinks = ['Home','About','Skills','Services','Projects','Experience','Contact']

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {})
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const name     = settings.full_name  || 'Mohammed Mojib'
  const title    = settings.hero_title || 'Flutter Developer'
  const location = settings.location   || 'Yemen 🇾🇪'
  const email    = settings.email      || ''
  const github   = settings.github     || '#'
  const linkedin = settings.linkedin   || '#'
  const whatsapp = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`
    : '#'

  const allSocials = [
    { icon: Github,        href: settings.github,    label: 'GitHub'    },
    { icon: Linkedin,      href: settings.linkedin,  label: 'LinkedIn'  },
    { icon: Instagram,     href: settings.instagram, label: 'Instagram' },
    { icon: Twitter,       href: settings.twitter,   label: 'Twitter'   },
    { icon: Send,          href: settings.telegram,  label: 'Telegram'  },
    { icon: Youtube,       href: settings.youtube,   label: 'YouTube'   },
    { icon: Facebook,      href: settings.facebook,  label: 'Facebook'  },
    { icon: Mail,          href: email ? `mailto:${email}` : '', label: 'Email' },
    { icon: MessageCircle, href: whatsapp !== '#' ? whatsapp : '', label: 'WhatsApp' },
  ]
  const socials = allSocials.filter(s => s.href && s.href !== '#')

  const year = new Date().getFullYear()
  const displayName = name.split(' ').slice(0,2).join(' ')

  return (
    <footer className="relative border-t border-border/50 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-white font-bold font-space shadow-glow">
                {name.split(' ').map((n:string) => n[0]).slice(0,2).join('')}
              </span>
              <div>
                <p className="font-space font-bold text-foreground leading-none">{displayName}</p>
                <p className="text-xs text-muted">{title}</p>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Building exceptional mobile experiences with Flutter and modern technologies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-space font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map(l => (
                <li key={l}>
                  <button onClick={() => scrollTo(l)} className="text-muted hover:text-accent text-sm transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-space font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            {email && <p className="text-muted text-xs mb-1">{email}</p>}
            <p className="text-muted text-sm">{location}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex items-center justify-center">
          <p className="text-muted text-sm">© {year} {name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
