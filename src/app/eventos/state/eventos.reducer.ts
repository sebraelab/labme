import { EventosActions, EventosActionsTypes } from './eventos.actions';
import { initialState, EventosState, eventosAdapter } from './eventos.state';

export function eventosReducer(
  state = initialState,
  action: EventosActions
): EventosState {
  switch (action.type) {
    case EventosActionsTypes.SEARCH:
      return {
        ...state,
        searching: true
      };

    case EventosActionsTypes.SEARCH_SUCCESS:
      return eventosAdapter.addAll(action.eventos, {
        ...state,
        searching: false
      });

    case EventosActionsTypes.SEARCH_FAIL:
      return {
        ...state,
        searching: false
      };

    default:
      return state;
  }
}
