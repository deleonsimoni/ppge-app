import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared/shared.module";
import { ProcessoSeletivoComponent } from "./processo-seletivo.component";
import { ProcessoSeletivoService } from "./processo-seletivo.service";
import { RanklistDialogComponent } from './ranklist-dialog/ranklist-dialog.component';
import { NgxMaskModule } from "ngx-mask";
import { ComponentsModule } from "@app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";

@NgModule({
    imports: [
        CommonModule, 
        BrowserModule, 
        SharedModule, 
        NgxMaskModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
    ],
    declarations: [ProcessoSeletivoComponent, RanklistDialogComponent],
    providers: [ProcessoSeletivoService]
    })
export class ProcessoSeletivoModule {}