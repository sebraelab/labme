import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatIconModule } from '@angular/material';

import { LoadMoreModule } from '@app/utils/components/load-more/load-more.module';
import { HomeComponent } from './containers/home/home.component';
import { CalendarEventComponent } from './presentation/calendar-event/calendar-event.component';
import { CalendarEventGroupComponent } from './presentation/calendar-event-group/calendar-event-group.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    CalendarEventGroupComponent,
    CalendarEventComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    LoadMoreModule
  ]
})
export class HomeModule {}
