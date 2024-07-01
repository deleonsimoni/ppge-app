import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  public menu = [];

  constructor(authService: AuthService) {
    let user$ = authService.getUser();
    user$.subscribe(user => {
      this.menu = [
        { name: 'Administrar Home', path: '/admin/administrar-home', permitido: user.isAdmin },
        { name: 'Administrar Páginas', path: '/admin/administrar-paginas', permitido: user.isAdmin },
        { name: 'Contato', path: '/admin/contato', permitido: user.isAdmin },
        { name: 'Corpo Docente', path: '/admin/corpo-docente', permitido: user.isAdmin },
        { name: 'Teses e Dissertações', path: '/admin/tese-dissertacao', permitido: user.isAdmin },
        { name: 'Processo Seletivo', path: '/admin/processo-seletivo', permitido: user.isAdmin || user.isGerenciador },
        { name: 'Critério de Avaliação', path: '/admin/criterio-avaliacao', permitido: user.isAdmin || user.isGerenciador },
        { name: 'Critério de Homologação', path: '/admin/criterio-homologacao', permitido: user.isAdmin || user.isGerenciador },
        { name: 'Avaliadores/Coordenadores', path: '/admin/pareceristas', permitido: user.isAdmin || user.isCoordenador || user.isGerenciador },
        { name: 'Inscrições/Avaliadores', path: '/admin/inscritos', permitido: user.isAdmin || user.isCoordenador || user.isParecerista },
        { name: 'Ranking', path: '/admin/rank', permitido: user.isAdmin || user.isCoordenador || user.isParecerista || user.isGerenciador },
        { name: 'Cotas de Ações Afirmativas', path: '/admin/cotas-acoes-afirmativas', permitido: user.isAdmin || user.isGerenciador },
        { name: 'Gerenciar Usuários', path: '/admin/gerenciar-usuarios', permitido: user.isAdmin },

      ]
    })
  }


  ngOnInit() { }



}
