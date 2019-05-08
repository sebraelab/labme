import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AppState } from '@app/app.state';
import { CalendarsService } from '../calendars.service';
import {
  CalendarsActionsTypes,
  LoadCalendarsByStartDateAction,
  LoadCalendarsByStartDateSuccessAction,
  LoadCalendarsByStartDateFailAction
} from './calendars.actions';
import { selectCalendarsIds } from './calendars.state';

@Injectable({
  providedIn: 'root'
})
export class CalendarsEffects {
  @Effect()
  loadCalendars$ = this.actions$.pipe(
    ofType<LoadCalendarsByStartDateAction>(
      CalendarsActionsTypes.LOAD_CALENDARS_BY_START_DATE
    ),
    switchMap(action => {
      return this.store.select(selectCalendarsIds).pipe(
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
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private calendarsService: CalendarsService
  ) {}
}
