import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  page: number = 1;
  limit: number = 10;
  tipo: string = '1';
  qtdTotalItems: number | undefined | null;

  searchOrientador: string = "";
  searchAutor: string = "";
  searchAno: string = "";
  searchTitulo: string = "";

  public form: FormGroup;
  carregando = false;
  datas: any[] = [];
  resumo;

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
    private toastr: ToastrService,
    private elementRef: ElementRef
  ) {
    this.form = this.builder.group({
      _id: [],
      pagina: ["tese/dissertacao", [Validators.required]],
      tipo: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      orientador: [null, [Validators.required]],
      titulo: [null, [Validators.required]],
      linkTitulo: [null, []],
      resumo: [null, []],
      palavrasChave: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getTesesDissertacoes();
    this.addContentLine();
  }

  limparFiltro() {
    this.searchOrientador = "";
    this.searchAutor = "";
    this.searchAno = "";
    this.searchTitulo = "";
  }

  getTesesDissertacoes(tipo = '1', page = 1, limit = 10) {
    

    this.siteService.listTeseDissertacao(tipo, page, limit, this.searchOrientador, this.searchAutor, this.searchAno, this.searchTitulo)
    .subscribe((res: any) => {
      this.tipo = tipo;
      this.page = page;
      this.carregando = false;
      this.datas = res && res.data ? res.data : [];
      this.qtdTotalItems = res.qtdTotalItems;
    }, err => {
      this.carregando = false;
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  public addContentLine(content = null) {
    const control = <FormArray>this.form.controls['palavrasChave'];
    if (content != null) {
      control.push(new FormControl(content));
    } else {
      control.push(new FormControl(''));
    }
  }

  public removeContentLine(index) {
    const teste = <FormArray>this.form.controls['palavrasChave'];
    teste.removeAt(index);
  }

  get getFormPalavrasChave() {
    return this.form.controls['palavrasChave']
  }

  public register() {

    if (this.form.valid) {

      if (this.form.value._id) {
        this.siteService.atualizarTeseDissertacao(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Tese/Dissertação alterada com sucesso', 'Sucesso');
            this.getPerTipo(res.tipo);
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });
      } else {
        this.siteService.cadastrarTeseDissertacao(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Tese/Dissertação cadastrada', 'Sucesso');
            this.getPerTipo(res.tipo);
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }
  }

  limparForm() {
    this.form.reset();
    this.form.patchValue({ pagina: 'tese/dissertacao' });
    const control = <FormArray>this.form.controls['palavrasChave'];
    control.clear();
    this.addContentLine();
  }

  getPerTipo(tipo: string) {
    this.getTesesDissertacoes(tipo, 1, this.limit);
  }

  reciverFeedback(resposta) {
    if (resposta.acao === 'atualizar') {
      this.getPerTipo(resposta.tipo);
      this.limparForm();
    } else if (resposta.acao === 'editar') {
      window.scroll({
        top: 0,
        left: 0
      })
      this.form.patchValue(resposta.obj);
      const formArray = <FormArray>this.form.controls['palavrasChave'];
      formArray.clear();
      resposta.obj.palavrasChave.forEach(element => {
        this.addContentLine(element)
      });
    }
  }

  onPagination(event) {
    this.getTesesDissertacoes(this.tipo, event.newPage, this.limit);
    this.scrollTo("teste-2");
  }

  // Função para rolar até a sessão
  scrollTo(elementId: string): void {
    const element = this.elementRef.nativeElement.querySelector('#' + elementId);
    if (element) {
      const scrollTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }
}
