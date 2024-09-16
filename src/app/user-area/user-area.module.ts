import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAreaComponent } from './user-area.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared/shared.module';
import { ParecerUserComponent } from './parecer/parecer-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { JustificarDialogComponent } from './justificar-dialog/justificar-dialog.component';
import { AuthModule } from '@app/auth/auth.module';
import { EditPasswordDialogComponent } from './edit-password-dialog/edit-password-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { TelefonePipePipe } from '@app/shared/pipes/telefone-pipe.pipe';
import { CpfRgPipePipe } from '@app/shared/pipes/cpf-rg-pipe.pipe';



@NgModule({
  declarations: [
    UserAreaComponent,
    ParecerUserComponent,
    JustificarDialogComponent,
    EditPasswordDialogComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule, 
    SharedModule,
    NgxMaskModule.forRoot(),
    MatCheckboxModule,
    MatRadioModule,
    AuthModule,
    FormsModule,

  ]
})
export class UserAreaModule { }
