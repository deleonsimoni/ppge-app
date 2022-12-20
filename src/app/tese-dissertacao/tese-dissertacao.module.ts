import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FiltroComponent } from './filtro/filtro.component';
import { TeseDissertacaoRoutingModule } from './tese-dissertacao-routing.module';
import { TeseDissertacaoComponent } from './tese-dissertacao.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    imports: [TeseDissertacaoRoutingModule,
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        MatChipsModule,
        SharedModule],
    declarations: [TeseDissertacaoComponent, FiltroComponent],
})
export class TeseDissertacaoModule { }