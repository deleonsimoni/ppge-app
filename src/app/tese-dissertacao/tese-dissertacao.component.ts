import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { COMMA, ENTER } from "@angular/cdk/keycodes";

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
  metadados = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
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

  private getTeseDissertacao(tipo) {
    this.siteService.listTeseDissertacao(tipo).subscribe((res: any) => {
      var data = new Array;
      res.filter(r => {
        data.push(r.ano);
      });

      this.datas = data.filter(function (este, i) {
        return data.indexOf(este) === i;
      });
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  filter() {
    let req = this.form.value;
    if (this.metadados.length > 0) {
      req.metadados = this.metadados;
    }
    this.siteService.getTeseDissertacao(req).subscribe((res: any) => {
      this.filtros = res;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }
}
