'use client'
import { useEffect, useState } from 'react'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'
import { Mail, Trash2, Archive, CheckCheck, Clock, Loader2, Search, Filter } from 'lucide-react'

type Message = { id:number; name:string; email:string; phone:string|null; subject:string|null; message:string; status:string; created_at:string }

const statusColors: Record<string,string> = { unread:'badge-red', read:'badge-blue', replied:'badge-green', archived:'badge-yellow' }

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message|null>(null)
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')

  const load = () => {
    setLoading(true)
    const params: any = {}
    if (filter !== 'all') params.status = filter
    if (search) params.search = search
    adminApi.get('/admin/messages', { params }).then(r => setMessages(r.data.data.data || r.data.data)).finally(() => setLoading(false))
  }
  useEffect(load, [filter])

  const open = async (m: Message) => {
    setSelected(m)
    if (m.status === 'unread') {
      await adminApi.put(`/admin/messages/${m.id}/status`, { status:'read' })
      setMessages(prev => prev.map(x => x.id===m.id ? { ...x, status:'read' } : x))
    }
  }

  const updateStatus = async (id:number, status:string) => {
    await adminApi.put(`/admin/messages/${id}/status`, { status })
    toast.success(`Marked as ${status}`)
    setMessages(prev => prev.map(x => x.id===id ? { ...x, status } : x))
    if (selected?.id===id) setSelected(s => s ? { ...s, status } : null)
  }

  const del = async (id:number) => {
    if (!confirm('Delete this message?')) return
    await adminApi.delete(`/admin/messages/${id}`)
    toast.success('Deleted')
    setMessages(prev => prev.filter(x => x.id!==id))
    if (selected?.id===id) setSelected(null)
  }

  const filters = ['all','unread','read','replied','archived']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-space font-bold text-2xl text-fg">Messages</h2>
        <p className="text-muted text-sm">{messages.filter(m=>m.status==='unread').length} unread messages</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all capitalize ${filter===f ? 'bg-accent/10 text-accent border border-accent/30' : 'border border-border text-muted hover:text-fg'}`}>
            {f}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key==='Enter' && load()}
            placeholder="Search..." className="form-input pl-8 py-2 w-48 text-xs"/>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48"><Loader2 size={22} className="animate-spin text-accent"/></div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-muted text-sm"><Mail size={32} className="mx-auto mb-2 opacity-30"/> No messages.</div>
          ) : (
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {messages.map(m => (
                <div key={m.id} onClick={() => open(m)}
                  className={`p-4 cursor-pointer hover:bg-white/[0.02] transition-colors ${selected?.id===m.id ? 'bg-accent/5 border-l-2 border-accent' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium ${m.status==='unread' ? 'text-fg' : 'text-muted'}`}>{m.name}</p>
                    <span className={`badge ${statusColors[m.status]} flex-shrink-0`}>{m.status}</span>
                  </div>
                  <p className="text-xs text-muted truncate">{m.subject || m.message.slice(0,40)}</p>
                  <p className="text-xs text-muted/50 mt-1">{new Date(m.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-space font-bold text-lg text-fg">{selected.name}</h3>
                  <p className="text-accent text-sm">{selected.email}</p>
                  {selected.phone && <p className="text-muted text-xs">{selected.phone}</p>}
                </div>
                <span className={`badge ${statusColors[selected.status]}`}>{selected.status}</span>
              </div>
              {selected.subject && <div className="border-t border-border pt-4"><p className="text-faint text-xs uppercase tracking-wider mb-1">Subject</p><p className="text-fg font-medium">{selected.subject}</p></div>}
              <div className="border-t border-border pt-4">
                <p className="text-faint text-xs uppercase tracking-wider mb-2">Message</p>
                <p className="text-muted leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="border-t border-border pt-4 flex flex-wrap gap-2">
                <button onClick={() => updateStatus(selected.id,'replied')} className="btn-primary text-xs py-2 px-4"><CheckCheck size={13}/> Mark Replied</button>
                <button onClick={() => updateStatus(selected.id,'archived')} className="btn-outline text-xs py-2 px-4"><Archive size={13}/> Archive</button>
                <button onClick={() => updateStatus(selected.id,'unread')} className="btn-outline text-xs py-2 px-4"><Clock size={13}/> Mark Unread</button>
                <button onClick={() => del(selected.id)} className="btn-danger text-xs py-2 px-4 ml-auto"><Trash2 size={13}/> Delete</button>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl h-64 flex items-center justify-center text-muted text-sm">
              <div className="text-center"><Mail size={32} className="mx-auto mb-2 opacity-20"/> Select a message to read</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
