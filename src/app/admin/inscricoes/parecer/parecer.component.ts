import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, merge, Observable, take } from 'rxjs';
import { RecursoComponent } from '../recurso/recurso.component';

export interface DialogParecerData {
  idProcesso: string;
  idInscricao: string;
  criterio: any;
}

@Component({
  selector: 'app-parecer',
  templateUrl: './parecer.component.html',
  styleUrls: ['./parecer.component.scss']
})
export class ParecerComponent implements OnInit {
  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Update after login/register/logout
    this.authService.getUser()
  );
  form: FormGroup;

  parecerSelected: any;
  parecerConsolidadoSelected: any;


  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogParecerData,
    public dialogRef: MatDialogRef<ParecerComponent>,
    private toastr: ToastrService,
    private siteAdminService: SiteAdminService,
    public dialog: MatDialog,
  ) {
    this.form = this.builder.group({
      homologado: [null, []],
      aprovado: [null, []],
      step: [null, []],
      recursoHomolog: this.builder.group({
        justificativa: [null, []], 
        respostaJustificativa: [null, []],
        recursoAceito: [null, []]
      }),
    });
  }

  ngOnInit(): void {

    this.montarFormulario();
    this.getParecer();
  }

  formatDecimal(num) {
    return Number(Number(num).toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }


  montarFormulario() {
    let stepFormAux = this.builder.group({});
    this.data.criterio?.step.forEach(step => {

      let notasAprovacaoForm = this.builder.group({});
      step.section.forEach(section => {
        let formAux = this.builder.group({});
        section.question.forEach(element => {
          formAux.addControl(String(`question-${element._id}`), new FormControl(null, []))
        });
        notasAprovacaoForm.addControl(`section-${section._id}`, formAux);
      })
      notasAprovacaoForm.addControl(`stepApproval`, new FormControl(null, []));
      notasAprovacaoForm.addControl(
        'recurso', 
        this.builder.group({
          justificativa: [null, []], 
          respostaJustificativa: [null, []], 
          recursoAceito: [null, []], 
        })
      );
      notasAprovacaoForm.addControl('totalNotaEtapa', new FormControl(null, []))
      stepFormAux.addControl(`step-${step._id}`, notasAprovacaoForm);

    })
    this.form.setControl('step', stepFormAux);
    


  }

  getParecer() {
    this.siteAdminService.getParecer(this.data.idInscricao, this.data.idProcesso)
      .subscribe((data: any) => {
        console.log("data: ", data)
        if(data.enrolled[0].parecer?.avaliacoes) {
          this.user$
            .pipe(
              take(1),
              catchError((e) => {throw e})
            )
            .subscribe(user => {
              this.parecerConsolidadoSelected = data.enrolled[0].parecer;
              this.parecerSelected = data.enrolled[0].parecer?.avaliacoes[`avaliador-${user._id}`];
            })
        }
        
        this.form.patchValue({ ...this.parecerSelected })
        
      })
  }

  responderJustificativa(idStep, recurso) {

    const justificativa = recurso?.justificativa, 
      respostaJustificativa = recurso?.respostaJustificativa, 
      recursoAceito = recurso?.recursoAceito,
      idInscricao = this.data.idInscricao, 
      idProcesso = this.data.idProcesso;
      
    
    const dref = this.dialog.open(RecursoComponent, {
      width: '78%',
      data: {
        idInscricao,
        idProcesso,
        idStep,
        isHomolog: false,
        flagJustView: !!respostaJustificativa,
        recurso: {
          justificativa,
          respostaJustificativa,
          recursoAceito
        }
      }
    })
    dref.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        console.log("ENTROU NO REFRESH");
        this.dialogRef.close({refresh: true});
        
      }
    })
    
  }

  register() {
    Object.keys(this.form.value.step).forEach((keyStep) => {
      let retorno = this.getPartialScoreByStep(this.form.value.step[keyStep]);
      this.form.value.step[keyStep].totalNotaEtapa = retorno;
    })
    if (this.form.valid) {
      this.siteAdminService
        .registrarParecer(this.data.idInscricao, this.data.idProcesso, this.form.value)
        .subscribe(data => {
          this.dialogRef.close({ refresh: true });
        })
    } else {
      this.toastr.error("Preencha os campos corretamente!")
    }
  }

  getPartialScoreByStep(step) {
    let notaSomada = undefined;
    let stepSelected = step;

    if(stepSelected) {
      Object.keys(stepSelected).forEach( keySection => {
        if(keySection.startsWith("section-")) {
          Object.keys(stepSelected[keySection]).forEach( keyQuestion => {
            if(keyQuestion.startsWith("question-")) {
              if(stepSelected[keySection][keyQuestion] != null) {
                if(notaSomada == undefined) {
                  notaSomada = 0;
                }
                notaSomada += stepSelected[keySection][keyQuestion];
              }
            }

          })
          
        }
      })
      
    }
    
    return notaSomada;
  }


}
