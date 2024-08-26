import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, merge } from 'rxjs';

export interface DialogHomologacaoData {
  idProcesso: string;
  idInscricao: string;
  criterio: any;
}

@Component({
  selector: 'app-homologacao-dialog',
  templateUrl: './homologacao-dialog.component.html',
  styleUrls: ['./homologacao-dialog.component.scss']
})
export class HomologacaoDialogComponent implements OnInit {
  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Update after login/register/logout
    this.authService.getUser()
  );
  form: FormGroup;
  justificaIndeferido;
  deferido = false;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogHomologacaoData,
    public dialogRef: MatDialogRef<HomologacaoDialogComponent>,
    private toastr: ToastrService,
    private siteAdminService: SiteAdminService,
    public dialog: MatDialog,
  ) { 
    this.form = this.builder.group({
      questionHomolog: [null, []],

    });

  }

  ngOnInit(): void {

    this.montarFormulario();
    this.getHomologacao();
  }

  getHomologacao() {
    this.siteAdminService.getHomologacao(this.data.idInscricao, this.data.idProcesso)
      .subscribe((data: any) => {
        if(data.enrolled[0].parecer?.homologacao) {
          this.form.patchValue({ questionHomolog: { ...data.enrolled[0].parecer?.homologacao } })
          this.justificaIndeferido = data.enrolled[0].parecer?.recursoHomolog?.justificaIndeferido ?? ''
          this.verificaIndeferido();
        }

      });
  }

  
  montarFormulario() {
    
    let questionFormAux = this.builder.group({});
    this.data.criterio?.questions?.forEach((question, index) => {
      let questionValueForm = this.builder.group({
        question: [{value: question, disabled: true}, Validators.required],
        value: [false, Validators.required]
      });
      questionFormAux.addControl(index, questionValueForm);
      this.form.setControl('questionHomolog', questionFormAux);
    });

  }

  register() {
    if(!this.deferido && (!this.justificaIndeferido || this.justificaIndeferido.trim() == "")) {
      this.toastr.error('Para indeferir uma inscrição é necessário preencher o campo "Justifique"!')
      return;
    }

    if (this.form.valid) {
      this.siteAdminService
        .registrarHomologacao(this.data.idInscricao, this.data.idProcesso, this.form.getRawValue(), this.deferido, this.justificaIndeferido)
        .subscribe(data => {
          this.toastr.success("Homologação salva com sucesso!");
          this.dialogRef.close({ refresh: true });
        })
    } else {
      this.toastr.error("Preencha os campos corretamente!")
    }
    
  }

  verificaIndeferido() {
    this.deferido = true;
    Object.values(this.form.value.questionHomolog).forEach((q: any) => {
      this.deferido = this.deferido && q.value;
    })
  }

}
