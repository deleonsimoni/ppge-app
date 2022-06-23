import { Component, OnInit } from '@angular/core';
import { FormularioService } from './formulario.service';

@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.scss']
  })
  export class FormularioComponent implements OnInit {

    formulario: any;

    constructor(private formularioService: FormularioService) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getFormulario();
    }

    getFormulario() {
      this.formularioService.getFormulario().subscribe(arr => {
        this.formulario = arr;
      });
    }
}