'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Loader2 } from 'lucide-react'

type Project = { id:number; title:string; slug:string; category:string; status:string; featured:boolean; created_at:string }

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]  = useState(true)

  const load = () => {
    setLoading(true)
    adminApi.get('/admin/projects').then(r => setProjects(r.data.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const publish   = async (id:number) => { await adminApi.post(`/admin/projects/${id}/publish`);   toast.success('Published!'); load() }
  const unpublish = async (id:number) => { await adminApi.post(`/admin/projects/${id}/unpublish`); toast.success('Unpublished!'); load() }
  const del       = async (id:number, title:string) => {
    if (!confirm(`Delete "${title}"?`)) return
    await adminApi.delete(`/admin/projects/${id}`); toast.success('Deleted!'); load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-space font-bold text-2xl text-fg">Projects</h2>
          <p className="text-muted text-sm">{projects.length} total projects</p>
        </div>
        <Link href="/mojib-cms-x9/projects/new" className="btn-primary"><Plus size={16}/> Add Project</Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 size={24} className="animate-spin text-accent"/>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <FolderOpen size={40} className="mx-auto mb-3 opacity-30"/>
            <p>No projects yet.</p>
            <Link href="/mojib-cms-x9/projects/new" className="btn-primary mt-4 inline-flex">Add First Project</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Title','Category','Status','Featured','Actions'].map(h=>(
                  <th key={h} className="text-left p-4 text-muted font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="p-4">
                    <p className="text-fg font-medium">{p.title}</p>
                    <p className="text-muted text-xs">/{p.slug}</p>
                  </td>
                  <td className="p-4"><span className="badge badge-blue">{p.category}</span></td>
                  <td className="p-4">
                    <span className={`badge ${p.status==='published'?'badge-green':'badge-yellow'}`}>{p.status}</span>
                  </td>
                  <td className="p-4">
                    {p.featured ? <Star size={16} className="text-yellow-400 fill-yellow-400"/> : <Star size={16} className="text-muted"/>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/mojib-cms-x9/projects/${p.id}/edit`} className="btn-outline text-xs px-2.5 py-1.5"><Edit2 size={13}/></Link>
                      {p.status==='published'
                        ? <button onClick={() => unpublish(p.id)} className="btn-outline text-xs px-2.5 py-1.5"><EyeOff size={13}/></button>
                        : <button onClick={() => publish(p.id)}   className="btn-primary text-xs px-2.5 py-1.5"><Eye size={13}/></button>
                      }
                      <button onClick={() => del(p.id, p.title)} className="btn-danger text-xs px-2.5 py-1.5"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function FolderOpen({ size, className }: { size:number; className?:string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
}
