import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/app.state';
import {
  selectCalendarsEventsGroupedByStartOrdered,
  selectCalendarsLoading
} from '@app/calendars/state/calendars.state';
import {
  LoadMoreCalendarsAction,
  LoadCalendarsByStartDateAction
} from '@app/calendars/state/calendars.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventsGroupeds$ = this.store.select(
    selectCalendarsEventsGroupedByStartOrdered
  );
  loading$ = this.store.select(selectCalendarsLoading);
  startDate = new Date();

  constructor(private store: Store<AppState>) {
    this.eventsGroupeds$.subscribe(console.log);
  }

  ngOnInit() {
    this.store.dispatch(
      new LoadCalendarsByStartDateAction(this.startDate.toISOString())
    );
  }

  onLoad() {
    this.store.dispatch(new LoadMoreCalendarsAction());
  }
}
