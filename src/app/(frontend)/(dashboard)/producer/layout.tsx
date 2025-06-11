import { redirect } from 'next/navigation'
import { ProducerNav } from './components/ProducerNav'
import { getCurrentUser } from '@/lib/data/auth'

export default async function ProducerLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <ProducerNav />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  )
}
