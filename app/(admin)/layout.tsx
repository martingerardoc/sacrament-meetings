import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

          <Link
            href="/meetings"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-violet-900 hover:bg-violet-100"
          >
            View Meetings
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </div>
    </section>
  );
}