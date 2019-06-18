import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { first, map, catchError } from 'rxjs/operators';

import { Espaco } from './espacos.types';

@Injectable({
  providedIn: 'root'
})
export class EspacosService {
  static basePath = 'espacos';

  constructor(public afs: AngularFirestore) {}

  getAll = (): Observable<Espaco[]> =>
    this.afs
      .collection(EspacosService.basePath, query => query.orderBy('descricao'))
      .snapshotChanges()
      .pipe(
        first(),
        map(documents =>
          documents.map<Espaco>(document => {
            return {
              ...document.payload.doc.data(),
              id: document.payload.doc.id
            } as Espaco;
          })
        ),
        catchError(error => throwError(error.message))
      );
}
