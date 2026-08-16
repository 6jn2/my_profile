'use client'
import { useEffect, useState } from 'react'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import { Plus, Trash2, Loader2 } from 'lucide-react'

type Service = {id:number;title:string;description:string;icon:string;number:string;is_active:boolean}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading]   = useState(true)
  const [adding, setAdding]     = useState(false)
  const [form, setForm]         = useState({title:'',description:'',icon:'',number:''})

  const load = () => { setLoading(true); adminApi.get('/admin/services').then(r=>setServices(r.data.data)).finally(()=>setLoading(false)) }
  useEffect(load,[])

  const add = async () => {
    if (!form.title) return toast.error('Title required')
    setAdding(true)
    try { await adminApi.post('/admin/services',form); toast.success('Added!'); setForm({title:'',description:'',icon:'',number:''}); load() }
    catch { toast.error('Failed') } finally { setAdding(false) }
  }

  const del = async (id:number) => {
    if (!confirm('Delete?')) return
    await adminApi.delete(`/admin/services/${id}`); toast.success('Deleted'); load()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="font-space font-bold text-2xl text-fg">Services Management</h2>

      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-fg mb-4 text-sm uppercase tracking-wider">Add Service</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-xs text-muted mb-1.5">Title *</label><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className="form-input text-sm" placeholder="e.g. Flutter Development"/></div>
          <div><label className="block text-xs text-muted mb-1.5">Number (e.g. 01)</label><input value={form.number} onChange={e=>setForm(f=>({...f,number:e.target.value}))} className="form-input text-sm" placeholder="01"/></div>
          <div><label className="block text-xs text-muted mb-1.5">Icon Key</label><input value={form.icon} onChange={e=>setForm(f=>({...f,icon:e.target.value}))} className="form-input text-sm" placeholder="flutter"/></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-1.5">Description</label><textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} className="form-input text-sm resize-none"/></div>
          <div><button onClick={add} disabled={adding} className="btn-primary disabled:opacity-60">{adding?<Loader2 size={15} className="animate-spin"/>:<Plus size={15}/>} Add Service</button></div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading ? <div className="flex items-center justify-center h-48"><Loader2 size={22} className="animate-spin text-accent"/></div>
        : services.map(s=>(
          <div key={s.id} className="flex items-start gap-4 p-4 border-b border-border hover:bg-white/[0.02]">
            <span className="text-3xl font-black text-accent/20 font-space w-12 flex-shrink-0">{s.number||'—'}</span>
            <div className="flex-1"><p className="text-fg font-medium">{s.title}</p><p className="text-muted text-xs mt-0.5 line-clamp-1">{s.description}</p></div>
            <button onClick={()=>del(s.id)} className="btn-danger text-xs px-2.5 py-1.5"><Trash2 size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  )
}
