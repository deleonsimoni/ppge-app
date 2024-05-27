import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { formApprovalTable, formHomologTable } from '@app/shared/shared.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';
import { ComfirmDeleteProcessoComponent } from "../processo-seletivo-admin/modal/confirm-delet-processo.component";

@Component({
  selector: 'app-criterio-avaliacao',
  templateUrl: './criterio-avaliacao.component.html',
  styleUrls: ['./criterio-avaliacao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CriterioAvaliacaoComponent implements OnInit {

  flagEdit: boolean = false;
  listCriterio: any = [];

  form: any;

  test = [
    formApprovalTable,
    formHomologTable,
  ]

  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
      step: new FormArray([]),
    }); 
  }

  ngOnInit(): void {
    this.getAllCriterios();
    
  }

  toggleEditar(isEdit, criterio = null) {
    this.limparForm()
    if(isEdit && criterio) {
      this.form.patchValue({ ...criterio });
      const formArray = <FormArray>this.form.controls['step'];
      formArray.clear();
      criterio.step.forEach(cr => {
        this.addStepLine(cr);
      })
    }
    this.flagEdit = isEdit;
  }

  getAllCriterios() {
    //FEITO
    this.siteService
      .getAllCriterios()
      .pipe(take(1))
      .subscribe(data => {
        this.listCriterio = data;
        this.listCriterio.forEach(criterio => {
          criterio.step.forEach(step => {
            step.section.forEach(section => {
              section.question.forEach(question => {
                question.maxNota = String(question.maxNota).replaceAll('.', ',');
              })
            })
          });
        })
      });
  }

  deleteById(idCriterio, title) {
    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: `"${title}"` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //FEITO
        this.siteService
          .deleteById(idCriterio)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error("Ocorreu um erro ao deletar o critério!");
              throw err;
            })
          )
          .subscribe(() => {
            this.toastr.success("Critério deletado com sucesso!");
            this.getAllCriterios();
          });
          
      }
    })
  }

  onSubmit() {
    let criterios = this.changeMaxNotaStringToNumber({...this.form.value});
    if (this.form.valid) {
      if (this.form.value._id) {
        //FEITO
        this.siteService.atualizarCriterio(criterios)
          .pipe(catchError(err => {
            this.toastr.error("Ocorreu um erro ao atualizar o critério!");
            throw err;
          }))
          .subscribe(() => {
            this.toastr.success('Critério de Avaliação atualizado', 'Sucesso');
            this.toggleEditar(false);
            this.getAllCriterios();
          })

      } else {
        //FEITO
        this.siteService.cadastrarCriterio(criterios)
          .pipe(catchError(err => {
            this.toastr.error("Ocorreu um erro ao cadastrar o critério!");
            throw err;
          }))
          .subscribe(() => {
            this.toastr.success('Critério de Avaliação cadastrado', 'Sucesso');
            this.toggleEditar(false);
            this.getAllCriterios();
          })
      }

    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }
    
  }

  changeMaxNotaStringToNumber(criterios) {
    criterios.step.forEach(step => {
      step.section.forEach(section => {
        section.question.forEach(question => {
          question.maxNota = Number(question.maxNota.replaceAll(',', '.'));
        })
      })
    });
    return criterios;
  }

  changeMaxNotaNumberToString(criterios) {
    return criterios;
  }

  get getFormStep() {
    return this.form.controls['step']
  }

  getFormSection(stepIndex) {
    return this.form.controls['step'].controls[stepIndex].controls['section']
  }

  getFormQuestion(stepIndex, sectionIndex) {
    return this.form.controls['step'].controls[stepIndex].controls['section'].controls[sectionIndex].controls['question']
  }

  // ADICIONAR ETAPA
  public initStepLine() {
    return this.builder.group({
      title: new FormControl('', Validators.required),
      section: new FormArray([this.initSectionLine()]),
    });
  }

  public addStepLine(step = null) {
    const control = <FormArray>this.form.controls['step'];
    if (step != null) {
      const sectionGroup = step.section ? step.section.map(se => this.addSectionline(se)) : [];
      control.push(this.builder.group({
        _id: new FormControl(step._id),
        title: new FormControl(step.title, Validators.required),
        section: new FormArray(sectionGroup),
      }));
    } else {
      control.push(this.initStepLine());
    }

  }

  removeStepLine(index: number) {
    const stepArray = this.form.get('step') as FormArray;
    stepArray.removeAt(index);
  }


  // FIM ADICIONAR ETAPA

  // ADICIONAR SECAO
  public initSectionLine() {
    return this.builder.group({
      title: new FormControl('', Validators.required),
      question: new FormArray([this.initQuestionLine()]),
    });

  }

  public addSectionline(section = null, indexStep = 0) {
    if (section != null) {
      const questionGroup = section.question ? section.question.map(q => this.addQuestionLine(q)) : [];
      return this.builder.group({
        _id: new FormControl(section._id),
        title: new FormControl(section.title, Validators.required),
        question: new FormArray(questionGroup),
      });
    } else {
      const control = <FormArray>this.form.controls['step'].controls[indexStep].controls['section'];
      control.push(this.initSectionLine());
    }

  }

  removeSectionLine(indexStep: number, indexSection: number) {
    const stepArray = this.form.get('step') as FormArray;
    const sectionArray = stepArray.at(indexStep).get('section') as FormArray;
    sectionArray.removeAt(indexSection)
  }

  // FIM ADICIONAR SECAO

  // ADICIONAR PERGUNTA

  public initQuestionLine() {
    return this.builder.group({
      text: new FormControl('', Validators.required),
      maxNota: new FormControl('0', Validators.required),
    });
  }

  public addQuestionLine(question = null, indexStep = 0, indexSection = 0) {
    if (question != null) {
      return this.builder.group({
        _id: new FormControl(question._id),
        text: new FormControl(question.text, Validators.required),
        maxNota: new FormControl(question.maxNota, Validators.required),
      });
    } else {
      const control = <FormArray>this.form.controls['step'].controls[indexStep].controls['section'].controls[indexSection].controls['question'];
      control.push(this.initQuestionLine());
    }

  }

  removeQuestionLine(indexStep: number, indexSection: number, indexQuestion: number) {
    const stepArray = this.form.get('step') as FormArray;
    const sectionArray = stepArray.at(indexStep).get('section') as FormArray;
    const questionArray = sectionArray.at(indexSection).get('question') as FormArray;
    questionArray.removeAt(indexQuestion)
  }


  // FIM ADICIONAR PERGUNTA

  limparForm() {
    this.form.reset();
    const formArray = <FormArray>this.form.controls['step'];
    formArray.clear();
    this.addStepLine();
  }

  validateNumber(event) {
    const pattern = /^[0-9]+(\,[0-9]{0,2})?$/;
    let inputChar = String.fromCharCode(event.charCode);
    let input = event.target.value+inputChar;
    if (!pattern.test(input) ) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
