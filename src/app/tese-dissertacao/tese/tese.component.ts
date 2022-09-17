import { Component, Input } from '@angular/core';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tese',
  templateUrl: './tese.component.html',
  styleUrls: ['./../tese-dissertacao.component.scss']
})
export class TeseComponent {

  @Input()
  datas: any[];

  checkAno: any | false;
  teses: any[] | undefined;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
  ) { }

  getAllTeseAno(ano) {
    this.checkAno = true;
    this.siteService.getTeseDissertacaoData(ano, '1').subscribe((res: any) => {
      this.teses = res;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }
}  