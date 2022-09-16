import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
}

@Component({
    selector: 'app-confirm-delete-processo',
    templateUrl: './confirm-delete-processo.component.html'
})
export class ComfirmDeleteProcessoComponent {
    constructor(
        public dialogRef: MatDialogRef<ComfirmDeleteProcessoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}
