'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { User } from '@/payload-types'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/data/auth'

export function UserMenu({ user }: { user: User }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div className="px-4 py-2 text-sm text-gray-700">
                Signed in as <span className="font-medium">{user.email}</span>
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          {user.roles.includes('producer') && (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/producer/courses"
                  className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}
                >
                  My Courses
                </Link>
              )}
            </Menu.Item>
          )}
          {user.roles.includes('consumer') && (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/my/courses"
                  className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}
                >
                  My Learning
                </Link>
              )}
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? 'bg-gray-100' : ''
                } text-gray-700`}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
