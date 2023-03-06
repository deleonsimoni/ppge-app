import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';

export interface RecursoDataDTO {
  idInscricao: string | null;
  idProcesso: string | null;
  idStep: string | null;
  flagJustView: boolean | null;
  isHomolog: boolean | null;
  recurso: RecursoDTO | null;
}

export interface RecursoDTO {
  justificativa: string;
  respostaJustificativa: string;
  recursoAceito: boolean;
}

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.scss']
})
export class RecursoComponent {
  form: any;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: RecursoDataDTO,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RecursoComponent>,
    private siteService: SiteAdminService,
  ) { 
    this.form = this.builder.group({
      justificativa: [null, [Validators.required]],
      recursoAceito: [null, [Validators.required]]
    });

    console.log("data: ", this.data)
  }

  register() {
    if (this.form.valid) {
      if(this.data.isHomolog) {

        this.siteService
          .registrarRespostaJustificativaHomolog(this.data.idInscricao, this.data.idProcesso, this.form.value.justificativa, this.form.value.recursoAceito)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error('Ocorreu um erro inesperado!');
              throw err;
            })
          )
          .subscribe(data => {
            this.toastr.success('Resposta enviada com sucesso!')
            this.dialogRef.close({ refresh: true })
          })

      } else {

        this.siteService
          .registrarRespostaJustificativa(this.data.idInscricao, this.data.idProcesso, this.data.idStep, this.form.value.justificativa, this.form.value.recursoAceito)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error('Ocorreu um erro inesperado!');
              throw err;
            })
          )
          .subscribe(data => {
            this.toastr.success('Resposta enviada com sucesso!')
            this.dialogRef.close({ refresh: true })
          })
      }

    } else {
      this.toastr.error('Preencha o formulário corretamente!')
    }

  }


}
