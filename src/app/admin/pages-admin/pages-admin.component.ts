import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

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
      this.data = res;
      this.form.reset();
      this.form.patchValue({...res, selectPage:pageSelected, language:languageSelected});
    }, err => {
      this.carregando = false;
      this.toastr.error(`Ocorreu um erro ao listar a página`, 'Atenção: ');
    });
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
      this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
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

}
