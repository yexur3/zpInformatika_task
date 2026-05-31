'use client'

import Link from 'next/link'

const links = [
  { href: '/', label: 'Admin' },
  { href: '/page-one', label: 'Page One' },
  { href: '/page-two', label: 'Page Two' },
  { href: '/page-three', label: 'Page Three' },
]

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
