import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RankViewDialogComponent } from '@app/shared/components/rank-view-dialog/rank-view-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';
import { RanklistDialogService } from './ranklist-dialog.service';

export interface DadoDTO {
  idProcesso: string;
}

@Component({
  selector: 'app-ranklist-dialog',
  templateUrl: './ranklist-dialog.component.html',
  styleUrls: ['./ranklist-dialog.component.scss']
})
export class RanklistDialogComponent implements OnInit {

  listRanks: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DadoDTO,
    private ranklistService: RanklistDialogService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { 
    console.log("datassssssssssssssss: ", this.data)
  }

  ngOnInit(): void {

    this.ranklistService
      .listarRanksAtivo(this.data.idProcesso)
      .pipe(
        take(1),
        catchError(e => {
          this.toastr.error("Erro ao listar resultados");
          throw e;
        })
      ).subscribe((data: any) => {
        this.listRanks = data?.listRank;
        console.log("this.listRanks: ", this.listRanks);
        
      })
  }

  visualizar(idRank) {
    this.dialog.open(RankViewDialogComponent, {
      width: '78%',
      data: { idProcesso: this.data.idProcesso, idRank }
    });

  }

}
