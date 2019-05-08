import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { eventosReducer } from './eventos.reducer';
import { EventosEffects } from './eventos.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('eventos', eventosReducer),
    EffectsModule.forFeature([EventosEffects])
  ]
})
export class EventosStateModule {}
