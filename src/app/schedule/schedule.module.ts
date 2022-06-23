import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduleRountingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';



@NgModule({
  imports: [
    ScheduleRountingModule,
    CommonModule
  ],
  declarations: [
    ScheduleComponent,
  ],
})
export class ScheduleModule { }
