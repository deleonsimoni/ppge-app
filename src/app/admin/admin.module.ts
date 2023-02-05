import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BreakStringPipe } from '@app/shared/pipes/stringPipe/break-string,pipe';
import { SharedModule } from '@app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OnlyAllowedRolesUsersGuard } from './admin-allowed-roles-guard';
import { AdminRoutingModule } from './admin-routing.module';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { AdminComponent } from './admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { ParecerComponent } from './inscricoes/parecer/parecer.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';
import { AddPareceristaDialogComponent } from './pareceristas/add-parecerista-dialog/add-parecerista-dialog.component';
import { PareceristasComponent } from './pareceristas/pareceristas.component';
import { ComfirmDeleteProcessoComponent } from './processo-seletivo-admin/modal/confirm-delet-processo.component';
import { ViewHtmlProcessoSeletivoComponent } from './processo-seletivo-admin/modal/view-html-processo-seletivo.component';
import { ViewInscritosProcessoSeletivoComponent } from './processo-seletivo-admin/modal/view-inscritos-processo-seletivo.component';
import { ProcessoSeletivoAdminComponent } from './processo-seletivo-admin/processo-seletivo-admin.component';
import { TeseDissertacaoAdminComponent } from './tese-dissertacao-admin/tese-dissertacao-admin.component';
import { ComfirmDeleteComponent } from './tese-dissertacao-admin/tese-ou-dissertacao/confirm-delet.component';
import { TeseOuDissertacaoComponent } from './tese-dissertacao-admin/tese-ou-dissertacao/tese-ou-dissertacao.component';
import { RankComponent } from './rank/rank.component';
import { MatTableModule } from '@angular/material/table';
import { CriterioAvaliacaoComponent } from './criterio-avaliacao/criterio-avaliacao.component';
import { CriterioAvaliacaoDialogComponent } from './processo-seletivo-admin/criterio-avaliacao-dialog/criterio-avaliacao-dialog.component';
import { CriterioFormComponent } from './components/criterio-form/criterio-form.component';
import { CotaAcaoAfirmativaComponent } from './cota-acao-afirmativa/cota-acao-afirmativa.component';

@NgModule({
  declarations: [
    AdminComponent,
    PagesAdminComponent,
    TeseDissertacaoAdminComponent,
    TeseOuDissertacaoComponent,
    BreakStringPipe,
    ComfirmDeleteComponent,
    ProcessoSeletivoAdminComponent,
    CorpoDocenteComponent,
    ComfirmDeleteProcessoComponent,
    ViewHtmlProcessoSeletivoComponent,
    ViewInscritosProcessoSeletivoComponent,
    PareceristasComponent,
    AddPareceristaDialogComponent,
    InscricoesComponent,
    ParecerComponent,
    RankComponent,
    CriterioAvaliacaoComponent,
    CriterioAvaliacaoDialogComponent,
    CriterioFormComponent,
    CotaAcaoAfirmativaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
  ],
  providers: [OnlyAdminUsersGuard, OnlyAllowedRolesUsersGuard],
})
export class AdminModule { }
