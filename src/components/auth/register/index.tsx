'use client'

import React, { useEffect } from 'react'
import { useActionState } from 'react'

import { LOGIN_VIEW } from '@/components/auth'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { registerAction } from '@/components/auth/actions'
import { registerSchema, RegisterSchema } from '@/lib/validations/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { YnsLink } from '@/components/ui/link'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

export default function Register({ setCurrentView }: Props) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerAction, {
    status: 'idle',
    message: '',
  })

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      type: 'producer',
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      ...(state?.fields ?? {}),
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    router.refresh()
  }, [state, router])

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Create an Account</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign up to enjoy an enhanced shopping experience.
      </p>

      <Form {...form}>
        <form className="w-full" action={formAction}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...field}
                        value="consumer"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-gray-700">Consumer</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...field}
                        value="producer"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-gray-700">Producer</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {state.status === 'error' && <p className="text-red-500 text-sm mt-2">{state.issues}</p>}
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            By creating an account, you agree to Perfomix&apos;s{' '}
            <YnsLink href="/content/privacy-policy" className="underline">
              Privacy Policy
            </YnsLink>{' '}
            and{' '}
            <YnsLink href="/content/terms-of-use" className="underline">
              Terms of Use
            </YnsLink>
            .
          </span>
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </Form>

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already have an account?{' '}
        <button onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)} className="underline">
          Sign in
        </button>
        .
      </span>
    </div>
  )
}
