import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';

import { Calendar, CalendarEvent } from '../calendar.types';

export interface CalendarsState extends EntityState<Calendar> {
  loading: boolean;
  loadingMore: boolean;
  currentStartDate: string;
}

export const calendarsAdapter: EntityAdapter<Calendar> = createEntityAdapter<
  Calendar
>({
  selectId: state => state.calendarId
});

export const initialState: CalendarsState = calendarsAdapter.getInitialState({
  loading: false,
  loadingMore: false,
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

export const selectCalendarsCurrentStartDate = createSelector(
  selectCalendarsState,
  state => state.currentStartDate
);

export const selectCalendarsLoading = createSelector(
  selectCalendarsState,
  state => state.loading
);

export const selectCalendarsLoadingMore = createSelector(
  selectCalendarsState,
  state => state.loadingMore
);

export const selectCalendarsEvents = createSelector(
  selectCalendarsAll,
  calendars =>
    calendars.reduce(
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
    return state.reduce((prev, calendarEvent) => {
      if (calendarEvent.start) {
        const key = calendarEvent.start.dateTime.slice(0, 10);
        return {
          ...prev,
          [key]: [...(prev[key] ? prev[key] : []), calendarEvent]
        };
      }
      return prev;
    }, {}) as { [key: string]: CalendarEvent };
  }
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
