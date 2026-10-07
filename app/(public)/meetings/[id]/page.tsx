import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return {
      title: 'Meeting Not Found',
      description: 'The requested sacrament meeting could not be found.',
    };
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return {
      title: 'Meeting Not Found',
      description: 'The requested sacrament meeting could not be found.',
    };
  }

  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date(`${meeting.date}T00:00:00`));

  const title = `Sacrament Meeting - ${date}`;

  const description =
    `Sacrament meeting program for ${date}. ` +
    `Presiding: ${meeting.presiding}. ` +
    `Conducting: ${meeting.conducting}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function MeetingPage({
    params,
}: MeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId)) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}
