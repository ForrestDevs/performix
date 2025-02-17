import { getCurrentUser } from '@/lib/data/auth'
import { NotificationSettings } from './components/NotificationSettings'
import { ProfileSettings } from './components/ProfileSettings'
import { PaymentSettings } from './components/PaymentSettings'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <ProfileSettings user={user} />
        <NotificationSettings />
        <PaymentSettings />
      </div>
    </div>
  )
}
