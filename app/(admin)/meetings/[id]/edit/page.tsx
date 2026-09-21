interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900">
        Edit Meeting
      </h2>

      <p className="mt-2 text-slate-600">
        Editing meeting #{id} will be implemented in Week 04.
      </p>
    </div>
  );
}