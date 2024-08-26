import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RankViewDialogComponent } from '@app/shared/components/rank-view-dialog/rank-view-dialog.component';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
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
  myUser: User = <User>{};

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
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    
    let user$ = this.authService.getUser();
    user$.subscribe(user => {this.myUser = user})
    //FEITO
    this.siteService.getProcessosSeletivoTitle().subscribe((data: any) => {
      this.listProcessoSeletivo = data;
    });

  }

  getAllRanks(idProcesso) {
    this.idProcessoSelecionado = idProcesso;
    //FEITO
    this.siteService
      .getAllRanks(idProcesso)
      .pipe(
        take(1),
        catchError(e => {throw e})
      )
      .subscribe((data: any) => {
        this.listRanks = data?.listRank;
      })
  }

  apagar(idRank) {
    //FEITO
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
    //FEITO
    this.siteService.atualizarStatusRankAtivo(event.checked, this.idProcessoSelecionado, idRank).subscribe(() => {
        this.toastr.success('Visibilidade atualizada com sucesso.', 'Sucesso');
      },
      err => {
        this.toastr.error('Ocorreu um erro ao atualizar a visibilidade.', 'Atenção: ');

      });
  }


  gerarRank() {
    if(this.idProcessoSelecionado) {
      //FEITO
      this.siteService.gerarRank(this.idProcessoSelecionado, this.isFinalRank)
        .pipe(
          take(1),
          catchError(err => {
            this.toastr.error("Ocorreu um erro ao gerar o resultado!", "Atenção");
            throw err;
          })
        )
        .subscribe(() => {
          this.getAllRanks(this.idProcessoSelecionado);
        })
    }
  }

}
