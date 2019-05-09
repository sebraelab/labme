import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Calendar, CalendarEvent } from '../calendar.types';

export interface CalendarsState extends EntityState<Calendar> {
  loading: boolean;
  currentStartDate: string;
}

export const calendarsAdapter: EntityAdapter<Calendar> = createEntityAdapter<
  Calendar
>({
  selectId: state => state.calendarId
});

export const initialState: CalendarsState = calendarsAdapter.getInitialState({
  ids: [
    'ikc1o4rhld3ct31t3fakps0et8@group.calendar.google.com',
    '54ela9729018idmddcse06ua8s@group.calendar.google.com',
    '1olon5hik9hb8nbb38u2cunolg@group.calendar.google.com',
    'pnigeguu21lnfimambh78efu90@group.calendar.google.com',
    '7rm846f3m1g5eqaf3r24ufv538@group.calendar.google.com',
    '3vqabbtk3pbcl20oph1h7vmupc@group.calendar.google.com',
    'tl71k1baadlege5qiv4mvdtb30@group.calendar.google.com',
    'ogjvprvjudma7dicvqm0oj13ds@group.calendar.google.com',
    'jjidbfu6he1nnq7udt0uj23vfg@group.calendar.google.com'
  ],
  entities: {
    'ikc1o4rhld3ct31t3fakps0et8@group.calendar.google.com': { items: [] },
    '54ela9729018idmddcse06ua8s@group.calendar.google.com': { items: [] },
    '1olon5hik9hb8nbb38u2cunolg@group.calendar.google.com': { items: [] },
    'pnigeguu21lnfimambh78efu90@group.calendar.google.com': { items: [] },
    '7rm846f3m1g5eqaf3r24ufv538@group.calendar.google.com': { items: [] },
    '3vqabbtk3pbcl20oph1h7vmupc@group.calendar.google.com': { items: [] },
    'tl71k1baadlege5qiv4mvdtb30@group.calendar.google.com': { items: [] },
    'ogjvprvjudma7dicvqm0oj13ds@group.calendar.google.com': { items: [] },
    'jjidbfu6he1nnq7udt0uj23vfg@group.calendar.google.com': { items: [] }
  },
  loading: false,
  currentStartDate: null
});

const { selectAll, selectIds } = calendarsAdapter.getSelectors();

export const selectCalendarsState = createFeatureSelector<CalendarsState>(
  'calendars'
);

export const selectCalendarsAll = createSelector(
  selectCalendarsState,
  selectAll
);

export const selectCalendarsIds = createSelector(
  selectCalendarsState,
  selectIds
);

export const selectCalendarsLoading = createSelector(
  selectCalendarsState,
  state => state.loading
);

export const selectCalendarsEvents = createSelector(
  selectCalendarsAll,
  state =>
    state.reduce(
      (prev, curr) => [...prev, ...curr.items],
      []
    ) as CalendarEvent[]
);

export const selectCalendarsEventsOrdered = createSelector(
  selectCalendarsEvents,
  state =>
    state.sort((a, b) => {
      if (!a.start) {
        return 1;
      }
      if (!b.start) {
        return -1;
      }
      if (a.start.dateTime < b.start.dateTime) {
        return -1;
      } else if (a.start.dateTime > b.start.dateTime) {
        return 1;
      }
      return 0;
    })
);

export const selectCalendarsEventsGroupedByStart = createSelector(
  selectCalendarsEvents,
  state => {
    return <{ [key: string]: CalendarEvent }>state.reduce(
      (prev, calendarEvent) => {
        if (calendarEvent.start) {
          let key = calendarEvent.start.dateTime.slice(0, 10);
          return {
            ...prev,
            [key]: [...(prev[key] ? prev[key] : []), calendarEvent]
          };
        }
        return prev;
      },
      {}
    );
  }
);

export const selectCalendarsCurrentStartDate = createSelector(
  selectCalendarsState,
  state => state.currentStartDate
);

export const selectCalendarsEventsGroupedByStartOrdered = createSelector(
  selectCalendarsEventsGroupedByStart,
  state =>
    Object.entries(state).sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      } else if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    })
);
