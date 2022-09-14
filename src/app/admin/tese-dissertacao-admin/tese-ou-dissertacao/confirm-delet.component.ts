import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    title: string;
    name: string;
}

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html'
})
export class ComfirmDeleteComponent {
    constructor(
        public dialogRef: MatDialogRef<ComfirmDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}
