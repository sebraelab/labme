import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from './state/eventos.types';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  constructor() {}

  search(query: any): Observable<Evento[]> {
    return null;
  }
}
