import { Component, Input } from '@angular/core';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dissertacao',
  templateUrl: './dissertacao.component.html',
  styleUrls: ['./../tese-dissertacao.component.scss']
})
export class DissertacaoComponent {
  @Input()
  datas: any[] | undefined;

  checkAno: any | false;
  dissertacoes: any[] | undefined;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
  ) { }

  getAllDissertacaoAno(ano) {
    this.checkAno = true;
    this.siteService.getTeseDissertacaoData(ano, '2').subscribe((res: any) => {
      this.dissertacoes = res;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }
}  