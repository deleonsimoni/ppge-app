import { Component, EventEmitter, Input, Output } from "@angular/core";
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
    
    @Input()
    typeFilter: string;

    @Output()
    filterByTab = new EventEmitter<any>();

    listTesesDissetacoes: any[] | undefined;
  
    constructor(public dialog: MatDialog) {
    }
    

    filterByType(type: string) {
      this.filterByTab.emit({type});
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