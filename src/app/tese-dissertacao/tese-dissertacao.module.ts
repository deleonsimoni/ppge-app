import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DissertacaoComponent } from './dissertacao/dissertacao.component';
import { FiltroComponent } from './filtro/filtro.component';
import { TeseDissertacaoRoutingModule } from './tese-dissertacao-routing.module';
import { TeseDissertacaoComponent } from './tese-dissertacao.component';
import { TeseComponent } from './tese/tese.component';

@NgModule({
    imports: [TeseDissertacaoRoutingModule, CommonModule, BrowserModule, ReactiveFormsModule],
    declarations: [TeseDissertacaoComponent, TeseComponent, DissertacaoComponent, FiltroComponent],
    })
export class TeseDissertacaoModule {}