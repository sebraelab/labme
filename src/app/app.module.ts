import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatListModule,
  MatCheckboxModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxMaskModule } from 'ngx-mask';

import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
registerLocaleData(pt);

import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarsStateModule } from './calendars/state/calendars.module';
import { EspacosStateModule } from './espacos/state/espacos-state.module';
import { FilterEventsComponent } from './utils/components/filter-events/filter-events.component';

@NgModule({
  declarations: [AppComponent, FilterEventsComponent],
  entryComponents: [FilterEventsComponent],
  imports: [
    // @
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),

    // material
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,

    // ngrx
    StoreModule.forRoot({}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),

    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    // local
    AppRoutingModule,
    CalendarsStateModule,
    EspacosStateModule,

    //
    NgxMaskModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
