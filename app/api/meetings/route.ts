import { NextRequest, NextResponse } from 'next/server';

import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;
  const date = searchParams.get('date');

  const meetings = await getMeetings(
    query,
    page,
    date
  );

  return NextResponse.json(meetings);
}