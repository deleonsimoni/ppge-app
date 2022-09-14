import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardProfilesComponent } from './card-profiles/card-profiles.component';



@NgModule({
  declarations: [
    CardProfilesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardProfilesComponent
  ]
})
export class ComponentsModule { }
