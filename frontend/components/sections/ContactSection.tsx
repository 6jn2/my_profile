'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Github, Linkedin } from 'lucide-react'
import { sendMessage } from '@/lib/api'
import type { Settings } from '@/lib/api'

type FormData = { name: string; email: string; phone?: string; subject?: string; message: string }

export default function ContactSection({ settings = {} }: { settings?: Settings }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await sendMessage(data)
      toast.success('تم إرسال رسالتك بنجاح! سأرد عليك في أقرب وقت.', { duration: 5000 })
      reset()
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  // Dynamic from settings
  const email    = settings.email    || 'your@email.com'
  const phone    = settings.phone    || '+967 xxx xxx xxx'
  const whatsapp = settings.whatsapp || phone
  const location = settings.location || 'Yemen 🇾🇪'
  const github   = settings.github   || '#'
  const linkedin = settings.linkedin || '#'

  const contactInfo = [
    { icon: Mail,          label: 'Email',    value: email,    href: `mailto:${email}` },
    { icon: Phone,         label: 'Phone',    value: phone,    href: `tel:${phone}`    },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Message me', href: `https://wa.me/${whatsapp.replace(/\D/g,'')}` },
    { icon: MapPin,        label: 'Location', value: location, href: '#'               },
  ]
  const socials = [
    { icon: Github,   href: github,   label: 'GitHub'   },
    { icon: Linkedin, href: linkedin, label: 'LinkedIn' },
    { icon: Mail,     href: `mailto:${email}`, label: 'Email' },
  ]

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }} className="text-center mb-12 sm:mb-20">
          <span className="section-tag mb-4 inline-flex">Contact</span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto text-sm sm:text-base">هل لديك مشروع أو فكرة تريد تحويلها إلى تطبيق احترافي؟ تواصل معي.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Info */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.7, delay:0.2 }}>
            <h3 className="font-space font-bold text-2xl text-foreground mb-8">Contact Information</h3>
            <div className="space-y-4 mb-10">
              {contactInfo.map((c, i) => (
                <motion.a key={c.label} href={c.href}
                  initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.4, delay:0.3+i*0.1 }}
                  className="flex items-center gap-4 glass border border-border rounded-xl p-4 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <c.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-faint text-xs">{c.label}</p>
                    <p className="text-foreground font-medium text-sm">{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-faint text-xs uppercase tracking-widest mb-4">Follow me</p>
              <div className="flex gap-3">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-11 h-11 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 hover:shadow-glow transition-all duration-300">
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.7, delay:0.3 }}>
            <div className="glass border border-border rounded-xl sm:rounded-2xl p-5 sm:p-8">
              <h3 className="font-space font-bold text-xl text-foreground mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input {...register('name', { required: 'الاسم مطلوب' })} placeholder="Your Name *" className="form-input" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register('email', { required: 'البريد مطلوب', pattern: { value: /^\S+@\S+\.\S+$/, message: 'بريد غير صحيح' } })} placeholder="Your Email *" className="form-input" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input {...register('phone')} placeholder="Phone (optional)" className="form-input" />
                  <input {...register('subject')} placeholder="Subject" className="form-input" />
                </div>
                <div>
                  <textarea {...register('message', { required: 'الرسالة مطلوبة', minLength: { value: 10, message: 'الرسالة قصيرة جداً' } })} placeholder="Your Message *" rows={5} className="form-input resize-none" />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
