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
  }

  keysObject(object) {
    return Object.keys(object);
  }

  applyMask(value: string, mask: string): string {
    // Implemente a lógica para aplicar a máscara.
    // Por exemplo, para uma máscara de telefone (99) 99999-9999:
    if (!value) return value;
    value = value.replace(/\D/g, '');
  
    let maskedValue = '';
    let maskIndex = 0;
  
    for (let i = 0; i < value.length; i++) {
      if (maskIndex >= mask.length) break;
      if (mask[maskIndex] === '0') {
        maskedValue += value[i];
        maskIndex++;
      } else {
        maskedValue += mask[maskIndex];
        maskIndex++;
        i--; // Retorna um caractere no valor para continuar a iteração no próximo loop
      }
    }
  
    return maskedValue;
  }


}
