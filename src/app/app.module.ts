import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarsStateModule } from './calendars/state/calendars.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // @
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),

    // material
    MatButtonModule,
    MatToolbarModule,

    // ngrx
    StoreModule.forRoot({}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),

    // local
    AppRoutingModule,
    CalendarsStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
