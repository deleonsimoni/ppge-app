import { Component, Input, OnInit } from "@angular/core";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-tese-ou-dissertacao',
    templateUrl: './tese-ou-dissertacao.component.html',
})
export class TeseOuDissertacaoComponent implements OnInit {
    @Input()
    datas: any[];

    constructor(
        private siteService: SiteAdminService,
        private toastr: ToastrService,
        ) {}

    ngOnInit(): void {
        console.log(this.datas);
    }

    apagarTitulo(id) {
        this.siteService.deletarTeseDissertacao(id).subscribe((res: any) => {
            this.datas = res;
            console.log(res);
            //this.form.patchValue(res[0]);
        }, err => {
            this.toastr.error('Ocorreu um erro ao apagar', 'Atenção: ');
        });
    }

    editarTitulo(di) {
        console.log(di);
    }
}