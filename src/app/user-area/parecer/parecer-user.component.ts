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
    this.form = this.builder.group({
      homologado: [{ value: null, disabled: true }, []],
      aprovado: [{ value: null, disabled: true }, []],
      step: [null, []]
    });
  }

  ngOnInit(): void {

    this.montarFormulario();
  }

  formatDecimal(num) {
    return Number(Number(num).toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  montarFormulario() {
    console.log("CRITERIO: ", this.data.criterio);
    
    // form de aprovacao
    let stepFormAux = this.builder.group({});
    this.data.criterio?.step.forEach(step => {

      let notasAprovacaoForm = this.builder.group({});
      step.section.forEach(section => {
        let formAux = this.builder.group({});
        section.question.forEach(element => {
          formAux.addControl(String(`question-${element._id}`), new FormControl('', []))
        });
        notasAprovacaoForm.addControl(`section-${section._id}`, formAux);
      })
      notasAprovacaoForm.addControl(`stepApproval`, new FormControl(null, []));
      stepFormAux.addControl(`step-${step._id}`, notasAprovacaoForm);

    })
    this.form.setControl('step', stepFormAux);
    console.log("form: ", this.form.value);
    // fim do form de aprovacao
    this.form.patchValue({ ...this.data.parecer })

  }


}
