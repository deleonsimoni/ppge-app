import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PerfilCandidatoViewDialogComponent } from "@app/shared/components/perfil-candidato-view-dialog/perfil-candidato-view-dialog.component";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { typeDescricaoCota, TypeGraduateEnum, TypeOpcaoVagaEnum, typeOpcaoVagaEnumToSubscription } from "@app/shared/shared.model";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs";

export interface DialogData {
  idProcesso: string;
  title: string;
  users: any[];
}
@Component({
  selector: 'view-inscritos-processo-seletivo',
  templateUrl: './view-inscritos-processo-seletivo.component.html',
  styleUrls: ['./view-inscritos-processo-seletivo.component.scss'],
})
export class ViewInscritosProcessoSeletivoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewInscritosProcessoSeletivoComponent>,
    private siteService: SiteAdminService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }
  infoUser: any = {};
  infoUserProcesso: any = {};
  flagShowInfoUser: boolean = false;
  searchText: string = "";
  page=1;
  limit=10;

  typeOpcaoVagaEnumToSubscription = typeOpcaoVagaEnumToSubscription;
  typeDescricaoCota = typeDescricaoCota;
  typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  typeGraduateEnum = TypeGraduateEnum;

  ngOnInit(): void {}

  searchByCPFOrName() {
    const searchTextTrim = this.searchText.trim();
    if(searchTextTrim.length > 2) {
      this.siteService
        .listProcessoSeletivoInscritos(this.data.idProcesso, searchTextTrim)
        .subscribe((res: any) => {
          this.data.users = res.enrolled;
        }, err => {
          this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
        })
    }
  }
  

  onPagination(event) {
    const searchTextTrim = this.searchText.trim();
    this.siteService
      .listProcessoSeletivoInscritos(this.data.idProcesso, searchTextTrim, event.newPage, this.limit)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
      .subscribe((data: any) => {
        this.data.users = data.enrolled;
        this.page = event.newPage;
        window.scroll({
          top: 0,
          left: 0
        })
      });
  }

  getUserInfo(idUser) {
    //FEITO
    this.siteService.getUserByIdOnlyProcesso(idUser, this.data.idProcesso).subscribe((user: any) => {
      this.infoUser = user.enrolled[0].idUser;
      this.infoUserProcesso = user.enrolled[0];

      this.infoUserProcesso.files.pathComprovantePagamento;
      this.infoUserProcesso.files.pathLattes;
      this.infoUserProcesso.files.pathMemorial;
      this.infoUserProcesso.files.pathPreProj;
      this.infoUserProcesso.files.pathPrincipalPubli;
      this.infoUserProcesso.files.pathProjetoTese;

      this.flagShowInfoUser = true;
    })
  }

  addInicioS3Url(toConcat): string {
    if (toConcat && toConcat != '') {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(toConcat);
    } else {
      return '';
    }
  }

  voltar() {
    this.flagShowInfoUser = false;
    this.infoUser = {};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  abrirPerfilCandidatoModal(perfilCandidato) {
    this.dialog.open(PerfilCandidatoViewDialogComponent, {
      data: perfilCandidato
    })
  }
}