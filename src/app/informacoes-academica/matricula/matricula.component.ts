import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatriculaService } from './matricula.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatriculaComponent implements OnInit {

  matricula: any;

  constructor(private matriculaService: MatriculaService) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.getMatricula();
  }

  private getMatricula() {
    this.matriculaService.getMatricula().subscribe(arr => {
      this.matricula = arr;
    });
  }
}
