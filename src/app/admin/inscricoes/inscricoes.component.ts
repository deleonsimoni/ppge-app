import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { TypeGraduateEnum, TypeOpcaoVagaEnum, typeOpcaoVagaEnumToSubscription } from '@app/shared/shared.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, merge, Observable, of, take } from 'rxjs';
import { DialogParecerData, ParecerComponent } from './parecer/parecer.component';
import { RecursoComponent } from './recurso/recurso.component';
import { MatRadioChange } from '@angular/material/radio';
import { DialogHomologacaoData, HomologacaoDialogComponent } from './homologacao-dialog/homologacao-dialog.component';

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

  page = 1;
  limit = 1;

  etapa: string;
  etapaAvaliacao: number;

  tableColumsCoordenador = [
    "etapa",
    "avaliador1",
    "avaliador2",
    "media",
    "approve",
    "acoes",
  ];

  mediaFinal;


  typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  typeOpcaoVagaEnumToSubscription = typeOpcaoVagaEnumToSubscription;

  myUser: User = <User>{};
  typeGraduateEnum = TypeGraduateEnum;

  listPareceristas: any;
  listProcessoSeletivo: any;
  listInscritos: any = [];
  criterioProcessoSelecionado: any;
  criterioHomologacaoProcessoSelecionado: any;

  inscricaoSelecionada: any;

  flagDetalharInscricao: boolean = false;

  idProcessoSelecionado = null;

  filtroConsulta = null;

  radioHomologValue;
  justificaIndeferido;

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

    this.siteService
      .getInscritosProcessoById(idProcesso, this.filtroConsulta, this.page, this.limit)
      .subscribe((data: any) => {
        data.enrolled.forEach(inscrito => {
          inscrito.avaliacaoEtapas = this.getNotasByEtapaAndMedia(inscrito, data.criterio);
          inscrito.mediaFinal = 0;
          inscrito.avaliacaoEtapas.forEach( avaliacao => {
            inscrito.mediaFinal += avaliacao.media
          })

          inscrito.mediaFinal = inscrito.mediaFinal/inscrito.avaliacaoEtapas.length;
        })
        this.etapa = data.etapa;
        this.etapaAvaliacao = data.etapaAvaliacao;
        this.listInscritos = data.enrolled;
        this.criterioProcessoSelecionado = data.criterio;
        this.criterioHomologacaoProcessoSelecionado = data.criterioHomologacao;
        
      });
  }
  
  onPagination(event) {
    this.siteService
      .getInscritosProcessoById(this.idProcessoSelecionado, this.filtroConsulta, event.newPage, this.limit)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
      .subscribe((data: any) => {
        data.enrolled.forEach(inscrito => {
          inscrito.avaliacaoEtapas = this.getNotasByEtapaAndMedia(inscrito, data.criterio);
          inscrito.mediaFinal = 0;
          inscrito.avaliacaoEtapas.forEach( avaliacao => {
            inscrito.mediaFinal += avaliacao.media
          })
          
          inscrito.mediaFinal = inscrito.mediaFinal/inscrito.avaliacaoEtapas.length;
        })
        this.listInscritos = data.enrolled;
        this.page = event.newPage;
        window.scroll({
          top: 0,
          left: 0
        })
      });
  }

  getInscricoesByFiltro(filtroConsulta) {
    if (filtroConsulta) {
      this.filtroConsulta = filtroConsulta;
      this.page = 1;
      this.limit = 1;
    }

    this.siteService.getInscritosProcessoById(this.idProcessoSelecionado, this.filtroConsulta, this.page, this.limit).subscribe((data: any) => {
      data.enrolled.forEach(inscrito => {
        inscrito.avaliacaoEtapas = this.getNotasByEtapaAndMedia(inscrito, data.criterio);
        inscrito.mediaFinal = 0;
        inscrito.avaliacaoEtapas.forEach( avaliacao => {
          inscrito.mediaFinal += avaliacao.media
        })
        
        inscrito.mediaFinal = inscrito.mediaFinal/inscrito.avaliacaoEtapas.length;
      })
      this.listInscritos = data.enrolled;
    });

  }

  calculaMedia(num1, num2) {
    num1 = num1 ? Number(num1) : 0;
    num2 = num2 ? Number(num2) : 0;
    return (num1+num2)/2;
  }

  consolidarAvaliacao(isAprovado, step, inscricao) {

    this.siteService.consolidarAvaliacao(this.idProcessoSelecionado, inscricao._id, step.idStep, step.media, isAprovado)
      .pipe(
        take(1),
        catchError(e => {
          this.toastr.error("Ocorreu um erro ao consolidar etapa");
          throw e;
        })
      ).subscribe((data: any) => {
        this.toastr.success(data.msg);
        this.getInscricoesByFiltro(null);
      });
  }

  getNotasByEtapaAndMedia(inscricao, criterio) {
    
    let notas = criterio?.step?.map(stepC => {
      let prA, sgA;
      if(inscricao.parecer?.avaliacoes) {
        prA = inscricao.parecer.avaliacoes[`avaliador-${inscricao.parecerista?.primeiro?._id}`]?.step[`step-${stepC._id}`]?.totalNotaEtapa
        sgA = inscricao.parecer.avaliacoes[`avaliador-${inscricao.parecerista?.segundo?._id}`]?.step[`step-${stepC._id}`]?.totalNotaEtapa
      }

      return ({
        primeiroAvaliador: prA,
        segundoAvaliador: sgA,
        media: this.calculaMedia(prA, sgA),
        idStep: stepC._id
      });
    });
    return notas;
  }

  vincularParecerista(inscricoes) {

    if(!inscricoes.parecerista || !inscricoes.parecerista.primeiro?._id || !inscricoes.parecerista.segundo?._id) {
      this.toastr.error("Selecione 2 avaliadores para salvar.", "Atenção!")
      return;
    }

    let pareceristasSelecionados = {
      primeiro: inscricoes.parecerista.primeiro._id,
      segundo: inscricoes.parecerista.segundo._id,
      responsavelHomologacao: inscricoes.responsavelHomologacao,
    };

    this.siteService.vincularParecerista(inscricoes._id, pareceristasSelecionados, this.idProcessoSelecionado)
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
          if (data && data.enrolled[0]) {
            this.flagDetalharInscricao = true;
            this.inscricaoSelecionada = data.enrolled[0];
            this.radioHomologValue = this.inscricaoSelecionada.parecer?.homologado
            this.justificaIndeferido = this.inscricaoSelecionada.parecer?.recursoHomolog?.justificaIndeferido

          }
        })
    } else {
      this.flagDetalharInscricao = false;
      this.inscricaoSelecionada = null;
      this.radioHomologValue = null;
      this.justificaIndeferido = null;
    }
  }

  responderJustificativa(idStep, recurso, idInscricao) {

    const justificativa = recurso?.justificativa, 
      respostaJustificativa = recurso?.respostaJustificativa, 
      recursoAceito = recurso?.recursoAceito,
      // idInscricao = this.data.idInscricao, 
      idProcesso = this.idProcessoSelecionado;
      
    
    const dref = this.dialog.open(RecursoComponent, {
      width: '78%',
      data: {
        idInscricao,
        idProcesso,
        idStep,
        isHomolog: false,
        flagJustView: !!respostaJustificativa,
        recurso: {
          justificativa,
          respostaJustificativa,
          recursoAceito
        }
      }
    })
    dref.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        this.getInscricoes(this.idProcessoSelecionado);
        
      }
    })
    
  }

  responderJustificativaHomolog(idInscricao, justificativa, respostaJustificativa, recursoAceito) {

    const idProcesso = this.idProcessoSelecionado;
    
    const dref = this.dialog.open(RecursoComponent, {
      width: '78%',
      data: {
        idInscricao,
        idProcesso,
        isHomolog: true,
        flagJustView: !!respostaJustificativa,
        recurso: {
          justificativa,
          respostaJustificativa,
          recursoAceito
        }
      }
    })
    dref.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        this.getInscricoes(this.idProcessoSelecionado);
        
        
      }
    })

  }

  selecionarPareceristaNoInscrito(idParecerista, index, idInscricao, ordem) {
    const inscricao = this.listInscritos.find(ins => ins._id == idInscricao);
    const pareceristaSelecionado = inscricao.possiveisAvaliadores.find(p => p._id == idParecerista);
    if (pareceristaSelecionado)
      this.listInscritos[index].parecerista[ordem] = { _id: idParecerista, fullname: pareceristaSelecionado.fullname, };

  }

  verificarAprovacao(aprovado) {
    return typeof aprovado != 'boolean' ? 'Não avaliado' : aprovado ? 'Inscrição Aprovada' : 'Inscrição Reprovada';
  }

  verificarHomologacao(homologado) {
    return typeof homologado != 'boolean' ? 'Não homologado' : homologado ? 'Deferido' : 'Indeferido';

  }

  openModalParecer(idInscricao, emailInscrito) {
    const dialogRef = this.dialog.open(ParecerComponent, {
      width: '80%',
      data: <DialogParecerData>{
        idInscricao: idInscricao,
        idProcesso: this.idProcessoSelecionado,
        criterio: this.criterioProcessoSelecionado,
        emailInscrito,
      }
    })
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        this.getInscricoes(this.idProcessoSelecionado)
      }
    })
  }

  changeHomolog() {
    if (typeof this.radioHomologValue == 'boolean') {
      if (this.radioHomologValue == false && (!this.justificaIndeferido || this.justificaIndeferido == "")) {

        this.toastr.error("É necessário justificar em caso de Indeferido!");
        return;
      }
      this.siteService
        .changeHomologInscricao(this.radioHomologValue, this.inscricaoSelecionada._id, this.idProcessoSelecionado, this.justificaIndeferido)
        .pipe(
          take(1),
          catchError(err => {
            this.toastr.error(err.error?.msg || "Ocorreu um erro ao alterar status da homologação!");
            throw err;
          })
        )
        .subscribe(() => {
          this.toastr.success("Status da homologação alterado com sucesso!")
        })
    } else {
      this.toastr.error("É necessário selecionar Deferir/Indeferir para salvar!");

    }

  }

  addInicioS3Url(toConcat): string {
    if (toConcat && toConcat != '') {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(toConcat);
    } else {
      return '';
    }
  }

  onRespHomologChange(event: MatRadioChange, index) {
    this.listInscritos[index].responsavelHomologacao = event.value;
  }

  verificaIsResponsavelHomologacao(inscricao, myUser) {
    const idMyUser = myUser._id;
    
    return ((this.etapa == "homologacao" && inscricao?.parecerista[inscricao?.responsavelHomologacao]?._id == idMyUser) || (myUser.isCoordenador && inscricao.coordenadoresLinha?.indexOf(myUser._id) > -1));
  }

  verificaIsResponsavelAvaliacao(inscricao, myUser) {
    return ((myUser.isCoordenador && inscricao.coordenadoresLinha?.indexOf(myUser._id) > -1))|| (this.etapa == 'avaliacao' && (inscricao?.parecerista?.primeiro?._id == myUser._id || inscricao?.parecerista?.segundo?._id == myUser._id))
  }

  openModalHomologar(idInscricao) {
    const dialogRef = this.dialog.open(HomologacaoDialogComponent, {
      width: '80%',
      data: <DialogHomologacaoData>{
        idInscricao: idInscricao,
        idProcesso: this.idProcessoSelecionado,
        criterio: this.criterioHomologacaoProcessoSelecionado,
      }
    })
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.refresh) {
        this.getInscricoes(this.idProcessoSelecionado)
      }
    })

  }

}
