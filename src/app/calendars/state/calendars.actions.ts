import { Action } from '@ngrx/store';
import { Filtro } from '@app/utils/types';
import { Calendar } from '../calendar.types';

export enum CalendarsActionsTypes {
  LOAD_CALENDARS_BY_START_DATE = '[calendars] load calendars by start date',
  LOAD_CALENDARS_BY_START_DATE_SUCCESS = '[calendars] load calendars by start date success',
  LOAD_CALENDARS_BY_START_DATE_FAIL = '[calendars] load calendars by start date fail',
  LOAD_MORE_CALENDARS = '[calendars] load more calendars',
  LOAD_MORE_CALENDARS_SUCCESS = '[calendars] load more calendars success',
  LOAD_MORE_CALENDARS_FAIL = '[calendars] load more calendars fail',
  REFRESH_CALENDARS = '[calendars] refresh calendars',
}

export class LoadCalendarsByStartDateAction implements Action {
  readonly type = CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE;

  constructor(public startDate: string) {}
}

export class LoadCalendarsByStartDateSuccessAction implements Action {
  readonly type = CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE_SUCCESS;

  constructor(public calendars: Calendar[]) {}
}

export class LoadCalendarsByStartDateFailAction implements Action {
  readonly type = CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE_FAIL;

  constructor(public mensage: string) {}
}

export class LoadMoreCalendarsAction implements Action {
  readonly type = CalendarsActionsTypes.LOAD_MORE_CALENDARS;
}

export class LoadMoreCalendarsSuccessAction implements Action {
  readonly type = CalendarsActionsTypes.LOAD_MORE_CALENDARS_SUCCESS;

  constructor(public calendars: Calendar[]) {}
}

export class LoadMoreCalendarsFailAction implements Action {
  readonly type = CalendarsActionsTypes.LOAD_MORE_CALENDARS_FAIL;

  constructor(public mensage: string) {}
}

export class RefreshCalendarsAction implements Action {
  readonly type = CalendarsActionsTypes.REFRESH_CALENDARS;

  constructor(public filtro: Filtro) {}
}

export type CalendarsActions =
  | LoadCalendarsByStartDateAction
  | LoadCalendarsByStartDateSuccessAction
  | LoadCalendarsByStartDateFailAction
  | LoadMoreCalendarsAction
  | LoadMoreCalendarsSuccessAction
  | LoadMoreCalendarsFailAction
  | RefreshCalendarsAction;
