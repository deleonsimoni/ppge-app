import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  public menu = [
    { name: 'ADMINISTRAR PÁGINAS', path: '/admin/administrar-paginas' },
    { name: 'HISTÓRICO', path: '/admin/historico' },
    { name: 'Tese e Dissertação', path: '/admin/tese-dissertacao'}

  ];


  ngOnInit() { }



}
