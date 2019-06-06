import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map, first, switchMap } from 'rxjs/operators';

import { AppState } from '@app/app.state';
import {
  LoadMoreCalendarsAction,
  RefreshCalendarsAction
} from '@app/calendars/state/calendars.actions';
import {
  selectCalendarsEventsGroupedByStartOrdered,
  selectCalendarsLoading
} from '@app/calendars/state/calendars.state';
import { EspacosActionsTypes } from '@app/espacos/state/espacos.actions';
import { selectEspacosIds } from '@app/espacos/state/espacos.state';
import { parseQueryParamsToFiltro } from '@app/utils/functions';
import { Filtro } from '@app/utils/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filtro$: Observable<Filtro>;
  eventsGroupeds$ = this.store.select(
    selectCalendarsEventsGroupedByStartOrdered
  );
  loading$ = this.store.select(selectCalendarsLoading);
  startDate = new Date();

  constructor(
    public route: ActivatedRoute,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.filtro$ = this.route.queryParams.pipe(map(parseQueryParamsToFiltro));

    this.filtro$.subscribe(filtro => {
      if (filtro.espacos.length > 0) {
        this.store.dispatch(new RefreshCalendarsAction(filtro));
      } else {
        this.actions$
          .pipe(
            ofType(EspacosActionsTypes.LOAD_ESPACOS_SUCCESS),
            first(),
            switchMap(() => this.store.select(selectEspacosIds))
          )
          .subscribe(ids => {
            this.store.dispatch(
              new RefreshCalendarsAction({
                ...filtro,
                espacos: ids as string[]
              })
            );
          });
      }
    });
  }

  onLoadMore() {
    this.store.dispatch(new LoadMoreCalendarsAction());
  }
}
