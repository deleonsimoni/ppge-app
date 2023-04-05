import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { typeDescricaoCota, TypeGraduateEnum, TypeOpcaoVagaEnum, typeOpcaoVagaEnumToSubscription } from "@app/shared/shared.model";

export interface DialogData {
  idProcesso: string;
  title: string;
  users: any[];
}
@Component({
  selector: 'view-inscritos-processo-seletivo',
  templateUrl: './view-inscritos-processo-seletivo.component.html'
})
export class ViewInscritosProcessoSeletivoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewInscritosProcessoSeletivoComponent>,
    private siteService: SiteAdminService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
  infoUser: any = {};
  infoUserProcesso: any = {};
  flagShowInfoUser: boolean = false;

  typeOpcaoVagaEnumToSubscription = typeOpcaoVagaEnumToSubscription;
  typeDescricaoCota = typeDescricaoCota;
  typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  typeGraduateEnum = TypeGraduateEnum;

  ngOnInit(): void {
    this.data.users.forEach(u => {
      console.log("1 user -> ", u);

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
}