import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteAdminService } from "@app/shared/services/site-admin.service";

export interface DialogData {
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
  flagShowInfoUser: boolean = false;

  ngOnInit(): void {
  }

  getUserInfo(idUser) {
    this.siteService.getUserById(idUser).subscribe(user => {
      this.infoUser = user;
      this.flagShowInfoUser = true;
    })
  }

  voltar() {
    this.flagShowInfoUser = false; 
    this.infoUser={};
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}