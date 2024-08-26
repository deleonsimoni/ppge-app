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
  emailInscrito: string;
  isAnother: boolean;
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
  myUser: User = <User>{};
  form: FormGroup;
  idPareceristaSelected = "";

  avaliadorSelected: number = 1;
  parecerSelected: any;
  parecerConsolidadoSelected: any;

  etapa: string;
  etapaAvaliacao: number;


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

    this.user$.subscribe(user => {
      this.myUser = user;
    })
    this.getParecer();
  }

  formatDecimal(num) {
    return Number(Number(num).toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }


  montarFormulario() {
    let stepFormAux = this.builder.group({});
    this.data.criterio?.step.forEach((step, indexStep) => {
      
      let notasAprovacaoForm = this.builder.group({});
      step.section.forEach(section => {
        let formAux = this.builder.group({});
        section.question.forEach(element => {
          formAux.addControl(String(`question-${element._id}`), new FormControl({value: null, disabled: this.etapaAvaliacao != indexStep}, []))
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

  changeParecer(event) {
    this.getParecer();
  }

  getParecer() {
    this.siteAdminService.getParecer(this.data.idInscricao, this.data.idProcesso)
      .subscribe((data: any) => {
        this.etapa = data.etapa;
        this.etapaAvaliacao = data.etapaAvaliacao;
        this.montarFormulario();
        if(data.enrolled[0].parecer?.avaliacoes) {
          this.user$
            .pipe(
              take(1),
              catchError((e) => {throw e})
            )
            .subscribe(user => {
              this.parecerConsolidadoSelected = data.enrolled[0].parecer;
              if(this.data.isAnother && user?.isCoordenador) {
                this.idPareceristaSelected = data.enrolled[0].parecerista[this.avaliadorSelected == 1 ? 'primeiro' : 'segundo']
                this.parecerSelected = data.enrolled[0].parecer?.avaliacoes[`avaliador-${this.idPareceristaSelected}`];
              } else {
                this.parecerSelected = data.enrolled[0].parecer?.avaliacoes[`avaliador-${user._id}`];
              }
              this.parecerSelected.step = this.changeNotaNumberToString(this.parecerSelected.step);
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
        this.dialogRef.close({refresh: true});
        
      }
    })
    
  }

  register() {
    let formulario = this.form.getRawValue();
    let step = this.changeNotaStringToNumber(formulario.step);
    
    Object.keys(step).forEach((keyStep) => {
      let retorno = this.getPartialScoreByStep(step[keyStep]);
      step[keyStep].totalNotaEtapa = retorno;
    })
    formulario.step = step;
    if (this.form.valid) {
      this.siteAdminService
        .registrarParecer(this.data.idInscricao, this.data.idProcesso, formulario, this.data.emailInscrito, this.data.isAnother, this.idPareceristaSelected)
        .subscribe(data => {
          this.dialogRef.close({ refresh: true });
        })
    } else {
      this.toastr.error("Preencha os campos corretamente!")
    }
  }

  changeNotaStringToNumber(listStep) {
    Object.keys(listStep).forEach(key => {
      if(key.startsWith('step-')) {
        Object.keys(listStep[key]).forEach(keyStep => {
          if(keyStep.startsWith('section-')) {
            Object.keys(listStep[key][keyStep]).forEach(keySection => {
              if(keySection.startsWith("question-")) {
                listStep[key][keyStep][keySection] = listStep[key][keyStep][keySection] ? Number(listStep[key][keyStep][keySection].replaceAll(",", ".")) : listStep[key][keyStep][keySection];
                
              }
            })
          }
        })
      }
    });
    return listStep;
  }

  changeNotaNumberToString(listStep) {
    Object.keys(listStep).forEach(key => {
      if(key.startsWith('step-')) {
        Object.keys(listStep[key]).forEach(keyStep => {
          if(keyStep.startsWith('section-')) {
            Object.keys(listStep[key][keyStep]).forEach(keySection => {
              if(keySection.startsWith("question-")) {
                listStep[key][keyStep][keySection] = listStep[key][keyStep][keySection] ? String(listStep[key][keyStep][keySection]).replaceAll(".", ",") : listStep[key][keyStep][keySection];
                
              }
            })
          }
        })
      }
    });
    return listStep;
  }

  getPartialScoreByStep(step) {
    let notaSomada = undefined;
    let stepSelected = step;
    let qtdSection = 0

    if(stepSelected) {
      Object.keys(stepSelected).forEach( keySection => {
        if(keySection.startsWith("section-")) {
          qtdSection++;
          Object.keys(stepSelected[keySection]).forEach( keyQuestion => {
            if(keyQuestion.startsWith("question-")) {
              if(stepSelected[keySection][keyQuestion] != null) {
                if(notaSomada == undefined) {
                  notaSomada = 0;
                }
                notaSomada = this.preciseSum(notaSomada, stepSelected[keySection][keyQuestion]);
              }
            }

          })
          
        }
      })
      
    }
    if(notaSomada != undefined) {
      notaSomada = notaSomada/qtdSection;
    }
    return notaSomada;
  }
  
  preciseSum(...values) {
    const sum = values.reduce((acc, val) => acc + Math.round(val * 100), 0);
    return sum / 100;
  }

  validateNumber(event, maxNota) {
    const pattern = new RegExp(/^[0-9]+(\,[0-9]{0,2})?$/);
    let inputChar = String.fromCharCode(event.charCode);
    let input = event.target.value+inputChar;

    let inputNumber = Number(input.replaceAll(",", "."));

    if (!pattern.test(input)) {
      // invalid character, prevent input
      event.preventDefault();
    } else if(inputNumber > maxNota) {
      event.preventDefault();
      event.target.value = String(maxNota).replaceAll(".", ",");
    }
  }

  chamouOutro(event, maxNota) {
    let inputNumber = Number(event.target.value.replaceAll(",", "."));
    if(inputNumber > maxNota) {
      event.preventDefault();
      event.target.value = String(maxNota).replaceAll(".", ",");
    }
  }


}
