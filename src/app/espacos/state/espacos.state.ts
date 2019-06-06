import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Espaco } from '../espacos.types';

export interface EspacosState extends EntityState<Espaco> {
  loading: boolean;
}

export const espacosAdapter: EntityAdapter<Espaco> = createEntityAdapter<
  Espaco
>();

export const initialState: EspacosState = espacosAdapter.getInitialState({
  loading: false
});

const { selectAll, selectIds } = espacosAdapter.getSelectors();

export const selectEspacosState = createFeatureSelector<EspacosState>(
  'espacos'
);

export const selectEspacosAll = createSelector(
  selectEspacosState,
  selectAll
);

export const selectEspacosIds = createSelector(
  selectEspacosState,
  selectIds
);

export const selectEspacosLoading = createSelector(
  selectEspacosState,
  state => state.loading
);
