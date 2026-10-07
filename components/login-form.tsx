'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        aria-disabled={isPending}
        disabled={isPending}
        type="submit"
        className="w-full rounded-lg bg-violet-900 px-4 py-2 font-semibold text-white hover:bg-violet-800 disabled:opacity-50"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>

      {errorMessage && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}