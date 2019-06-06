import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { LoadMoreComponent } from './load-more.component';

@NgModule({
  declarations: [LoadMoreComponent],
  exports: [LoadMoreComponent],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule]
})
export class LoadMoreModule {}
