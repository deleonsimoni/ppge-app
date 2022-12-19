import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { formApprovalTable, formHomologTable } from '@app/shared/shared.model';
import { ToastrService } from 'ngx-toastr';

export interface DialogParecerData {
  idProcesso: string;
  idInscricao: string;
}

@Component({
  selector: 'app-parecer',
  templateUrl: './parecer.component.html',
  styleUrls: ['./parecer.component.scss']
})
export class ParecerComponent implements OnInit {
  form: FormGroup;

  formHomologTable = formHomologTable;
  formApprovalTable = formApprovalTable;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogParecerData,
    public dialogRef: MatDialogRef<ParecerComponent>,
    private toastr: ToastrService,
    private siteAdminService: SiteAdminService,
  ) {
    console.log(this.data);
    this.form = this.builder.group({
      homologado: [null, []],
      aprovado: [null, []],
      notasHomologacao: [null, [Validators.required]],
      notasAprovacao: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.montarFormulario();
    console.log("FORM", this.form)
    this.getParecer();
  }

  formatDecimal(num) {
    return Number(Number(num).toFixed(2)).toLocaleString('pt-BR', {minimumFractionDigits: 2});
  }

  montarFormulario() {
    // form de homolohacao
    let notasHomologacaoForm = this.builder.group({});
    this.formHomologTable.section.forEach(section => {
      let formAux = this.builder.group({});
      section.question.forEach(element => {
        formAux.addControl(String(`question-${element.numer}`), new FormControl('', []))
      });
      notasHomologacaoForm.addControl(`section-${section.id}`, formAux);
    })
    this.form.setControl('notasHomologacao', notasHomologacaoForm);
    // fim do form de homolohacao

    // form de aprovacao
    let notasAprovacaoForm = this.builder.group({});
    this.formApprovalTable.section.forEach(section => {
      let formAux = this.builder.group({});
      section.question.forEach(element => {
        formAux.addControl(String(`question-${element.numer}`), new FormControl('', []))
      });
      notasAprovacaoForm.addControl(`section-${section.id}`, formAux);
    })
    this.form.setControl('notasAprovacao', notasAprovacaoForm);
    // fim do form de aprovacao
    
  }

  getParecer() {
    this.siteAdminService.getParecer(this.data.idInscricao, this.data.idProcesso)
      .subscribe((data: any) => {
        console.log("PARECER DADOSSS: ", data)
        this.form.patchValue({...data.enrolled[0].parecer})
      })
  }

  register() {
    console.log("register()", this.form.value)
    if(this.form.valid) {
      console.log("REGISTROUUUU: ", this.form.value)
      this.siteAdminService
        .registrarParecer(this.data.idInscricao, this.data.idProcesso, this.form.value)
        .subscribe(data => {
          console.log(data);
          this.dialogRef.close({refresh: true});
        })
    } else {
      this.toastr.error("Preencha os campos corretamente!")
    }
  }


}
