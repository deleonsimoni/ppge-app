import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { formApprovalTable, formHomologTable } from "@app/shared/shared.model";
import { ToastrService } from "ngx-toastr";


export interface DialogParecerData {
  idProcesso: string;
  idInscricao: string;
}

@Component({
  selector: 'app-parecer',
  templateUrl: './parecer-user.component.html',
  styleUrls: ['./parecer-user.component.scss']
})
export class ParecerUserComponent implements OnInit {
  form: FormGroup;

  formHomologTable = formHomologTable;
  formApprovalTable = formApprovalTable;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ParecerUserComponent>,
    private toastr: ToastrService,
  ) {
    console.log(this.data);
    this.form = this.builder.group({
      homologado: [{value: null, disabled: true}, []],
      aprovado: [{value: null, disabled: true}, []],
      notasHomologacao: [null, []],
      notasAprovacao: [null, []],
    });
  }

  ngOnInit(): void {

    this.montarFormulario();
    console.log("FORM", this.form)
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
        formAux.addControl(String(`question-${element.numer}`), new FormControl({value:'', disabled:true}, []))
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
        formAux.addControl(String(`question-${element.numer}`), new FormControl({value:'', disabled:true}, []))
      });
      notasAprovacaoForm.addControl(`section-${section.id}`, formAux);
    })
    this.form.setControl('notasAprovacao', notasAprovacaoForm);
    // fim do form de aprovacao
    this.form.patchValue({...this.data.parecer})
    
  }


}
