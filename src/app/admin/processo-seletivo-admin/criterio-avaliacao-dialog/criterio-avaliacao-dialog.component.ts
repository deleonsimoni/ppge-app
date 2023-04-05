import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-criterio-avaliacao-dialog',
  templateUrl: './criterio-avaliacao-dialog.component.html',
  styleUrls: ['./criterio-avaliacao-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CriterioAvaliacaoDialogComponent implements OnInit {
  listCriterios: any = [];
  criterioSelecionado: any;
  flagEdited: boolean = false;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CriterioAvaliacaoDialogComponent>,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    console.log("DATA: ", this.data);
    this.criterioSelecionado = this.data?.criterio;
    //FEITO
    this.siteService.getAllCriterios().subscribe(listCriterios => {
      this.listCriterios = listCriterios;
    });
  }

  selecionarCriterio(idCriterio) {
    this.flagEdited = true;
    console.log("criterio: ", idCriterio)
    this.criterioSelecionado = this.listCriterios.find(cr => cr._id === idCriterio)
    this.changeDetectorRef.detectChanges();
    console.log("criterioSelecionado: ", this.criterioSelecionado)
  }

  salvarVinculoCriterio() {
    if(this.criterioSelecionado) {
      //FEITO
      this.siteService.salvarVinculoCriterio(this.criterioSelecionado, this.data.idProcessoSeletivo)
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
