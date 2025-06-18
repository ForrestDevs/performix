'use server'

import { getPayload } from '@/lib/utilities/getPayload'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

const payload = await getPayload()

export async function signInAction(email: string, password: string) {
  try {
    const result = await payload.betterAuth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })

    revalidatePath('/')
    return { success: true, user: result.user }
  } catch (error: any) {
    console.error('Sign in error:', error)
    return { error: error.message || 'Failed to sign in. Please try again.' }
  }
}

export async function signUpAction(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  try {
    const result = await payload.betterAuth.api.signUpEmail({
      body: {
        email,
        password,
        name: `${firstName} ${lastName}`,
      },
      headers: await headers(),
    })

    return {
      success: true,
      user: Number(result.user.id),
      message: 'Account created! Please check your email to verify your account.',
    }
  } catch (error: any) {
    console.error('Sign up error:', error)
    return { error: error.message || 'Failed to create account. Please try again.' }
  }
}

export async function signOutAction() {
  try {
    await payload.betterAuth.api.signOut({
      headers: await headers(),
    })

    revalidatePath('/')
    redirect('/')
  } catch (error: any) {
    console.error('Sign out error:', error)
    return { error: error.message || 'Failed to sign out. Please try again.' }
  }
}

export async function verifyEmailAction(token: string) {
  try {
    const result = await payload.betterAuth.api.verifyEmail({
      query: { token },
      headers: await headers(),
    })

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    console.error('Email verification error:', error)
    return { error: error.message || 'Failed to verify email. Please try again.' }
  }
}

export async function getUserSessionAction() {
  try {
    const session = await payload.betterAuth.api.getSession({
      headers: await headers(),
    })

    return session?.user || null
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}

export async function forgotPasswordAction(email: string) {
  try {
    await payload.betterAuth.api.forgetPassword({
      body: { email },
      headers: await headers(),
    })

    return { success: true, message: 'Password reset email sent.' }
  } catch (error: any) {
    console.error('Forgot password error:', error)
    return { error: error.message || 'Failed to send password reset email. Please try again.' }
  }
}
