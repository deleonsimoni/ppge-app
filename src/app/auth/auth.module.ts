import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    SharedModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    AuthRoutingModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule { }
