import { getProjects, getSkills, getServices, getExperiences, getSettings } from '@/lib/api'
import HeroSection       from '@/components/sections/HeroSection'
import AboutSection      from '@/components/sections/AboutSection'
import SkillsSection     from '@/components/sections/SkillsSection'
import ServicesSection   from '@/components/sections/ServicesSection'
import ProjectsSection   from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection    from '@/components/sections/ContactSection'

export const revalidate = 30 // ISR every 30 seconds

export default async function HomePage() {
  const [projects, skills, services, experiences, settings] = await Promise.allSettled([
    getProjects(), getSkills(), getServices(), getExperiences(), getSettings()
  ])

  const p  = projects.status    === 'fulfilled' ? projects.value    : []
  const s  = skills.status      === 'fulfilled' ? skills.value      : []
  const sv = services.status    === 'fulfilled' ? services.value    : []
  const e  = experiences.status === 'fulfilled' ? experiences.value : []
  const st = settings.status    === 'fulfilled' ? settings.value    : {}

  return (
    <>
      <HeroSection    settings={st} />
      <AboutSection   settings={st} />
      <SkillsSection   skills={s}   />
      <ServicesSection services={sv} />
      <ProjectsSection projects={p}  />
      <ExperienceSection experiences={e} />
      <ContactSection settings={st} />
    </>
  )
}
