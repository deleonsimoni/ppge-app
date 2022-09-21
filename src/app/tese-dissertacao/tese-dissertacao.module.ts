import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FiltroComponent } from './filtro/filtro.component';
import { TeseDissertacaoRoutingModule } from './tese-dissertacao-routing.module';
import { TeseDissertacaoComponent } from './tese-dissertacao.component';

@NgModule({
    imports: [TeseDissertacaoRoutingModule, CommonModule, BrowserModule, ReactiveFormsModule],
    declarations: [TeseDissertacaoComponent, FiltroComponent],
    })
export class TeseDissertacaoModule {}