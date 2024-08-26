import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';
import { RankViewDialogService } from './rank-view-dialog.service';

export interface RankViewDTO {
  idProcesso: string;
  idRank: string;
}

@Component({
  selector: 'app-rank-view-dialog',
  templateUrl: './rank-view-dialog.component.html',
  styleUrls: ['./rank-view-dialog.component.scss']
})
export class RankViewDialogComponent implements OnInit {

  rankDetalhe: any = {};
  displayedColumns = [
    "codInscricao",
    "homologado",
    "notas",
    "mediaFinal",
    "situacao",
    "opcaoVaga",
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RankViewDTO,
    private serviceRankView: RankViewDialogService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.serviceRankView.getDetalheRank(this.data.idProcesso, this.data.idRank)
      .pipe(
        take(1),
        catchError(e => {
          throw e;
        })
      )
      .subscribe((data: any) => {
        if(data?.listRank) {
          if(data.type == 2) {
            this.displayedColumns.unshift('orientador');
          }
          this.rankDetalhe = data.listRank[0];
        }
      })
  }

  getTextHomologado(isHomologado) {
    if(typeof isHomologado == "boolean") {
      return isHomologado ? "Deferido" : "Indeferido";
    } else {
      return "N/A";
    }
  }
  toNotRoundedFixed = (nr, fixed) => nr?.toFixed(fixed + 3).slice(0, -3)

}
