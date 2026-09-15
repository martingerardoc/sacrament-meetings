import Link from 'next/link';

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
          San Nicolás Ward
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Sacrament Meeting Planner
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Plan, review, and print sacrament meeting programs
          for current and past Sundays.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/meetings"
            className="rounded-lg bg-violet-700 px-5 py-3 font-semibold text-white hover:bg-violet-800"
          >
            View Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Current Meeting
          </Link>
        </div>
      </div>
    </section>
  );
}
