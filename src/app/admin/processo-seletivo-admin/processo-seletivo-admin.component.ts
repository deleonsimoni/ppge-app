import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { ToastrService } from "ngx-toastr";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-processo-seletivo-admin',
    templateUrl: './processo-seletivo-admin.component.html',
    styleUrls: ['./processo-seletivo-admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProcessoSeletivoAdminComponent implements OnInit {
    form: any;

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
            title: [null, [Validators.required]],
            content: [null, [Validators.required]]
        });
    }


    ngOnInit(): void { }

    public register() {
        if (this.form.valid) {
    
          if (this.form.value._id) {
            // this.siteService.atualizarTeseDissertacao(this.form.value)
            //   .subscribe((res: any) => {
            //     this.toastr.success('Histórico alterado com sucesso', 'Sucesso');
            //     this.getPerTipo(res.tipo);
            //     this.limparForm();
            //   }, (err: any) => {
            //     this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
            //   });
          } else {
            // this.siteService.cadastrarTeseDissertacao(this.form.value)
            //   .subscribe((res: any) => {
            //     this.toastr.success('Histórico cadastrado', 'Sucesso');
            //     this.getPerTipo(res.tipo);
            //     this.limparForm();
            //   }, (err: any) => {
            //     this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
            //   });
          }
    
        } else {
            this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
        }
      }

      limparForm() {
        this.form.reset();
      }
}