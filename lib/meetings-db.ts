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
  throw new Error('addMeeting is not implemented until Week 04');
}

export async function updateMeeting(
  id: number,
  meeting: Partial<Omit<SacramentMeeting, 'id'>>
): Promise<SacramentMeeting> {
  throw new Error('updateMeeting is not implemented until Week 04');
}

export async function deleteMeeting(id: number): Promise<void> {
  throw new Error('deleteMeeting is not implemented until Week 04');
}