// components/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({ callbackUrl: '/signin' })
      }
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
    >
      Sign Out
    </button>
  );
}
