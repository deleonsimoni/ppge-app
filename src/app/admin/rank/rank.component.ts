import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RankViewDialogComponent } from '@app/shared/components/rank-view-dialog/rank-view-dialog.component';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankComponent implements OnInit {

  isFinalRank = false;

  displayedColumns = [
    "nome",
    "nota",
    "aprovado"
  ]

  listProcessoSeletivo: any;
  listInscricoes: any[] = [];

  listRanks: any = [];

  idProcessoSelecionado;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.siteService.getProcessosSeletivoTitle().subscribe((data: any) => {
      this.listProcessoSeletivo = data;
    });
  }

  getAllRanks(idProcesso) {
    this.idProcessoSelecionado = idProcesso;
    this.siteService
      .getAllRanks(idProcesso)
      .pipe(
        take(1),
        catchError(e => {throw e})
      )
      .subscribe((data: any) => {
        console.log("data: ", data);
        this.listRanks = data?.listRank;
      })
  }

  apagar(idRank) {
    console.log("apagar() idRank: ", idRank);
    this.siteService
    .deleteRankById(this.idProcessoSelecionado, idRank).pipe(
      take(1),
      catchError(e => {
        this.toastr.error('Erro ao deletar resultado.', 'Erro');
        throw e;
      })
    )
    .subscribe(() => {
      this.toastr.success('Resultado deletado com sucesso.', 'Sucesso');
      this.getAllRanks(this.idProcessoSelecionado);
    });
  }

  visualizar(idRank) {
    this.dialog.open(RankViewDialogComponent, {
      width: '80%',
      data: { idProcesso: this.idProcessoSelecionado, idRank }
    });
    
  }

  atualizarStatusRankAtivo(event: MatSlideToggleChange, idRank) {
    this.siteService.atualizarStatusRankAtivo(event.checked, this.idProcessoSelecionado, idRank).subscribe(() => {
        this.toastr.success('Visibilidade atualizada com sucesso.', 'Sucesso');
      },
      err => {
        this.toastr.error('Ocorreu um erro ao atualizar a visibilidade.', 'Atenção: ');

      });
  }


  gerarRank() {
    if(this.idProcessoSelecionado) {
      this.siteService.gerarRank(this.idProcessoSelecionado, this.isFinalRank)
        .pipe(
          take(1),
          catchError(err => {
            this.toastr.error("Ocorreu um erro ao gerar rank!", "Atenção");
            throw err;
          })
        )
        .subscribe(() => {
          this.getAllRanks(this.idProcessoSelecionado);
        })
    }
  }

}
