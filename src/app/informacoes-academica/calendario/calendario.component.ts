import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CalendarioService } from "./calendario.service";

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class CalendarioComponent implements OnInit {

    calendario: any;

    constructor(private calendarioService: CalendarioService) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getCalendario();
    }

    getCalendario() {
    this.calendarioService.getCalendario().subscribe(arr => {
        this.calendario = arr;
      });
    }
}