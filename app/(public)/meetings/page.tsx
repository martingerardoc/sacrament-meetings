import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params?.query ?? '';
  const currentPage = Number(params?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          All Meetings
        </h2>

        <p className="mt-2 text-slate-600">
          Browse current and previous meeting programs.
        </p>
      </div>

      <MeetingSearch />

      {meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-600">
          No meetings found.
        </p>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}