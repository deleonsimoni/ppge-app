import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TypeGraduateEnum, TypeOpcaoVagaEnum, typeOpcaoVagaEnumToSubscription } from '@app/shared/shared.model';
import { Observable, merge, take } from 'rxjs';
import { JustificarDialogComponent } from './justificar-dialog/justificar-dialog.component';
import { ParecerUserComponent } from './parecer/parecer-user.component';
import { UserAreaService } from './user-area.service';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
import { UserAreaTabEnum } from './user-area.model';
import { EditPasswordDialogComponent } from './edit-password-dialog/edit-password-dialog.component';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAreaComponent implements OnInit {
  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Update after login/register/logout
    this.authService.getUser()
  );
  myUser: User = <User>{};

  typeGraduateEnum = TypeGraduateEnum;
  typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  typeOpcaoVagaEnumToSubscription = typeOpcaoVagaEnumToSubscription;
  userAreaTabEnum = UserAreaTabEnum;

  selectedTab = UserAreaTabEnum.MY_ACCOUNT;

  minhasInscricoes: any;
  inscricaoSelecionada: any;
  flagDetalharInscricao: boolean = false;
  flagEditUser = false;

  constructor(
    private userAreaService: UserAreaService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.myUser = user;
      
    })
    this.getMinhasIncricoes();
  }

  getMinhasIncricoes() {
    this.userAreaService.buscarMinhasInscricoes().subscribe((data: any) => {
      this.minhasInscricoes = data;
    })
  }

  openModalDetalharAvaliacao(parecer, criterio, idInscricao, idProcesso, etapa, etapaAvaliacao, recursoHabilitado) {

    const dialogRef = this.dialog.open(ParecerUserComponent, {
      width: '80%',
      data: { parecer, criterio, idInscricao, idProcesso, etapa, etapaAvaliacao, recursoHabilitado }
    })
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        this.getMinhasIncricoes();
      }
    })
  }

  detalharInscricao(inscricao) {
    if (!this.inscricaoSelecionada || inscricao._id != this.inscricaoSelecionada._id) {
      this.flagDetalharInscricao = true;
      this.inscricaoSelecionada = inscricao;
    } else {
      this.inscricaoSelecionada = null;

    }
  }

  verificarHomologacao(homologado) {
    return typeof homologado != 'boolean' ? 'Aguardando Homologação' : homologado ? 'Deferido' : 'Indeferido';
  }

  verificarAprovacao(aprovado) {
    return typeof aprovado != 'boolean' ? 'Aguardando Avaliação' : aprovado ? 'Inscrição Aprovada' : 'Inscrição Reprovada';
  }

  addInicioS3Url(toConcat): string {
    if (toConcat && toConcat != '') {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(toConcat);
    } else {
      return '';
    }
  }

  toggleEditUser(editUser) {
    this.flagEditUser = editUser;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeTab(selectedTab) {
    this.selectedTab = selectedTab;
  }

  callBackEditUser(user: any) {
    if(user) {
      this.myUser = user;
    }
    this.flagEditUser = false;
  }

  editPassword() {
    this.dialog.open(EditPasswordDialogComponent, {
      maxWidth:'500px',
      width: '100%'
    });
  }

}
