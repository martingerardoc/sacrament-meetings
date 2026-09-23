import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const PAGE_SIZE = 4;

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: SacramentMeeting['meetingType'];
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting['openingHymn'];
  opening_prayer: string;
  ward_business: SacramentMeeting['wardBusiness'] | null;
  stake_business: boolean | null;
  sacrament_hymn: SacramentMeeting['sacramentHymn'];
  speakers: SacramentMeeting['speakers'] | null;
  closing_hymn: SacramentMeeting['closingHymn'];
  closing_prayer: string;
}

function toMeetingRow(row: Record<string, unknown>): MeetingRow {
  return row as unknown as MeetingRow;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business ?? false,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  query = '',
  page = 1,
  date?: string | null
): Promise<SacramentMeeting[]> {
  const offset = (page - 1) * PAGE_SIZE;
  const search = `%${query}%`;

  const rows = date
    ? await sql`
        SELECT
          id,
          date::text AS date,
          meeting_type,
          presiding,
          conducting,
          announcements,
          opening_hymn,
          opening_prayer,
          ward_business,
          stake_business,
          sacrament_hymn,
          speakers,
          closing_hymn,
          closing_prayer
        FROM meetings
        WHERE date = ${date}
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset}
      `
    : await sql`
        SELECT
          id,
          date::text AS date,
          meeting_type,
          presiding,
          conducting,
          announcements,
          opening_hymn,
          opening_prayer,
          ward_business,
          stake_business,
          sacrament_hymn,
          speakers,
          closing_hymn,
          closing_prayer
        FROM meetings
        WHERE
          ${query === ''}
          OR presiding ILIKE ${search}
          OR conducting ILIKE ${search}
          OR meeting_type ILIKE ${search}
          OR EXISTS (
            SELECT 1
            FROM jsonb_array_elements(speakers) AS speaker
            WHERE speaker->>'name' ILIKE ${search}
          )
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset}
      `;

  return rows.map(toMeetingRow).map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query = ''
): Promise<number> {
  const search = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      ${query === ''}
      OR presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(speakers) AS speaker
        WHERE speaker->>'name' ILIKE ${search}
      )
  `;

  const total = rows[0]?.count ?? 0;

  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(toMeetingRow(rows[0]));
}
export async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE date <= CURRENT_DATE
    ORDER BY date DESC
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(toMeetingRow(rows[0]));
}

// Week 04 — forms will wire these functions to the database.

export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)},
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)},
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)},
      ${JSON.stringify(meeting.speakers)},
      ${JSON.stringify(meeting.closingHymn)},
      ${meeting.closingPrayer}
    )
    RETURNING
      id,
      date::text AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  return mapMeeting(toMeetingRow(rows[0]));
}

export async function meetingDateExists(
  date: string,
  excludeId?: number
): Promise<boolean> {
  const rows = excludeId
    ? await sql`
        SELECT 1
        FROM meetings
        WHERE date = ${date}
          AND id <> ${excludeId}
        LIMIT 1
      `
    : await sql`
        SELECT 1
        FROM meetings
        WHERE date = ${date}
        LIMIT 1
      `;

  return rows.length > 0;
}

export async function updateMeeting(
  id: number,
  meeting: Partial<Omit<SacramentMeeting, 'id'>>
): Promise<SacramentMeeting> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = COALESCE(${meeting.date ?? null}, date),
      meeting_type = COALESCE(${meeting.meetingType ?? null}, meeting_type),
      presiding = COALESCE(${meeting.presiding ?? null}, presiding),
      conducting = COALESCE(${meeting.conducting ?? null}, conducting),
      announcements = COALESCE(
        ${meeting.announcements ?? null},
  announcements
),
      opening_hymn = COALESCE(
        ${meeting.openingHymn
      ? JSON.stringify(meeting.openingHymn)
      : null},
        opening_hymn
      ),
      opening_prayer = COALESCE(
        ${meeting.openingPrayer ?? null},
        opening_prayer
      ),
      ward_business = COALESCE(
        ${meeting.wardBusiness
      ? JSON.stringify(meeting.wardBusiness)
      : null},
        ward_business
      ),
      stake_business = COALESCE(
        ${meeting.stakeBusiness ?? null},
        stake_business
      ),
      sacrament_hymn = COALESCE(
        ${meeting.sacramentHymn
      ? JSON.stringify(meeting.sacramentHymn)
      : null},
        sacrament_hymn
      ),
      speakers = COALESCE(
        ${meeting.speakers
      ? JSON.stringify(meeting.speakers)
      : null},
        speakers
      ),
      closing_hymn = COALESCE(
        ${meeting.closingHymn
      ? JSON.stringify(meeting.closingHymn)
      : null},
        closing_hymn
      ),
      closing_prayer = COALESCE(
        ${meeting.closingPrayer ?? null},
        closing_prayer
      )
    WHERE id = ${id}
    RETURNING
      id,
      date::text AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  if (rows.length === 0) {
    throw new Error('Meeting not found');
  }

  return mapMeeting(toMeetingRow(rows[0]));
}

export async function deleteMeeting(id: number): Promise<void> {
  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}