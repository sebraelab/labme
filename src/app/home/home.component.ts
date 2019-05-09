import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/app.state';
import {
  selectCalendarsEventsOrdered,
  selectCalendarsEventsGroupedByStart,
  selectCalendarsEventsGroupedByStartOrdered
} from '@app/calendars/state/calendars.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events$ = this.store.select(selectCalendarsEventsOrdered);
  eventsGroupeds$ = this.store.select(selectCalendarsEventsGroupedByStart);
  eventsGroups$ = this.store.select(selectCalendarsEventsGroupedByStartOrdered);

  constructor(private store: Store<AppState>) {
    // this.eventsGroupeds$.subscribe(console.log);
    this.eventsGroups$.subscribe(console.log);
  }

  ngOnInit() {}
}
