import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from "ngx-toastr";
import { ComfirmDeleteProcessoComponent } from "./modal/confirm-delet-processo.component";
import { ViewHtmlProcessoSeletivoComponent } from "./modal/view-html-processo-seletivo.component";
import { ViewInscritosProcessoSeletivoComponent } from "./modal/view-inscritos-processo-seletivo.component";

@Component({
  selector: 'app-processo-seletivo-admin',
  templateUrl: './processo-seletivo-admin.component.html',
  styleUrls: ['./processo-seletivo-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProcessoSeletivoAdminComponent implements OnInit {
  form: any;
  datas: any[];

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
    public dialog: MatDialog
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
      content: new FormArray([]),
    });
  }


  ngOnInit(): void { 
    this.getProcessoSeletivo();
    this.addContentLine();
  }

  public initContentLine() {
    return this.builder.group({
      contentTitle: new FormControl('', Validators.required),
      contentLink: new FormControl('', Validators.required),
    });
  }

  public addContentLine(content = null) {
    const control = <FormArray>this.form.controls['content'];
    if(content != null) {
      control.push(this.builder.group({
        contentTitle: new FormControl(content.contentTitle, Validators.required),
        contentLink: new FormControl(content.contentLink, Validators.required),
      }));
    } else {
      control.push(this.initContentLine());
    }
    
  }
  public removeContentLine(index) {
    const teste = <FormArray>this.form.controls['content'];
    teste.removeAt(index);
  }

  get getFormContent() {
    return this.form.controls['content']
  }

  public register() {
    
    if (this.form.valid) {
      if (this.form.value._id) {
        this.siteService.atualizarProcessoSeletivo(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Histórico alterado com sucesso', 'Sucesso');
            this.getProcessoSeletivo();
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });
      } else {
        this.siteService.cadastrarProcessoSeletivo(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Processo Seletivo cadastrado', 'Sucesso');
            this.getProcessoSeletivo();
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }
  }

  getProcessoSeletivo() {
    this.siteService.listProcessoSeletivo().subscribe((res: any) => {
      this.datas = res;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  limparForm() {
    this.form.reset();
    const formArray = <FormArray>this.form.controls['content'];
    formArray.clear();
    this.addContentLine();
  }

  apagar(id, title) {
    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.siteService.deletarProcessoSeletivo(id).subscribe((res: any) => {
          this.getProcessoSeletivo();
        }, err => {
          this.toastr.error('Ocorreu um erro ao apagar', 'Atenção: ');
        });
      }
    });
  }

  editar(obj) {
    this.form.patchValue(obj);
    const formArray = <FormArray>this.form.controls['content'];
    formArray.clear();
    obj.content.forEach(element => {
      this.addContentLine(element)
    });
  }

  visualizar(title, content) {
    const dialogRef = this.dialog.open(ViewHtmlProcessoSeletivoComponent, {
      width: '750px',
      data: { title: title, content: content }
    });
  }

  inscritos(id, title) {
    this.siteService.listProcessoSeletivoInscritos(id).subscribe((res: any) => {
      const dialogRef = this.dialog.open(ViewInscritosProcessoSeletivoComponent, {
        width: '750px',
        data: { title: title, users: res.enrolled }
      });
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  atualizarProcessoAtivo(event: MatSlideToggleChange, idProcesso) {
    console.log("atualizarProcessoAtivoatualizarProcessoAtivo: ", event.checked, " : ", idProcesso);
    this.siteService.atualizarProcessoAtivo(event.checked, idProcesso).subscribe(() => {
      this.toastr.success('Visibilidade atualizada com sucesso.', 'Sucesso');
    },
    err => {
      this.toastr.error('Ocorreu um erro ao atualizar a visibilidade.', 'Atenção: ');

    });
  }
}