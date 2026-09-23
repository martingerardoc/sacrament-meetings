'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingDb,
  meetingDateExists,
  updateMeeting as updateMeetingDb,
} from './meetings-db';

const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, 'Date is required.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.'),

  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
    'special',
  ]),

  presiding: z
    .string()
    .trim()
    .min(1, 'Presiding is required.'),

  conducting: z
    .string()
    .trim()
    .min(1, 'Conducting is required.'),

  announcements: z.string().optional(),

  openingHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .positive('Hymn number must be greater than 0.'),

  openingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Opening hymn title is required.'),

  openingPrayer: z
    .string()
    .trim()
    .min(1, 'Opening prayer is required.'),

  wardBusiness: z.string().optional(),

  stakeBusiness: z.boolean(),

  sacramentHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .positive('Hymn number must be greater than 0.'),

  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, 'Sacrament hymn title is required.'),

  speakers: z.string().optional(),

  closingHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .positive('Hymn number must be greater than 0.'),

  closingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Closing hymn title is required.'),

  closingPrayer: z
    .string()
    .trim()
    .min(1, 'Closing prayer is required.'),
});

export type MeetingFormState = {
  message: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string | boolean>;
};

function getString(formData: FormData, field: string): string {
  return String(formData.get(field) ?? '');
}

function getBoolean(formData: FormData, field: string): boolean {
  return formData.get(field) === 'on';
}

function parseLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseJsonArray<T>(value: string, fallback: T[]): T[] {
  if (!value.trim()) {
    return fallback;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function getMeetingData(formData: FormData) {
  const announcements = parseLines(
    getString(formData, 'announcements')
  );

  const wardBusiness = parseLines(
    getString(formData, 'wardBusiness')
  ).map((description) => ({
    description,
  }));

  const speakers = parseJsonArray<{
    name: string;
    topic: string;
    type: 'speaker' | 'musical-number';
  }>(getString(formData, 'speakers'), []);

  return {
    date: getString(formData, 'date'),
    meetingType: getString(formData, 'meetingType'),
    presiding: getString(formData, 'presiding'),
    conducting: getString(formData, 'conducting'),
    announcements: getString(formData, 'announcements'),
    openingHymnNumber: getString(
      formData,
      'openingHymnNumber'
    ),
    openingHymnTitle: getString(
      formData,
      'openingHymnTitle'
    ),
    openingPrayer: getString(formData, 'openingPrayer'),
    wardBusiness: getString(formData, 'wardBusiness'),
    stakeBusiness: getBoolean(formData, 'stakeBusiness'),
    sacramentHymnNumber: getString(
      formData,
      'sacramentHymnNumber'
    ),
    sacramentHymnTitle: getString(
      formData,
      'sacramentHymnTitle'
    ),
    speakers: getString(formData, 'speakers'),
    closingHymnNumber: getString(
      formData,
      'closingHymnNumber'
    ),
    closingHymnTitle: getString(
      formData,
      'closingHymnTitle'
    ),
    closingPrayer: getString(formData, 'closingPrayer'),
    parsedAnnouncements: announcements,
    parsedWardBusiness: wardBusiness,
    parsedSpeakers: speakers,
  };
}

function getValidationData(formData: FormData) {
  const data = getMeetingData(formData);

  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements,
    openingHymnNumber: data.openingHymnNumber,
    openingHymnTitle: data.openingHymnTitle,
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness,
    stakeBusiness: data.stakeBusiness,
    sacramentHymnNumber: data.sacramentHymnNumber,
    sacramentHymnTitle: data.sacramentHymnTitle,
    speakers: data.speakers,
    closingHymnNumber: data.closingHymnNumber,
    closingHymnTitle: data.closingHymnTitle,
    closingPrayer: data.closingPrayer,
  };
}

function getFormValues(formData: FormData) {
  return {
    date: getString(formData, 'date'),
    meetingType: getString(formData, 'meetingType'),
    presiding: getString(formData, 'presiding'),
    conducting: getString(formData, 'conducting'),
    announcements: getString(formData, 'announcements'),
    openingHymnNumber: getString(formData, 'openingHymnNumber'),
    openingHymnTitle: getString(formData, 'openingHymnTitle'),
    openingPrayer: getString(formData, 'openingPrayer'),
    wardBusiness: getString(formData, 'wardBusiness'),
    stakeBusiness: getBoolean(formData, 'stakeBusiness'),
    sacramentHymnNumber: getString(
      formData,
      'sacramentHymnNumber'
    ),
    sacramentHymnTitle: getString(
      formData,
      'sacramentHymnTitle'
    ),
    speakers: getString(formData, 'speakers'),
    closingHymnNumber: getString(
      formData,
      'closingHymnNumber'
    ),
    closingHymnTitle: getString(
      formData,
      'closingHymnTitle'
    ),
    closingPrayer: getString(formData, 'closingPrayer'),
  };
}

function getFormErrorState(
  error: z.ZodError
): MeetingFormState {
  return {
    message: 'Please correct the errors below.',
    errors: error.flatten().fieldErrors,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const rawData = getValidationData(formData);
  const parsed = MeetingFormSchema.safeParse(rawData);

  if (!parsed.success) {
  return {
    ...getFormErrorState(parsed.error),
    values: getFormValues(formData),
  };
}
  const dateExists = await meetingDateExists(parsed.data.date);

if (dateExists) {
  return {
    message: 'Please correct the errors below.',
    errors: {
      date: ['A meeting already exists for this date.'],
    },
    values: getFormValues(formData),
  };
}

  const data = getMeetingData(formData);

  try {
    await addMeeting({
      date: parsed.data.date,
      meetingType: parsed.data.meetingType,
      presiding: parsed.data.presiding,
      conducting: parsed.data.conducting,
      announcements: data.parsedAnnouncements,
      openingHymn: {
        number: parsed.data.openingHymnNumber,
        title: parsed.data.openingHymnTitle,
      },
      openingPrayer: parsed.data.openingPrayer,
      wardBusiness: data.parsedWardBusiness,
      stakeBusiness: parsed.data.stakeBusiness,
      sacramentHymn: {
        number: parsed.data.sacramentHymnNumber,
        title: parsed.data.sacramentHymnTitle,
      },
      speakers: data.parsedSpeakers,
      closingHymn: {
        number: parsed.data.closingHymnNumber,
        title: parsed.data.closingHymnTitle,
      },
      closingPrayer: parsed.data.closingPrayer,
    });
  } catch (error) {
    console.error('Failed to create meeting:', error);

    throw new Error('Unknown database error while creating the meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const rawData = getValidationData(formData);
  const parsed = MeetingFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return getFormErrorState(parsed.error);
  }

  const data = getMeetingData(formData);

  try {
    await updateMeetingDb(id, {
      date: parsed.data.date,
      meetingType: parsed.data.meetingType,
      presiding: parsed.data.presiding,
      conducting: parsed.data.conducting,
      announcements: data.parsedAnnouncements,
      openingHymn: {
        number: parsed.data.openingHymnNumber,
        title: parsed.data.openingHymnTitle,
      },
      openingPrayer: parsed.data.openingPrayer,
      wardBusiness: data.parsedWardBusiness,
      stakeBusiness: parsed.data.stakeBusiness,
      sacramentHymn: {
        number: parsed.data.sacramentHymnNumber,
        title: parsed.data.sacramentHymnTitle,
      },
      speakers: data.parsedSpeakers,
      closingHymn: {
        number: parsed.data.closingHymnNumber,
        title: parsed.data.closingHymnTitle,
      },
      closingPrayer: parsed.data.closingPrayer,
    });
  } catch (error) {
    console.error('Failed to update meeting:', error);

    throw new Error(
      'Something went wrong while updating the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(
  id: number,
): Promise<void> {
  try {
    await deleteMeetingDb(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);

    throw new Error(
      'Something went wrong while deleting the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
}