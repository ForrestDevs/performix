import { PerformixLogoClear } from '@/components/logo'
import Link from 'next/link'
import { MobileMenu } from './mobile-menu'

export default function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <PerformixLogoClear />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/mentors" className="text-gray-600 hover:text-[#0891B2] transition-colors">
              Mentors
            </Link>
            <Link
              href="/resources"
              className="text-gray-600 hover:text-[#0891B2] transition-colors"
            >
              Resources
            </Link>
            <Link href="/plans" className="text-gray-600 hover:text-[#0891B2] transition-colors">
              Plans
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
