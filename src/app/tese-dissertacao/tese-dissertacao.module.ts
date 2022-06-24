import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DissertacaoComponent } from './dissertacao/dissertacao.component';
import { TeseDissertacaoRoutingModule } from './tese-dissertacao-routing.module';
import { TeseDissertacaoComponent } from './tese-dissertacao.component';
import { TeseComponent } from './tese/tese.component';

@NgModule({
    imports: [TeseDissertacaoRoutingModule, CommonModule, BrowserModule],
    declarations: [TeseDissertacaoComponent, TeseComponent, DissertacaoComponent],
    })
export class TeseDissertacaoModule {}