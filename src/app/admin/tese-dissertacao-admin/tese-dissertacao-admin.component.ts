import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tese-dissertacao-admin',
  templateUrl: './tese-dissertacao-admin.component.html',
  styleUrls: ['./tese-dissertacao-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeseDissertacaoAdminComponent implements OnInit {

  public form: FormGroup;
  carregando = false;
  datas: any[];

  eventSubscriber: Subscription;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    sanitize: false,
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };

  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService
  ) {
    this.form = this.builder.group({
      _id: [],
      pagina: ["tese/dissertacao", [Validators.required]],
      tipo: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      titulo: [null, [Validators.required]],
      dataSala: [null, [Validators.required]],
      banca: [null, [Validators.required]],
      ingresso: [null, [Validators.required]],
      linkTitulo: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.siteService.listTeseDissertacao('1').subscribe((res: any) => {
      this.carregando = false;
      this.datas = res;
    }, err => {
      this.carregando = false;
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  public register() {
    if (this.form.valid) {

      if (this.form.value._id) {
        this.siteService.atualizarTeseDissertacao(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Histórico alterado com sucesso', 'Sucesso');
            this.getPerTipo(res.tipo);
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });
      } else {
        this.siteService.cadastrarTeseDissertacao(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Histórico cadastrado', 'Sucesso');
            this.getPerTipo(res.tipo);
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    }
  }

  limparForm() {
    this.form.reset();
  }

  getPerTipo(tipo: string) {
    this.siteService.listTeseDissertacao(tipo).subscribe((res: any) => {
      this.carregando = false;
      this.datas = res;
    }, err => {
      this.carregando = false;
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  reciverFeedback(resposta) {
    if (resposta.acao === 'atualizar') {
      this.getPerTipo(resposta.tipo);
    } else if (resposta.acao === 'editar') {
      this.form.patchValue(resposta.obj);
    }
  }

}
