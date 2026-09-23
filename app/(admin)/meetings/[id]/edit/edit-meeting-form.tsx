'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {
    updateMeeting,
    type MeetingFormState,
} from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface EditMeetingFormProps {
    meeting: SacramentMeeting;
}

const initialState: MeetingFormState = {
    message: '',
};

function FieldError({
    id,
    errors,
}: {
    id: string;
    errors?: string[];
}) {
    if (!errors?.length) {
        return null;
    }

    return (
        <p
            id={id}
            className="mt-1 text-sm text-red-600"
            aria-live="polite"
        >
            {errors[0]}
        </p>
    );
}

export default function EditMeetingForm({
    meeting,
}: EditMeetingFormProps) {
    const updateMeetingWithId = updateMeeting.bind(
        null,
        meeting.id
    );

    const [state, formAction, pending] = useActionState(
        updateMeetingWithId,
        initialState
    );

    const announcements = meeting.announcements?.join('\n') ?? '';

    const wardBusiness =
        meeting.wardBusiness
            ?.map((item) => item.description)
            .join('\n') ?? '';

    const speakers = JSON.stringify(
        meeting.speakers ?? [],
        null,
        2
    );

    return (
        <form
            action={formAction}
            className="space-y-8"
        >
            {state.message && (
                <div
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    aria-live="polite"
                >
                    {state.message}
                </div>
            )}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Meeting Information
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Date
                        </label>

                        <input
                            id="date"
                            name="date"
                            type="date"
                            defaultValue={meeting.date}
                            required
                            aria-describedby={
                                state.errors?.date
                                    ? 'date-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="date-error"
                            errors={state.errors?.date}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="meetingType"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Meeting Type
                        </label>

                        <select
                            id="meetingType"
                            name="meetingType"
                            defaultValue={meeting.meetingType}
                            required
                            aria-describedby={
                                state.errors?.meetingType
                                    ? 'meetingType-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        >
                            <option value="regular">
                                Regular
                            </option>
                            <option value="testimony">
                                Testimony
                            </option>
                            <option value="stake">
                                Stake
                            </option>
                            <option value="general">
                                General
                            </option>
                            <option value="special">
                                Special
                            </option>
                        </select>

                        <FieldError
                            id="meetingType-error"
                            errors={state.errors?.meetingType}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="presiding"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Presiding
                        </label>

                        <input
                            id="presiding"
                            name="presiding"
                            type="text"
                            defaultValue={meeting.presiding}
                            required
                            aria-describedby={
                                state.errors?.presiding
                                    ? 'presiding-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="presiding-error"
                            errors={state.errors?.presiding}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="conducting"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Conducting
                        </label>

                        <input
                            id="conducting"
                            name="conducting"
                            type="text"
                            defaultValue={meeting.conducting}
                            required
                            aria-describedby={
                                state.errors?.conducting
                                    ? 'conducting-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="conducting-error"
                            errors={state.errors?.conducting}
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Opening
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="openingHymnNumber"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Opening Hymn Number
                        </label>

                        <input
                            id="openingHymnNumber"
                            name="openingHymnNumber"
                            type="number"
                            min="1"
                            defaultValue={meeting.openingHymn.number}
                            required
                            aria-describedby={
                                state.errors?.openingHymnNumber
                                    ? 'openingHymnNumber-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="openingHymnNumber-error"
                            errors={state.errors?.openingHymnNumber}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="openingHymnTitle"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Opening Hymn Title
                        </label>

                        <input
                            id="openingHymnTitle"
                            name="openingHymnTitle"
                            type="text"
                            defaultValue={meeting.openingHymn.title}
                            required
                            aria-describedby={
                                state.errors?.openingHymnTitle
                                    ? 'openingHymnTitle-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="openingHymnTitle-error"
                            errors={state.errors?.openingHymnTitle}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="openingPrayer"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Opening Prayer
                        </label>

                        <input
                            id="openingPrayer"
                            name="openingPrayer"
                            type="text"
                            defaultValue={meeting.openingPrayer}
                            required
                            aria-describedby={
                                state.errors?.openingPrayer
                                    ? 'openingPrayer-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="openingPrayer-error"
                            errors={state.errors?.openingPrayer}
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Announcements and Ward Business
                </h3>

                <div className="mt-6 space-y-6">
                    <div>
                        <label
                            htmlFor="announcements"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Announcements
                        </label>

                        <textarea
                            id="announcements"
                            name="announcements"
                            rows={4}
                            defaultValue={announcements}
                            placeholder="One announcement per line"
                            aria-describedby={
                                state.errors?.announcements
                                    ? 'announcements-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="announcements-error"
                            errors={state.errors?.announcements}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="wardBusiness"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Ward Business
                        </label>

                        <textarea
                            id="wardBusiness"
                            name="wardBusiness"
                            rows={4}
                            defaultValue={wardBusiness}
                            placeholder="One item per line"
                            aria-describedby={
                                state.errors?.wardBusiness
                                    ? 'wardBusiness-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="wardBusiness-error"
                            errors={state.errors?.wardBusiness}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="stakeBusiness"
                            name="stakeBusiness"
                            type="checkbox"
                            defaultChecked={meeting.stakeBusiness}
                            className="h-4 w-4 rounded border-slate-300"
                        />

                        <label
                            htmlFor="stakeBusiness"
                            className="text-sm font-medium text-slate-700"
                        >
                            Include stake business
                        </label>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Sacrament
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="sacramentHymnNumber"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Sacrament Hymn Number
                        </label>

                        <input
                            id="sacramentHymnNumber"
                            name="sacramentHymnNumber"
                            type="number"
                            min="1"
                            defaultValue={meeting.sacramentHymn.number}
                            required
                            aria-describedby={
                                state.errors?.sacramentHymnNumber
                                    ? 'sacramentHymnNumber-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="sacramentHymnNumber-error"
                            errors={state.errors?.sacramentHymnNumber}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="sacramentHymnTitle"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Sacrament Hymn Title
                        </label>

                        <input
                            id="sacramentHymnTitle"
                            name="sacramentHymnTitle"
                            type="text"
                            defaultValue={meeting.sacramentHymn.title}
                            required
                            aria-describedby={
                                state.errors?.sacramentHymnTitle
                                    ? 'sacramentHymnTitle-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="sacramentHymnTitle-error"
                            errors={state.errors?.sacramentHymnTitle}
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Speakers
                </h3>

                <div className="mt-6">
                    <label
                        htmlFor="speakers"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Speakers JSON
                    </label>

                    <textarea
                        id="speakers"
                        name="speakers"
                        rows={7}
                        defaultValue={speakers}
                        placeholder={`[
  {
    "name": "John Smith",
    "topic": "Faith",
    "type": "speaker"
  }
]`}
                        aria-describedby={
                            state.errors?.speakers
                                ? 'speakers-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
                    />

                    <p className="mt-1 text-xs text-slate-500">
                        Use an empty value if there are no speakers.
                    </p>

                    <FieldError
                        id="speakers-error"
                        errors={state.errors?.speakers}
                    />
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Closing
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="closingHymnNumber"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Closing Hymn Number
                        </label>

                        <input
                            id="closingHymnNumber"
                            name="closingHymnNumber"
                            type="number"
                            min="1"
                            defaultValue={meeting.closingHymn.number}
                            required
                            aria-describedby={
                                state.errors?.closingHymnNumber
                                    ? 'closingHymnNumber-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="closingHymnNumber-error"
                            errors={state.errors?.closingHymnNumber}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="closingHymnTitle"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Closing Hymn Title
                        </label>

                        <input
                            id="closingHymnTitle"
                            name="closingHymnTitle"
                            type="text"
                            defaultValue={meeting.closingHymn.title}
                            required
                            aria-describedby={
                                state.errors?.closingHymnTitle
                                    ? 'closingHymnTitle-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="closingHymnTitle-error"
                            errors={state.errors?.closingHymnTitle}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="closingPrayer"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Closing Prayer
                        </label>

                        <input
                            id="closingPrayer"
                            name="closingPrayer"
                            type="text"
                            defaultValue={meeting.closingPrayer}
                            required
                            aria-describedby={
                                state.errors?.closingPrayer
                                    ? 'closingPrayer-error'
                                    : undefined
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <FieldError
                            id="closingPrayer-error"
                            errors={state.errors?.closingPrayer}
                        />
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                    href="/meetings"
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-violet-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {pending ? 'Updating...' : 'Update Meeting'}
                </button>
            </div>
        </form>
    );
}