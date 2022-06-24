import { Component, OnInit } from '@angular/core';
import { TeseDissertacaoService } from './tese-dissertacao.service';

@Component({
  selector: 'app-tese-dissertacao',
  templateUrl: './tese-dissertacao.component.html'
})
export class TeseDissertacaoComponent implements OnInit {

  public datas: any[] | undefined;

  constructor(private teseDissertacaoService: TeseDissertacaoService) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.getTeseDissertacao();
  }

  private getTeseDissertacao() {
    this.teseDissertacaoService.getDatasTeseDissertacao('1').subscribe(arr => {
      this.datas = arr;
    });
  }
}
