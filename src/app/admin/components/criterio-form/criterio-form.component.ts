import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-criterio-form',
  templateUrl: './criterio-form.component.html',
  styleUrls: ['./criterio-form.component.scss']
})
export class CriterioFormComponent implements OnInit, OnChanges {

  @Input() criterio: any;
  @Input() isEditable: boolean;
  @Output() criterioChange = new EventEmitter<any>();
  
  form: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private siteService: SiteAdminService,
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
      step: new FormArray([]),
    }); 
   }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.criterio.firstChange) {
      console.log("changeschangeschangeschangeschangeschanges: ", changes)
      this.criterio = changes.criterio.currentValue
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    console.log("IS EDITABLE: ", this.isEditable);
    
    if(this.criterio) {
      console.log("RECEBEU CRITERIO: ", this.criterio);
      this.form.patchValue({ ...this.criterio });
      const formArray = <FormArray>this.form.controls['step'];
      formArray.clear();
      this.criterio.step.forEach(st => {
        this.addStepLine(st);
      })
      
    } else {
      console.log("NAO RECEBEU CRITÉRIO");
      this.initStepLine()
    }
  }

  onSubmit() {
    console.log("ON SUBMIT: ", this.form.value);
    this.criterioChange.emit(this.form);
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
      let titleFormControl = new FormControl(section.title, Validators.required);
      if(!this.isEditable)
        titleFormControl.disable();
      return this.builder.group({
        _id: new FormControl(section._id),
        title: titleFormControl,
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
      maxNota: new FormControl(0, Validators.required),
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
    const pattern = /^[0-9]+(\.[0-9]{0,2})?$/;
    let inputChar = String.fromCharCode(event.charCode);
    let input = event.target.value+inputChar;
    if (!pattern.test(input) ) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
