'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Sun,
  Phone,
  Users,
  History,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Create Call', href: '/dashboard/create-call', icon: Phone },
  { name: 'Batch Calls', href: '/dashboard/batch-calls', icon: Users },
  { name: 'Call History', href: '/dashboard/history', icon: History },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Sun className="h-6 w-6 text-amber-500" />
        <span className="font-semibold">SolarVoice AI</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
