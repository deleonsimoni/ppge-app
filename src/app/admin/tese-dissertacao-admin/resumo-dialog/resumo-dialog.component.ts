import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  resumo: string | null;
  titulo: string | null;
  palavrasChave;
}

@Component({
  selector: 'app-resumo-dialog',
  templateUrl: './resumo-dialog.component.html',
  styleUrls: ['./resumo-dialog.component.scss']
})
export class ResumoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ResumoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  getTextPalavrasChave() {
    return this.data?.palavrasChave?.join('; ');

  }



}
