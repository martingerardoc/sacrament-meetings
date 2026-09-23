'use client';

import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900">
        Something went wrong
      </h2>

      <p className="mt-4 text-slate-600">
        We could not load the meetings right now. Please try
        again.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}

