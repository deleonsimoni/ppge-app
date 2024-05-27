import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-criterio-homologacao-dialog',
  templateUrl: './criterio-homologacao-dialog.component.html',
  styleUrls: ['./criterio-homologacao-dialog.component.scss']
})
export class CriterioHomologacaoDialogComponent implements OnInit {
  listCriterios: any = [];
  criterioSelecionado: any;
  flagEdited: boolean = false;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CriterioHomologacaoDialogComponent>,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.criterioSelecionado = this.data?.criterio;
    //FEITO
    this.siteService.getAllCriteriosHomologacao().subscribe(listCriterios => {
      this.listCriterios = listCriterios;
    });
  }

  selecionarCriterio(idCriterio) {
    this.flagEdited = true;
    this.criterioSelecionado = this.listCriterios.find(cr => cr._id === idCriterio)
    this.changeDetectorRef.detectChanges();
  }

  salvarVinculoCriterio() {
    if(this.criterioSelecionado) {
      //FEITO
      this.siteService.salvarVinculoCriterioHomologacao(this.criterioSelecionado, this.data.idProcessoSeletivo)
        .pipe(
          catchError(err => {
            this.toastr.error(err.error?.status == 400 && err.error.msg ? err.error.msg : "Ocorreu um erro ao vincular o critério!");
            throw err;
          })
        )
        .subscribe(() => {
          this.toastr.success("Critério vinculado com sucesso!");
          this.dialogRef.close(true);
        })
    } else {
      this.toastr.error("Nenhum critério selecionado para alteração!");

    }
  }

}
