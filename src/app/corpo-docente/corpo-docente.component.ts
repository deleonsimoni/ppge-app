import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-corpo-docente',
  templateUrl: './corpo-docente.component.html',
  styleUrls: ['./corpo-docente.component.scss']
})
export class CorpoDocenteComponent implements OnInit {

  tipoDocente = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.tipoDocente = routeParams.tipo;
    });

  }

}
