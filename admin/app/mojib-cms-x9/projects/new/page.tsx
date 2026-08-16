'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react'

const categories = ['mobile','web','backend','desktop','other']

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [tech, setTech]     = useState('')
  const [feat, setFeat]     = useState('')
  const [form, setForm]     = useState({
    title:'', slug:'', short_description:'', description:'', challenge:'', solution:'', results:'',
    category:'mobile', github_url:'', demo_url:'', featured:false, status:'draft',
    technologies:[] as string[], features:[] as string[],
  })

  const slugify = (v:string) => v.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'')
  const set = (k:string, v:any) => setForm(f=>({...f,[k]:v}))

  const addTech = () => { if(tech.trim()){set('technologies',[...form.technologies,tech.trim()]);setTech('')} }
  const removeTech = (i:number) => set('technologies',form.technologies.filter((_,idx)=>idx!==i))
  const addFeat = () => { if(feat.trim()){set('features',[...form.features,feat.trim()]);setFeat('')} }
  const removeFeat = (i:number) => set('features',form.features.filter((_,idx)=>idx!==i))

  const save = async () => {
    if(!form.title||!form.slug) return toast.error('Title and slug are required')
    setSaving(true)
    try {
      await adminApi.post('/admin/projects', form)
      toast.success('Project created!')
      router.push('/mojib-cms-x9/projects')
    } catch(e:any) { toast.error(e?.response?.data?.message||'Failed to create project') }
    finally { setSaving(false) }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/mojib-cms-x9/projects" className="btn-outline text-xs px-3 py-2"><ArrowLeft size={14}/></Link>
        <div><h2 className="font-space font-bold text-2xl text-fg">New Project</h2><p className="text-muted text-sm">Add a new project to your portfolio</p></div>
        <button onClick={save} disabled={saving} className="btn-primary ml-auto disabled:opacity-60">
          {saving?<><Loader2 size={15} className="animate-spin"/>Saving...</>:<><Save size={15}/>Save Project</>}
        </button>
      </div>

      {/* Basic */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-fg text-sm uppercase tracking-wider border-b border-border pb-3">Basic Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-1.5">Title *</label>
            <input value={form.title} onChange={e=>{set('title',e.target.value);set('slug',slugify(e.target.value))}} className="form-input text-sm" placeholder="Project Title"/>
          </div>
          <div><label className="block text-xs text-muted mb-1.5">Slug *</label><input value={form.slug} onChange={e=>set('slug',e.target.value)} className="form-input text-sm font-mono text-xs"/></div>
          <div><label className="block text-xs text-muted mb-1.5">Category</label>
            <select value={form.category} onChange={e=>set('category',e.target.value)} className="form-input text-sm">
              {categories.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-1.5">Short Description</label><textarea value={form.short_description} onChange={e=>set('short_description',e.target.value)} rows={2} className="form-input text-sm resize-none"/></div>
          <div><label className="block text-xs text-muted mb-1.5">GitHub URL</label><input value={form.github_url} onChange={e=>set('github_url',e.target.value)} className="form-input text-sm" placeholder="https://github.com/..."/></div>
          <div><label className="block text-xs text-muted mb-1.5">Demo URL</label><input value={form.demo_url} onChange={e=>set('demo_url',e.target.value)} className="form-input text-sm" placeholder="https://..."/></div>
          <div className="flex items-center gap-3"><input type="checkbox" id="feat" checked={form.featured} onChange={e=>set('featured',e.target.checked)} className="accent-accent w-4 h-4"/><label htmlFor="feat" className="text-sm text-muted">Featured Project</label></div>
          <div><label className="block text-xs text-muted mb-1.5">Status</label>
            <select value={form.status} onChange={e=>set('status',e.target.value)} className="form-input text-sm">
              <option value="draft">Draft</option><option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-fg text-sm uppercase tracking-wider border-b border-border pb-3">Case Study</h3>
        {[['Description','description'],['Challenge','challenge'],['Solution','solution'],['Results','results']].map(([label,key])=>(
          <div key={key}><label className="block text-xs text-muted mb-1.5">{label}</label><textarea value={(form as any)[key]} onChange={e=>set(key,e.target.value)} rows={3} className="form-input text-sm resize-none"/></div>
        ))}
      </div>

      {/* Technologies */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-fg text-sm uppercase tracking-wider border-b border-border pb-3">Technologies</h3>
        <div className="flex gap-2">
          <input value={tech} onChange={e=>setTech(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTech()}}} placeholder="e.g. Flutter" className="form-input text-sm flex-1"/>
          <button onClick={addTech} className="btn-outline px-3"><Plus size={15}/></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.technologies.map((t,i)=>(
            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-border text-muted bg-surface-2">
              {t}<button onClick={()=>removeTech(i)} className="hover:text-red-400"><X size={11}/></button>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-fg text-sm uppercase tracking-wider border-b border-border pb-3">Key Features</h3>
        <div className="flex gap-2">
          <input value={feat} onChange={e=>setFeat(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addFeat()}}} placeholder="e.g. Real-time notifications" className="form-input text-sm flex-1"/>
          <button onClick={addFeat} className="btn-outline px-3"><Plus size={15}/></button>
        </div>
        <ul className="space-y-2">
          {form.features.map((f,i)=>(
            <li key={i} className="flex items-center justify-between px-3 py-2 rounded-lg border border-border text-sm text-muted">
              {f}<button onClick={()=>removeFeat(i)} className="hover:text-red-400"><X size={13}/></button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={save} disabled={saving} className="btn-primary px-8 disabled:opacity-60">
          {saving?<><Loader2 size={15} className="animate-spin"/>Saving...</>:<><Save size={15}/>Save Project</>}
        </button>
      </div>
    </div>
  )
}
