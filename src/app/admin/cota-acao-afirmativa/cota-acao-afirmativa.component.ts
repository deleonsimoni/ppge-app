import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';
import { ComfirmDeleteProcessoComponent } from '../processo-seletivo-admin/modal/confirm-delet-processo.component';

@Component({
  selector: 'app-cota-acao-afirmativa',
  templateUrl: './cota-acao-afirmativa.component.html',
  styleUrls: ['./cota-acao-afirmativa.component.scss']
})
export class CotaAcaoAfirmativaComponent implements OnInit {

  form: any;
  listCotas: any = [];
  questionCotas: string = "";

  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { 
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
    }); 
  }

  ngOnInit(): void {
    this.getAllCotas()
  }

  limparForm() {
    this.form.reset();
  }

  getAllCotas() {
    //FEITO
    this.siteService.getAllCotas().subscribe((listCotas: any) => {
      if(listCotas) {
        let listCotasSemQuestion = listCotas.filter(cota => !cota.isQuestion);
        let question = listCotas.filter(cota => cota.isQuestion)[0];
        this.questionCotas =  question ? question.title : "";
        this.listCotas = listCotasSemQuestion;
      }
    });
  }

  deleteById(idCota, title) {
    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: `"${title}"` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //FEITO
        this.siteService
          .deleteCotaById(idCota)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error("Ocorreu um erro ao deletar a cota!");
              throw err;
            })
          )
          .subscribe(() => {
            this.toastr.success("Cota deletado com sucesso!");
            this.getAllCotas();
          });
          
      }
    })
    
  }

  editar(cota) {
    this.form.patchValue(cota)

  }

  registerQuestion() {
    if(this.questionCotas.trim() != "") {
      this.siteService.atualizarQuestionCota(this.questionCotas)
        .pipe(
          take(1),
          catchError(err => {
            this.toastr.error("Ocorreu um erro ao editar a cota!");
            throw err;
          })
        )
        .subscribe((data: any) => {
          this.getAllCotas();
        })
    } else {
      this.toastr.error('Preencha corretamente a pergunta!', 'Atenção: ');
    }
  }

  register() {
    if(this.form.valid) {
      if (this.form.value._id) {
        this.siteService.atualizarCota(this.form.value)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error("Ocorreu um erro ao editar a cota!");
              throw err;
            })
          )
          .subscribe((data: any) => {
            this.limparForm()
            this.getAllCotas();
          })
      } else {
        this.siteService.cadastrarCota(this.form.value)
          .pipe(
            take(1),
            catchError(err => {
              this.toastr.error("Ocorreu um erro ao salvar a cota!");
              throw err;
            })
          )
          .subscribe((data: any) => {
            this.limparForm()
            this.getAllCotas();
          })
      }
    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }

  }

}
