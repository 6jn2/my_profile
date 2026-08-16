'use client'
import { useEffect, useState, useRef } from 'react'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import { Save, Loader2, Upload, FileText, Trash2, ExternalLink } from 'lucide-react'

type Settings = Record<string, string>

const settingsGroups = [
  {
    group: 'general',
    label: 'General Information',
    fields: [
      { key:'hero_name_ar',   label:'الاسم (Hero - عربي)',   type:'text' },
      { key:'hero_name_en',   label:'Name (Hero - English)', type:'text' },
      { key:'hero_title',     label:'Job Title',             type:'text' },
      { key:'hero_description', label:'Hero Description',    type:'textarea' },
      { key:'about_text',     label:'About Me Text',         type:'textarea' },
      { key:'full_name',      label:'Full Name',             type:'text' },
      { key:'location',       label:'Location',              type:'text' },
      { key:'education',      label:'Education Field',       type:'text' },
      { key:'university',     label:'University',            type:'text' },
    ]
  },
  {
    group: 'stats',
    label: 'Statistics',
    fields: [
      { key:'stats_projects',    label:'Projects Count',      type:'text' },
      { key:'stats_technologies',label:'Technologies Count',  type:'text' },
      { key:'stats_years',       label:'Years Learning',      type:'text' },
      { key:'stats_repos',       label:'GitHub Repos',        type:'text' },
    ]
  },
  {
    group: 'contact',
    label: 'Contact Information',
    fields: [
      { key:'email',     label:'Email Address',  type:'email' },
      { key:'phone',     label:'Phone Number',   type:'text'  },
      { key:'whatsapp',  label:'WhatsApp Number',type:'text'  },
    ]
  },
  {
    group: 'social',
    label: 'Social Links',
    fields: [
      { key:'github',    label:'GitHub URL',    type:'url' },
      { key:'linkedin',  label:'LinkedIn URL',  type:'url' },
      { key:'instagram', label:'Instagram URL', type:'url' },
      { key:'twitter',   label:'Twitter / X URL', type:'url' },
      { key:'telegram',  label:'Telegram URL',  type:'url' },
      { key:'youtube',   label:'YouTube URL',   type:'url' },
      { key:'behance',   label:'Behance URL',   type:'url' },
      { key:'facebook',  label:'Facebook URL',  type:'url' },
    ]
  },
  {
    group: 'seo',
    label: 'SEO',
    fields: [
      { key:'meta_description', label:'Meta Description', type:'textarea' },
      { key:'meta_keywords',    label:'Meta Keywords',    type:'text'     },
    ]
  },
]

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [cvUploading, setCvUploading] = useState(false)
  const cvInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    adminApi.get('/admin/settings').then(r => setSettings(r.data.data)).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      await adminApi.post('/admin/settings', settings)
      // Trigger Next.js revalidation so changes appear immediately
      try {
        await fetch('http://localhost:3000/api/revalidate', {
          method: 'POST',
          headers: { 'x-revalidate-secret': 'mojib-revalidate-2026' },
        })
      } catch {}
      toast.success('Settings saved! Changes will appear on the site now.')
    } catch { toast.error('Failed to save settings.') }
    finally { setSaving(false) }
  }

  const uploadCV = async (file: File) => {
    setCvUploading(true)
    const formData = new FormData()
    formData.append('cv', file)
    try {
      const res = await adminApi.post('/admin/settings/cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSettings(s => ({ ...s, cv_url: res.data.url }))
      toast.success('✅ تم رفع السيرة الذاتية بنجاح!')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'فشل رفع الملف')
    } finally {
      setCvUploading(false)
    }
  }

  const deleteCV = async () => {
    if (!confirm('حذف السيرة الذاتية؟')) return
    await adminApi.post('/admin/settings', { cv_url: '' })
    setSettings(s => ({ ...s, cv_url: '' }))
    toast.success('تم حذف السيرة الذاتية')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-accent"/></div>

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-space font-bold text-2xl text-fg">Settings</h2>
          <p className="text-muted text-sm">Manage your portfolio content and information</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? <><Loader2 size={15} className="animate-spin"/> Saving...</> : <><Save size={15}/> Save All</>}
        </button>
      </div>

      {settingsGroups.map(group => (
        <div key={group.group} className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-space font-semibold text-fg border-b border-border pb-3">{group.label}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {group.fields.map(field => (
              <div key={field.key} className={field.type==='textarea' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-medium text-muted mb-1.5">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={settings[field.key] || ''}
                    onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                    rows={3}
                    className="form-input resize-none text-sm"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={settings[field.key] || ''}
                    onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                    className="form-input text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CV Upload */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-space font-semibold text-fg border-b border-border pb-3 mb-5 flex items-center gap-2">
          <FileText size={16} className="text-accent"/> السيرة الذاتية / CV
        </h3>

        {settings.cv_url ? (
          // CV already uploaded
          <div className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/20 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-accent"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-fg font-medium text-sm">السيرة الذاتية مرفوعة ✅</p>
              <p className="text-muted text-xs truncate">{settings.cv_url}</p>
            </div>
            <div className="flex gap-2">
              <a href={settings.cv_url} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-3 py-2">
                <ExternalLink size={13}/> عرض
              </a>
              <button onClick={() => cvInputRef.current?.click()} className="btn-primary text-xs px-3 py-2">
                <Upload size={13}/> تغيير
              </button>
              <button onClick={deleteCV} className="btn-danger text-xs px-3 py-2">
                <Trash2 size={13}/>
              </button>
            </div>
          </div>
        ) : (
          // No CV — upload area
          <div
            onClick={() => cvInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-accent/50 rounded-xl p-10 text-center cursor-pointer transition-colors group"
          >
            {cvUploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={32} className="animate-spin text-accent"/>
                <p className="text-muted text-sm">جاري الرفع...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload size={32} className="text-muted group-hover:text-accent transition-colors"/>
                <div>
                  <p className="text-fg font-medium">اضغط لرفع السيرة الذاتية</p>
                  <p className="text-muted text-sm mt-1">PDF أو DOC أو DOCX — حجم أقصى 10MB</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden input */}
        <input
          ref={cvInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) uploadCV(file)
            e.target.value = ''
          }}
        />
      </div>

      {/* Bottom save */}
      <div className="flex justify-end pb-8">
        <button onClick={save} disabled={saving} className="btn-primary px-8 disabled:opacity-60">
          {saving ? <><Loader2 size={15} className="animate-spin"/> Saving...</> : <><Save size={15}/> Save Settings</>}
        </button>
      </div>
    </div>
  )
}
