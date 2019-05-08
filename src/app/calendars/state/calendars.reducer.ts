import { CalendarsActions, CalendarsActionsTypes } from './calendars.actions';
import {
  initialState,
  CalendarsState,
  calendarsAdapter
} from './calendars.state';

export function calendarsReducer(
  state = initialState,
  action: CalendarsActions
): CalendarsState {
  switch (action.type) {
    case CalendarsActionsTypes.LOAD_CALENDARS:
      return {
        ...state,
        loading: true
      };

    case CalendarsActionsTypes.LOAD_CALENDARS_SUCCESS:
      return calendarsAdapter.addAll(action.calendars, {
        ...state,
        loading: false
      });

    case CalendarsActionsTypes.LOAD_CALENDARS_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
