'use client'
import { useEffect, useState } from 'react'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2, GripVertical } from 'lucide-react'

type Skill = { id:number; name:string; category:string; icon:string; icon_color:string; level:number; is_active:boolean }

const cats = ['mobile','backend','database','tools','uiux']

export default function SkillsAdminPage() {
  const [skills, setSkills]   = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState({ name:'', category:'mobile', icon:'', icon_color:'#00d4ff', level:80 })
  const [adding, setAdding]   = useState(false)

  const load = () => { setLoading(true); adminApi.get('/admin/skills').then(r => setSkills(r.data.data)).finally(() => setLoading(false)) }
  useEffect(load, [])

  const add = async () => {
    if (!form.name) return toast.error('Name is required')
    setAdding(true)
    try { await adminApi.post('/admin/skills', form); toast.success('Skill added!'); setForm({ name:'', category:'mobile', icon:'', icon_color:'#00d4ff', level:80 }); load() }
    catch { toast.error('Failed to add skill') }
    finally { setAdding(false) }
  }

  const del = async (id:number, name:string) => {
    if (!confirm(`Delete "${name}"?`)) return
    await adminApi.delete(`/admin/skills/${id}`); toast.success('Deleted'); load()
  }

  const updateLevel = async (id:number, level:number) => {
    await adminApi.put(`/admin/skills/${id}`, { level })
    setSkills(prev => prev.map(s => s.id===id ? { ...s, level } : s))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="font-space font-bold text-2xl text-fg">Skills Management</h2>

      {/* Add form */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-fg mb-4 text-sm uppercase tracking-wider">Add New Skill</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted mb-1.5">Skill Name *</label>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Flutter" className="form-input text-sm"/>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Category</label>
            <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className="form-input text-sm">
              {cats.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Icon Key (e.g. flutter)</label>
            <input value={form.icon} onChange={e=>setForm(f=>({...f,icon:e.target.value}))} placeholder="flutter" className="form-input text-sm"/>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Icon Color</label>
            <div className="flex gap-2">
              <input type="color" value={form.icon_color} onChange={e=>setForm(f=>({...f,icon_color:e.target.value}))} className="w-10 h-10 rounded-lg border border-border cursor-pointer"/>
              <input value={form.icon_color} onChange={e=>setForm(f=>({...f,icon_color:e.target.value}))} className="form-input text-sm flex-1"/>
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Level: {form.level}%</label>
            <input type="range" min={0} max={100} value={form.level} onChange={e=>setForm(f=>({...f,level:+e.target.value}))} className="w-full accent-accent h-2 mt-3"/>
          </div>
          <div className="flex items-end">
            <button onClick={add} disabled={adding} className="btn-primary w-full justify-center disabled:opacity-60">
              {adding ? <Loader2 size={15} className="animate-spin"/> : <Plus size={15}/>} Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 size={22} className="animate-spin text-accent"/></div>
        ) : (
          <div className="divide-y divide-border">
            {skills.map(s => (
              <div key={s.id} className="flex items-center gap-4 p-4 hover:bg-white/[0.02]">
                <GripVertical size={16} className="text-muted opacity-30"/>
                <div className="w-6 h-6 rounded-full border-2 flex-shrink-0" style={{borderColor:s.icon_color, background:`${s.icon_color}20`}}/>
                <div className="flex-1 min-w-0">
                  <p className="text-fg font-medium text-sm">{s.name}</p>
                  <p className="text-muted text-xs capitalize">{s.category}</p>
                </div>
                <div className="w-32 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{width:`${s.level}%`, background:`linear-gradient(90deg,${s.icon_color},#7c3aed)`}}/>
                    </div>
                    <span className="text-xs text-muted w-8 text-right">{s.level}%</span>
                  </div>
                </div>
                <span className="badge badge-blue text-xs">{s.category}</span>
                <button onClick={()=>del(s.id,s.name)} className="btn-danger text-xs px-2.5 py-1.5 flex-shrink-0"><Trash2 size={13}/></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
