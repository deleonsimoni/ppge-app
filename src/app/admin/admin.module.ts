import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminRoutingModule } from './admin-routing.module';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { AdminComponent } from './admin.component';
import { HistoricoAdminComponent } from './historico-admin/historico-admin.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';

@NgModule({
  declarations: [AdminComponent, HistoricoAdminComponent, PagesAdminComponent, CorpoDocenteComponent],
  imports: [CommonModule, AdminRoutingModule, HttpClientModule, AngularEditorModule, SharedModule],
  providers: [OnlyAdminUsersGuard],
})
export class AdminModule { }
