import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import { getCurrentMeeting } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  const meeting = await getCurrentMeeting();

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}