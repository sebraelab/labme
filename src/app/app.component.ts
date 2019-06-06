import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map, first } from 'rxjs/operators';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { FilterEventsComponent } from './utils/components/filter-events/filter-events.component';
import { Filtro } from './utils/types';
import { AppState } from './app.state';
import { LoadEspacosAction } from './espacos/state/espacos.actions';
import {
  selectEspacosLoading,
  selectEspacosAll
} from './espacos/state/espacos.state';
import { Actions } from '@ngrx/effects';
import { parseQueryParamsToFiltro } from './utils/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  filtro$: Observable<Filtro>;
  espacosLoading$ = this.store.select(selectEspacosLoading);
  destroyed$ = new Subject();

  constructor(
    public store: Store<AppState>,
    public actions$: Actions,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadEspacosAction());
    this.filtro$ = this.route.queryParams.pipe(map(parseQueryParamsToFiltro));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  onAbrirFiltro() {
    combineLatest(this.filtro$, this.store.select(selectEspacosAll))
      .pipe(first())
      .subscribe(([filtro, espacos]) => {
        this.dialog
          .open(FilterEventsComponent, {
            data: {
              formValue: {
                ...filtro,
                espacos:
                  filtro.espacos.length > 0
                    ? filtro.espacos
                    : espacos.map(espaco => espaco.calendarId)
              },
              espacos
            }
          })
          .afterClosed()
          .subscribe(novoFiltro => {
            if (novoFiltro) {
              this.router.navigate([], {
                queryParams: {
                  data_inicial: moment(novoFiltro.data_inicial).format(
                    'YYYY-MM-DD'
                  ),
                  espacos: novoFiltro.espacos.join(',')
                }
              });
            }
          });
      });
  }
}
