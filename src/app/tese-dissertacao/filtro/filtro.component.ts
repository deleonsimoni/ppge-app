import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-filtro',
    templateUrl: './filtro.component.html',
    styleUrls: ['./../tese-dissertacao.component.scss']
  })
  export class FiltroComponent {
  
    @Input()
    filtros: any[] | undefined;
  
    constructor() { }
  }