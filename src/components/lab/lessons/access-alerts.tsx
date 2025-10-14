import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Lock } from 'lucide-react'
import Link from 'next/link'

export type AccessState =
  | 'previewLoggedIn'
  | 'previewLoggedOut'
  | 'paidLoggedInHasAccess'
  | 'paidLoggedInNoAccess'
  | 'paidLoggedOut'

interface AccessAlertProps {
  state: AccessState
}

export function AccessAlerts(props: AccessAlertProps) {
  const { state } = props

  switch (state) {
    case 'previewLoggedIn':
      return (
        <Alert variant="default">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>You have access to this lesson.</AlertDescription>
        </Alert>
      )
    case 'previewLoggedOut':
      return (
        <Alert variant="default">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>
            Create a free account to access this lesson.
            <Link href="/get-started" className="ml-1 underline">
              Get started
            </Link>
          </AlertDescription>
        </Alert>
      )
    case 'paidLoggedInHasAccess':
      return (
        <Alert variant="default">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>You have access to this lesson.</AlertDescription>
        </Alert>
      )
    case 'paidLoggedInNoAccess':
      return (
        <Alert variant="default">
          <Lock className="h-4 w-4 text-red-500" />
          <AlertDescription>
            This lesson requires a premium subscription.
            <Link href="/plans" className="ml-1 underline">
              View plans
            </Link>
          </AlertDescription>
        </Alert>
      )
    case 'paidLoggedOut':
      return (
        <Alert variant="default">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            This lesson requires a premium subscription. You can get started with a free account.
            <Link href="/get-started" className="ml-1 underline">
              Get started
            </Link>
          </AlertDescription>
        </Alert>
      )
    default:
      return null
  }
}
