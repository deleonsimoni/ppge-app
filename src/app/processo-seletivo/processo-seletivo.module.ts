import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ProcessoSeletivoRoutingModule } from "./processo-seletivo-routing.module";
import { ProcessoSeletivoComponent } from "./processo-seletivo.component";

@NgModule({
    imports: [ProcessoSeletivoRoutingModule, CommonModule, BrowserModule],
    declarations: [ProcessoSeletivoComponent],
    })
export class ProcessoSeletivoModule {}