import * as moment from 'moment';
import { CalendarsActions, CalendarsActionsTypes } from './calendars.actions';
import {
  initialState,
  CalendarsState,
  calendarsAdapter
} from './calendars.state';
import { generateNextStartDate } from '@app/utils/functions';
import { Calendar } from '../calendar.types';

export function calendarsReducer(
  state = initialState,
  action: CalendarsActions
): CalendarsState {
  switch (action.type) {
    case CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE:
      return {
        ...state,
        loading: true,
        currentStartDate: moment(action.startDate).toISOString()
      };

    case CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE_SUCCESS:
      return calendarsAdapter.addAll(action.calendars, {
        ...state,
        loading: false
      });

    case CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE_FAIL:
      return {
        ...state,
        loading: false
      };

    case CalendarsActionsTypes.LOAD_MORE_CALENDARS:
      return {
        ...state,
        currentStartDate: generateNextStartDate(state.currentStartDate),
        loadingMore: true
      };

    case CalendarsActionsTypes.LOAD_MORE_CALENDARS_SUCCESS:
      return {
        ...state,
        entities: action.calendars.reduce((prev, calendar) => {
          return {
            ...prev,
            [calendar.calendarId]: {
              ...state.entities[calendar.calendarId],
              items: [
                ...state.entities[calendar.calendarId].items,
                ...calendar.items
              ]
            }
          };
        }, state.entities),
        loadingMore: false
      };

    case CalendarsActionsTypes.LOAD_MORE_CALENDARS_FAIL:
      return {
        ...state,
        loadingMore: false
      };

    case CalendarsActionsTypes.REFRESH_CALENDARS:
      return calendarsAdapter.addAll(
        action.filtro.espacos.map(
          calendarId => ({ calendarId, items: [] } as Calendar)
        ),
        {
          ...state,
          currentStartDate: action.filtro.data_inicial
        }
      );

    default:
      return state;
  }
}
