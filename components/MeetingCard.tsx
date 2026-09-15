import Link from 'next/link';

import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-700">
            {meeting.meetingType.charAt(0).toUpperCase() +
              meeting.meetingType.slice(1)}{' '}
            Meeting
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {meeting.date}
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          {meeting.stakeBusiness
            ? 'Stake Business'
            : 'Ward Meeting'}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">
            Presiding:
          </span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-semibold text-slate-800">
            Conducting:
          </span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-semibold text-slate-800">
            Opening Hymn:
          </span>{' '}
          #{meeting.openingHymn.number} —{' '}
          {meeting.openingHymn.title}
        </p>
      </div>

      <div className="mt-6">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white hover:bg-violet-800"
        >
          View Meeting
        </Link>
      </div>
    </article>
  );
}