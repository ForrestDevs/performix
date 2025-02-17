'use client'

import { useState } from 'react'

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: {
      newEnrollments: true,
      newReviews: true,
      courseCompletion: true,
      marketingUpdates: false,
    },
    pushNotifications: {
      newEnrollments: true,
      newReviews: true,
      courseCompletion: false,
      marketingUpdates: false,
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      const res = await fetch('/api/users/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!res.ok) {
        throw new Error('Failed to update notification settings')
      }
    } catch (error) {
      console.error('Error updating notification settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Notification Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to be notified about important updates.
        </p>

        <div className="mt-6">
          <div className="divide-y divide-gray-200">
            <div className="pb-4">
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <div className="mt-4 space-y-4">
                {Object.entries(settings.emailNotifications).map(([key, value]) => (
                  <div key={key} className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`email-${key}`}
                        name={`email-${key}`}
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            emailNotifications: {
                              ...prev.emailNotifications,
                              [key]: e.target.checked,
                            },
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`email-${key}`} className="font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
              <div className="mt-4 space-y-4">
                {Object.entries(settings.pushNotifications).map(([key, value]) => (
                  <div key={key} className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`push-${key}`}
                        name={`push-${key}`}
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            pushNotifications: {
                              ...prev.pushNotifications,
                              [key]: e.target.checked,
                            },
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`push-${key}`} className="font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
