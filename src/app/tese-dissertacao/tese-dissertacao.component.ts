import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tese-dissertacao',
  templateUrl: './tese-dissertacao.component.html'
})
export class TeseDissertacaoComponent implements OnInit {

  public datas: any[];

  // Filtros
  list: any[] | undefined;
  isTipoPresent: boolean | false;
  filtros: any | undefined;
  
  public form: FormGroup;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    private builder: FormBuilder
    ) {
      this.form = this.builder.group({
        tipo: ['1'],
        ano: [null],
        autor: [null],
        titulo: [null],
        dataSala: [null],
        banca: [null],
        ingresso: [null],
        linkTitulo: [null],
      });

      window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.isTipoPresent = false;
    this.getTeseDissertacao('1');
  }

  private getTeseDissertacao(tipo) {
    this.siteService.listTeseDissertacao(tipo).subscribe((res: any) => {
      var data = new Array;
      res.filter( r => {
        data.push(r.ano);
      });

      this.datas = data.filter(function(este, i) {
        return data.indexOf(este) === i;
    });
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  filter() {
    this.siteService.getTeseDissertacao(this.form.value).subscribe((res: any) => {
      this.filtros = res;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }
}
