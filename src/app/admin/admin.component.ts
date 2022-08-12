import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  public menu = [
    { name: 'HISTÓRICO', path: '/admin/historico' },
    { name: 'HISTÓRICO', path: '/admin/historico' },


  ];


  ngOnInit() { }



}
