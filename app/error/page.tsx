'use client'

import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const errorMessages: Record<string, string> = {
  Configuration: 'There was a server configuration error.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The token has expired or is invalid.',
  Default: 'Something went wrong during authentication.',
  OAuthSignin: 'Error constructing OAuth authorization URL.',
  OAuthCallback: 'Error processing OAuth provider response.',
  OAuthCreateAccount: 'Could not create OAuth provider user in database.',
  EmailCreateAccount: 'Could not create email provider user in database.',
  Callback: 'Error in the OAuth callback handler route.',
  OAuthAccountNotLinked: 'This email is already associated with another account.',
  EmailSignin: 'Failed to send verification email.',
  CredentialsSignin: 'Sign in failed. Check your credentials and try again.',
  SessionRequired: 'Please sign in to access this page.',
}

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md rounded-lg border-none bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700">
        <div className="flex items-center justify-center">
          <AlertCircle className="h-12 w-12 text-red-400" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-100">
          Authentication Error
        </h2>
        <div className="mt-4 space-y-4">
          <p className="text-center text-gray-300">
            {error
              ? errorMessages[error] || errorMessages.Default
              : 'An unknown error occurred.'}
          </p>

          <div className="flex flex-col gap-2">
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              onClick={() => window.location.assign('/signin')}
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Return to Sign In
              </div>
            </button>

            <button
              className="w-full rounded-md border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4" />
                Try Again
              </div>
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-gray-700 p-3 text-center">
              <p className="text-sm text-gray-400">Error code: {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}