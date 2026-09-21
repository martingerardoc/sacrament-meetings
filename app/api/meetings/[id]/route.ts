import { NextResponse } from 'next/server';

import { getMeetingById } from '@/lib/meetings-db';

interface MeetingRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: MeetingRouteProps
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID' },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}
