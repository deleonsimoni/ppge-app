import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import * as cloneDeep from 'lodash.clonedeep';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-tese-dissertacao',
  templateUrl: './tese-dissertacao.component.html'
})
export class TeseDissertacaoComponent implements OnInit {

  public datas: any[];

  page: number = 1;
  limit: number = 10;
  typeTab: string = "1";
  // Filtros
  listAllAnos: any = [];
  typeSelected: string;
  list: any[] | undefined;
  isTipoPresent: boolean | false;
  filtros: any | undefined;
  qtdTotalItems: number | undefined;
  metadados = [];
  selectable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  public form: FormGroup;

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.form = this.builder.group({
      tipo: ['0'],
      ano: [''],
      autor: [null],
      orientador: [null],
      titulo: [null],
      dataSala: [null],
      banca: [null],
      ingresso: [null],
      resumo: [null],
      linkTitulo: [null],
    });

    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.isTipoPresent = false;
    this.getAnosCadastrados();
  }

  getAnosCadastrados() {
    
    this.siteService
      .getAnosCadastrados().subscribe((listAnos: any) => {
        this.listAllAnos = listAnos;
      })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.metadados.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(metadado: any): void {
    const index = this.metadados.indexOf(metadado);

    if (index >= 0) {
      this.metadados.splice(index, 1);
    }
  }


  limparFiltro() {
    this.filtros = null;
    this.qtdTotalItems = null;
    this.form.reset();
    this.form.get('tipo').setValue('0');
    this.form.get('ano').setValue('');
  }

  filter({page = 1, limit = 10, type = null}) {
    
    let req = cloneDeep(this.form.value);
    this.typeTab = req.tipo;
    if(req.tipo == "0") {
      delete req.tipo;
      
      if(type) {
        req.tipo = type;
        this.typeTab = req.tipo;
      } else {
        req.tipo = "1";
        this.typeTab = "1"
      }
    }
    if (this.metadados.length > 0) {
      req.metadados = this.metadados;
    }
    this.siteService.getTeseDissertacao(req, page, limit).subscribe((res: any) => {
      this.filtros = res.data;
      this.qtdTotalItems = res.qtdTotalItems;
      this.page = page;
      this.typeSelected = this.form.value.tipo;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  onPagination(event) {
    this.filter({page: event.newPage, limit: this.limit, type: this.typeTab})
  }
}
