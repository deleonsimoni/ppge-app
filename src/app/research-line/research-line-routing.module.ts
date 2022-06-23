import { RouterModule, Routes } from "@angular/router";
import { ResearchLineComponent } from "./research-line.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        redirectTo: '/linhas-pesquisa/1',
        pathMatch: 'full',
      },
      {
        path: ':researchLineType',
        component: ResearchLineComponent
      }
    ]
  }
];

export const ResearchLineRountingModule = RouterModule.forChild(routes);
