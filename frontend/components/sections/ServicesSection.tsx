'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

type Service = { id:number; title:string; description:string; icon:string; number:string }

const serviceIcons: Record<string, string> = {
  flutter:'📱', design:'🎨', api:'🔗', firebase:'🔥', database:'🗄️', business:'💼', uiux:'✨', mobile:'📲',
}

export default function ServicesSection({ services }: { services: Service[] }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 })
  return (
    <section id="services" ref={ref} className="relative py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="text-center mb-12 sm:mb-20">
          <span className="section-tag mb-4 inline-flex">Services</span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
            What I <span className="gradient-text">Offer</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto divide-y divide-border/40">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity:0, x:-30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.5, delay: i * 0.1 }}
              className="service-item flex items-start gap-4 sm:gap-8 py-6 sm:py-10 group cursor-default hover:bg-white/[0.015] px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-2xl transition-all duration-300"
            >
              {/* Number — hidden on very small screens */}
              <div className="service-number hidden sm:block w-16 flex-shrink-0">
                {svc.number || `0${i+1}`}
              </div>

              {/* Icon */}
              <div className="text-2xl sm:text-3xl w-10 sm:w-12 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                {serviceIcons[svc.icon?.toLowerCase()] ?? '⚡'}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-space font-bold text-base sm:text-xl text-foreground mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">{svc.description}</p>
              </div>

              {/* Arrow — hidden on mobile */}
              <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full border border-border items-center justify-center text-faint group-hover:border-accent group-hover:text-accent group-hover:rotate-45 transition-all duration-300 mt-1">
                ↗
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
