import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { formApprovalTable, formHomologTable } from "@app/shared/shared.model";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs";
import { JustificarDialogComponent, RecursoDTO } from "../justificar-dialog/justificar-dialog.component";


export interface DialogParecerData {
  idProcesso: string;
  idInscricao: string;
}

@Component({
  selector: 'app-parecer',
  templateUrl: './parecer-user.component.html',
  styleUrls: ['./parecer-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParecerUserComponent implements OnInit {
  form: FormGroup;

  formHomologTable = formHomologTable;
  formApprovalTable = formApprovalTable;

  criterioStepList: any[] = [];
  parecerStepList: any[] = [];

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ParecerUserComponent>,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
    this.form = this.builder.group({
      homologado: [{ value: null, disabled: true }, []],
      aprovado: [{ value: null, disabled: true }, []],
      step: [null, []]
    });
  }

  abrirModalJustificar(idStep, isHomolog = false) {
    const idInscricao = this.data.idInscricao, idProcesso = this.data.idProcesso;
    console.log("idInscricao: ", idInscricao);
    console.log("idProcesso: ", idProcesso);
    
    const dref = this.dialog.open(JustificarDialogComponent, {
      width: '80%',
      data: {
        idInscricao,
        idProcesso,
        idStep,
        isHomolog
      }
    })
    dref.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        console.log("ENTROU NO REFRESH");
        this.dialogRef.close({refresh: true});
        
      }
    })
  }

  verificaTemJustificativa(idStep) {
    let stepSelected = this.parecerStepList[`step-${idStep}`]
    return !!stepSelected?.recurso?.justificativa
  }

  verificaTemJustificativaHomolog() {
    const parecerSelected = this.data?.parecer;
    return !!parecerSelected?.recursoHomolog?.justificativa
  }

  verificaTemResposta(idStep) {
    let stepSelected = this.parecerStepList[`step-${idStep}`]
    return !stepSelected?.recurso?.respostaJustificativa

  }

  verificaTemRespostaHomolog() {
    const parecerSelected = this.data?.parecer;
    return !parecerSelected?.recursoHomolog?.respostaJustificativa
  }

  abrirModalResposta(idStep, isHomolog = false) {
    let recursoSelected = isHomolog ? this.data?.parecer?.recursoHomolog : this.parecerStepList[`step-${idStep}`]?.recurso;

    if(recursoSelected) {

      const dref = this.dialog.open(JustificarDialogComponent, {
        width: '78%',
        data: {
          flagJustView: true,
          recurso: <RecursoDTO> {
            justificativa: recursoSelected?.justificativa,
            respostaJustificativa: recursoSelected?.respostaJustificativa,
            recursoAceito: recursoSelected?.recursoAceito
          }
        }
      })

    } else {
      this.toastr.clear();
      this.toastr.error("Não há avaliação", "Atenção!");
    }

  }

  getApproveStep(idStep) {
    let stringReturn = "N/A";
    let stepSelected = this.parecerStepList[`step-${idStep}`]
    if(stepSelected && stepSelected.stepApproval != null) {
      stringReturn = stepSelected.stepApproval ? "SIM" : "NÃO";
    }
    return stringReturn;

  }

  getApproveHomolog() {
    let stringReturn = "N/A";
    let parecerSelected = this.data?.parecer;
    if(parecerSelected) {
      if(parecerSelected.homologado != null && parecerSelected.homologado != undefined) {
        stringReturn = parecerSelected.homologado ? "Deferido" : "Indeferido";
      }
    } else {
      this.toastr.clear();
      this.toastr.error("Ocorreu um erro, recarregue a página e tente novamente", "Atenção!");
    }
    return stringReturn;

  }

  ngOnInit(): void {
    console.log("DATA CHEGADA: ", this.data);
    this.criterioStepList = this.data.criterio.step;
    this.parecerStepList = this.data.parecer.step ? this.data.parecer.step : {};
    this.montarFormulario();
  }

  getPartialScoreByStep(idStep) {
    let stringReturn = "N/A";
    let stepSelected = this.parecerStepList[`step-${idStep}`]
    console.log("stepSelected: ", stepSelected)

    if(stepSelected && stepSelected.stepApproval != null) {
      let notaSomada: number = stepSelected.mediaStep;
      // Object.keys(stepSelected).forEach( keySection => {
      //   if(keySection.startsWith("section-")) {
      //     Object.keys(stepSelected[keySection]).forEach( keyQuestion => {
      //       if(keyQuestion.startsWith("question-")) {
      //         notaSomada += stepSelected[keySection][keyQuestion] != null ? stepSelected[keySection][keyQuestion] : 0;
      //       }

      //     })
          
      //   }
      // })
      stringReturn = notaSomada.toFixed(2);
    }
    
    return stringReturn;
  }

  formatDecimal(num) {
    return Number(Number(num).toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  montarFormulario() {
    
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
    // fim do form de aprovacao
    this.form.patchValue({ ...this.data.parecer })

  }


}
