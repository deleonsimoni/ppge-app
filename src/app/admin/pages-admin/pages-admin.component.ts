import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styleUrls: ['./pages-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesAdminComponent implements OnInit {

  public form: FormGroup;
  carregando = false;
  data: any;
  dataExpansivel: any = null;
  expansivel: boolean = false;
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;
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
  ) {
    this.form = this.builder.group({
      _id: [],
      navTitle: [null, []],
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      logo: [null, []],
      facebook: [null, []],
      youtube: [null, []],
      instagram: [null, []],
      twitter: [null, []],

      selectPage: ['historico', [Validators.required]],
      language: ['pt-br', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
    this.getInfoPage();
    
  }

  getInfoPage() {
    const pageSelected = this.form.value.selectPage;
    const languageSelected = this.form.value.language;
    this.siteService.listPage(pageSelected, languageSelected).subscribe((res: any) => {
      this.carregando = false;
      console.log("res.constructor.name: ", res.constructor.name);
      if(res.constructor.name === "Array") {
        this.expansivel = true;
        this.dataExpansivel = res;
        this.data = res[0];
        if(this.data) this.data.index = 0;
        this.form.reset();
        this.form.patchValue({...res[0], selectPage:pageSelected, language:languageSelected});
      } else {
        this.expansivel = false;
        this.dataExpansivel = null;
        this.data = res;
        this.form.reset();
        this.form.patchValue({...res, selectPage:pageSelected, language:languageSelected});
      }
    }, err => {
      this.carregando = false;
      this.toastr.error(`Ocorreu um erro ao listar a página`, 'Atenção: ');
    });
  }

  adicionarPagina() {
    console.log("chamou");
    const newPage = {navTitle: "Título menu"};
    this.dataExpansivel.push(newPage);
    this.selecionarPagina(this.dataExpansivel.length -1);
  }

  selecionarPagina(index) {
    const pageSelected = this.form.value.selectPage;
    const languageSelected = this.form.value.language;
    this.form.reset();
    this.form.patchValue({...this.dataExpansivel[index], selectPage:pageSelected, language:languageSelected});
    this.data = this.dataExpansivel[index];
    if(this.data) {
      console.log("this.data: ", this.data);
      this.data.index = index;
    }
  }

  public register() {
    const pageSelected = this.form.value.selectPage;
    
    if (this.form.valid) {

      if (this.form.value._id) {
        
        this.siteService.atualizarPage(this.form.value, pageSelected)
          .subscribe((res: any) => {
            this.toastr.success(`Página alterado com sucesso`, 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });

      } else {
        this.siteService.cadastrarPage(this.form.value, pageSelected)
          .subscribe((res: any) => {
            this.getInfoPage();
            this.toastr.success(`Página cadastrado`, 'Sucesso');
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
    console.log("Excluir: ", this.data);
    console.log("Excluir dataExpansivel: ", this.dataExpansivel[this.data.index]);
    if(!!this.data._id) {
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

}
