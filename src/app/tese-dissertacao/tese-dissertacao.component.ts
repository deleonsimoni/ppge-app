import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { TeseDissertacaoService } from './tese-dissertacao.service';

@Component({
  selector: 'app-tese-dissertacao',
  templateUrl: './tese-dissertacao.component.html'
})
export class TeseDissertacaoComponent implements OnInit {

  public datas: any[] | undefined;

  // Filtros
  list: any[] | undefined;
  isTipoPresent: boolean | false;
  filtros: any | undefined;
  
  public form: FormGroup;

  constructor(
    private teseDissertacaoService: TeseDissertacaoService,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    private builder: FormBuilder
    ) {
      this.form = this.builder.group({
        tipo: [null],
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
    this.getTeseDissertacao();
  }

  private getTeseDissertacao() {
    this.teseDissertacaoService.getDatasTeseDissertacao('1').subscribe(arr => {
      this.datas = arr;
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
