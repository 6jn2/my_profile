import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 10000,
})

export interface Project {
  id: number
  title: string
  slug: string
  short_description: string
  technologies: string[]
  category: string
  featured: boolean
  github_url: string | null
  demo_url: string | null
  cover_image: string | null
  description?: string
  challenge?: string
  solution?: string
  results?: string
  features?: string[]
  media?: Media[]
}

export interface Media {
  id: number
  type: 'image' | 'video'
  url: string
  thumbnail: string | null
  title: string | null
  provider: string | null
  is_cover: boolean
}

export interface Skill {
  id: number
  name: string
  category: string
  icon: string
  icon_color: string
  level: number
  description: string | null
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  number: string
}

export interface Experience {
  id: number
  title: string
  organization: string | null
  description: string | null
  type: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  skills_used: string[] | null
}

export interface Settings {
  [key: string]: string
}

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/projects')
  return data.data
}

export const getProject = async (slug: string): Promise<Project> => {
  const { data } = await api.get(`/projects/${slug}`)
  return data.data
}

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await api.get('/skills')
  return data.data
}

export const getServices = async (): Promise<Service[]> => {
  const { data } = await api.get('/services')
  return data.data
}

export const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await api.get('/experiences')
  return data.data
}

export const getSettings = async (): Promise<Settings> => {
  const { data } = await api.get('/settings')
  return data.data
}

export const sendMessage = async (payload: {
  name: string; email: string; phone?: string; subject?: string; message: string
}) => {
  const { data } = await api.post('/contact', payload)
  return data
}

export default api
