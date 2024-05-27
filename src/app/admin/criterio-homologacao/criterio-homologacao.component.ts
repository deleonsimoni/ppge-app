import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';
import { ComfirmDeleteProcessoComponent } from '../processo-seletivo-admin/modal/confirm-delet-processo.component';

@Component({
  selector: 'app-criterio-homologacao',
  templateUrl: './criterio-homologacao.component.html',
  styleUrls: ['./criterio-homologacao.component.scss']
})
export class CriterioHomologacaoComponent implements OnInit {

  flagEdit: boolean = false;
  listCriterio: any = [];

  form: any;


  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
      questions: this.builder.array([]),
    });
  }
  
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.getAllCriteriosHomologacao();
    
  }

  addQuestionsLine(question = null): void {
    const questionControl = this.builder.control(question ?? '', Validators.required);
    this.questions.push(questionControl);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  toggleEditar(isEdit, criterio = null) {
    this.limparForm()
    if(isEdit && criterio) {
      this.form.patchValue({ ...criterio });
      const formArray = <FormArray>this.form.controls['questions'];
      formArray.clear();
      criterio.questions.forEach(question => {
        this.addQuestionsLine(question);
      })
    }
    this.flagEdit = isEdit;
  }

  getAllCriteriosHomologacao() {
    //FEITO
    this.siteService
      .getAllCriteriosHomologacao()
      .pipe(take(1))
      .subscribe(data => {
        this.listCriterio = data;
      });
  }

  deleteCriterioHomologacaoById(idCriterio, title) {
    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: `"${title}"` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //FEITO
        this.siteService
          .deleteCriterioHomologacaoById(idCriterio)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error("Ocorreu um erro ao deletar o critério!");
              throw err;
            })
          )
          .subscribe(() => {
            this.toastr.success("Critério deletado com sucesso!");
            this.getAllCriteriosHomologacao();
          });
          
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value._id) {

        this.siteService.atualizarCriterioHomologacao(this.form.value)
        .pipe(catchError(err => {
          this.toastr.error("Ocorreu um erro ao atualizar o critério!");
          throw err;
        }))
        .subscribe(() => {
          this.toastr.success('Critério de Homologação atualizado', 'Sucesso');
          this.toggleEditar(false);
          this.getAllCriteriosHomologacao();
        })

      } else {

        this.siteService.cadastrarCriterioHomologacao(this.form.value)
          .pipe(catchError(err => {
            this.toastr.error("Ocorreu um erro ao cadastrar o critério!");
            throw err;
          }))
          .subscribe(() => {
            this.toastr.success('Critério de Homologação cadastrado', 'Sucesso');
            this.toggleEditar(false);
            this.getAllCriteriosHomologacao();
          })
        
      }
    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }
  }


  // FIM ADICIONAR PERGUNTA

  limparForm() {
    this.form.reset();
    const formArray = <FormArray>this.form.controls['questions'];
    formArray.clear();
    this.addQuestionsLine();
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
