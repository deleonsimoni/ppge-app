import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorpoDocenteService } from './corpo-docente.service';

@Component({
  selector: 'app-corpo-docente',
  templateUrl: './corpo-docente.component.html',
  styleUrls: ['./corpo-docente.component.scss']
})
export class CorpoDocenteComponent implements OnInit {

  tipoDocente = 1;
  public listProfile: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private corpoDocenteService: CorpoDocenteService,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.tipoDocente = routeParams.tipo;
      this.getAllCorpoDocenteByTipo();
    });
  }

  getAllCorpoDocenteByTipo() {
    this.corpoDocenteService.getCorpoDocente(this.tipoDocente)
      .subscribe(data => {
        this.listProfile = data;
      })
  }

}
