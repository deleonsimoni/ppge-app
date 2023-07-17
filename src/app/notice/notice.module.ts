import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice.component';
import { NoticeService } from './notice.service';
import { SanitizeModule } from '@app/shared/pipes/sanitize/sanitize.module';



@NgModule({
  declarations: [
    NoticeComponent
  ],
  imports: [
    CommonModule,
    SanitizeModule,
  ],
  providers: [
    NoticeService
  ]
})
export class NoticeModule { }
