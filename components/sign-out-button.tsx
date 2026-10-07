import { signOut } from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';

        await signOut({
          redirectTo: '/',
        });
      }}
    >
      <button
        type="submit"
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-violet-900 hover:bg-violet-100"
      >
        Sign Out
      </button>
    </form>
  );
}