'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import adminApi from '@/lib/api'
import { FolderOpen, Wrench, Briefcase, MessageSquare, Calendar, TrendingUp, Eye } from 'lucide-react'

type Stats = { projects:number; published:number; drafts:number; skills:number; services:number; experiences:number; messages:number; unread:number }
type Message = { id:number; name:string; email:string; subject:string; status:string; created_at:string }

export default function DashboardPage() {
  const [stats, setStats]    = useState<Stats | null>(null)
  const [msgs, setMsgs]     = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      adminApi.get('/admin/dashboard/stats'),
      adminApi.get('/admin/dashboard/messages'),
    ]).then(([s, m]) => {
      setStats(s.data.data)
      setMsgs(m.data.data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  )

  const cards = [
    { label:'Total Projects', value: stats?.projects,   sub:`${stats?.published} published · ${stats?.drafts} drafts`, icon:FolderOpen, color:'text-blue-400',  href:'/mojib-cms-x9/projects' },
    { label:'Skills',         value: stats?.skills,     sub:'Active technologies',  icon:Wrench,       color:'text-accent',   href:'/mojib-cms-x9/skills'   },
    { label:'Services',       value: stats?.services,   sub:'Offered services',     icon:Briefcase,    color:'text-purple-400', href:'/mojib-cms-x9/services' },
    { label:'Experiences',    value: stats?.experiences, sub:'Timeline entries',    icon:Calendar,     color:'text-green-400', href:'/mojib-cms-x9/experience'},
    { label:'Messages',       value: stats?.messages,   sub:`${stats?.unread} unread`, icon:MessageSquare, color:'text-yellow-400', href:'/mojib-cms-x9/messages' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-space font-bold text-2xl text-fg">Dashboard</h2>
          <p className="text-muted text-sm mt-1">Welcome back — here's your portfolio overview.</p>
        </div>
        <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="btn-outline">
          <Eye size={15} /> Preview Site
        </a>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="stat-card hover:border-accent/30 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <c.icon size={20} className={c.color} />
              <TrendingUp size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className={`font-space font-black text-3xl ${c.color} mb-1`}>{c.value ?? '—'}</div>
            <p className="text-fg font-medium text-sm">{c.label}</p>
            <p className="text-muted text-xs mt-0.5">{c.sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-space font-semibold text-fg">Recent Messages</h3>
          <Link href="/mojib-cms-x9/messages" className="text-accent text-xs hover:underline">View all →</Link>
        </div>
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          {msgs.length === 0 ? (
            <div className="p-8 text-center text-muted text-sm">No messages yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted font-medium text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left p-4 text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Subject</th>
                  <th className="text-left p-4 text-muted font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left p-4 text-muted font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {msgs.map(m => (
                  <tr key={m.id} className="table-row">
                    <td className="p-4">
                      <p className="text-fg font-medium">{m.name}</p>
                      <p className="text-muted text-xs">{m.email}</p>
                    </td>
                    <td className="p-4 text-muted hidden md:table-cell">{m.subject || '—'}</td>
                    <td className="p-4">
                      <span className={`badge ${m.status==='unread'?'badge-red':m.status==='read'?'badge-blue':m.status==='replied'?'badge-green':'badge-yellow'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted text-xs hidden lg:table-cell">
                      {new Date(m.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-space font-semibold text-fg mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/mojib-cms-x9/projects/new" className="btn-primary">+ New Project</Link>
          <Link href="/mojib-cms-x9/skills" className="btn-outline">Manage Skills</Link>
          <Link href="/mojib-cms-x9/settings" className="btn-outline">Site Settings</Link>
          <Link href="/mojib-cms-x9/messages" className="btn-outline">
            Inbox {stats && stats.unread > 0 && <span className="badge badge-red ml-1">{stats.unread}</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}
