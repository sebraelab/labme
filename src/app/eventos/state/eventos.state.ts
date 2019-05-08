import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Evento } from './eventos.types';

export interface EventosState extends EntityState<Evento> {
  searching: boolean;
}

export const eventosAdapter: EntityAdapter<Evento> = createEntityAdapter<
  Evento
>();

export const initialState: EventosState = eventosAdapter.getInitialState({
  searching: false
});

const { selectAll } = eventosAdapter.getSelectors();

export const selectEventosState = createFeatureSelector<EventosState>(
  'eventos'
);

export const selectEventosAll = createSelector(
  selectEventosState,
  selectAll
);

export const selectEventosSearching = createSelector(
  selectEventosState,
  state => state.searching
);
