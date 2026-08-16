'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, Wrench, Briefcase, Calendar, MessageSquare, Settings, LogOut, Menu, X, Bell } from 'lucide-react'
import adminApi from '@/lib/api'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/mojib-cms-x9/dashboard', icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/mojib-cms-x9/projects',  icon: FolderOpen,      label: 'Projects'   },
  { href: '/mojib-cms-x9/skills',    icon: Wrench,          label: 'Skills'     },
  { href: '/mojib-cms-x9/services',  icon: Briefcase,       label: 'Services'   },
  { href: '/mojib-cms-x9/experience',icon: Calendar,        label: 'Experience' },
  { href: '/mojib-cms-x9/messages',  icon: MessageSquare,   label: 'Messages'   },
  { href: '/mojib-cms-x9/settings',  icon: Settings,        label: 'Settings'   },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [user, setUser]   = useState<{ name:string; email:string } | null>(null)
  const [open, setOpen]   = useState(false)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { router.replace('/mojib-cms-x9'); return }
    const u = localStorage.getItem('admin_user')
    if (u) setUser(JSON.parse(u))
    // Fetch unread count
    adminApi.get('/admin/dashboard/stats').then(r => setUnread(r.data.data.unread || 0)).catch(() => {})
  }, [router])

  const logout = async () => {
    try { await adminApi.post('/admin/logout') } catch {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    toast.success('Logged out successfully.')
    router.replace('/mojib-cms-x9')
  }

  if (!user) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-white font-bold text-sm">MM</div>
            <div>
              <p className="font-space font-bold text-sm text-fg leading-none">Admin CMS</p>
              <p className="text-xs text-muted">Mohammed Mojib</p>
            </div>
          </div>
          <button className="lg:hidden text-muted hover:text-fg" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`sidebar-link ${pathname === item.href || pathname.startsWith(item.href + '/') ? 'active' : ''}`}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
              {item.label === 'Messages' && unread > 0 && (
                <span className="ml-auto badge badge-red">{unread}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple flex items-center justify-center text-xs font-bold text-white">
              {user.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-400/5">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <button className="lg:hidden text-muted hover:text-fg" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <h1 className="font-space font-semibold text-sm text-fg capitalize">
              {navItems.find(n => pathname.startsWith(n.href))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/mojib-cms-x9/messages" className="relative w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted hover:text-fg hover:border-accent/40 transition-colors">
              <Bell size={16} />
              {unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">{unread}</span>}
            </Link>
            <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-3 py-2">
              View Site ↗
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
