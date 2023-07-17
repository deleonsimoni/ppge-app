import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HorarioPeriodoService } from "./horario-periodo.service";
import { catchError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-horario-periodo',
    templateUrl: './horario-periodo.component.html',
    styleUrls: ['./horario-periodo.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class HorarioPeriodoComponent implements OnInit {
  
    horarioPeriodo: any = {};
  
    constructor(
      private horarioPeriodoService: HorarioPeriodoService,
      private toastr: ToastrService,
    ) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getHorarioPeriodo();
    }
  
    private getHorarioPeriodo() {
      this.horarioPeriodoService.getHorarioPeriodo()
        .pipe(
          catchError(err => {
            this.toastr.error("Ocorreu um erro ao carregar a página!", "Atenção");
            throw err;
          })
        )
        .subscribe(horarioPeriodo => {
          this.horarioPeriodo = horarioPeriodo ?? {};
        });
    }
  }
  