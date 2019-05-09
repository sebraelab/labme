import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from '@env/environment';
import { generateNextStartDate } from '@app/utils/functions';
import { Calendar } from './calendar.types';

@Injectable({
  providedIn: 'root'
})
export class CalendarsService {
  constructor(private http: HttpClient) {}

  makeUrl(calendarId: string) {
    return `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
  }

  getByCalendarIdStartDate(
    calendarId: string,
    startDate: string
  ): Observable<Calendar> {
    const timeMin = moment(startDate).toISOString();
    const timeMax = generateNextStartDate(startDate);
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
