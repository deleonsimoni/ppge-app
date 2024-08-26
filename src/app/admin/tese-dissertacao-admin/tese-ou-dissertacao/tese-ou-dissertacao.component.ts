import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from '@angular/material/dialog';
import { ComfirmDeleteComponent } from "./confirm-delet.component";
import { ResumoDialogComponent } from "../resumo-dialog/resumo-dialog.component";


@Component({
    selector: 'app-tese-ou-dissertacao',
    templateUrl: './tese-ou-dissertacao.component.html',
    styleUrls: ['./../tese-dissertacao-admin.component.scss'],
})
export class TeseOuDissertacaoComponent {
    @Input()
    datas: any[];

    @Input()
    limit: number;

    @Output() resposta = new EventEmitter();

    constructor(
        private siteService: SiteAdminService,
        private toastr: ToastrService,
        public dialog: MatDialog
    ) { }

    apagarTitulo(id, nome, titulo, tipo) {
        const dialogRef = this.dialog.open(ComfirmDeleteComponent, {
            width: '750px',
            data: { name: nome, title: titulo }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.siteService.deletarTeseDissertacao(id).subscribe((res: any) => {
                    this.resposta.emit({ "acao": "atualizar", "tipo": tipo })
                }, err => {
                    this.toastr.error('Ocorreu um erro ao apagar', 'Atenção: ');
                });
            }
        });
    }

    editarTitulo(di) {
        this.resposta.emit({ "acao": "editar", obj: di });
    }

    openResumoDialog(teseDissertacao) {
        this.dialog.open(ResumoDialogComponent, {
            width: '750px',
            data: { 
                resumo: teseDissertacao?.resumo ?? "<span style='color: red'>Não há resumo cadastrado</span>", 
                titulo: teseDissertacao?.titulo, 
                palavrasChave: teseDissertacao?.palavrasChave
            }
        });

    }
}