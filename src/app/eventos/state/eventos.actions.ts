import { Action } from '@ngrx/store';
import { Evento } from './eventos.types';

export enum EventosActionsTypes {
  SEARCH = '[eventos] load eventos',
  SEARCH_SUCCESS = '[eventos] load eventos success',
  SEARCH_FAIL = '[eventos] load eventos fail'
}

export class SearchEventosAction implements Action {
  readonly type = EventosActionsTypes.SEARCH;

  constructor(
    public query: { data_inicial: any; data_final: any; espaco: string }
  ) {}
}

export class SearchEventosSuccessAction implements Action {
  readonly type = EventosActionsTypes.SEARCH_SUCCESS;

  constructor(public eventos: Evento[]) {}
}

export class SearchEventosFailAction implements Action {
  readonly type = EventosActionsTypes.SEARCH_FAIL;

  constructor(public message: string) {}
}

export type EventosActions =
  | SearchEventosAction
  | SearchEventosSuccessAction
  | SearchEventosFailAction;
