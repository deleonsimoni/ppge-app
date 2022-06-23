import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommitteeRoutingModule } from './committee-routing.module';
import { CommitteeComponent } from './committee.component';



@NgModule({
  imports: [
    CommitteeRoutingModule,
    CommonModule
  ],
  declarations: [
    CommitteeComponent
  ]
})
export class CommitteeModule { }
