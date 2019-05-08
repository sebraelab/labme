import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';

import { environment } from '@env/environment';
import { Calendar } from './calendar.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarsService {
  constructor(private http: HttpClient) {
    this.getByCalendarIdsStartDate(
      [
        'ikc1o4rhld3ct31t3fakps0et8@group.calendar.google.com',
        '54ela9729018idmddcse06ua8s@group.calendar.google.com',
        '1olon5hik9hb8nbb38u2cunolg@group.calendar.google.com',
        'pnigeguu21lnfimambh78efu90@group.calendar.google.com',
        '7rm846f3m1g5eqaf3r24ufv538@group.calendar.google.com',
        '3vqabbtk3pbcl20oph1h7vmupc@group.calendar.google.com',
        'tl71k1baadlege5qiv4mvdtb30@group.calendar.google.com',
        'ogjvprvjudma7dicvqm0oj13ds@group.calendar.google.com',
        'jjidbfu6he1nnq7udt0uj23vfg@group.calendar.google.com'
      ],
      '2019-05-01T00:00:00-03:00'
    ).subscribe(console.log);
  }

  makeUrl(calendarId: string) {
    return `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
  }

  getByCalendarIdStartDate(
    calendarId: string,
    startDate: string
  ): Observable<Calendar> {
    const timeMin = moment(startDate).toISOString();
    const timeMax = moment(startDate)
      .add(7, 'days')
      .toISOString();
    const params = {
      timeMin,
      timeMax,
      key: environment.calendarAPIKey
    };
    return this.http.get<Calendar>(this.makeUrl(calendarId), { params });
  }

  getByCalendarIdsStartDate(
    calendarIds: string[],
    startDate: string
  ): Observable<Calendar[]> {
    return combineLatest(
      calendarIds.map(calendarId =>
        this.getByCalendarIdStartDate(calendarId, startDate)
      )
    ).pipe(
      map(calendars =>
        calendars.map((calendar, index) => ({
          ...calendar,
          calendarId: calendarIds[index]
        }))
      )
    );
  }
}
