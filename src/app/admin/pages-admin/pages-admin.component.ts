import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ComfirmDeleteProcessoComponent } from '../processo-seletivo-admin/modal/confirm-delet-processo.component';

@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styleUrls: ['./pages-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesAdminComponent implements OnInit {
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;

  public form: FormGroup;
  carregando = false;
  data: any;
  dataExpansivel: any = null;
  listCorpoDocenteName: any = null;
  expansivel: boolean = false;
  content;
  listUrlExpansivel: string[] = [
    'linha_pesquisa',
    'cursos',
    'noticias',
    'revistas',
  ]
  private image: FileList;




  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
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
    public dialog: MatDialog
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, []],
      content: [null, []],
      logo: [null, []],
      facebook: [null, []],
      youtube: [null, []],
      instagram: [null, []],
      twitter: [null, []],

      /* Para pagina 'Linha de Pesquisa' */
      corpoDocente: [null, []],
      "pt-br": this.builder.group({
        navTitle: [null, []],
        title: [null, []],
        content: [null, []],
      }),
      "en-us": this.builder.group({
        navTitle: [null, []],
        title: [null, []],
        content: [null, []],
      }),
      "es-es": this.builder.group({
        navTitle: [null, []],
        title: [null, []],
        content: [null, []],
      }),

      selectPage: ['historico', [Validators.required]],
      language: ['pt-br', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getInfoPage();

  }
  // Variavel de setups
  private setups = {
    linha_pesquisa: () => this.setUpLinhaPesquisa()
  }

  setUpLinhaPesquisa() {
    this.siteService.listCorpoDocenteName().subscribe(data => {
      this.listCorpoDocenteName = data;
    })
  }

  getInfoPage() {
    const pageSelected = this.form.value.selectPage;
    const languageSelected = this.form.value.language;
    this.siteService.listPage(pageSelected, languageSelected).subscribe((res: any) => {
      this.carregando = false;
      if (res && res.constructor.name === "Array") {
        this.expansivel = true;
        this.dataExpansivel = res;
        this.data = res[0];
        if (this.data) this.data.index = 0;
        this.form.reset();
        this.form.patchValue({ ...res[0], selectPage: pageSelected, language: languageSelected });
      } else {
        this.expansivel = false;
        this.dataExpansivel = null;
        this.data = res;
        this.form.reset();
        this.form.patchValue({ ...res, selectPage: pageSelected, language: languageSelected });
      }
    }, err => {
      this.carregando = false;
      this.toastr.error(`Ocorreu um erro ao listar a página`, 'Atenção: ');
    });
    if (this.setups[pageSelected]) this.setups[pageSelected]();
  }

  adicionarPagina() {
    const newPage = { navTitle: "Título menu" };
    this.dataExpansivel.push(newPage);
    this.selecionarPagina(this.dataExpansivel.length - 1);
  }

  selecionarPagina(index) {
    const pageSelected = this.form.value.selectPage;
    const languageSelected = this.form.value.language;
    this.form.reset();
    this.form.patchValue({ ...this.dataExpansivel[index], selectPage: pageSelected, language: languageSelected });
    this.data = this.dataExpansivel[index];
    if (this.data) {
      this.data.index = index;
    }
  }

  public register() {
    const pageSelected = this.form.value.selectPage;

    if (this.form.valid) {

      if (this.form.value._id) {

        this.siteService.atualizarPage(this.form.value, pageSelected)
          .subscribe((res: any) => {
            this.getInfoPage();
            this.toastr.success(`Página alterada com sucesso`, 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });

      } else {
        this.siteService.cadastrarPage(this.form.value, pageSelected)
          .subscribe((res: any) => {
            this.getInfoPage();
            this.toastr.success(`Página cadastrada`, 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    } else
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
  }

  public loadImage() {
    let element: HTMLElement = document.getElementById('image') as HTMLElement;
    element.click();
  }

  public setImage(files: FileList): void {
    this.image = files;

    const reader = new FileReader();
    reader.readAsDataURL(this.image[0]); // Read file as data url
    reader.onloadend = (e) => { // function call once readAsDataUrl is completed
      this.imageRender.nativeElement.src = e.target['result']; // Set image in element
    };
  }

  public excluirPaginaExpansivel() {
    const pageSelected = this.form.value.selectPage;

    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: this.data.title }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        if (!!this.data._id) {
          this.siteService.deletarPage(this.form.value, pageSelected)
            .pipe(take(1))
            .subscribe(() => {
              this.toastr.success(`Página deletada`, 'Sucesso');
              this.dataExpansivel.splice(this.data.index, 1);
              this.selecionarPagina(0);
            },
              () => {
                this.toastr.error('Ocorreu um erro ao deletar', 'Atenção: ');
              });
        } else {
          this.dataExpansivel.splice(this.data.index, 1);
          this.selecionarPagina(0);
        }

      }
    });
  }

}
