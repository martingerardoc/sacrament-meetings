import Link from 'next/link';

export default function Header() {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-violet-700"
          >
            Sacrament Meeting Planner
          </Link>

          <p className="mt-1 text-sm text-slate-500">
            San Nicolás Ward
          </p>
        </div>

        <div className="text-sm text-slate-500">
          {currentDate}
        </div>
      </div>
    </header>
  );
}