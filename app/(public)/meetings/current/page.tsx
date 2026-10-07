import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import MeetingDetail from '@/components/MeetingDetail';
import { getCurrentMeeting } from '@/lib/meetings-db';

export const metadata: Metadata = {
  title: 'Current Meeting',
  description:
    'View the current sacrament meeting program, including hymns, prayers, speakers, and other meeting details.',
};

export default async function CurrentMeetingPage() {
  const meeting = await getCurrentMeeting();

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}