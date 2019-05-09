export type Kind = 'calendar#event' | 'calendar#events';

export type CalendarEventStatus = 'confirmed';

export type AccessRole = 'reader';

export interface CalendarEvent {
  kind: Kind;
  etag: string;
  id: string;
  status: CalendarEventStatus;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  creator: { email: string };
  organizer: { email: string; displayName: string; self: boolean };
  start: { dateTime: string };
  end: { dateTime: string };
  iCalUID: string;
  sequence: number;
  extendedProperties: any;
}

export interface Calendar {
  calendarId: string;
  kind: Kind;
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: AccessRole;
  defaultReminders: any[];
  nextSyncToken: string;
  items: CalendarEvent[];
}
