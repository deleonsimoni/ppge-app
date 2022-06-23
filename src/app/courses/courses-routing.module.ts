import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        redirectTo: '/cursos/1',
        pathMatch: 'full',
      },
      {
        path: ':coursesType',
        component: CoursesComponent
      }
    ]
  }
];

export const CoursesRoutingModule = RouterModule.forChild(routes);