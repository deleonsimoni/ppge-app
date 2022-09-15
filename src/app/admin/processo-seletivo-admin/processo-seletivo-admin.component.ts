import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-processo-seletivo-admin',
    templateUrl: './processo-seletivo-admin.component.html',
    styleUrls: ['./processo-seletivo-admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProcessoSeletivoAdminComponent implements OnInit {
    form: any;

    constructor(
        private builder: FormBuilder,
        private siteService: SiteAdminService,
        private toastr: ToastrService
    ) {
        this.form = this.builder.group({
            _id: [],
            pagina: ["tese/dissertacao", [Validators.required]],
            title: [null, [Validators.required]],
            edital: [null, [Validators.required]],
            formulario: [null, [Validators.required]],
            complemento: [null, [Validators.required]],
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