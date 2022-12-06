import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/shared/interfaces';
import { AuthService } from '@app/shared/services';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { TypeGraduateEnum } from '@app/shared/shared.model';
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
  myUser: User = <User>{};
  typeGraduateEnum = TypeGraduateEnum;

  listPareceristas: any;
  listProcessoSeletivo: any;
  listInscritos: any;

  inscricaoSelecionada: any;

  flagDetalharInscricao: boolean = false;

  idProcessoSelecionado = null;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    console.log("A")
    this.listarPareceristas();
    this.siteService.getProcessosSeletivoTitle().subscribe((data: any) => {
      console.log("data: ", data)
      this.listProcessoSeletivo = data;
    });
    this.user$.subscribe(user => {
      console.log("UUUUUUUUUUUUUUUUUUUUUU: ", user);
      this.myUser = user;
      console.log("22222222222222222222: ", this.myUser);
    })
  }

  getInscricoes(idProcesso) {
    console.log("idProcesso: ", idProcesso);
    this.flagDetalharInscricao = false;
    this.inscricaoSelecionada = null;
    this.idProcessoSelecionado = idProcesso;
    console.log("listProcessoSeletivolistProcessoSeletivo: ", this.listProcessoSeletivo);
    
    this.siteService.getInscritosProcessoById(idProcesso).subscribe((data: any) => {
      console.log("getInscricoes: data: ", data)
      this.listInscritos = data.enrolled;
    });
  }

  listarPareceristas() {
    this.siteService.listarPareceristas().subscribe((data: any) => {
      console.log("listarPareceristas: data: ", data)
      this.listPareceristas = data;
    })
  }

  vincularParecerista(inscricoes) {
    console.log("salvarParecerista(): inscricoes:", inscricoes);

    this.siteService.vincularParecerista(inscricoes._id, inscricoes.parecerista._id, this.idProcessoSelecionado)
      .pipe(take(1))
      .pipe(catchError((data) => of(data.error)))
      .subscribe((data: any) => {
        console.log(data);
        data.hasError ? this.toastr.error(data.msg) : this.toastr.success(data.msg);
      });;
  }

  detalharInscricao(idInscricao) {
    console.log("MY USER: detalharInscricao: ", this.myUser)
    if(!this.inscricaoSelecionada || idInscricao != this.inscricaoSelecionada._id) {
      this.siteService.detalharInscricao(idInscricao, this.idProcessoSelecionado)
        .subscribe((data: any) => {
          if(data && data.enrolled[0])
          this.flagDetalharInscricao = true;
          this.inscricaoSelecionada = data.enrolled[0];
          console.log("inscricaoSelecionada: ", this.inscricaoSelecionada);
        })
    } else {
      this.flagDetalharInscricao = false;
      this.inscricaoSelecionada = null;
    }
  }

  selecionarPareceristaNoInscrito(idParecerista, index) {
    console.log("selecionarPareceristaNoInscrito(): idParecerista: ", idParecerista);
    console.log("selecionarPareceristaNoInscrito(): index: ", index);
    const pareceristaSelecionado = this.listPareceristas.find(p => p._id==idParecerista);
    if(pareceristaSelecionado)
      this.listInscritos[index].parecerista = {_id:idParecerista, fullname: pareceristaSelecionado.fullname,};
    console.log("this.listInscritos[index].parecerista: ", this.listInscritos[index].parecerista);
    
  }

  verificarAprovacao(aprovado) {
    return typeof aprovado != 'boolean' ? 'Não avaliado' : aprovado ? 'Aprovado'  : 'Reprovado';
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
      if(result && result.refresh) {
        this.getInscricoes(this.idProcessoSelecionado)
      }
    })
  }

  private addInicioS3Url(toConcat):string {
    if(toConcat && toConcat != '') {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(toConcat);
    } else {
      return '';
    }
  }

}
