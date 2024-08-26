import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ComponentsModule } from './components/components.module';
import { ImagePathComplementPipe } from './pipes/image-path/image-path-complement.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTooltipModule,
    ComponentsModule,
    ImagePathComplementPipe
  ],
  declarations: [
    ImagePathComplementPipe

  ],
  providers: [ImagePathComplementPipe]

})
export class SharedModule { }
