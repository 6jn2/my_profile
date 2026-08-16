'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { GraduationCap, MapPin, Code2, Smartphone } from 'lucide-react'
import type { Settings } from '@/lib/api'

export default function AboutSection({ settings = {} }: { settings?: Settings }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 })

  const stats = [
    { label: 'Projects',     value: Number(settings.stats_projects     || 5),  suffix: '+', color: '#00d4ff' },
    { label: 'Technologies', value: Number(settings.stats_technologies || 12), suffix: '+', color: '#7c3aed' },
    { label: 'Years',        value: Number(settings.stats_years        || 3),  suffix: '+', color: '#4ade80' },
    { label: 'Repos',        value: Number(settings.stats_repos        || 10), suffix: '+', color: '#facc15' },
  ]

  const highlights = [
    { icon: Smartphone,    label: 'Flutter & Dart',  sub: 'Mobile Development'                              },
    { icon: Code2,         label: 'Laravel & APIs',  sub: 'Backend Development'                            },
    { icon: GraduationCap, label: settings.education || 'Info Technology',    sub: settings.university || 'National University' },
    { icon: MapPin,        label: settings.location  || 'Yemen',              sub: 'Available Remotely'    },
  ]

  const techs = ['Flutter','Dart','Laravel','Firebase','MySQL','Python','REST API','Git','GitHub','UI/UX']

  return (
    <section id="about" ref={ref} style={{ padding: '4rem 0', position: 'relative' }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 1rem' }}>
        <span className="section-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>About Me</span>
        <h2 className="font-space" style={{ fontWeight: 700, fontSize: 'clamp(1.5rem, 6vw, 3rem)', marginTop: '1rem' }}>
          Who <span className="gradient-text">I Am</span>
        </h2>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>

        {/* Text Block */}
        <div style={{
          background: 'rgba(13,13,26,0.7)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          backdropFilter: 'blur(16px)',
        }}>
          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.8rem, 3.5vw, 1rem)',
            lineHeight: 2,
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}>
            {settings.about_text ||
              `أنا ${settings.full_name || 'محمد مجيب نعمان مهيوب'}، مطور تطبيقات متخصص في Flutter وتطوير تطبيقات الهاتف.`}
          </p>
          <p style={{ color: '#94a3b8', fontSize: 'clamp(0.8rem, 3.5vw, 1rem)', lineHeight: 2, marginBottom: '0.75rem', textAlign: 'center' }}>
            أهتم بتصميم واجهات مستخدم حديثة، وبناء تطبيقات عملية وقابلة للتوسع، وربط التطبيقات بـ APIs وFirebase وقواعد البيانات.
          </p>
          <p style={{ color: '#94a3b8', fontSize: 'clamp(0.8rem, 3.5vw, 1rem)', lineHeight: 2, textAlign: 'center', marginBottom: 0 }}>
            أسعى لتقديم حلول تقنية عالية الجودة مع التركيز على الأداء وتجربة المستخدم.
          </p>
        </div>

        {/* Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {highlights.map((h, i) => (
            <div key={i} style={{
              background: 'rgba(13,13,26,0.7)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '0.75rem',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
            }}>
              <div style={{
                width: '2rem', height: '2rem', borderRadius: '0.5rem',
                background: 'rgba(0,212,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <h.icon size={14} color="#00d4ff" />
              </div>
              <div>
                <p style={{ color: '#f8fafc', fontWeight: 600, fontSize: 'clamp(0.65rem, 2.8vw, 0.8rem)', lineHeight: 1.3 }}>{h.label}</p>
                <p style={{ color: '#475569', fontSize: 'clamp(0.6rem, 2.5vw, 0.7rem)', lineHeight: 1.3, marginTop: '0.2rem' }}>{h.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(13,13,26,0.7)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '0.75rem',
              padding: '1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', color: s.color, lineHeight: 1 }}>
                {inView
                  ? <CountUp end={s.value} duration={2} suffix={s.suffix} />
                  : `0${s.suffix}`}
              </div>
              <p style={{ color: '#94a3b8', fontSize: 'clamp(0.65rem, 2.8vw, 0.8rem)', marginTop: '0.4rem' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div style={{
          background: 'rgba(13,13,26,0.7)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '0.75rem',
          padding: '1rem',
          overflow: 'hidden',
        }}>
          <p style={{ color: '#475569', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Tech Stack
          </p>
          <div style={{ overflow: 'hidden' }}>
            <div className="marquee-track" style={{ gap: '0.5rem' }}>
              {[...techs, ...techs].map((t, i) => (
                <span key={i} style={{
                  color: '#94a3b8',
                  fontSize: '0.7rem',
                  whiteSpace: 'nowrap',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '0.4rem',
                  border: '1px solid rgba(26,26,62,0.8)',
                  background: 'rgba(13,13,26,0.5)',
                  flexShrink: 0,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
