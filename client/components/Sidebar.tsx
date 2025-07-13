'use client'
import { useRouter } from 'next/navigation'
import { HomeIcon, TableCellsIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const nav = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Products', href: '/products', icon: TableCellsIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
]

export default function Sidebar() {
  const router = useRouter()
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6 text-2xl font-bold">myjobb Dashboard</div>
      <nav>
        {nav.map(item => (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className="flex items-center w-full px-6 py-3 hover:bg-gray-100"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}
