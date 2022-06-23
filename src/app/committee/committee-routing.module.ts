import { RouterModule, Routes } from "@angular/router";
import { CommitteeComponent } from "./committee.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        redirectTo: '/comissoes/1',
        pathMatch: 'full',
      },
      {
        path: ':committeeType',
        component: CommitteeComponent
      }
    ]
  }
];

export const CommitteeRoutingModule = RouterModule.forChild(routes);