import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CalendarEventGroupComponent } from './presentation/calendar-event-group/calendar-event-group.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, CalendarEventGroupComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HomeModule {}
