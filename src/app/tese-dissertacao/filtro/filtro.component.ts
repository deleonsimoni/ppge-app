import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ResumoDialogComponent } from "../resumo-dialog/resumo-dialog.component";

@Component({
    selector: 'app-filtro',
    templateUrl: './filtro.component.html',
    styleUrls: ['./../tese-dissertacao.component.scss']
  })
  export class FiltroComponent {
  
    @Input()
    filtros: any[] | undefined;
    
    @Input()
    limit: number;
  
    constructor(public dialog: MatDialog) { }

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