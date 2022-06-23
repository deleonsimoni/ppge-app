import { RouterModule, Routes } from "@angular/router";
import { RegulationComponent } from "./regulation.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        redirectTo: '/regulamentos/1',
        pathMatch: 'full',
      },
      {
        path: ':regulationType',
        component: RegulationComponent
      }
    ]
  }
];

export const RegulationRountingModule = RouterModule.forChild(routes);
