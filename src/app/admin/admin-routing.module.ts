import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnlyAdminUsersGuard } from './admin-user-guard';
import { AdminComponent } from './admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { HistoricoAdminComponent } from './historico-admin/historico-admin.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnlyAdminUsersGuard],
    component: AdminComponent,
    children: [

      {
        path: "", pathMatch: "full", redirectTo: "administrar-paginas"
      },
      {
        path: 'historico', component: HistoricoAdminComponent
      },
      {
        path: 'administrar-paginas', component: PagesAdminComponent
      },
      {
        path: 'corpo-docente', component: CorpoDocenteComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
