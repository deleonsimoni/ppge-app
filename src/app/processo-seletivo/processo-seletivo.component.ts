import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProcessoSeletivoService } from "./processo-seletivo.service";

@Component({
    selector: 'app-processo-seletivo',
    templateUrl: './processo-seletivo.component.html',
    styleUrls: ['./processo-seletivo.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class ProcessoSeletivoComponent implements OnInit {

    processoSeletivo: any;

    constructor(private processoSeletivoService: ProcessoSeletivoService) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getProcessoSeletivo();
    }

    getProcessoSeletivo() {
    this.processoSeletivoService.getProcessoSeletivo().subscribe(arr => {
        this.processoSeletivo = arr;
      });
    }
}