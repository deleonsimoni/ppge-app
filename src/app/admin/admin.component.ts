import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  public menu = [
    { name: 'Administrar Páginas', path: '/admin/administrar-paginas' },
    { name: 'Corpo Docente', path: '/admin/corpo-docente' },
    { name: 'Tese e Dissertação', path: '/admin/tese-dissertacao'},
    { name: 'Processo Seletivo', path: '/admin/processo-seletivo'}

  ];


  ngOnInit() { }



}
