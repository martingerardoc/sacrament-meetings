import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-700">
          {meeting.meetingType} meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          {meeting.date}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Presiding
            </p>
            <p className="font-semibold text-slate-900">
              {meeting.presiding}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Conducting
            </p>
            <p className="font-semibold text-slate-900">
              {meeting.conducting}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8 space-y-8">
        {meeting.announcements &&
          meeting.announcements.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Announcements
              </h2>

              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">
                {meeting.announcements.map(
                  (announcement) => (
                    <li key={announcement}>
                      {announcement}
                    </li>
                  )
                )}
              </ul>
            </section>
          )}

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Opening
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Opening Hymn
              </p>

              <p className="text-slate-800">
                #{meeting.openingHymn.number} —{' '}
                {meeting.openingHymn.title}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Opening Prayer
              </p>

              <p className="text-slate-800">
                {meeting.openingPrayer}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Ward Business
          </h2>

          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>
                  {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-500">
              No ward business scheduled.
            </p>
          )}

          <p className="mt-4 text-sm text-slate-600">
            <span className="font-semibold">
              Stake Business:
            </span>{' '}
            {meeting.stakeBusiness ? 'Yes' : 'No'}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Sacrament
          </h2>

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-500">
              Sacrament Hymn
            </p>

            <p className="text-slate-800">
              #{meeting.sacramentHymn.number} —{' '}
              {meeting.sacramentHymn.title}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Speakers and Musical Numbers
          </h2>

          {meeting.speakers.length > 0 ? (
            <div className="mt-4 space-y-4">
              {meeting.speakers.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-violet-700">
                    {item.type === 'speaker'
                      ? 'Speaker'
                      : 'Musical Number'}
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {item.name}
                  </p>

                  {item.topic && (
                    <p className="mt-1 text-slate-600">
                      {item.topic}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-slate-500">
              No speakers or musical numbers scheduled.
            </p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Closing
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Closing Hymn
              </p>

              <p className="text-slate-800">
                #{meeting.closingHymn.number} —{' '}
                {meeting.closingHymn.title}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Closing Prayer
              </p>

              <p className="text-slate-800">
                {meeting.closingPrayer}
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}