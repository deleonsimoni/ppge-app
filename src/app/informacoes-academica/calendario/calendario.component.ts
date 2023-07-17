import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CalendarioService } from "./calendario.service";
import { catchError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class CalendarioComponent implements OnInit {

    calendar: any = {};

    constructor(
      private calendarioService: CalendarioService,
      private toastr: ToastrService,
    ) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getInfoIaCalendar();
    }

    getInfoIaCalendar() {
      this.calendarioService.getInfoIaCalendar()
        .pipe(
          catchError(err => {
            this.toastr.error("Ocorreu um erro ao carregar a página!", "Atenção");
            throw err;
          })
        )
        .subscribe(calendar => {
          this.calendar = calendar ?? {};
        });
    }
}