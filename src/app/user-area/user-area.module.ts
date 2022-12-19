import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAreaComponent } from './user-area.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared/shared.module';
import { ParecerUserComponent } from './parecer/parecer-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { JustificarDialogComponent } from './justificar-dialog/justificar-dialog.component';



@NgModule({
  declarations: [
    UserAreaComponent,
    ParecerUserComponent,
    JustificarDialogComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule, 
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,

  ]
})
export class UserAreaModule { }
