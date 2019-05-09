import { Injectable } from '@angular/core';
import { of, combineLatest } from 'rxjs';
import { map, switchMap, catchError, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AppState } from '@app/app.state';
import { CalendarsService } from '../calendars.service';
import {
  CalendarsActionsTypes,
  LoadCalendarsByStartDateAction,
  LoadCalendarsByStartDateSuccessAction,
  LoadCalendarsByStartDateFailAction,
  LoadMoreCalendarsAction,
  LoadMoreCalendarsSuccessAction,
  LoadMoreCalendarsFailAction
} from './calendars.actions';
import {
  selectCalendarsIds,
  selectCalendarsCurrentStartDate
} from './calendars.state';

@Injectable({
  providedIn: 'root'
})
export class CalendarsEffects {
  @Effect()
  loadCalendars$ = this.actions$.pipe(
    ofType<LoadCalendarsByStartDateAction>(
      CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE
    ),
    switchMap(action =>
      this.store.select(selectCalendarsIds).pipe(
        first(),
        switchMap(calendarsIds =>
          this.calendarsService
            .getByCalendarIdsStartDate(
              calendarsIds as string[],
              action.startDate
            )
            .pipe(
              map(
                calendars =>
                  new LoadCalendarsByStartDateSuccessAction(calendars)
              ),
              catchError(message =>
                of(new LoadCalendarsByStartDateFailAction(message))
              )
            )
        )
      )
    )
  );

  @Effect()
  loadMoreCalendars$ = this.actions$.pipe(
    ofType<LoadMoreCalendarsAction>(CalendarsActionsTypes.LOAD_MORE_CALENDARS),
    switchMap(action =>
      combineLatest(
        this.store.select(selectCalendarsIds).pipe(first()),
        this.store.select(selectCalendarsCurrentStartDate).pipe(first())
      ).pipe(
        switchMap(([calendarsIds, startDate]) =>
          this.calendarsService
            .getByCalendarIdsStartDate(calendarsIds as string[], startDate)
            .pipe(
              map(calendars => new LoadMoreCalendarsSuccessAction(calendars)),
              catchError(message =>
                of(new LoadMoreCalendarsFailAction(message))
              )
            )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private calendarsService: CalendarsService
  ) {}
}
