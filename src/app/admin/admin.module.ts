import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BreakStringPipe } from '@app/shared/pipes/stringPipe/break-string,pipe';
import { SharedModule } from '@app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminRoutingModule } from './admin-routing.module';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { AdminComponent } from './admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';
import { ProcessoSeletivoAdminComponent } from './processo-seletivo-admin/processo-seletivo-admin.component';
import { TeseDissertacaoAdminComponent } from './tese-dissertacao-admin/tese-dissertacao-admin.component';
import { ComfirmDeleteComponent } from './tese-dissertacao-admin/tese-ou-dissertacao/confirm-delet.component';
import { TeseOuDissertacaoComponent } from './tese-dissertacao-admin/tese-ou-dissertacao/tese-ou-dissertacao.component';
import { ComfirmDeleteProcessoComponent } from './processo-seletivo-admin/modal/confirm-delet-processo.component';
import { ViewHtmlProcessoSeletivoComponent } from './processo-seletivo-admin/modal/view-html-processo-seletivo.component';
import { ViewInscritosProcessoSeletivoComponent } from './processo-seletivo-admin/modal/view-inscritos-processo-seletivo.component';

@NgModule({
  declarations: [AdminComponent, PagesAdminComponent, TeseDissertacaoAdminComponent, TeseOuDissertacaoComponent, BreakStringPipe, ComfirmDeleteComponent, ProcessoSeletivoAdminComponent, CorpoDocenteComponent, ComfirmDeleteProcessoComponent, ViewHtmlProcessoSeletivoComponent, ViewInscritosProcessoSeletivoComponent],
  imports: [CommonModule, AdminRoutingModule, HttpClientModule, AngularEditorModule, SharedModule],
  providers: [OnlyAdminUsersGuard],
})
export class AdminModule { }
