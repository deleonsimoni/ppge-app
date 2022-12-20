import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { TypeGraduateEnum, TypeOpcaoVagaEnum, typeOpcaoVagaEnumToSubscription } from '@app/shared/shared.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, merge, Observable, of, take } from 'rxjs';
import { DialogParecerData, ParecerComponent } from './parecer/parecer.component';

@Component({
  selector: 'app-inscricoes',
  templateUrl: './inscricoes.component.html',
  styleUrls: ['./inscricoes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InscricoesComponent implements OnInit {
  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Update after login/register/logout
    this.authService.getUser()
  );
  typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  typeOpcaoVagaEnumToSubscription = typeOpcaoVagaEnumToSubscription;

  myUser: User = <User>{};
  typeGraduateEnum = TypeGraduateEnum;

  listPareceristas: any;
  listProcessoSeletivo: any;
  listInscritos: any;

  inscricaoSelecionada: any;

  flagDetalharInscricao: boolean = false;

  idProcessoSelecionado = null;

  filtroHomologacao = null;
  filtroAprovacao = null;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.listarPareceristas();
    this.siteService.getProcessosSeletivoTitle().subscribe((data: any) => {
      this.listProcessoSeletivo = data;
    });
    this.user$.subscribe(user => {
      this.myUser = user;
    })
  }

  getInscricoes(idProcesso) {
    this.flagDetalharInscricao = false;
    this.inscricaoSelecionada = null;
    this.idProcessoSelecionado = idProcesso;

    this.siteService.getInscritosProcessoById(idProcesso).subscribe((data: any) => {
      this.listInscritos = data.enrolled;
    });
  }

  getInscricoesByFiltro(filtroAprovacao, filtroHomologacao) {
    if (filtroAprovacao)
      this.filtroAprovacao = filtroAprovacao;
    if (filtroHomologacao)
      this.filtroHomologacao = filtroHomologacao;

    this.siteService.getInscritosProcessoById(this.idProcessoSelecionado, this.filtroAprovacao, this.filtroHomologacao).subscribe((data: any) => {
      this.listInscritos = data.enrolled;
    });

  }

  // listarPareceristas() {
  //   this.siteService.listarPareceristas().subscribe((data: any) => {
  //     console.log("listarPareceristas: data: ", data)
  //     this.listPareceristas = data;
  //   })
  // }

  vincularParecerista(inscricoes) {

    this.siteService.vincularParecerista(inscricoes._id, inscricoes.parecerista._id, this.idProcessoSelecionado)
      .pipe(take(1))
      .pipe(catchError((data) => of(data.error)))
      .subscribe((data: any) => {
        data.hasError ? this.toastr.error(data.msg) : this.toastr.success(data.msg);
      });;
  }

  detalharInscricao(idInscricao) {
    if (!this.inscricaoSelecionada || idInscricao != this.inscricaoSelecionada._id) {
      this.siteService.detalharInscricao(idInscricao, this.idProcessoSelecionado)
        .subscribe((data: any) => {
          if (data && data.enrolled[0])
            this.flagDetalharInscricao = true;
          this.inscricaoSelecionada = data.enrolled[0];
        })
    } else {
      this.flagDetalharInscricao = false;
      this.inscricaoSelecionada = null;
    }
  }

  selecionarPareceristaNoInscrito(idParecerista, index, idInscricao) {
    const inscricao = this.listInscritos.find(ins => ins._id == idInscricao);
    const pareceristaSelecionado = inscricao.possiveisAvaliadores.find(p => p._id == idParecerista);
    if (pareceristaSelecionado)
      this.listInscritos[index].parecerista = { _id: idParecerista, fullname: pareceristaSelecionado.fullname, };

  }

  verificarAprovacao(aprovado) {
    return typeof aprovado != 'boolean' ? 'Não avaliado' : aprovado ? 'Inscrição Aprovada' : 'Inscrição Reprovada';
  }

  verificarHomologacao(homologado) {
    return typeof homologado != 'boolean' ? 'Não homologado' : homologado ? 'Homologação Aprovada' : 'Homologação Reprovada';

  }

  openModalParecer(idInscricao) {
    const dialogRef = this.dialog.open(ParecerComponent, {
      width: '80%',
      data: <DialogParecerData>{
        idInscricao: idInscricao,
        idProcesso: this.idProcessoSelecionado
      }
    })
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        this.getInscricoes(this.idProcessoSelecionado)
      }
    })
  }

  private addInicioS3Url(toConcat): string {
    if (toConcat && toConcat != '') {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(toConcat);
    } else {
      return '';
    }
  }

}
