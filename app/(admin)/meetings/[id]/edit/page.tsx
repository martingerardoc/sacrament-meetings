import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from './edit-meeting-form';

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (Number.isNaN(meetingId)) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                    Edit Meeting
                </h2>

                <p className="mt-2 text-slate-600">
                    Update the information for this sacrament meeting.
                </p>
            </div>

            <EditMeetingForm meeting={meeting} />
        </div>
    );
}