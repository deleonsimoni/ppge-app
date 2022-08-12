import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { HistoricoAdminComponent } from './historico-admin/historico-admin.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AdminComponent, HistoricoAdminComponent],
  imports: [CommonModule, AdminRoutingModule, AngularEditorModule, SharedModule],
  providers: [OnlyAdminUsersGuard],
})
export class AdminModule { }
