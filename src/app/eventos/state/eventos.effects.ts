import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EventosService } from '../eventos.service';
import {
  EventosActionsTypes,
  SearchEventosAction,
  SearchEventosSuccessAction,
  SearchEventosFailAction
} from './eventos.actions';

@Injectable({
  providedIn: 'root'
})
export class EventosEffects {
  @Effect()
  search$ = this.actions$.pipe(
    ofType<SearchEventosAction>(EventosActionsTypes.SEARCH),
    switchMap(action =>
      this.eventosService.search(action.query).pipe(
        map(eventos => new SearchEventosSuccessAction(eventos)),
        catchError(message => of(new SearchEventosFailAction(message)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventosService: EventosService
  ) {}
}
