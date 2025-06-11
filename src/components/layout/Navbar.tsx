import Link from 'next/link'
import { UserMenu } from './UserMenu'
import { getCurrentUser } from '@/lib/data/auth'

export async function Navbar() {
  const user = await getCurrentUser()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Perfomix
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/courses"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Browse Courses
              </Link>
              {/* {user?.roles.includes('producer') && (
                <Link
                  href="/producer/courses"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  My Courses
                </Link>
              )}
              {user?.roles.includes('consumer') && (
                <Link
                  href="/my/courses"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  My Learning
                </Link>
              )} */}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
