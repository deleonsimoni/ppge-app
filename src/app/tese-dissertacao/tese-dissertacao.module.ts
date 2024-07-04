import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FiltroComponent } from './filtro/filtro.component';
import { TeseDissertacaoRoutingModule } from './tese-dissertacao-routing.module';
import { TeseDissertacaoComponent } from './tese-dissertacao.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { SanitizeModule } from '@app/shared/pipes/sanitize/sanitize.module';
import { ResumoDialogComponent } from './resumo-dialog/resumo-dialog.component';

@NgModule({
    imports: [TeseDissertacaoRoutingModule,
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        MatChipsModule,
        SharedModule,
        SanitizeModule],
    declarations: [TeseDissertacaoComponent, FiltroComponent, ResumoDialogComponent],
})
export class TeseDissertacaoModule { }