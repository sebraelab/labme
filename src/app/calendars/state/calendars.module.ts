import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { calendarsReducer } from './calendars.reducer';
import { CalendarsEffects } from './calendars.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('calendars', calendarsReducer),
    EffectsModule.forFeature([CalendarsEffects])
  ]
})
export class CalendarsStateModule {}
