import type { Access } from 'payload'
import type { FieldAccess } from 'payload'
import { checkRole } from '@/payload/access/checkRole'
import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  if (user) {
    return true
  }
  return false
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const isAdminOrProducer: Access = ({ req: { user } }) => {
  return checkRole('admin', user as User)
}

export const admin: Access = ({ req }) => {
  return checkRole('admin', req.user as User)
}

export const admins: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return checkRole('admin', user as User)
}

export const adminOrCurrentUser: Access = ({ req }) => {
  if (req?.user?.role === 'admin') return true
  return { id: { equals: req.user?.id } }
}

export const anyone: Access = () => true

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (checkRole('admin', user as User)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
