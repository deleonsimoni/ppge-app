import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NormaPosGraduacaoRoutingModule } from "./normas-pos-graduacao-routing.module";
import { NormaPosGraduacaoComponent } from "./normas-pos-graduacao.component";
import { SanitizeModule } from "@app/shared/pipes/sanitize/sanitize.module";

@NgModule({
    imports: [
        CommonModule, 
        BrowserModule,
        SanitizeModule,
    ],
    declarations: [NormaPosGraduacaoComponent],
    })
export class NormaPosGraduacaoModule {}