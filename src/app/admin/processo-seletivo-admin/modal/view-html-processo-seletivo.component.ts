import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    content: string;
}

@Component({
    selector: 'view-html-processo-seletivo',
    templateUrl: './view-html-processo-seletivo.component.html'
})
export class ViewHtmlProcessoSeletivoComponent {
    constructor(
        public dialogRef: MatDialogRef<ViewHtmlProcessoSeletivoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}
