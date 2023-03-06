import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared/shared.module";
import { ProcessoSeletivoComponent } from "./processo-seletivo.component";
import { ProcessoSeletivoService } from "./processo-seletivo.service";
import { RanklistDialogComponent } from './ranklist-dialog/ranklist-dialog.component';

@NgModule({
    imports: [CommonModule, BrowserModule, SharedModule],
    declarations: [ProcessoSeletivoComponent, RanklistDialogComponent],
    providers: [ProcessoSeletivoService]
    })
export class ProcessoSeletivoModule {}