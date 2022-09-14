import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ComfirmDeleteComponent } from "./confirm-delet.component";


@Component({
    selector: 'app-tese-ou-dissertacao',
    templateUrl: './tese-ou-dissertacao.component.html',
    styleUrls: ['./../tese-dissertacao-admin.component.scss'],
})
export class TeseOuDissertacaoComponent implements OnInit {
    @Input()
    datas: any[];

    @Output() resposta = new EventEmitter();

    constructor(
        private siteService: SiteAdminService,
        private toastr: ToastrService,
        public dialog: MatDialog

    ) { }

    ngOnInit(): void {
        console.log(this.datas);
    }

    apagarTitulo(id, nome, titulo, tipo) {
        const dialogRef = this.dialog.open(ComfirmDeleteComponent, {
            width: '750px',
            data: { name: nome, title: titulo }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.siteService.deletarTeseDissertacao(id).subscribe((res: any) => {
                    this.resposta.emit({"acao": "atualizar", "tipo": tipo})
                }, err => {
                    this.toastr.error('Ocorreu um erro ao apagar', 'Atenção: ');
                });
            }
        });
    }

    editarTitulo(di) {
        this.resposta.emit({"acao": "editar", obj: di});
    }
}