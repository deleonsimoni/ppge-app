import { RouterModule, Routes } from "@angular/router";
import { ScheduleComponent } from "./schedule.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        redirectTo: '/agenda/1',
        pathMatch: 'full',
      },
      {
        path: ':scheduleType',
        component: ScheduleComponent
      }
    ]
  }
];

export const ScheduleRountingModule = RouterModule.forChild(routes);
