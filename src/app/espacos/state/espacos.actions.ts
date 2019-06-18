import { Action } from '@ngrx/store';
import { Espaco } from '../espacos.types';

export enum EspacosActionsTypes {
  LOAD_ESPACOS = '[espacos] load espacos',
  LOAD_ESPACOS_SUCCESS = '[espacos] load espacos success',
  LOAD_ESPACOS_FAIL = '[espacos] load espacos fail'
}

export class LoadEspacosAction implements Action {
  readonly type = EspacosActionsTypes.LOAD_ESPACOS;

  constructor() {}
}

export class LoadEspacosSuccessAction implements Action {
  readonly type = EspacosActionsTypes.LOAD_ESPACOS_SUCCESS;

  constructor(public espacos: Espaco[]) {}
}

export class LoadEspacosFailAction implements Action {
  readonly type = EspacosActionsTypes.LOAD_ESPACOS_FAIL;

  constructor(public mensage: string) {}
}

export type EspacosActions =
  | LoadEspacosAction
  | LoadEspacosSuccessAction
  | LoadEspacosFailAction;
