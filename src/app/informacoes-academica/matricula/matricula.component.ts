import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatriculaService } from './matricula.service';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatriculaComponent implements OnInit {

  matricula: any = {};

  constructor(
    private matriculaService: MatriculaService,
    private toastr: ToastrService,
  ) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.getMatricula();
  }

  private getMatricula() {
    this.matriculaService.getMatricula()
      .pipe(
        catchError(err => {
          this.toastr.error("Ocorreu um erro ao carregar a página!", "Atenção");
          throw err;
        })
      )
      .subscribe(matricula => {
        this.matricula = matricula ?? {};
      });
  }
}
