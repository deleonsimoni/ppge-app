import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { questionsPerfilCandidato } from '@app/shared/shared.model';

@Component({
  selector: 'app-perfil-candidato-view-dialog',
  templateUrl: './perfil-candidato-view-dialog.component.html',
  styleUrls: ['./perfil-candidato-view-dialog.component.scss']
})
export class PerfilCandidatoViewDialogComponent {
  public questionsPerfilCandidato = questionsPerfilCandidato;
  perfilCandidato = {}

  constructor(
    public dialogRef: MatDialogRef<PerfilCandidatoViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.perfilCandidato = data;
    console.log("this.perfilCandidato: ", this.perfilCandidato)
  }

  keysObject(object) {
    return Object.keys(object);
  }


}
