import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadMoreComponent } from './load-more.component';

@NgModule({
  declarations: [LoadMoreComponent],
  exports: [LoadMoreComponent],
  imports: [CommonModule]
})
export class LoadMoreModule {}
