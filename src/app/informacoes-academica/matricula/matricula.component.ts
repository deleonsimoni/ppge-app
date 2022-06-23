import { Component, OnInit } from '@angular/core';
import { MatriculaService } from './matricula.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {

  matricula: any;

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.getMatricula();
  }

  private getMatricula() {
    this.matriculaService.getMatricula().subscribe(arr => {
      this.matricula = arr;
      console.log(arr);
    });
  }
}
