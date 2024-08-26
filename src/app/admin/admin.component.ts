import { C } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  myUser: User = <User>{};
  public menu = [];
  type=0; 

  constructor(authService: AuthService, private router: Router) {
    let user$ = authService.getUser();
    user$.subscribe(user => {
      this.myUser = user;
      this.menu = [
        { type: 2, name: 'Administrar Home', path: '/admin/administrar-home', permitido: user.isAdmin },
        { type: 2, name: 'Administrar Páginas', path: '/admin/administrar-paginas', permitido: user.isAdmin },
        { type: 2, name: 'Contato', path: '/admin/contato', permitido: user.isAdmin },
        { type: 2, name: 'Corpo Docente', path: '/admin/corpo-docente', permitido: user.isAdmin },
        { type: 2, name: 'Teses e Dissertações', path: '/admin/tese-dissertacao', permitido: user.isAdmin },
        { type: 1, name: 'Vincular Avaliador', path: '/admin/pareceristas', permitido: user.isAdmin || user.isCoordenador || user.isGerenciador },
        { type: 1, name: 'Critério de Avaliação', path: '/admin/criterio-avaliacao', permitido: user.isAdmin || user.isGerenciador },
        { type: 1, name: 'Critério de Homologação', path: '/admin/criterio-homologacao', permitido: user.isAdmin || user.isGerenciador },
        { type: 1, name: 'Cotas de Ações Afirmativas', path: '/admin/cotas-acoes-afirmativas', permitido: user.isAdmin || user.isGerenciador },
        { type: 1, name: 'Administrar Processo seletivo', path: '/admin/processo-seletivo', permitido: user.isAdmin || user.isGerenciador },
        { type: 1, name: 'Avaliação de Candidatos', path: '/admin/inscritos', permitido: user.isAdmin || user.isCoordenador || user.isParecerista },
        { type: 1, name: 'Resultados', path: '/admin/rank', permitido: user.isAdmin || user.isCoordenador || user.isParecerista || user.isGerenciador },
        { type: 2, name: 'Gerenciar Usuários', path: '/admin/gerenciar-usuarios', permitido: user.isAdmin },

      ]
    })
  }


  ngOnInit() { }

  changeTab() {
    this.router.navigate(['/admin']);
    
  }


}
