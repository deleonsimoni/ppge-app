import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  public menu = [];

  constructor(authService: AuthService) {
    let test = authService.getUser();
    test.subscribe(user => {
      this.menu = [
        { name: 'Administrar Páginas', path: '/admin/administrar-paginas', permitido: user.isAdmin },
        { name: 'Corpo Docente', path: '/admin/corpo-docente', permitido: user.isAdmin },
        { name: 'Tese e Dissertação', path: '/admin/tese-dissertacao', permitido: user.isAdmin },
        { name: 'Processo Seletivo', path: '/admin/processo-seletivo', permitido: user.isAdmin },
        { name: 'Avaliadores/Coordenadores', path: '/admin/pareceristas', permitido: user.isAdmin || user.isCoordenador },
        { name: 'Inscrições/Pareceristas', path: '/admin/inscritos', permitido: user.isAdmin || user.isCoordenador || user.isParecerista },
        { name: 'Ranking', path: '/admin/rank', permitido: user.isAdmin || user.isCoordenador || user.isParecerista },

      ]
    })
  }


  ngOnInit() { }



}
