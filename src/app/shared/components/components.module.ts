import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ImagePathComplementModule } from '../pipes/image-path/image-path-complement.module';
import { ImagePathComplementPipe } from '../pipes/image-path/image-path-complement.pipe';
import { SharedModule } from '../shared.module';
import { CardProfilesComponent } from './card-profiles/card-profiles.component';
import { FormProcessoSeletivoComponent } from './form-processo-seletivo/form-processo-seletivo.component';
import { FormProcessoSeletivoService } from './form-processo-seletivo/form-processo-seletivo.service';
import { RankViewDialogComponent } from './rank-view-dialog/rank-view-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    CardProfilesComponent,
    FormProcessoSeletivoComponent,
    RankViewDialogComponent,
    ConfirmDialogComponent,
    PaginationComponent,

  ],
  imports: [
    CommonModule,
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
  exports: [
    CardProfilesComponent,
    FormProcessoSeletivoComponent,
    PaginationComponent,

  ],
  providers: [
    FormProcessoSeletivoService,


  ]
})
export class ComponentsModule { }
