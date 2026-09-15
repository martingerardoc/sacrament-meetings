import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-20',
    meetingType: 'regular',
    presiding: 'Bishop Michael Smith',
    conducting: 'Brother Daniel Jones',
    announcements: [
      'Ward temple night is scheduled for September 25.',
      'Youth activity will be held this Saturday.'
    ],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God'
    },
    openingPrayer: 'Sister Williams',
    wardBusiness: [
      {
        description: 'Sustaining of new Primary president'
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering'
    },
    speakers: [
      {
        name: 'Sister Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Youth Choir',
        topic: 'I Am a Child of God',
        type: 'musical-number'
      },
      {
        name: 'Brother Davis',
        topic: 'Following the Savior',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past'
    },
    closingPrayer: 'Brother Johnson'
  },

  {
    id: 2,
    date: '2026-09-13',
    meetingType: 'testimony',
    presiding: 'Bishop Michael Smith',
    conducting: 'Sister Maria Lopez',
    announcements: [
      'Fast Sunday food collection will continue this week.'
    ],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    openingPrayer: 'Brother Wilson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed'
    },
    speakers: [],
    closingHymn: {
      number: 227,
      title: 'There Is Sunshine in My Soul Today'
    },
    closingPrayer: 'Sister Garcia'
  },

  {
    id: 3,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Michael Smith',
    conducting: 'Brother Carlos Perez',
    announcements: [
      'Relief Society activity will be held next Wednesday.'
    ],
    openingHymn: {
      number: 81,
      title: 'Press Forward, Saints'
    },
    openingPrayer: 'Sister Martinez',
    wardBusiness: [
      {
        description: 'Sustaining of new Sunday School teacher'
      }
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 181,
      title: 'Jesus of Nazareth, Savior and King'
    },
    speakers: [
      {
        name: 'Brother Anderson',
        topic: 'Service in the Church',
        type: 'speaker'
      },
      {
        name: 'Sister Taylor',
        topic: 'Strengthening Families',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 152,
      title: 'God Be with You Till We Meet Again'
    },
    closingPrayer: 'Brother Thompson'
  },

  {
    id: 4,
    date: '2026-08-30',
    meetingType: 'stake',
    presiding: 'President Adams',
    conducting: 'President Baker',
    announcements: [
      'Stake conference information will be distributed.'
    ],
    openingHymn: {
      number: 27,
      title: 'Praise to the Man'
    },
    openingPrayer: 'Sister Clark',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 175,
      title: 'O God, the Eternal Father'
    },
    speakers: [
      {
        name: 'President Adams',
        topic: 'Building the Kingdom',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 220,
      title: 'Lord, I Would Follow Thee'
    },
    closingPrayer: 'Brother Miller'
  },

  {
    id: 5,
    date: '2026-08-23',
    meetingType: 'general',
    presiding: 'President Anderson',
    conducting: 'Brother Thomas',
    announcements: [],
    openingHymn: {
      number: 1,
      title: 'The Morning Breaks'
    },
    openingPrayer: 'Sister Evans',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: 'In Humility, Our Savior'
    },
    speakers: [
      {
        name: 'Elder Peterson',
        topic: 'Come Unto Christ',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much'
    },
    closingPrayer: 'Brother Harris'
  }
];

export function getMeetings(
  date?: string | null
): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(
  id: number
): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}