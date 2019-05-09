import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { CalendarEvent } from '@app/calendars/calendar.types';

@Component({
  selector: 'calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent {
  @Input() event: CalendarEvent;

  parseToDate(dateAsStr) {
    return moment(dateAsStr);
  }
}
