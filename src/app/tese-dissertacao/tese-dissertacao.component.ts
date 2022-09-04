import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  public filterForm: FormGroup;

  constructor(
    private teseDissertacaoService: TeseDissertacaoService,
    private builder: FormBuilder
    ) {
      this.filterForm = this.builder.group({
        tipoFiltro: [null],
        anoPublicacaoFiltro: [null],
        orientadorFiltro: [null],
        autorFiltro: [null],
        tituloFiltro: [null],
        resumoFiltro: [null]
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
    console.log('entrou aqui');
    console.log(this.filterForm);
  }

  getTipo(tipo: string) {
    switch(tipo) {
      case 'dissertacao':
        this.teseDissertacaoService.getTeseDissertacao('data', '2').subscribe(arr => {
          this.list = arr;
          this.isTipoPresent = true;
        });
        break;
      case 'tese':
        this.teseDissertacaoService.getTeseDissertacao('data', '1').subscribe(arr => {
          this.list = arr;
          this.isTipoPresent = true;
        });
        break;
      case 'ambas':
        this.teseDissertacaoService.getTeseDissertacao('data', '3').subscribe(arr => {
          this.list = arr;
          this.isTipoPresent = true;
        });
        break
      default:
        this.teseDissertacaoService.getTeseDissertacao('data', '3').subscribe(arr => {
          this.list = arr;
          this.isTipoPresent = true;
        });
        break;
    }
  }
}
