import Link from 'next/link';

export default function EditMeetingNotFound() {
    return (
        <div className="mx-auto max-w-2xl py-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
                Meeting Not Found
            </h2>

            <p className="mt-4 text-slate-600">
                The meeting you are trying to edit does not exist.
            </p>

            <Link
                href="/meetings"
                className="mt-8 inline-block rounded-lg bg-violet-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
            >
                Back to Meetings
            </Link>
        </div>
    );
}