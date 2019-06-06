import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EspacosService } from '../espacos.service';
import {
  EspacosActionsTypes,
  LoadEspacosAction,
  LoadEspacosSuccessAction,
  LoadEspacosFailAction
} from './espacos.actions';

@Injectable({
  providedIn: 'root'
})
export class EspacosEffects {
  @Effect()
  loadEspacos$ = this.actions$.pipe(
    ofType<LoadEspacosAction>(EspacosActionsTypes.LOAD_ESPACOS),
    switchMap(action =>
      this.espacosService.getAll().pipe(
        map(espacos => new LoadEspacosSuccessAction(espacos)),
        catchError(error => of(new LoadEspacosFailAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private espacosService: EspacosService
  ) {}
}
