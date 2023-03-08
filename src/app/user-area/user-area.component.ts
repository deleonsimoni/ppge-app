import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TypeGraduateEnum, TypeOpcaoVagaEnum, typeOpcaoVagaEnumToSubscription } from '@app/shared/shared.model';
import { take } from 'rxjs';
import { JustificarDialogComponent } from './justificar-dialog/justificar-dialog.component';
import { ParecerUserComponent } from './parecer/parecer-user.component';
import { UserAreaService } from './user-area.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAreaComponent implements OnInit {
  typeGraduateEnum = TypeGraduateEnum;
  typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  typeOpcaoVagaEnumToSubscription = typeOpcaoVagaEnumToSubscription;

  minhasInscricoes: any;
  inscricaoSelecionada: any;
  flagDetalharInscricao: boolean = false;

  constructor(
    private userAreaService: UserAreaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMinhasIncricoes();
  }

  getMinhasIncricoes() {
    this.userAreaService.buscarMinhasInscricoes().subscribe((data: any) => {
      this.minhasInscricoes = data;
      console.log("this.minhasInscricoes: ", this.minhasInscricoes)
    })
  }

  openModalDetalharAvaliacao(parecer, criterio, idInscricao, idProcesso) {

    const dialogRef = this.dialog.open(ParecerUserComponent, {
      width: '80%',
      data: { parecer, criterio, idInscricao, idProcesso }
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

  // openModalJustificar(idInscricao, idProcesso) {

  //   const dialogRef = this.dialog.open(JustificarDialogComponent, {
  //     width: '80%',
  //     data: {
  //       idInscricao,
  //       idProcesso
  //     }
  //   })
  //   dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
  //     if (result && result.refresh) {
  //       this.getMinhasIncricoes();
  //     }
  //   })


  // }

  addInicioS3Url(toConcat): string {
    if (toConcat && toConcat != '') {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(toConcat);
    } else {
      return '';
    }
  }


}
