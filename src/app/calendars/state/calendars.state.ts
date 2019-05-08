import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Calendar } from '../calendar.types';

export interface CalendarsState extends EntityState<Calendar> {
  loading: boolean;
}

export const calendarsAdapter: EntityAdapter<Calendar> = createEntityAdapter<
  Calendar
>({
  selectId: state => state.calendarId
});

export const initialState: CalendarsState = calendarsAdapter.getInitialState({
  loading: false
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
