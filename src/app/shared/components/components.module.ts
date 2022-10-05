import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CardProfilesComponent } from './card-profiles/card-profiles.component';
import { FormProcessoSeletivoComponent } from './form-processo-seletivo/form-processo-seletivo.component';
import { FormProcessoSeletivoService } from './form-processo-seletivo/form-processo-seletivo.service';



@NgModule({
  declarations: [
    CardProfilesComponent,
    FormProcessoSeletivoComponent
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
  ],
  exports: [
    CardProfilesComponent,
    FormProcessoSeletivoComponent
  ],
  providers: [
    FormProcessoSeletivoService
  ]
})
export class ComponentsModule { }
