import MeetingForm from './meeting-form';

export default function NewMeetingPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          New Meeting
        </h2>

        <p className="mt-2 text-slate-600">
          Create a new sacrament meeting.
        </p>
      </div>

      <MeetingForm />
    </div>
  );
}