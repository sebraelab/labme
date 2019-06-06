import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { espacosReducer } from './espacos.reducer';
import { EspacosEffects } from './espacos.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('espacos', espacosReducer),
    EffectsModule.forFeature([EspacosEffects])
  ]
})
export class EspacosStateModule {}
