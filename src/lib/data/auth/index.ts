'use server'

import { getPayload } from '@/lib/utilities/getPayload'
import { LoginSchema, RegisterSchema } from '@/lib/validations/auth'
import { User } from '@/payload-types'
import { CUSTOMER_SLUG, USER_SLUG } from '@/payload/collections/constants'
import { headers as getHeaders } from 'next/headers'
import { cookies } from 'next/headers'

export async function login(data: LoginSchema) {
  const payload = await getPayload()
  const { email, password } = data
  let user: User | null = null

  try {
    const result = await payload.login({
      collection: USER_SLUG,
      data: {
        email,
        password,
      },
    })
    user = result.user
    const cookiestore = await cookies()
    cookiestore.set('payload-token', result.token || '')
    console.log('user logged in')
  } catch (error) {
    console.error(error)
    return { message: 'Invalid email or password' }
  }

  return {
    message: 'User logged in',
  }
}

export async function logout() {
  console.log('logout')
  const cookiestore = await cookies()
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `JWT ${cookiestore.get('payload-token')?.value}`,
    },
  })

  const data = await res.json()

  if (data.message) {
    cookiestore.delete('payload-token')
    return {
      message: 'User logged out',
    }
  } else {
    return {
      message: 'User not logged in',
    }
  }
}

export async function register(data: RegisterSchema) {
  const payload = await getPayload()
  const { email, password, name, type, passwordConfirm } = data

  if (password !== passwordConfirm) {
    return { message: 'Passwords do not match' }
  }

  try {
    // create user
    const user = await payload.create({
      collection: USER_SLUG,
      data: {
        name,
        email,
        emailVerified: true,
      },
    })
  } catch (error) {
    console.error(error)
    return { message: 'Invalid email or password or consumer already exists' }
  }

  // login user
  const loginResult = await login({ email, password })
  console.log('loginResult', loginResult)

  return {
    message: 'User created',
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const payload = await getPayload()
  const headers = await getHeaders()

  try {
    const { user } = await payload.auth({ headers })

    if (!user) {
      return null
    }

    return user as User
  } catch (error) {
    console.error('No current user signed in', error)
    return null
  }
}
