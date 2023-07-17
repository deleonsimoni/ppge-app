import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormularioService } from './formulario.service';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class FormularioComponent implements OnInit {

    formulario: any = {};

    constructor(
      private formularioService: FormularioService,
      private toastr: ToastrService,
    ) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getFormulario();
    }

    getFormulario() {
      this.formularioService.getFormulario()
        .pipe(
          catchError(err => {
            this.toastr.error("Ocorreu um erro ao carregar a página!", "Atenção");
            throw err;
          })
        )
        .subscribe(formulario => {
          this.formulario = formulario ?? {};
        });
    }
}