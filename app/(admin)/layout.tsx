import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/sign-out-button';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <section>
      <div className="bg-violet-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-200">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Meeting Management
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
          <Link
            href="/meetings"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-violet-900 hover:bg-violet-100"
          >
            View Meetings
          </Link>
           <SignOutButton />
           </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </div>
    </section>
  );
}