import { Component, OnInit } from "@angular/core";
import { HorarioPeriodoService } from "./horario-periodo.service";

@Component({
    selector: 'app-horario-periodo',
    templateUrl: './horario-periodo.component.html',
    styleUrls: ['./horario-periodo.component.scss']
  })
  export class HorarioPeriodoComponent implements OnInit {
  
    horarioPeriodo: any;
  
    constructor(private horarioPeriodoService: HorarioPeriodoService) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getHorarioPeriodo();
    }
  
    private getHorarioPeriodo() {
      this.horarioPeriodoService.getHorarioPeriodo().subscribe(arr => {
        this.horarioPeriodo = arr;
      });
    }
  }
  