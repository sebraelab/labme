import { EspacosActions, EspacosActionsTypes } from './espacos.actions';
import { initialState, EspacosState, espacosAdapter } from './espacos.state';

export function espacosReducer(
  state = initialState,
  action: EspacosActions
): EspacosState {
  switch (action.type) {
    case EspacosActionsTypes.LOAD_ESPACOS:
      return {
        ...state,
        loading: true
      };

    case EspacosActionsTypes.LOAD_ESPACOS_SUCCESS:
      return espacosAdapter.upsertMany(action.espacos, {
        ...state,
        loading: false
      });

    case EspacosActionsTypes.LOAD_ESPACOS_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
