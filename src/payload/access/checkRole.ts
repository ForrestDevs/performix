import type { User } from '@/payload-types'

export const checkRole = (allRoles: User['role'] = 'student', user?: User): boolean => {
  if (user) {
    if (allRoles === user?.role) return true
  }

  return false
}
