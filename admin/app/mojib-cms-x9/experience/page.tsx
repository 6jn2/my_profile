'use client'
import { useEffect, useState } from 'react'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import { Plus, Trash2, Edit2, Check, X, Loader2 } from 'lucide-react'

type Experience = {id:number;title:string;organization:string|null;type:string;start_date:string|null;end_date:string|null;is_current:boolean;is_active:boolean}
const types = ['education','learning','project','work','freelance','certificate']

export default function ExperienceAdminPage() {
  const [items, setItems]   = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm]     = useState({ title:'', organization:'', type:'education', start_date:'', end_date:'', is_current:false, description:'' })

  const load = () => { setLoading(true); adminApi.get('/admin/experiences').then(r => setItems(r.data.data)).finally(()=>setLoading(false)) }
  useEffect(load,[])

  const add = async () => {
    if (!form.title) return toast.error('Title required')
    setAdding(true)
    try { await adminApi.post('/admin/experiences', form); toast.success('Added!'); setForm({title:'',organization:'',type:'education',start_date:'',end_date:'',is_current:false,description:''}); load() }
    catch { toast.error('Failed') } finally { setAdding(false) }
  }

  const del = async (id:number) => {
    if (!confirm('Delete?')) return
    await adminApi.delete(`/admin/experiences/${id}`); toast.success('Deleted'); load()
  }

  const typeColors: Record<string,string> = { education:'badge-blue', learning:'badge-green', project:'badge-yellow', work:'badge-red', freelance:'badge-blue', certificate:'badge-green' }

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="font-space font-bold text-2xl text-fg">Experience & Timeline</h2>

      {/* Add form */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-fg mb-4 text-sm uppercase tracking-wider">Add Entry</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted mb-1.5">Title *</label>
            <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Flutter Developer" className="form-input text-sm"/>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Organization</label>
            <input value={form.organization} onChange={e=>setForm(f=>({...f,organization:e.target.value}))} placeholder="e.g. National University" className="form-input text-sm"/>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Type</label>
            <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className="form-input text-sm">
              {types.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Start Date</label>
            <input type="date" value={form.start_date} onChange={e=>setForm(f=>({...f,start_date:e.target.value}))} className="form-input text-sm"/>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">End Date</label>
            <input type="date" value={form.end_date} onChange={e=>setForm(f=>({...f,end_date:e.target.value}))} disabled={form.is_current} className="form-input text-sm disabled:opacity-40"/>
          </div>
          <div className="flex items-center gap-3 pt-5">
            <input type="checkbox" id="curr" checked={form.is_current} onChange={e=>setForm(f=>({...f,is_current:e.target.checked}))} className="accent-accent w-4 h-4"/>
            <label htmlFor="curr" className="text-sm text-muted">Currently Active</label>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-muted mb-1.5">Description</label>
            <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} className="form-input text-sm resize-none"/>
          </div>
          <div>
            <button onClick={add} disabled={adding} className="btn-primary disabled:opacity-60">
              {adding ? <Loader2 size={15} className="animate-spin"/> : <Plus size={15}/>} Add Entry
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 size={22} className="animate-spin text-accent"/></div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">No entries yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {items.map(item => (
              <div key={item.id} className="flex items-start gap-4 p-4 hover:bg-white/[0.02]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-fg font-medium text-sm">{item.title}</p>
                    <span className={`badge ${typeColors[item.type]||'badge-blue'} text-xs`}>{item.type}</span>
                    {item.is_current && <span className="badge badge-green text-xs">Current</span>}
                  </div>
                  {item.organization && <p className="text-accent text-xs">{item.organization}</p>}
                  {item.start_date && <p className="text-muted text-xs mt-0.5">{item.start_date.slice(0,7)} — {item.is_current ? 'Present' : item.end_date?.slice(0,7)}</p>}
                </div>
                <button onClick={()=>del(item.id)} className="btn-danger text-xs px-2.5 py-1.5 flex-shrink-0"><Trash2 size={13}/></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
